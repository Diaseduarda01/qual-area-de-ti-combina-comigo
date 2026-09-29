import { AREA_IDS, AREAS, TIEBREAK_ORDER } from "@/data/areas";
import { FRAMING, NOTICES, ORIGIN_TAGS, TAG_LABELS } from "@/data/context";
import { AXES, PROFILES } from "@/data/profiles";
import { QUESTIONS } from "@/data/questions";
import type {
  Answers,
  Area,
  AreaId,
  ContextAnswers,
  Profile,
  ProfileId,
  SkillTag,
} from "@/types";

/** Piso de relevância: abaixo disso não há sinal de afinidade. */
const RELEVANCE_FLOOR = 55;
/** Distância máxima da 1ª colocada para a 2ª e para a 3ª. */
const GAP_SECOND = 12;
const GAP_THIRD = 15;
/** A partir de quantas áreas coladas na 1ª o resultado é considerado espalhado. */
const SPREAD_GAP = 3;
const SPREAD_COUNT = 4;

const MAX_AREAS = 3;
const MAX_PER_FAMILY = 2;

/**
 * Segunda barreira contra `NaN` na tela.
 *
 * O storage já é sanitizado ao ser lido, mas a garantia de que nenhuma
 * pontuação vira NaN pertence a quem faz a conta — não a quem chama. Qualquer
 * coisa fora de −2..2 é tratada como "não respondeu".
 */
function multiplicador(valor: unknown): number {
  return valor === -2 || valor === -1 || valor === 0 || valor === 1 || valor === 2 ? valor : 0;
}

/** Soma dos pesos absolutos × 2 — o teto teórico de cada área. */
const SMAX: Record<AreaId, number> = Object.fromEntries(
  AREA_IDS.map((area) => [
    area,
    QUESTIONS.reduce((total, q) => total + Math.abs(q.weights[area] ?? 0) * 2, 0),
  ]),
) as Record<AreaId, number>;

export interface AreaScore {
  area: AreaId;
  /** Pontuação bruta. */
  raw: number;
  /** Normalizada 0–100. Neutro em tudo dá 50 em todas as áreas. */
  n: number;
  /** Soma das contribuições vindas de "gosto muito" — primeiro critério de desempate. */
  enthusiasm: number;
  /** Quantas perguntas contribuíram positivamente — segundo critério. */
  positives: number;
  /** Rótulos das perguntas que mais puxaram esta área pra cima. */
  reasons: string[];
}

export type Tier = "alta" | "empatada" | "forte" | "explorar";

export interface SelectedArea {
  area: Area;
  n: number;
  tier: Tier;
  reasons: string[];
  /** Ponte de repertório, quando a pessoa vem de fora de TI. */
  bridge?: string;
}

export interface QuizResult {
  profile: Profile;
  /** Segundo eixo, quando está a 6 pontos ou menos do primeiro. */
  secondaryProfile?: Profile;
  areas: SelectedArea[];
  ranking: AreaScore[];
  /** Aviso de caso de borda, quando houver. */
  notice?: string;
  /** Quando true, nem os cards devem ser apresentados como recomendação. */
  inconclusive: boolean;
  framing: string[];
  footer: string;
}

export function computeAreaScores(answers: Answers): AreaScore[] {
  const scores = AREA_IDS.map<AreaScore>((area) => {
    let raw = 0;
    let enthusiasm = 0;
    let positives = 0;
    const contributions: { label: string; value: number }[] = [];

    for (const question of QUESTIONS) {
      const weight = question.weights[area];
      if (!weight) continue;

      const answer = multiplicador(answers[question.id]);
      const contribution = weight * answer;
      raw += contribution;

      if (contribution > 0) {
        positives += 1;
        contributions.push({ label: question.label, value: contribution });
        if (answer === 2) enthusiasm += contribution;
      }
    }

    // as duas perguntas que mais puxaram a área viram o "por que apareceu"
    const reasons = contributions
      .sort((a, b) => b.value - a.value)
      .slice(0, 2)
      .map((c) => c.label);

    return {
      area,
      raw,
      n: round1(50 * (1 + raw / SMAX[area])),
      enthusiasm,
      positives,
      reasons,
    };
  });

  return scores.sort(compareScores);
}

