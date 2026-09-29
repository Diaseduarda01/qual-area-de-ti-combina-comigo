import type { AxisId, Profile, ProfileId } from "@/types";

/**
 * Os eixos de comportamento (seção 7 do ARQUITETURA_QUIZ.md).
 *
 * O perfil NÃO sai das áreas — sai daqui. É o que impede o resultado de virar
 * estereótipo de personalidade: duas pessoas "Investigador" podem receber áreas
 * completamente diferentes, porque o perfil descreve como a pessoa trabalha e as
 * áreas descrevem onde isso costuma caber.
 */
export interface Axis {
  id: AxisId;
  /** Perguntas que compõem o eixo. */
  questions: string[];
  /** Perguntas cujo sinal é invertido dentro deste eixo. */
  inverted?: string[];
}

export const AXES: Axis[] = [
  { id: "INVESTIGAR", questions: ["q02", "q04", "q11", "q18", "q20", "q22", "q23", "q25"] },
  { id: "ANALISAR", questions: ["q01", "q04", "q10", "q11", "q12", "q13", "q34"] },
  { id: "CONSTRUIR", questions: ["q01", "q17", "q18", "q19", "q32", "q33"] },
  { id: "PROTEGER", questions: ["q06", "q21", "q22", "q24", "q25", "q26"] },
  { id: "CRIAR", questions: ["q03", "q05", "q14", "q15", "q16", "q33"] },
  { id: "CONECTAR", questions: ["q07", "q08", "q09", "q30", "q31", "q35"] },
  { id: "DIRECIONAR", questions: ["q05", "q09", "q10", "q27", "q28", "q34"] },
  { id: "ORGANIZAR", questions: ["q06", "q12", "q29", "q35", "q32"], inverted: ["q32"] },
];

export const PROFILES: Record<ProfileId, Profile> = {
  INVESTIGAR: {
    id: "INVESTIGAR",
    name: "Investigador",
    text: "Você gosta de entender o que está por trás das coisas. Antes de arrumar, você quer saber por que quebrou. Costuma notar o detalhe que não fecha e não sossega enquanto não acha a explicação.",
  },
  ANALISAR: {
    id: "ANALISAR",
    name: "Analista",
    text: "Você gosta de olhar informação e tirar sentido dela. Prefere decidir com evidência na mão a decidir no feeling, e curte quando um número finalmente explica o que estava acontecendo.",
  },
  CONSTRUIR: {
    id: "CONSTRUIR",
    name: "Construtor",
    text: "Você gosta de sair da ideia e chegar na coisa pronta. Prefere passar um tempo bom num problema só até funcionar de verdade, e tem paciência com o processo de montar.",
  },
  PROTEGER: {
    id: "PROTEGER",
    name: "Guardião",
    text: "Você repara no que pode dar errado antes de dar errado. Gosta de critério claro, de proteger o que é importante e de entregar coisa que aguenta o tranco.",
  },
  CRIAR: {
    id: "CRIAR",
    name: "Criador",
    text: "Você gosta de imaginar como as coisas poderiam ser melhores. Pensa primeiro em quem vai usar, repara em detalhe que os outros não veem e se sente bem começando do zero.",
  },
  CONECTAR: {
    id: "CONECTAR",
    name: "Conector",
    text: "Você é a ponte. Gosta de entender o que as pessoas precisam, traduzir o complicado pro simples e deixar a informação num formato que os outros consigam usar sozinhos.",
  },
  DIRECIONAR: {
    id: "DIRECIONAR",
    name: "Estrategista",
    text: "Você gosta de decidir o que importa. Fica confortável quando nem tudo está definido, equilibra o que o negócio quer com o que as pessoas precisam e não trava na hora de escolher o que vem primeiro.",
  },
  ORGANIZAR: {
    id: "ORGANIZAR",
    name: "Organizador",
    text: "Você gosta de transformar bagunça em plano. Enxerga prazo, dependência e risco antes dos outros, e sente prazer quando a coisa toda anda porque alguém organizou.",
  },
  EXPLORADOR: {
    id: "EXPLORADOR",
    name: "Explorador",
    text: "Seu interesse está espalhado, e isso não é indecisão. É que você ainda não teve contato suficiente com essas áreas pra saber do que gosta mais. A melhor coisa agora é experimentar, não escolher.",
  },
};
