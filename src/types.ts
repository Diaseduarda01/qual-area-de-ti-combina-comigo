export type AreaId =
  | "DEV"
  | "DATA"
  | "AI"
  | "CLOUD"
  | "SEC"
  | "QA"
  | "UX"
  | "PROD"
  | "BA"
  | "PM"
  | "SUP"
  | "GROWTH"
  | "DOCS";

/** Famílias existem para uma regra só: no máximo 2 áreas da mesma família no top 3. */
export type FamilyId =
  | "construir"
  | "dados"
  | "operar"
  | "verificar"
  | "experiencia"
  | "direcionar"
  | "organizar";

export type AxisId =
  | "INVESTIGAR"
  | "ANALISAR"
  | "CONSTRUIR"
  | "PROTEGER"
  | "CRIAR"
  | "CONECTAR"
  | "DIRECIONAR"
  | "ORGANIZAR";

export type ProfileId = AxisId | "EXPLORADOR";

/** Repertório transferível de quem vem de fora de TI. */
export type SkillTag =
  | "metricas"
  | "publico"
  | "comunicacao"
  | "experimentacao"
  | "processos"
  | "negocio"
  | "organizacao"
  | "estetica"
  | "criacao"
  | "escrita"
  | "pessoas"
  | "logica"
  | "investigacao"
  | "calculo"
  | "detalhe"
  | "atendimento";

/** Multiplicador da resposta: gosto muito +2, gosto +1, neutro 0, não gosto muito −1, não gosto −2. */
export type LikertValue = -2 | -1 | 0 | 1 | 2;

export interface Question {
  id: string;
  /** Enunciado, escrito como situação real e sem termo técnico. */
  text: string;
  /** Trecho curto usado no resultado: "você marcou gosto muito em {label}". */
  label: string;
  /** Peso por área. Ausente = 0, a pergunta não diz nada sobre aquela área. */
  weights: Partial<Record<AreaId, number>>;
  /** Pergunta bipolar: discordar é sinal positivo para as áreas de peso negativo. */
  tradeOff?: boolean;
}

export interface Area {
  id: AreaId;
  name: string;
  family: FamilyId;
  /** O que a área é, em uma linha. */
  tagline: string;
  /** Base do "por que apareceu", antes das duas perguntas de maior contribuição. */
  affinity: string;
  doing: string[];
  trying: string[];
  /** Tags de repertório que a área aproveita de quem vem de fora. */
  tags: SkillTag[];
}

export interface Profile {
  id: ProfileId;
  name: string;
  text: string;
}

export type Answers = Record<string, LikertValue>;

export interface ContextAnswers {
  situacao?: string;
  origem?: string;
  contato?: string[];
  buscando?: string;
}

/** Uma vertente dentro de uma área — o "que tipo de" da segunda etapa. */
export interface Branch {
  id: string;
  name: string;
  /** O que a vertente é, em uma linha. */
  tagline: string;
  doing: string[];
  trying: string[];
  /**
   * Área vizinha com que esta vertente é constantemente confundida.
   * Se ela também pontuou bem no quiz principal, o resultado avisa.
   */
  neighbor?: AreaId;
  neighborNote?: string;
}

export interface BranchQuestion {
  id: string;
  text: string;
  /** Peso por vertente da mesma área. Negativo = discordar puxa pra ela. */
  weights: Record<string, number>;
}

export interface BranchSet {
  area: AreaId;
  /** Pergunta de abertura da etapa, pra pessoa saber o que vem. */
  intro: string;
  branches: Branch[];
  questions: BranchQuestion[];
}
