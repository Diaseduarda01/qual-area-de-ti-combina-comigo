import type { LikertValue, Question } from "@/types";

/**
 * As 35 perguntas e a matriz de pesos (seções 2 e 3 do ARQUITETURA_QUIZ.md).
 *
 * Pesos negativos aparecem só nas 3 perguntas marcadas `tradeOff`. Ali, discordar
 * é sinal positivo: quem não gosta de trabalhar sem nada definido está dizendo
 * algo verdadeiro sobre QA e PM, e isso é informação — não defeito.
 */
export const QUESTIONS: Question[] = [
  {
    id: "q01",
    text: "Você gosta de quebrar um problema grande em partes menores até descobrir como resolver?",
    label: "quebrar problemas grandes em partes",
    weights: { DEV: 3, DATA: 2, BA: 2, QA: 1, PM: 1, AI: 1, CLOUD: 1 },
  },
  {
    id: "q02",
    text: "Você gosta de investigar a causa de um problema antes de sair corrigindo?",
    label: "investigar a causa antes de corrigir",
    weights: { SEC: 3, QA: 3, CLOUD: 2, SUP: 2, DEV: 2, DATA: 1, PM: 1 },
  },
  {
    id: "q03",
    text: "Você gosta de testar várias possibilidades até descobrir o que funciona?",
    label: "testar até achar o que funciona",
    weights: { QA: 3, GROWTH: 2, DEV: 2, AI: 2, UX: 1 },
  },
  {
    id: "q04",
    text: "Você gosta de achar padrões em informações que parecem não ter ligação nenhuma?",
    label: "achar padrões em informações soltas",
    weights: { DATA: 3, AI: 3, SEC: 2, GROWTH: 1, BA: 1 },
  },
  {
    id: "q05",
    text: "Você se sente bem trabalhando quando as informações ainda estão incompletas e nada foi decidido?",
    label: "lidar bem com o que ainda não está definido",
    weights: { PROD: 3, UX: 2, AI: 2, GROWTH: 2, DEV: 1, PM: -1, QA: -1, SUP: -1 },
    tradeOff: true,
  },
  {
    id: "q06",
    text: "Você prefere trabalhar com processos e critérios bem definidos, em vez de descobrir o caminho no meio do percurso?",
    label: "trabalhar com critérios claros",
    weights: { QA: 3, PM: 3, SUP: 2, BA: 2, SEC: 1, CLOUD: 1, DATA: 1, PROD: -2, GROWTH: -1, UX: -1 },
    tradeOff: true,
  },
  {
    id: "q07",
    text: "Você gosta de conversar com pessoas pra entender o que elas realmente precisam?",
    label: "entender o que as pessoas precisam",
    weights: { BA: 3, UX: 3, PROD: 3, PM: 1, SUP: 1, DOCS: 1 },
  },
  {
    id: "q08",
    text: "Você gosta de explicar assuntos complicados de um jeito simples?",
    label: "explicar coisa difícil de um jeito simples",
    weights: { DOCS: 3, BA: 2, SUP: 2, PROD: 1, UX: 1, PM: 1 },
  },
  {
    id: "q09",
    text: "Você gosta de negociar prioridades quando pessoas diferentes querem coisas diferentes?",
    label: "negociar prioridades entre pessoas",
    weights: { PROD: 3, PM: 3, BA: 2 },
  },
  {
    id: "q10",
    text: "Você gosta de trabalhar com números, métricas e indicadores?",
    label: "trabalhar com números e métricas",
    weights: { DATA: 3, GROWTH: 3, AI: 2, PROD: 2, PM: 1, BA: 1 },
  },
  {
    id: "q11",
    text: "Se um número subiu ou caiu do nada, você teria vontade de descobrir o porquê?",
    label: "descobrir por que um número mudou",
    weights: { DATA: 3, GROWTH: 3, PROD: 2, AI: 1, SEC: 1 },
  },
  {
    id: "q12",
    text: "Você gosta de transformar informação solta em gráficos, relatórios ou painéis que os outros consigam ler?",
    label: "transformar informação em gráfico e relatório",
    weights: { DATA: 3, GROWTH: 2, BA: 2, PROD: 1, DOCS: 1, PM: 1, AI: 1 },
  },
  {
    id: "q13",
    text: "Você teria interesse em usar dados pra tentar prever o que vai acontecer?",
    label: "usar dados pra prever o que vem",
    weights: { AI: 3, DATA: 2, GROWTH: 1 },
  },
  {
    id: "q14",
    text: "Você repara em detalhes visuais de aplicativos e sites — espaçamento, cor, tamanho do texto?",
    label: "reparar em detalhes visuais",
    weights: { UX: 3, DEV: 2, QA: 1 },
  },
  {
    id: "q15",
    text: "Você gosta de pensar em como a pessoa vai se sentir usando alguma coisa?",
    label: "pensar em como a pessoa vai se sentir",
    weights: { UX: 3, PROD: 2, GROWTH: 1, DOCS: 1 },
  },
  {
    id: "q16",
    text: "Você gosta de observar alguém usando uma ferramenta pra descobrir o que dava pra melhorar?",
    label: "observar o uso pra achar melhorias",
    weights: { UX: 3, QA: 2, PROD: 2, BA: 1, DOCS: 1 },
  },
  {
    id: "q17",
    text: "Você gostaria de construir aplicativos, sites ou sistemas que outras pessoas usem?",
    label: "construir coisas que os outros usam",
    weights: { DEV: 3, AI: 1, UX: 1, CLOUD: 1 },
  },
  {
    id: "q18",
    text: 'Você teria curiosidade de entender o que acontece "por trás da tela" quando você clica num botão?',
    label: "entender o que acontece por trás da tela",
    weights: { DEV: 3, CLOUD: 2, SEC: 2, AI: 1, QA: 1, SUP: 1 },
  },
  {
    id: "q19",
    text: "Você gosta da ideia de automatizar tarefa repetitiva pra não precisar fazer na mão?",
    label: "automatizar o que é repetitivo",
    weights: { CLOUD: 3, QA: 2, DEV: 2, GROWTH: 2, SUP: 2, DATA: 1, DOCS: 1, PM: 1 },
  },
  {
    id: "q20",
    text: "Você teria paciência pra passar um tempo investigando por que um sistema parou de funcionar?",
    label: "investigar sistema que parou",
    weights: { SUP: 3, CLOUD: 3, DEV: 2, QA: 2, SEC: 2 },
  },
  {
    id: "q21",
    text: "Você teria curiosidade de entender onde os aplicativos ficam hospedados e como eles continuam no ar mesmo quando alguma coisa dá errado?",
    label: "entender como os sistemas ficam no ar",
    weights: { CLOUD: 3, SUP: 3, SEC: 2, DEV: 1, QA: 1 },
  },
  {
    id: "q22",
    text: "Você gosta de pensar nas formas que alguém poderia usar uma falha a favor próprio?",
    label: "pensar em como uma falha seria explorada",
    weights: { SEC: 3, QA: 2 },
  },
  {
    id: "q23",
    text: "Você teria vontade de investigar um comportamento estranho antes que ele vire um problema maior?",
    label: "investigar o que parece estranho",
    weights: { SEC: 3, SUP: 2, CLOUD: 2, QA: 1 },
  },
  {
    id: "q24",
    text: "Você se importa em proteger informação das pessoas e pensar em quem pode acessar o quê?",
    label: "proteger informação das pessoas",
    weights: { SEC: 3, CLOUD: 1, BA: 1 },
  },
  {
    id: "q25",
    text: "Você costuma perceber errinhos que a maioria das pessoas deixa passar?",
    label: "perceber os errinhos que passam",
    weights: { QA: 3, UX: 2, DOCS: 2, DEV: 1, SEC: 1, CLOUD: 1, AI: 1 },
  },
  {
    id: "q26",
    text: "Você prefere achar o problema antes que ele chegue em quem vai usar?",
    label: "achar o problema antes do usuário",
    weights: { QA: 3, SEC: 2, SUP: 1, CLOUD: 1, PM: 1, DOCS: 1, DATA: 1, AI: 1 },
  },
  {
    id: "q27",
    text: "Você gosta de entender por que uma empresa decidiu criar determinado produto?",
    label: "entender a decisão por trás do produto",
    weights: { PROD: 3, BA: 3, GROWTH: 2, UX: 1, DOCS: 1, PM: 1, DATA: 1 },
  },
  {
    id: "q28",
    text: "Você gosta de decidir o que vem primeiro quando não dá pra fazer tudo ao mesmo tempo?",
    label: "decidir o que vem primeiro",
    weights: { PROD: 3, PM: 3, BA: 1 },
  },
  {
    id: "q29",
    text: "Você gosta de organizar tarefas, prazos e pessoas pra chegar numa entrega?",
    label: "organizar tarefas, prazos e pessoas",
    weights: { PM: 3, BA: 1, SUP: 1, PROD: 1 },
  },
  {
    id: "q30",
    text: "Você gosta de escrever guias, tutoriais ou explicações pra outras pessoas consultarem depois?",
    label: "escrever guias e explicações",
    weights: { DOCS: 3, BA: 2, QA: 1, SUP: 1, PM: 1 },
  },
  {
    id: "q31",
    text: "Você gostaria de criar conteúdo e materiais que façam mais gente conhecer e usar um produto?",
    label: "criar conteúdo pra alcançar mais gente",
    weights: { GROWTH: 3, DOCS: 3, PROD: 1, UX: 1 },
  },
  {
    id: "q32",
    text: "Você prefere mergulhar fundo em um problema só por bastante tempo, em vez de trocar de assunto o dia inteiro?",
    label: "se aprofundar em um problema só",
    weights: { DEV: 2, AI: 2, DATA: 2, SEC: 1, CLOUD: 1, SUP: -2, PM: -2, PROD: -1, GROWTH: -1 },
    tradeOff: true,
  },
  {
    id: "q33",
    text: "Você gosta de criar uma solução nova do zero, mesmo sem ter um modelo pronto pra seguir?",
    label: "criar coisas do zero",
    weights: { DEV: 2, UX: 2, AI: 2, PROD: 2, GROWTH: 1, DOCS: 1 },
  },
  {
    id: "q34",
    text: "Você gosta de fazer experimentos pequenos e medir o resultado pra decidir o próximo passo?",
    label: "decidir com base em experimentos",
    weights: { GROWTH: 3, PROD: 2, DATA: 2, AI: 2, QA: 1, DOCS: 1 },
  },
  {
    id: "q35",
    text: "Você gosta de organizar informação de um jeito que outra pessoa consiga achar sozinha o que precisa?",
    label: "organizar informação pros outros acharem",
    weights: { DOCS: 3, UX: 2, BA: 2, SUP: 2, PM: 1, DATA: 1, CLOUD: 1 },
  },
];