/**
 * Desempate determinístico: o mesmo conjunto de respostas sempre produz o mesmo
 * resultado. Nada de aleatório — quem refaz o quiz do mesmo jeito espera ver a
 * mesma coisa.
 */
function compareScores(a: AreaScore, b: AreaScore): number {
  if (b.n !== a.n) return b.n - a.n;
  if (b.enthusiasm !== a.enthusiasm) return b.enthusiasm - a.enthusiasm;
  if (b.positives !== a.positives) return b.positives - a.positives;
  return TIEBREAK_ORDER.indexOf(a.area) - TIEBREAK_ORDER.indexOf(b.area);
}

/**
 * Seleciona até 3 áreas aplicando piso, distância e diversidade de família.
 *
 * Pode devolver menos de 3 de propósito: quando o sinal é forte e concentrado,
 * inventar uma terceira área só pra preencher o card seria ruído.
 */
export function selectAreas(ranking: AreaScore[], ignoreFloor = false): AreaScore[] {
  const eligible = ignoreFloor ? ranking : ranking.filter((s) => s.n >= RELEVANCE_FLOOR);
  if (eligible.length === 0) return [];

  const selected: AreaScore[] = [eligible[0]];
  const familyCount = new Map<string, number>([[AREAS[eligible[0].area].family, 1]]);
  const top = eligible[0].n;

  for (const candidate of eligible.slice(1)) {
    if (selected.length >= MAX_AREAS) break;

    const gap = selected.length === 1 ? GAP_SECOND : GAP_THIRD;
    if (!ignoreFloor && top - candidate.n > gap) continue;

    const family = AREAS[candidate.area].family;
    if ((familyCount.get(family) ?? 0) >= MAX_PER_FAMILY) continue;

    selected.push(candidate);
    familyCount.set(family, (familyCount.get(family) ?? 0) + 1);
  }

  return selected;
}

function tierFor(n: number, top: number, index: number): Tier {
  if (index === 0) return "alta";
  const gap = top - n;
  if (gap <= 3) return "empatada";
  if (gap <= 8) return "forte";
  return "explorar";
}

export const TIER_LABELS: Record<Tier, string> = {
  alta: "afinidade mais alta",
  empatada: "praticamente empatada com a primeira",
  forte: "afinidade forte",
  explorar: "vale explorar",
};

/** Eixos de comportamento, normalizados 0–100 como as áreas. */
export function computeAxisScores(answers: Answers): { id: ProfileId; e: number }[] {
  return AXES.map(({ id, questions, inverted }) => {
    const sum = questions.reduce((total, qid) => {
      const value = multiplicador(answers[qid]);
      return total + (inverted?.includes(qid) ? -value : value);
    }, 0);
    return { id: id as ProfileId, e: round1(50 * (1 + sum / questions.length / 2)) };
  }).sort((a, b) => b.e - a.e);
}

interface Distribution {
  counts: Record<string, number>;
  total: number;
  share: (value: number) => number;
}

function distribution(answers: Answers, questionCount: number): Distribution {
  const counts: Record<string, number> = { "-2": 0, "-1": 0, "0": 0, "1": 0, "2": 0 };
  for (const value of Object.values(answers)) counts[String(multiplicador(value))] += 1;
  return {
    counts,
    total: questionCount,
    share: (value: number) => (questionCount ? counts[String(value)] / questionCount : 0),
  };
}

