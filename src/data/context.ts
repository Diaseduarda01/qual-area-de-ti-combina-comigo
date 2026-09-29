import type { SkillTag } from "@/types";

/**
 * Perguntas de contexto (seção 9 do ARQUITETURA_QUIZ.md).
 *
 * Nenhuma delas entra no cálculo. Elas só escolhem qual texto de enquadramento
 * aparece no resultado — formação anterior não pode ser fator determinante.
 */
export interface ContextQuestion {
  id: "situacao" | "origem" | "contato" | "buscando";
  text: string;
  hint?: string;
  options: string[];
  multiple?: boolean;
  optional?: boolean;
}

export const CONTEXT_QUESTIONS: ContextQuestion[] = [
  {
    id: "situacao",
    text: "Qual é a sua situação hoje?",
    options: [
      "Estudo TI",
      "Trabalho com TI",
      "Estudo outra área",
      "Trabalho em outra área",
      "Estou em transição de carreira",
      "Ainda não estudo nem trabalho",
      "Outro",
    ],
  },
  {
    id: "origem",
    text: "De qual área você vem?",
    hint: "Serve só pra gente comentar o que você já traz de repertório. Não muda o resultado.",
    optional: true,
    options: [
      "Marketing",
      "Administração e Gestão",
      "Design",
      "Comunicação e Jornalismo",
      "RH",
      "Engenharia",
      "Educação",
      "Saúde",
      "Direito",
      "Financeiro e Contábil",
      "Atendimento, Vendas e Operações",
      "Outra",
      "Prefiro não dizer",
    ],
  },
  {
    id: "contato",
    text: "Você já teve contato com alguma área de tecnologia?",
    hint: "Pode marcar mais de uma.",
    multiple: true,
    optional: true,
    options: [
      "Desenvolvimento",
      "Dados",
      "Design",
      "Produto",
      "Infra/Cloud",
      "Segurança",
      "QA/Testes",
      "Marketing/Growth",
      "Nenhuma",
      "Outra",
    ],
  },
  {
    id: "buscando",
    text: "O que você está procurando agora?",
    optional: true,
    options: [
      "Primeira profissão",
      "Transição de carreira",
      "Primeira oportunidade em TI",
      "Conhecer possibilidades",
      "Mudar de área dentro de TI",
      "Evoluir na carreira",
      "Só curiosidade",
    ],
  },
];

/**
 * Repertório transferível por área de origem.
 *
 * A ponte de transição é montada pela interseção entre estas tags e as tags que
 * cada área aproveita — em vez de 13 áreas × 11 origens = 143 textos pra manter.
 */
export const ORIGIN_TAGS: Record<string, SkillTag[]> = {
  Marketing: ["metricas", "publico", "comunicacao", "experimentacao"],
  "Administração e Gestão": ["processos", "negocio", "organizacao", "metricas"],
  Design: ["estetica", "publico", "criacao"],
  "Comunicação e Jornalismo": ["comunicacao", "escrita", "publico"],
  RH: ["pessoas", "processos", "comunicacao", "organizacao"],
  Engenharia: ["logica", "investigacao", "processos", "calculo"],
  Educação: ["comunicacao", "escrita", "organizacao", "pessoas"],
  Saúde: ["atendimento", "pessoas", "processos", "investigacao"],
  Direito: ["escrita", "investigacao", "detalhe", "processos"],
  "Financeiro e Contábil": ["metricas", "calculo", "processos", "detalhe"],
  "Atendimento, Vendas e Operações": ["atendimento", "pessoas", "comunicacao", "processos"],
};

/** Como cada tag é escrita no texto da ponte. */
export const TAG_LABELS: Record<SkillTag, string> = {
  metricas: "leitura de métricas",
  publico: "entendimento de público",
  comunicacao: "comunicação",
  experimentacao: "cultura de teste",
  processos: "visão de processo",
  negocio: "visão de negócio",
  organizacao: "organização",
  estetica: "repertório visual",
  criacao: "criação",
  escrita: "escrita",
  pessoas: "trato com pessoas",
  logica: "raciocínio lógico",
  investigacao: "investigação",
  calculo: "raciocínio quantitativo",
  detalhe: "atenção a detalhe",
  atendimento: "atendimento",
};

