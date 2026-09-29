import { AREAS } from "@/data/areas";
import { BRANCHES } from "@/data/branches";
import type { Answers, AreaId, Branch, BranchSet } from "@/types";
import type { AreaScore } from "@/lib/scoring";

/** Abaixo disso a vertente não tem sinal suficiente pra ser sugerida. */
const BRANCH_FLOOR = 55;
/** Distância máxima da 1ª pra a 2ª vertente entrar junto. */
const BRANCH_GAP = 10;
/** Abaixo disso as duas primeiras são tão próximas que vale dizer "as duas". */
const BRANCH_TIE = 4;

export interface BranchScore {
  branch: Branch;
  n: number;
  /** Rótulo da vizinhança, quando a área vizinha também pontuou bem. */
  neighborNote?: string;
}

export interface BranchResult {
  area: AreaId;
  areaName: string;
  scores: BranchScore[];
  /** As que serão apresentadas — 1 ou 2. */
  selected: BranchScore[];
  /** True quando as duas primeiras praticamente empataram. */
  tied: boolean;
  notice?: string;
}

export function getBranchSet(area: AreaId): BranchSet | undefined {
  return BRANCHES[area];
}

/**
 * Pontua as vertentes de uma área.
 *
 * Mesma normalização do quiz principal (`Smax` por vertente), pelo mesmo motivo:
 * vertentes têm números de perguntas e pesos diferentes, e comparar pontuação
 * bruta faria a de maior peso vencer sempre.
 */
export function computeBranchResult(
  area: AreaId,
  answers: Answers,
  /** Ranking do quiz principal, pra saber se a área vizinha também pontuou. */
  mainRanking: AreaScore[] = [],
): BranchResult | null {
  const set = BRANCHES[area];
  if (!set) return null;

  const respondidas = set.questions.filter((q) => answers[q.id] !== undefined).length;

  const scores: BranchScore[] = set.branches.map((branch) => {
    let raw = 0;
    let smax = 0;
    for (const question of set.questions) {
      const weight = question.weights[branch.id];
      if (!weight) continue;
      smax += Math.abs(weight) * 2;
      raw += weight * (answers[question.id] ?? 0);
    }
    return {
      branch,
      n: smax === 0 ? 50 : Math.round(50 * (1 + raw / smax) * 10) / 10,
      neighborNote: vizinhancaRelevante(branch, mainRanking),
    };
  });

  scores.sort((a, b) => b.n - a.n || a.branch.id.localeCompare(b.branch.id));

  const acimaDoPiso = scores.filter((s) => s.n >= BRANCH_FLOOR);
  const selected =
    acimaDoPiso.length === 0
      ? scores.slice(0, 1)
      : acimaDoPiso.filter((s, i) => i === 0 || acimaDoPiso[0].n - s.n <= BRANCH_GAP).slice(0, 2);

  const tied = selected.length > 1 && selected[0].n - selected[1].n <= BRANCH_TIE;

  return {
    area,
    areaName: AREAS[area].name,
    scores,
    selected,
    tied,
    notice: aviso({ semSinal: acimaDoPiso.length === 0, tied, respondidas, total: set.questions.length }),
  };
}

/**
 * A nota de vizinhança só aparece se a área vizinha realmente pontuou bem pra
 * essa pessoa. Sem isso viraria curiosidade genérica em todo resultado.
 */
function vizinhancaRelevante(branch: Branch, ranking: AreaScore[]): string | undefined {
  if (!branch.neighbor || !branch.neighborNote) return undefined;
  const vizinha = ranking.find((s) => s.area === branch.neighbor);
  if (!vizinha || vizinha.n < 55) return undefined;
  return branch.neighborNote;
}

function aviso(flags: {
  semSinal: boolean;
  tied: boolean;
  respondidas: number;
  total: number;
}): string | undefined {
  if (flags.respondidas < flags.total) {
    return "Você pulou algumas perguntas, então esse recorte é mais um chute do que uma leitura. Vale refazer respondendo todas.";
  }
  if (flags.semSinal) {
    return "Nenhuma vertente se destacou nas suas respostas. Isso é comum quando a área ainda é nova pra você — nesse caso, a melhor pista é experimentar um pouco de cada uma antes de escolher.";
  }
  if (flags.tied) {
    return "As duas ficaram praticamente empatadas. Não é indecisão: muita gente trabalha exatamente no meio dessas duas, e o mercado tem vaga pra esse perfil.";
  }
  return undefined;
}

export { BRANCH_FLOOR };
