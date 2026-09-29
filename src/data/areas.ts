import type { Area, AreaId } from "@/types";

/** Textos das 13 áreas (seção 8 do ARQUITETURA_QUIZ.md). */
export const AREAS: Record<AreaId, Area> = {
  DEV: {
    id: "DEV",
    name: "Desenvolvimento de Software",
    family: "construir",
    tagline: "Escrever o código que faz aplicativos, sites e sistemas funcionarem.",
    affinity:
      "Suas respostas mostraram afinidade com construir coisas, entender como elas funcionam por dentro e ficar num problema até resolver.",
    doing: [
      "transformar uma ideia em algo que roda",
      "montar telas ou a lógica por trás delas",
      "descobrir por que alguma coisa quebrou",
      "melhorar código que já existe",
    ],
    trying: [
      "lógica de programação",
      "uma linguagem só pra começar (Python ou JavaScript)",
      "montar um projetinho pequeno de ponta a ponta",
      "Git e GitHub",
    ],
    tags: ["logica", "organizacao", "criacao", "estetica", "investigacao"],
  },
  DATA: {
    id: "DATA",
    name: "Dados & BI",
    family: "dados",
    tagline: "Pegar informação espalhada e transformar em resposta que ajuda a decidir.",
    affinity:
      "Suas respostas mostraram afinidade com números, padrões e decisão baseada em evidência.",
    doing: [
      "achar o motivo de um número ter mudado",
      "montar painéis e relatórios",
      "organizar dados bagunçados",
      "responder pergunta de negócio com dado na mão",
    ],
    trying: [
      "Excel/Sheets a fundo (é mais do que parece)",
      "SQL",
      "Power BI ou Looker Studio",
      "estatística básica",
    ],
    tags: ["metricas", "calculo", "investigacao", "detalhe"],
  },
  AI: {
    id: "AI",
    name: "IA & Machine Learning",
    family: "dados",
    tagline: "Usar dados pra fazer sistemas reconhecerem padrões e preverem coisas.",
    affinity:
      "Suas respostas mostraram afinidade com padrões, previsão e experimentação em cima de dados.",
    doing: [
      "treinar modelos pra reconhecer ou prever",
      "testar hipóteses e medir acerto",
      "preparar dados pro modelo aprender",
      "avaliar quando o modelo erra e por quê",
    ],
    trying: [
      "Python",
      "estatística e probabilidade",
      "um curso introdutório de machine learning",
      "brincar com APIs de IA prontas antes de treinar qualquer coisa",
    ],
    tags: ["logica", "calculo", "investigacao", "metricas", "experimentacao", "criacao"],
  },
  CLOUD: {
    id: "CLOUD",
    name: "Cloud, DevOps & SRE",
    family: "operar",
    tagline: "Cuidar de onde os sistemas rodam e garantir que continuem no ar.",
    affinity:
      "Suas respostas mostraram afinidade com automação, infraestrutura e manter as coisas funcionando mesmo quando algo dá errado.",
    doing: [
      "automatizar o que hoje é feito na mão",
      "configurar os ambientes onde os sistemas rodam",
      "investigar lentidão e queda",
      "montar alertas que avisam antes do usuário reclamar",
    ],
    trying: [
      "fundamentos de redes",
      "Linux e linha de comando",
      "Docker",
      "o nível gratuito de uma nuvem (AWS, Azure ou GCP)",
    ],
    tags: ["processos", "investigacao", "organizacao", "logica"],
  },
  SUP: {
    id: "SUP",
    name: "Suporte, Infra & IT Operations",
    family: "operar",
    tagline: "Ser quem resolve quando o sistema não está fazendo o que deveria.",
    affinity:
      "Suas respostas mostraram afinidade com resolver problema real, atender pessoas e entender como as coisas estão montadas.",
    doing: [
      "atender chamado e destravar quem está parado",
      "investigar problema com pouca informação",
      "cuidar de equipamentos, acessos e ambientes",
      "documentar a solução pra próxima vez ser rápida",
    ],
    trying: [
      "Windows e Linux no dia a dia",
      "redes básicas",
      "ITIL (o vocabulário do mercado)",
      "um help desk voluntário pra pegar prática real",
    ],
    tags: ["atendimento", "pessoas", "comunicacao", "investigacao", "processos", "organizacao", "escrita"],
  },
  SEC: {
    id: "SEC",
    name: "Cibersegurança",
    family: "verificar",
    tagline: "Pensar como alguém que quer invadir, pra conseguir proteger antes.",
    affinity:
      "Suas respostas mostraram afinidade com investigação, desconfiança saudável e proteção de informação.",
    doing: [
      "procurar falha antes que alguém use",
      "investigar comportamento suspeito",
      "definir quem pode acessar o quê",
      "responder quando acontece um incidente",
    ],
    trying: [
      "fundamentos de redes (é a base de tudo aqui)",
      "segurança da informação",
      "laboratórios de CTF, tipo TryHackMe",
      "os conceitos do OWASP Top 10",
    ],
    tags: ["investigacao", "detalhe", "processos"],
  },
  QA: {
    id: "QA",
    name: "Qualidade & Testes",
    family: "verificar",
    tagline: "Achar o problema antes que ele chegue em quem vai usar.",
    affinity:
      "Suas respostas mostraram afinidade com atenção a detalhe, teste e critério claro pra dizer se algo está certo.",
    doing: [
      "testar de jeitos que ninguém pensou",
      "escrever cenários de teste",
      "reportar bug de um jeito que dê pra reproduzir",
      "automatizar teste repetitivo",
    ],
    trying: [
      "teste manual e escrita de caso de teste",
      "testar API com Postman",
      "fundamentos de automação (Cypress ou Playwright)",
      "a certificação CTFL, se quiser o vocabulário formal",
    ],
    tags: ["detalhe", "processos", "investigacao", "escrita", "experimentacao"],
  },
  UX: {
    id: "UX",
    name: "UX/UI & Design de Produto",
    family: "experiencia",
    tagline: "Fazer com que usar aquilo não seja um sofrimento.",
    affinity:
      "Suas respostas mostraram afinidade com pensar na pessoa que usa, reparar em detalhe e imaginar como poderia ser melhor.",
    doing: [
      "conversar com quem usa pra entender a dor",
      "desenhar telas e fluxos",
      "testar o desenho com pessoas de verdade",
      "defender a experiência nas decisões do time",
    ],
    trying: [
      "Figma",
      "fundamentos de usabilidade (as heurísticas de Nielsen)",
      "refazer a tela de um app que te irrita",
      "pesquisa com usuário, mesmo que com 3 pessoas",
    ],
    tags: ["publico", "estetica", "comunicacao", "pessoas", "criacao"],
  },
  PROD: {
    id: "PROD",
    name: "Produto / Product Management",
    family: "direcionar",
    tagline: "Decidir qual problema o time resolve primeiro, e por quê.",
    affinity:
      "Suas respostas mostraram afinidade com visão de negócio, priorização e lidar bem com o que ainda não está definido.",
    doing: [
      "descobrir qual problema vale a pena resolver",
      "dizer não pra ideia boa que não é agora",
      "alinhar negócio, usuário e time técnico",
      "acompanhar o que aconteceu depois que lançou",
    ],
    trying: [
      "fundamentos de discovery",
      "métricas de produto",
      "escrever a proposta de uma melhoria de um app que você usa",
      "noções de Scrum e Kanban",
    ],
    tags: ["negocio", "publico", "metricas", "comunicacao", "pessoas"],
  },
  BA: {
    id: "BA",
    name: "Business Analysis / Análise de Sistemas",
    family: "direcionar",
    tagline: "Traduzir o que a área de negócio precisa pro que o time técnico vai construir.",
    affinity:
      "Suas respostas mostraram afinidade com entender processo, conversar com pessoas e organizar informação.",
    doing: [
      "entrevistar quem conhece o processo",
      "desenhar como o processo funciona hoje e como poderia funcionar",
      "escrever requisito que o time consiga usar",
      "validar se o que foi entregue resolve mesmo",
    ],
    trying: [
      "BPMN (desenho de processo)",
      "escrita de requisito e user story",
      "SQL básico pra investigar dado sozinha",
      "UML no essencial",
    ],
    tags: ["processos", "negocio", "comunicacao", "escrita", "investigacao", "pessoas", "organizacao"],
  },
  PM: {
    id: "PM",
    name: "Gestão de Projetos",
    family: "organizar",
    tagline: "Fazer as peças e as pessoas chegarem juntas no fim.",
    affinity: "Suas respostas mostraram afinidade com organização, coordenação e antecipar risco.",
    doing: [
      "organizar prazo, escopo e dependência",
      "destravar o que está parado",
      "antecipar risco antes de virar crise",
      "manter todo mundo sabendo onde a coisa está",
    ],
    trying: [
      "Scrum e Kanban",
      "uma ferramenta de gestão (Jira, Trello ou Notion)",
      "fundamentos do PMBOK",
      "organizar um projeto real, mesmo que pequeno",
    ],
    tags: ["organizacao", "processos", "pessoas", "comunicacao", "negocio"],
  },
  GROWTH: {
    id: "GROWTH",
    name: "Growth & Marketing Technology",
    family: "direcionar",
    tagline: "Usar dado, teste e tecnologia pra mais gente conhecer e usar o produto.",
    affinity: "Suas respostas mostraram afinidade com métrica, experimentação e alcance.",
    doing: [
      "rodar experimento e medir resultado",
      "entender por onde as pessoas chegam e por onde desistem",
      "automatizar campanha e jornada",
      "montar painel de acompanhamento",
    ],
    trying: [
      "Google Analytics",
      "teste A/B",
      "SQL básico",
      "uma ferramenta de automação (HubSpot, RD Station ou similar)",
    ],
    tags: ["metricas", "publico", "comunicacao", "experimentacao", "criacao", "calculo"],
  },
  DOCS: {
    id: "DOCS",
    name: "Technical Writing, Documentação & DevRel",
    family: "organizar",
    tagline: "Fazer com que a tecnologia seja compreensível pra quem precisa usar.",
    affinity:
      "Suas respostas mostraram afinidade com escrita, explicação e organização de conhecimento.",
    doing: [
      "escrever guia e documentação que as pessoas realmente leem",
      "organizar conhecimento pro time achar sozinho",
      "produzir conteúdo técnico",
      "ajudar quem está usando a entender",
    ],
    trying: [
      "Markdown e Git",
      "escrever um tutorial do zero sobre algo que você aprendeu",
      "documentação de API",
      "estudar como as boas docs são estruturadas (Stripe, Vercel)",
    ],
    tags: ["escrita", "comunicacao", "organizacao", "publico", "detalhe"],
  },
};

export const AREA_IDS = Object.keys(AREAS) as AreaId[];

/**
 * Ordem fixa de desempate, montada intercalando famílias.
 *
 * Só entra em ação quando N, entusiasmo e espalhamento empatam — o caso extremo
 * é quem responde "combina muito" em tudo. Intercalar famílias garante que o pior
 * caso devolva três áreas diferentes entre si, em vez de três parentes próximas.
 *
 * É uma lista fixa, e isso é escolha consciente: o quiz precisa ser reprodutível,
 * então sortear seria pior (a mesma pessoa veria resultados diferentes). Não é
 * ordem alfabética nem ordem de declaração. E sempre que ela decide algo, o
 * resultado já vem marcado como inconclusivo — ninguém recebe esse desempate
 * apresentado como afinidade real.
 */
export const TIEBREAK_ORDER: AreaId[] = [
  "DEV",
  "DATA",
  "UX",
  "QA",
  "PROD",
  "CLOUD",
  "SEC",
  "BA",
  "AI",
  "GROWTH",
  "PM",
  "SUP",
  "DOCS",
];