export const FRAMING = {
  naoEhVeredito:
    "O quiz leu as suas respostas e devolveu o que combina com elas. Só isso. Se o resultado não te representa, confie mais em você do que no quiz — acontece de a gente responder pensando em quem gostaria de ser, e não em quem é. Nenhuma área aqui está fechada pra você, e nenhuma está garantida.",
  subtituloAreas:
    "Sugestões pra explorar, na ordem que as suas respostas apontaram. Não é ranking de talento nem de chance de dar certo.",
  /** O resultado sai com 0, 1, 2 ou 3 cards, então o texto acompanha. */
  outrasAreas: (destaque: number) =>
    destaque === 0
      ? "Esta é a ordem em que as 13 áreas ficaram nas suas respostas. Não é recomendação — com tão pouca coisa marcada como \"combina\", a diferença entre elas diz mais sobre a conta do que sobre você."
      : `Nenhuma delas foi descartada. Elas só ficaram mais abaixo nas suas respostas de hoje — o que é diferente de "você não serve pra isso". Se bater o olho e alguma te chamar mais que ${
          destaque === 1 ? "a de cima" : destaque === 2 ? "as duas de cima" : "as três de cima"
        }, segue essa.`,
  semContato:
    "Esse resultado é sobre afinidade, não sobre habilidade. Ninguém já sabe fazer nada disso antes de aprender. O que ele diz é: pelo jeito que você gosta de trabalhar, essas são as áreas onde provavelmente você se sentiria mais em casa.",
  jaEmTI:
    "Você já está em tecnologia. Se apareceu uma área diferente da sua, não é sinal de que você está no lugar errado — pode ser um caminho de especialização, ou simplesmente uma vizinhança que vale conhecer. Boa parte das carreiras em TI se move de lado, não pra cima.",
  /**
   * Quando origem e área não têm repertório em comum de verdade.
   *
   * Inventar uma ponte aqui seria pior que não ter: a pessoa percebe quando a
   * frase é genérica. Melhor dizer com todas as letras que não há atalho, e
   * que isso não impede nada.
   */
  origemSemPonte: (origem: string, area: string) =>
    `Você vem de ${origem}, e entre ${origem} e ${area} não existe um atalho óbvio de repertório. O que te leva pra lá é interesse, não bagagem anterior — e isso basta: quase todo mundo que trabalha com isso hoje começou sem saber nada.`,
  // o bloco "isso é uma ideia" já diz que não é veredito; aqui o rodapé
  // complementa em vez de repetir
  rodape:
    "Afinidade não é competência: dá pra combinar muito com uma área e ainda não ter nenhuma das habilidades técnicas dela. Isso é o normal, não o problema. A única forma de saber se você gosta de verdade é encostar — fazer um curso curto, um projetinho, conversar com quem trabalha com aquilo.",
};

export const NOTICES = {
  espalhado:
    "Suas respostas ficaram bem distribuídas — várias áreas apareceram quase empatadas. Isso costuma acontecer com quem tem interesse amplo, e não é problema nenhum. Escolhemos 3 pra você começar a olhar, mas as outras continuam abertas.",
  semSinal:
    "Suas respostas não puxaram forte pra nenhum lado. Isso é normal quando a gente ainda não experimentou muita coisa — essas são só um ponto de partida.",
  uniforme:
    "Você respondeu quase tudo igual, então o resultado abaixo tem pouco a dizer. Se quiser, refaça pensando em atividades específicas que você já fez e gostou.",
  tudoGosta:
    "Você marcou interesse em quase tudo — o ranking abaixo é por diferença de intensidade, não por exclusão.",
  tudoNaoGosta:
    "Pelas suas respostas, quase nada aqui despertou interesse. Talvez o momento não seja esse — e tudo bem. Se quiser, refaça pensando em atividades específicas que você já gostou de fazer.",
};