export function computeResult(
  answers: Answers,
  context: ContextAnswers = {},
  questionCount = QUESTIONS.length,
): QuizResult {
  const ranking = computeAreaScores(answers);
  const dist = distribution(answers, questionCount);

  const noSignal = ranking[0].n < RELEVANCE_FLOOR;
  const mostlyNeutral = dist.share(0) >= 0.6;
  const mostlyPositive = dist.share(2) >= 0.7;
  const mostlyNegative = dist.share(-2) >= 0.7;
  const uniform = Math.max(...Object.values(dist.counts)) / questionCount >= 0.7;

  // quando nada passou do piso, ainda mostramos as maiores — mas dizendo que
  // são ponto de partida, não recomendação.
  //
  // Já quem marcou "não combina" em quase tudo não recebe card nenhum: as que
  // "vencem" nesse caso são só as áreas com mais pesos invertidos (PM, Suporte,
  // Produto), então o pódio seria artefato da matriz, não afinidade. O ranking
  // completo continua disponível, e o aviso explica o que aconteceu.
  const selected = mostlyNegative ? [] : selectAreas(ranking, noSignal);
  const top = selected[0]?.n ?? 0;

  const spread =
    ranking.filter((s) => top - s.n <= SPREAD_GAP && s.n >= RELEVANCE_FLOOR).length >= SPREAD_COUNT;

  const axes = computeAxisScores(answers);
  const axisSpread = axes[0].e - axes[axes.length - 1].e <= 8;

  // "muito neutro" sozinho não faz ninguém Explorador: quem responde neutro em
  // boa parte mas tem preferência nítida no resto sabe do que gosta, e chamar
  // isso de interesse espalhado contradiria as áreas que o próprio quiz achou.
  //
  // `uniform` entra, porém, porque é o mesmo gatilho de `inconclusive`: sem ele
  // a tela afirmava um perfil ("você é Estrategista") ao lado de áreas
  // silenciadas por baixa confiança — duas metades se contradizendo.
  const isExplorer = noSignal || mostlyPositive || axisSpread || uniform;

  const profile = PROFILES[isExplorer ? "EXPLORADOR" : axes[0].id];
  const secondary =
    !isExplorer && axes[0].e - axes[1].e <= 6 ? PROFILES[axes[1].id] : undefined;

  return {
    profile,
    secondaryProfile: secondary,
    areas: selected.map((score, index) => ({
      area: AREAS[score.area],
      n: score.n,
      tier: tierFor(score.n, top, index),
      reasons: score.reasons,
      bridge: buildBridge(AREAS[score.area], context),
    })),
    ranking,
    notice: pickNotice({ mostlyNegative, uniform, mostlyPositive, noSignal, mostlyNeutral, spread }),
    inconclusive: mostlyNegative || uniform || noSignal,
    framing: buildFraming(context),
    footer: FRAMING.rodape,
  };
}

function pickNotice(flags: {
  mostlyNegative: boolean;
  uniform: boolean;
  mostlyPositive: boolean;
  noSignal: boolean;
  mostlyNeutral: boolean;
  spread: boolean;
}): string | undefined {
  if (flags.mostlyNegative) return NOTICES.tudoNaoGosta;
  if (flags.mostlyPositive) return NOTICES.tudoGosta;
  if (flags.uniform) return NOTICES.uniforme;
  if (flags.noSignal || flags.mostlyNeutral) return NOTICES.semSinal;
  if (flags.spread) return NOTICES.espalhado;
  return undefined;
}

/**
 * Ponte de transição: interseção entre o repertório da origem e o que a área
 * aproveita. Sem promessa de empregabilidade, sem "é fácil migrar", sem prazo.
 */
function buildBridge(area: Area, context: ContextAnswers): string | undefined {
  const origem = context.origem;
  if (!origem || origem === "Prefiro não dizer") return undefined;
  if (isAlreadyInTech(context)) return undefined;

  const originTags = ORIGIN_TAGS[origem];
  if (!originTags) return FRAMING.origemSemPonte(origem, area.name);

  const shared = originTags.filter((tag) => area.tags.includes(tag));
  if (shared.length === 0) return FRAMING.origemSemPonte(origem, area.name);

  return `Você vem de ${origem}. Isso não significa começar do zero: ${listar(
    shared.map((tag) => TAG_LABELS[tag as SkillTag]),
  )} é repertório que já conta em ${area.name} — o que você desenvolve daqui pra frente é a parte técnica.`;
}

function isAlreadyInTech(context: ContextAnswers): boolean {
  return context.situacao === "Estudo TI" || context.situacao === "Trabalho com TI";
}

function buildFraming(context: ContextAnswers): string[] {
  const framing: string[] = [];
  if (isAlreadyInTech(context)) {
    framing.push(FRAMING.jaEmTI);
  } else if (context.contato?.includes("Nenhuma") || context.contato?.length === 0) {
    framing.push(FRAMING.semContato);
  }
  return framing;
}

function listar(items: string[]): string {
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

export { SMAX, RELEVANCE_FLOOR };