/**
 * Ordem de exibição, intercalada de propósito.
 *
 * As perguntas nunca aparecem agrupadas por tema — senão, depois da terceira
 * pergunta sobre segurança seguidas, a pessoa percebe o padrão e começa a
 * responder o que acha que vai dar o resultado que ela quer.
 */
export const DISPLAY_ORDER = [
  "q17", "q07", "q10", "q25", "q15", "q02", "q19", "q28", "q04", "q30",
  "q18", "q16", "q11", "q26", "q29", "q21", "q03", "q27", "q14", "q24",
  "q01", "q31", "q13", "q20", "q09", "q12", "q05", "q22", "q35", "q33",
  "q06", "q08", "q23", "q34", "q32",
];

export const QUESTIONS_IN_ORDER: Question[] = DISPLAY_ORDER.map((id) => {
  const question = QUESTIONS.find((q) => q.id === id);
  if (!question) throw new Error(`DISPLAY_ORDER referencia pergunta inexistente: ${id}`);
  return question;
});

export interface ScaleOption {
  value: LikertValue;
  label: string;
}

/**
 * A escala fala em "combina", não em "gosto".
 *
 * 9 das 35 perguntas são de hábito ou disposição ("você costuma perceber",
 * "você teria paciência"), e nessas "Gosto muito" não é resposta que se dê —
 * ninguém gosta de ter paciência. "Combina comigo" encaixa nas 35, e ainda
 * soa como leitura da pessoa em vez de julgamento dela.
 *
 * O ícone não é guardado aqui: o nível de preenchimento do disco sai direto de
 * `value + 2`, então não há um segundo campo pra sair do lugar.
 */
export const SCALE: ScaleOption[] = [
  { value: 2, label: "Combina muito comigo" },
  { value: 1, label: "Combina" },
  { value: 0, label: "Tanto faz" },
  { value: -1, label: "Combina pouco" },
  { value: -2, label: "Não combina" },
];
