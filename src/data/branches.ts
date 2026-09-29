import type { AreaId, BranchSet } from "@/types";

/**
 * Segunda etapa: dentro de uma área, qual vertente.
 *
 * O quiz principal responde "quais áreas combinam com você". Ele não responde
 * "que tipo de dev" — e não deveria fingir que responde, porque só duas das 35
 * perguntas tocam a fronteira front/back. Fabricar "você é front-end" a partir
 * de duas respostas seria chute com cara de resultado.
 *
 * Então aqui a pessoa responde perguntas NOVAS, específicas da área que ela
 * escolheu afunilar. Seis por área: o suficiente pra separar as vertentes sem
 * transformar o quiz de 5 minutos num de 20.
 *
 * `neighbor` existe porque algumas vertentes vivem colando em outra área
 * inteira (front-end e UX é o caso clássico). Quando a vizinha também pontuou
 * bem no quiz principal, o resultado diz isso em vez de deixar a pessoa achar
 * que precisa escolher.
 */
export const BRANCHES: Partial<Record<AreaId, BranchSet>> = {
  DEV: {
    area: "DEV",
    intro: "Desenvolvimento é um guarda-chuva grande. Seis perguntas pra ver de que lado dele você fica.",
    branches: [
      {
        id: "front",
        name: "Front-end",
        tagline: "A parte que a pessoa vê e toca: tela, interação, resposta imediata.",
        doing: [
          "montar as telas e fazer elas responderem ao clique",
          "garantir que funcione igual no celular e no computador",
          "deixar a interface rápida e acessível",
        ],
        trying: ["HTML, CSS e JavaScript", "React ou Vue", "recriar a tela de um app que você usa"],
        neighbor: "UX",
        neighborNote:
          "Front-end e UX vivem colados, e é a confusão mais comum de todas. A diferença prática: UX decide como a tela deve ser, front-end faz ela existir. Você pode começar por um e migrar pro outro — muita gente faz exatamente isso.",
      },
      {
        id: "back",
        name: "Back-end",
        tagline: "O que roda por trás: regra de negócio, dados, integração entre sistemas.",
        doing: [
          "escrever a lógica que decide o que o sistema faz",
          "modelar e guardar os dados",
          "criar APIs pra outros sistemas conversarem",
        ],
        trying: ["uma linguagem de servidor (Java, Python ou Node)", "SQL e modelagem de dados", "o que é uma API REST"],
        neighbor: "CLOUD",
        neighborNote:
          "Back-end e Cloud se encostam bastante: quem escreve o sistema costuma acabar cuidando de onde ele roda. Se as duas te chamam, isso é vantagem, não indecisão.",
      },
      {
        id: "mobile",
        name: "Mobile",
        tagline: "Aplicativo de celular, com as restrições e as manhas que só ele tem.",
        doing: [
          "construir app pra Android ou iOS",
          "lidar com tela pequena, bateria e conexão instável",
          "publicar e atualizar nas lojas",
        ],
        trying: ["Kotlin ou Swift", "React Native ou Flutter", "publicar um app simples de verdade"],
      },
    ],
    questions: [
      {
        id: "dev1",
        text: "Você gosta de ver o resultado do seu trabalho aparecendo na tela na hora.",
        weights: { front: 3, mobile: 2, back: -1 },
      },
      {
        id: "dev2",
        text: "Te incomoda quando um site fica torto ou difícil de usar no celular.",
        weights: { front: 3, mobile: 3 },
      },
      {
        id: "dev3",
        text: "Você tem curiosidade sobre como os dados ficam guardados e organizados por trás.",
        weights: { back: 3, front: -1 },
      },
      {
        id: "dev4",
        text: "Quebrar a cabeça pra deixar um sistema rápido mesmo com muita gente usando ao mesmo tempo parece interessante.",
        weights: { back: 3, mobile: 1 },
      },
      {
        id: "dev5",
        text: "Você pensa primeiro em como a coisa funcionaria no celular, e só depois no computador.",
        weights: { mobile: 3, front: 1 },
      },
      {
        id: "dev6",
        text: "Conectar sistemas diferentes pra eles conversarem entre si parece um bom problema.",
        weights: { back: 3, mobile: 1, front: -1 },
      },
    ],
  },

  DATA: {
    area: "DATA",
    intro: "Dados tem dois lados bem diferentes: quem responde perguntas e quem constrói o encanamento.",
    branches: [
      {
        id: "analise",
        name: "Análise & BI",
        tagline: "Responder perguntas do negócio com dado na mão.",
        doing: [
          "investigar por que um número mudou",
          "montar painel que o time consulta sozinho",
          "apresentar o que o dado está dizendo",
        ],
        trying: ["SQL", "Power BI ou Looker Studio", "estatística descritiva"],
        neighbor: "PROD",
        neighborNote:
          "Análise e Produto se sobrepõem bastante: boa parte do trabalho de produto é justamente ler dado e decidir. Se as duas apareceram, o caminho de analista → produto é dos mais trilhados.",
      },
      {
        id: "engenharia",
        name: "Engenharia de Dados",
        tagline: "Construir o encanamento que faz o dado chegar limpo e no horário.",
        doing: [
          "montar pipelines que rodam sozinhos todo dia",
          "juntar dados de fontes que não se falam",
          "garantir que o dado chegou certo e completo",
        ],
        trying: ["Python", "SQL avançado", "conceitos de ETL e orquestração (Airflow)"],
        neighbor: "CLOUD",
        neighborNote:
          "Engenharia de dados é meio engenharia de software, meio infraestrutura. Se Cloud também apareceu, faz total sentido — são vizinhas de porta.",
      },
    ],
    questions: [
      {
        id: "dat1",
        text: "Você gosta mais de responder uma pergunta com o dado do que de fazer o dado chegar até ali.",
        weights: { analise: 3, engenharia: -2 },
      },
      {
        id: "dat2",
        text: "Montar algo que roda sozinho toda madrugada, sem ninguém apertar botão, parece satisfatório.",
        weights: { engenharia: 3, analise: -1 },
      },
      {
        id: "dat3",
        text: "Você se sentiria bem apresentando um resultado pra pessoas que não entendem de dado.",
        weights: { analise: 3, engenharia: -1 },
      },
      {
        id: "dat4",
        text: "Dado bagunçado e incompleto te dá vontade de arrumar a origem, não de contornar.",
        weights: { engenharia: 3, analise: 1 },
      },
      {
        id: "dat5",
        text: "Você curtiria entender a fundo o negócio pra saber qual pergunta vale a pena fazer.",
        weights: { analise: 3, engenharia: -1 },
      },
      {
        id: "dat6",
        text: "Escrever código pra transformar e mover grandes volumes de informação parece interessante.",
        weights: { engenharia: 3, analise: -1 },
      },
    ],
  },

  AI: {
    area: "AI",
    intro: "IA vai de pesquisa a produto. Seis perguntas pra ver onde você entra.",
    branches: [
      {
        id: "ds",
        name: "Data Science",
        tagline: "Investigar, testar hipótese e descobrir o que os dados sustentam.",
        doing: [
          "formular e testar hipóteses",
          "escolher e avaliar modelos",
          "explicar o achado pra quem vai decidir",
        ],
        trying: ["Python (pandas, scikit-learn)", "estatística e probabilidade", "um projeto com dado público"],
      },
      {
        id: "mle",
        name: "ML Engineering",
        tagline: "Fazer o modelo sair do notebook e aguentar o mundo real.",
        doing: [
          "colocar modelo em produção",
          "monitorar quando ele começa a errar",
          "cuidar do pipeline de treino e re-treino",
        ],
        trying: ["Python e Docker", "conceitos de MLOps", "servir um modelo simples por API"],
        neighbor: "CLOUD",
        neighborNote:
          "ML Engineering é metade engenharia de software, metade infraestrutura. Se Cloud apareceu junto, é o combo natural.",
      },
      {
        id: "aplicada",
        name: "IA Aplicada",
        tagline: "Usar IA pronta pra resolver problema de produto, sem treinar do zero.",
        doing: [
          "montar soluções com APIs de IA existentes",
          "desenhar como a IA entra na experiência",
          "avaliar se o resultado é bom o suficiente pro uso",
        ],
        trying: ["APIs de modelos prontos", "engenharia de prompt", "montar um protótipo de ponta a ponta"],
        neighbor: "PROD",
        neighborNote:
          "IA aplicada é muito mais decisão de produto do que matemática. Se Produto também apareceu, esse é provavelmente o seu caminho dentro de IA.",
      },
    ],
    questions: [
      {
        id: "ai1",
        text: "Entender a matemática por trás de por que um modelo funciona te interessa de verdade.",
        weights: { ds: 3, aplicada: -2 },
      },
      {
        id: "ai2",
        text: "Você prefere montar algo que funcione logo com ferramenta pronta a construir do zero.",
        weights: { aplicada: 3, ds: -2 },
      },
      {
        id: "ai3",
        text: "Cuidar pra que um sistema continue funcionando bem depois de no ar parece parte importante do trabalho.",
        weights: { mle: 3, ds: -1 },
      },
      {
        id: "ai4",
        text: "Você curtiria passar tempo investigando dados antes de decidir qualquer coisa.",
        weights: { ds: 3, aplicada: -1 },
      },
      {
        id: "ai5",
        text: "Pensar em como a IA vai aparecer pra quem usa o produto te interessa mais que o modelo em si.",
        weights: { aplicada: 3, ds: -1 },
      },
      {
        id: "ai6",
        text: "Escrever código robusto, testado e que outros vão manter faz parte do que você quer fazer.",
        weights: { mle: 3, ds: -1 },
      },
    ],
  },

  CLOUD: {
    area: "CLOUD",
    intro: "Cloud, DevOps e SRE se confundem bastante. Seis perguntas pra separar.",
    branches: [
      {
        id: "devops",
        name: "DevOps & Plataforma",
        tagline: "Fazer o time entregar mais rápido e com menos atrito.",
        doing: [
          "montar esteiras de build e deploy",
          "automatizar o que o time faz na mão",
          "criar ferramenta interna que os devs usam",
        ],
        trying: ["Linux e Git a fundo", "Docker", "montar um pipeline de CI/CD do zero"],
      },
      {
        id: "sre",
        name: "SRE & Confiabilidade",
        tagline: "Manter no ar, e saber antes de todo mundo quando não está.",
        doing: [
          "investigar incidente e achar a causa",
          "montar alerta e painel de saúde",
          "definir quanto de instabilidade é aceitável",
        ],
        trying: ["redes e sistemas operacionais", "observabilidade (Prometheus, Grafana)", "o livro de SRE do Google"],
        neighbor: "SUP",
        neighborNote:
          "SRE e Suporte compartilham o mesmo instinto de destravar o que quebrou. A diferença é o horizonte: suporte resolve o caso, SRE resolve a causa pra não repetir.",
      },
      {
        id: "arq",
        name: "Arquitetura de Nuvem",
        tagline: "Desenhar como os pedaços se encaixam, e quanto isso vai custar.",
        doing: [
          "escolher os serviços de nuvem certos pro caso",
          "desenhar a estrutura antes de construir",
          "equilibrar custo, segurança e desempenho",
        ],
        trying: ["o nível gratuito de uma nuvem (AWS, Azure ou GCP)", "uma certificação de fundamentos", "infraestrutura como código (Terraform)"],
      },
    ],
    questions: [
      {
        id: "clo1",
        text: "Receber um alerta de madrugada e caçar a causa até achar parece o tipo de desafio que te pega.",
        weights: { sre: 3, arq: -1 },
      },
      {
        id: "clo2",
        text: "Você gosta de construir ferramenta que facilita a vida de outras pessoas do time.",
        weights: { devops: 3, arq: -1 },
      },
      {
        id: "clo3",
        text: "Desenhar a estrutura toda no papel antes de construir qualquer coisa combina com você.",
        weights: { arq: 3, sre: -1 },
      },
      {
        id: "clo4",
        text: "Se importar com quanto a infraestrutura está custando por mês faz parte do trabalho, na sua visão.",
        weights: { arq: 3, devops: 1 },
      },
      {
        id: "clo5",
        text: "Medir e acompanhar a saúde de um sistema em tempo real te interessa.",
        weights: { sre: 3, devops: 1 },
      },
      {
        id: "clo6",
        text: "Tirar passo manual do caminho entre o código pronto e o código no ar parece um bom trabalho.",
        weights: { devops: 3, arq: -1 },
      },
    ],
  },

  SUP: {
    area: "SUP",
    intro: "Suporte e infraestrutura têm caminhos bem diferentes. Seis perguntas.",
    branches: [
      {
        id: "desk",
        name: "Service Desk",
        tagline: "A porta de entrada: destravar quem está parado, rápido.",
        doing: [
          "atender e resolver chamado",
          "traduzir problema técnico pra quem não é técnico",
          "registrar solução pra próxima vez ser rápida",
        ],
        trying: ["Windows e Office no detalhe", "fundamentos de ITIL", "praticar em um help desk voluntário"],
      },
      {
        id: "infra",
        name: "Infraestrutura & SysAdmin",
        tagline: "Cuidar das máquinas, redes e acessos que sustentam tudo.",
        doing: [
          "administrar servidores e redes",
          "gerenciar acesso e permissão",
          "planejar backup e recuperação",
        ],
        trying: ["Linux na linha de comando", "redes (TCP/IP, DNS, VPN)", "virtualização"],
        neighbor: "CLOUD",
        neighborNote:
          "Infra local e nuvem são o mesmo conhecimento em ambientes diferentes. Se Cloud apareceu, esse é o caminho mais curto entre as duas.",
      },
      {
        id: "itops",
        name: "IT Operations",
        tagline: "Organizar como o suporte funciona, não só executar.",
        doing: [
          "desenhar processo de atendimento",
          "acompanhar indicador de serviço",
          "coordenar mudanças sem derrubar nada",
        ],
        trying: ["ITIL de verdade, não só a sigla", "ferramenta de service management", "noções de gestão de serviço"],
      },
    ],
    questions: [
      {
        id: "sup1",
        text: "Ajudar alguém travado e ver a pessoa destravar na hora te dá satisfação.",
        weights: { desk: 3, itops: -1 },
      },
      {
        id: "sup2",
        text: "Mexer com servidor, rede e configuração de máquina parece mais interessante que atender pessoa.",
        weights: { infra: 3, desk: -2 },
      },
      {
        id: "sup3",
        text: "Você gosta de organizar como o trabalho é feito, não só de fazer o trabalho.",
        weights: { itops: 3, desk: -1 },
      },
      {
        id: "sup4",
        text: "Explicar coisa técnica com paciência, quantas vezes for preciso, combina com você.",
        weights: { desk: 3, infra: -1 },
      },
      {
        id: "sup5",
        text: "Pensar em backup, acesso e o que fazer se tudo cair te parece essencial.",
        weights: { infra: 3, itops: 1 },
      },
      {
        id: "sup6",
        text: "Acompanhar número de chamado, tempo de resposta e satisfação te interessa.",
        weights: { itops: 3, infra: -1 },
      },
    ],
  },

  SEC: {
    area: "SEC",
    intro: "Segurança tem três mundos bem distintos. Seis perguntas pra ver o seu.",
    branches: [
      {
        id: "red",
        name: "Ofensiva (Red Team)",
        tagline: "Atacar com autorização, pra achar a falha antes de quem não tem.",
        doing: [
          "testar sistemas procurando brecha",
          "simular ataque real e documentar o caminho",
          "mostrar o impacto de um jeito que convença",
        ],
        trying: ["redes a fundo", "OWASP Top 10", "laboratórios de CTF (TryHackMe, Hack The Box)"],
      },
      {
        id: "blue",
        name: "Defensiva (Blue Team)",
        tagline: "Vigiar, detectar e responder quando alguma coisa foge do normal.",
        doing: [
          "monitorar e investigar comportamento suspeito",
          "responder a incidente",
          "afinar as regras de detecção",
        ],
        trying: ["fundamentos de redes", "análise de log", "conceitos de SIEM"],
        neighbor: "CLOUD",
        neighborNote:
          "Defesa moderna acontece muito na nuvem. Se Cloud apareceu junto, segurança em ambiente cloud é um nicho concorridíssimo e você está bem posicionada.",
      },
      {
        id: "grc",
        name: "GRC & Governança",
        tagline: "Definir a regra, checar se está sendo seguida e responder à auditoria.",
        doing: [
          "escrever política de segurança",
          "avaliar risco e priorizar o que tratar",
          "preparar a empresa pra LGPD e auditoria",
        ],
        trying: ["LGPD", "ISO 27001", "frameworks de análise de risco"],
        neighbor: "BA",
        neighborNote:
          "GRC é bem mais análise, processo e escrita do que técnica. Se Business Analysis também apareceu, esse é um encaixe muito natural.",
      },
    ],
    questions: [
      {
        id: "sec1",
        text: "Pensar como alguém burlaria uma proteção é o tipo de raciocínio que te diverte.",
        weights: { red: 3, grc: -1 },
      },
      {
        id: "sec2",
        text: "Ficar de olho e perceber o que está fora do padrão parece um bom trabalho.",
        weights: { blue: 3, red: 1 },
      },
      {
        id: "sec3",
        text: "Escrever regra e política que a empresa inteira vai seguir combina com você.",
        weights: { grc: 3, red: -2 },
      },
      {
        id: "sec4",
        text: "Você curtiria quebrar coisas de propósito, com autorização, pra provar que dá.",
        weights: { red: 3, grc: -2 },
      },
      {
        id: "sec5",
        text: "Estar de plantão quando acontece um incidente e coordenar a resposta te parece importante.",
        weights: { blue: 3, grc: 1 },
      },
      {
        id: "sec6",
        text: "Traduzir risco técnico pra linguagem de negócio e convencer a diretoria te interessa.",
        weights: { grc: 3, blue: 1, red: -1 },
      },
    ],
  },

  QA: {
    area: "QA",
    intro: "Qualidade não é só clicar e ver se quebra. Seis perguntas pra ver seu lado.",
    branches: [
      {
        id: "exploratorio",
        name: "QA Exploratório",
        tagline: "Usar o sistema de jeitos que ninguém previu e achar o que escapou.",
        doing: [
          "explorar o produto procurando comportamento estranho",
          "escrever cenário de teste",
          "reportar bug de um jeito que dê pra reproduzir",
        ],
        trying: ["técnicas de teste exploratório", "escrita de caso de teste", "certificação CTFL"],
      },
      {
        id: "automacao",
        name: "Automação de Testes",
        tagline: "Escrever código que testa o produto sozinho, toda vez.",
        doing: [
          "programar testes que rodam a cada mudança",
          "manter a suíte confiável e rápida",
          "integrar teste na esteira de entrega",
        ],
        trying: ["lógica de programação", "Cypress ou Playwright", "testar API com Postman"],
        neighbor: "DEV",
        neighborNote:
          "Automação é programação de verdade. Se Desenvolvimento também apareceu, esse é um dos caminhos mais comuns de entrar em TI escrevendo código.",
      },
      {
        id: "performance",
        name: "Performance & Carga",
        tagline: "Descobrir a que ponto o sistema aguenta antes de quebrar.",
        doing: [
          "simular muita gente usando ao mesmo tempo",
          "achar o gargalo que derruba tudo",
          "medir e comparar antes e depois",
        ],
        trying: ["k6 ou JMeter", "noções de infraestrutura", "leitura de métrica de sistema"],
        neighbor: "CLOUD",
        neighborNote:
          "Teste de performance encosta direto em infraestrutura. Se Cloud apareceu, as duas se reforçam bastante.",
      },
    ],
    questions: [
      {
        id: "qa1",
        text: "Escrever código pra automatizar o que você faria na mão te interessa.",
        weights: { automacao: 3, exploratorio: -2 },
      },
      {
        id: "qa2",
        text: "Usar o produto livremente, sem roteiro, caçando o que está estranho combina com você.",
        weights: { exploratorio: 3, automacao: -1 },
      },
      {
        id: "qa3",
        text: "Descobrir quantos usuários simultâneos o sistema aguanta parece uma boa pergunta.",
        weights: { performance: 3, exploratorio: -1 },
      },
      {
        id: "qa4",
        text: "Você repara em detalhe de comportamento que a maioria das pessoas passa batido.",
        weights: { exploratorio: 3, performance: 1 },
      },
      {
        id: "qa5",
        text: "Manter uma suíte de testes saudável e confiável ao longo do tempo te parece trabalho interessante.",
        weights: { automacao: 3, exploratorio: -1 },
      },
      {
        id: "qa6",
        text: "Ler gráfico de tempo de resposta e uso de memória pra achar o gargalo te atrai.",
        weights: { performance: 3, exploratorio: -1 },
      },
    ],
  },

  UX: {
    area: "UX",
    intro: "Design de produto tem lados bem diferentes. Seis perguntas pra achar o seu.",
    branches: [
      {
        id: "research",
        name: "UX Research",
        tagline: "Descobrir o que as pessoas realmente precisam, com método.",
        doing: [
          "entrevistar quem usa e achar o padrão",
          "testar protótipo com gente de verdade",
          "transformar o que ouviu em decisão pro time",
        ],
        trying: ["métodos de entrevista", "teste de usabilidade", "fazer 5 entrevistas sobre um app que você usa"],
        neighbor: "DATA",
        neighborNote:
          "Research tem um lado quantitativo forte. Se Dados também apareceu, pesquisa mista (número + conversa) é um nicho raro e valorizado.",
      },
      {
        id: "ui",
        name: "UI & Visual",
        tagline: "A parte visível: tipografia, cor, espaçamento, sistema de design.",
        doing: [
          "desenhar tela e componente",
          "manter um sistema de design consistente",
          "cuidar de contraste, legibilidade e acessibilidade",
        ],
        trying: ["Figma a fundo", "fundamentos de tipografia e cor", "recriar a interface de um app que te irrita"],
        neighbor: "DEV",
        neighborNote:
          "UI e front-end são vizinhos de porta — e essa é a fronteira que mais confunde gente. UI decide como a tela deve ser, front-end faz ela existir. Se Desenvolvimento apareceu junto, você não precisa escolher agora.",
      },
      {
        id: "produto",
        name: "Product Design",
        tagline: "Do problema à solução inteira, passando por pesquisa, fluxo e tela.",
        doing: [
          "entender o problema antes de desenhar",
          "desenhar o fluxo todo, não só a tela",
          "defender a experiência nas decisões do time",
        ],
        trying: ["Figma", "fundamentos de discovery", "redesenhar um fluxo inteiro, do começo ao fim"],
        neighbor: "PROD",
        neighborNote:
          "Product Design e Product Management se sobrepõem muito. Se Produto apareceu junto, é sinal de que você gosta do problema tanto quanto da solução.",
      },
    ],
    questions: [
      {
        id: "ux1",
        text: "Conversar com usuário e escutar por uma hora pra achar o padrão te parece tempo bem gasto.",
        weights: { research: 3, ui: -1 },
      },
      {
        id: "ux2",
        text: "Você repara em espaçamento, alinhamento e escolha de fonte sem querer.",
        weights: { ui: 3, research: -1 },
      },
      {
        id: "ux3",
        text: "Pensar em qual problema vale a pena resolver te interessa tanto quanto desenhar a solução.",
        weights: { produto: 3, ui: -1 },
      },
      {
        id: "ux4",
        text: "Montar e manter um sistema de componentes consistente parece satisfatório.",
        weights: { ui: 3, produto: 1 },
      },
      {
        id: "ux5",
        text: "Você se sentiria bem defendendo uma decisão com base em evidência de pesquisa.",
        weights: { research: 3, produto: 2 },
      },
      {
        id: "ux6",
        text: "Desenhar o fluxo inteiro te interessa mais do que caprichar em uma tela só.",
        weights: { produto: 3, ui: -2 },
      },
    ],
  },

  PROD: {
    area: "PROD",
    intro: "Produto é um cargo só no nome. Seis perguntas pra ver qual parte é a sua.",
    branches: [
      {
        id: "discovery",
        name: "Discovery & Estratégia",
        tagline: "Descobrir qual problema vale a pena resolver, antes de construir.",
        doing: [
          "investigar problema antes de propor solução",
          "decidir o que o time NÃO vai fazer",
          "defender a direção com evidência",
        ],
        trying: ["fundamentos de discovery", "entrevista com usuário", "escrever a proposta de uma melhoria real"],
      },
      {
        id: "delivery",
        name: "Delivery & Execução",
        tagline: "Transformar decisão em entrega, sem o time travar.",
        doing: [
          "detalhar o que precisa ser construído",
          "destravar dúvida do time no dia a dia",
          "garantir que o que foi combinado saiu",
        ],
        trying: ["escrita de user story", "Scrum e Kanban", "uma ferramenta de backlog (Jira)"],
        neighbor: "PM",
        neighborNote:
          "Delivery e Gestão de Projetos se confundem muito, e em várias empresas são a mesma pessoa. Se Gestão de Projetos apareceu junto, faz total sentido.",
      },
      {
        id: "ops",
        name: "Product Ops & Dados",
        tagline: "Instrumentar, medir e fazer o produto ser gerido por número.",
        doing: [
          "definir e acompanhar as métricas do produto",
          "montar o processo que o time de produto segue",
          "conectar dado de uso a decisão",
        ],
        trying: ["SQL básico", "métricas de produto (ativação, retenção)", "uma ferramenta de analytics"],
        neighbor: "DATA",
        neighborNote:
          "Product Ops é muito análise de dados aplicada a produto. Se Dados apareceu junto, essa é a ponte entre os dois.",
      },
    ],
    questions: [
      {
        id: "pro1",
        text: "Investigar se o problema é real antes de qualquer coisa te parece a parte mais importante.",
        weights: { discovery: 3, delivery: -1 },
      },
      {
        id: "pro2",
        text: "Estar perto do time todo dia, destravando dúvida, combina com você.",
        weights: { delivery: 3, discovery: -1 },
      },
      {
        id: "pro3",
        text: "Você gosta de acompanhar número e medir se o que saiu funcionou.",
        weights: { ops: 3, discovery: 1 },
      },
      {
        id: "pro4",
        text: "Dizer não pra uma ideia boa porque não é a hora te parece parte do trabalho.",
        weights: { discovery: 3, delivery: 1 },
      },
      {
        id: "pro5",
        text: "Detalhar bem o que precisa ser feito, pra não sobrar ambiguidade, combina com você.",
        weights: { delivery: 3, discovery: -1 },
      },
      {
        id: "pro6",
        text: "Montar o processo e as ferramentas que o time de produto usa te interessa.",
        weights: { ops: 3, delivery: 1 },
      },
    ],
  },

  BA: {
    area: "BA",
    intro: "Análise tem três focos diferentes. Seis perguntas pra separar.",
    branches: [
      {
        id: "negocio",
        name: "Analista de Negócio",
        tagline: "Entender o que a área precisa e traduzir em requisito.",
        doing: [
          "entrevistar quem conhece a operação",
          "escrever requisito que o time consiga usar",
          "validar se o entregue resolve mesmo",
        ],
        trying: ["escrita de requisito e user story", "técnicas de elicitação", "BPMN"],
      },
      {
        id: "sistemas",
        name: "Analista de Sistemas",
        tagline: "A ponte técnica: entender o sistema por dentro e especificar a mudança.",
        doing: [
          "mapear como o sistema funciona hoje",
          "especificar integração entre sistemas",
          "investigar dado direto na fonte",
        ],
        trying: ["SQL", "o que é uma API", "modelagem de dados e UML"],
        neighbor: "DEV",
        neighborNote:
          "Analista de sistemas encosta bastante em desenvolvimento. Se Desenvolvimento apareceu junto, é um caminho de entrada muito usado.",
      },
      {
        id: "processos",
        name: "Analista de Processos",
        tagline: "Enxergar o processo inteiro e achar onde ele trava.",
        doing: [
          "desenhar o processo como é e como poderia ser",
          "achar o gargalo e propor a mudança",
          "medir o antes e o depois",
        ],
        trying: ["BPMN", "Lean e melhoria contínua", "mapear um processo que você conhece"],
      },
    ],
    questions: [
      {
        id: "ba1",
        text: "Conversar com a área de negócio até entender de verdade a dor combina com você.",
        weights: { negocio: 3, sistemas: -1 },
      },
      {
        id: "ba2",
        text: "Entender como o sistema funciona por dentro te interessa tanto quanto o que ele deveria fazer.",
        weights: { sistemas: 3, processos: -1 },
      },
      {
        id: "ba3",
        text: "Desenhar o fluxo inteiro de um processo e achar onde ele trava parece satisfatório.",
        weights: { processos: 3, sistemas: -1 },
      },
      {
        id: "ba4",
        text: "Você curtiria consultar o banco de dados por conta própria pra tirar uma dúvida.",
        weights: { sistemas: 3, negocio: -1 },
      },
      {
        id: "ba5",
        text: "Escrever de forma clara o que precisa ser feito, sem deixar brecha, combina com você.",
        weights: { negocio: 3, sistemas: 1 },
      },
      {
        id: "ba6",
        text: "Medir quanto tempo e dinheiro uma mudança de processo economizou te interessa.",
        weights: { processos: 3, negocio: 1 },
      },
    ],
  },

  PM: {
    area: "PM",
    intro: "Gerir projeto tem escolas bem diferentes. Seis perguntas.",
    branches: [
      {
        id: "agil",
        name: "Ágil & Scrum Master",
        tagline: "Cuidar do time e do processo pra ele entregar melhor.",
        doing: [
          "facilitar as cerimônias do time",
          "remover impedimento do caminho",
          "cuidar da saúde e do ritmo do time",
        ],
        trying: ["Scrum e Kanban a sério", "facilitação de reunião", "certificação de Scrum Master"],
      },
      {
        id: "tradicional",
        name: "Gestão de Projetos",
        tagline: "Prazo, escopo, orçamento e risco sob controle.",
        doing: [
          "montar e acompanhar cronograma",
          "controlar escopo e orçamento",
          "antecipar risco antes de virar crise",
        ],
        trying: ["fundamentos do PMBOK", "MS Project ou equivalente", "gerir um projeto real, mesmo pequeno"],
      },
      {
        id: "pmo",
        name: "PMO & Portfólio",
        tagline: "Enxergar todos os projetos de uma vez e decidir onde alocar.",
        doing: [
          "acompanhar o portfólio inteiro",
          "padronizar como os projetos são tocados",
          "reportar status pra liderança",
        ],
        trying: ["governança de projetos", "construção de indicador e dashboard", "noções de gestão de portfólio"],
        neighbor: "DATA",
        neighborNote:
          "PMO vive de indicador e relatório. Se Dados apareceu junto, você tem um diferencial forte aqui.",
      },
    ],
    questions: [
      {
        id: "pm1",
        text: "Cuidar do clima e do ritmo do time te parece tão importante quanto a entrega.",
        weights: { agil: 3, tradicional: -1 },
      },
      {
        id: "pm2",
        text: "Montar cronograma detalhado com dependência e marco combina com você.",
        weights: { tradicional: 3, agil: -2 },
      },
      {
        id: "pm3",
        text: "Enxergar vários projetos ao mesmo tempo e comparar te interessa mais que mergulhar em um.",
        weights: { pmo: 3, agil: -1 },
      },
      {
        id: "pm4",
        text: "Facilitar reunião pra que o time chegue junto numa decisão combina com você.",
        weights: { agil: 3, pmo: -1 },
      },
      {
        id: "pm5",
        text: "Controlar orçamento e justificar desvio te parece parte natural do trabalho.",
        weights: { tradicional: 3, pmo: 2 },
      },
      {
        id: "pm6",
        text: "Padronizar como todo mundo trabalha, pra ficar comparável, te interessa.",
        weights: { pmo: 3, agil: -2 },
      },
    ],
  },

  GROWTH: {
    area: "GROWTH",
    intro: "Growth junta dado, tecnologia e conteúdo. Seis perguntas pra ver seu lado.",
    branches: [
      {
        id: "analytics",
        name: "Growth Analytics",
        tagline: "Achar no dado onde o crescimento trava.",
        doing: [
          "montar e ler funil de conversão",
          "desenhar e medir teste A/B",
          "achar onde as pessoas desistem",
        ],
        trying: ["SQL", "Google Analytics", "estatística de teste A/B"],
        neighbor: "DATA",
        neighborNote:
          "Growth analytics é análise de dados com foco em crescimento. Se Dados apareceu junto, é praticamente a mesma caixa de ferramentas.",
      },
      {
        id: "martech",
        name: "MarTech & Automação",
        tagline: "Construir a máquina: integração, automação, jornada.",
        doing: [
          "automatizar jornada e disparo",
          "integrar ferramentas que não se falam",
          "manter o rastreamento funcionando",
        ],
        trying: ["uma ferramenta de automação (HubSpot, RD Station)", "noções de API e webhook", "Google Tag Manager"],
      },
      {
        id: "conteudo",
        name: "SEO & Conteúdo",
        tagline: "Fazer as pessoas chegarem sozinhas, sem pagar por isso.",
        doing: [
          "descobrir o que as pessoas procuram",
          "produzir conteúdo que ranqueia",
          "melhorar o site pra busca entender",
        ],
        trying: ["fundamentos de SEO", "pesquisa de palavra-chave", "escrever e publicar por 3 meses seguidos"],
        neighbor: "DOCS",
        neighborNote:
          "SEO e conteúdo compartilham a base com escrita técnica. Se Documentação apareceu junto, você tem os dois caminhos abertos com o mesmo repertório.",
      },
    ],
    questions: [
      {
        id: "gro1",
        text: "Ler funil e achar exatamente onde as pessoas desistem te interessa.",
        weights: { analytics: 3, conteudo: -1 },
      },
      {
        id: "gro2",
        text: "Conectar ferramentas pra elas trocarem informação sozinhas parece um bom desafio.",
        weights: { martech: 3, conteudo: -1 },
      },
      {
        id: "gro3",
        text: "Escrever e produzir conteúdo de forma constante combina com você.",
        weights: { conteudo: 3, martech: -1 },
      },
      {
        id: "gro4",
        text: "Desenhar experimento e esperar dado suficiente antes de concluir te parece o certo.",
        weights: { analytics: 3, martech: 1 },
      },
      {
        id: "gro5",
        text: "Mexer em configuração técnica de ferramenta de marketing não te assusta.",
        weights: { martech: 3, analytics: 1 },
      },
      {
        id: "gro6",
        text: "Entender o que as pessoas digitam no buscador e por quê te interessa.",
        weights: { conteudo: 3, analytics: 1 },
      },
    ],
  },

  DOCS: {
    area: "DOCS",
    intro: "Comunicar tecnologia tem formatos bem diferentes. Seis perguntas.",
    branches: [
      {
        id: "writer",
        name: "Technical Writer",
        tagline: "Escrever a documentação que as pessoas realmente conseguem usar.",
        doing: [
          "escrever guia, tutorial e referência",
          "estruturar a documentação pra achar rápido",
          "manter a doc viva conforme o produto muda",
        ],
        trying: ["Markdown e Git", "documentação de API", "escrever um tutorial do zero"],
      },
      {
        id: "devrel",
        name: "Developer Advocate",
        tagline: "Ser a ponte pública entre o produto e quem constrói com ele.",
        doing: [
          "falar em evento e gravar conteúdo",
          "criar exemplo e projeto de demonstração",
          "trazer o retorno da comunidade pro time",
        ],
        trying: ["falar em público", "construir demo de verdade", "produzir conteúdo técnico com constância"],
        neighbor: "GROWTH",
        neighborNote:
          "DevRel é bem próximo de growth: alcance, comunidade e métrica fazem parte. Se Growth apareceu junto, é o mesmo músculo.",
      },
      {
        id: "conhecimento",
        name: "Gestão de Conhecimento",
        tagline: "Fazer o que a empresa sabe parar de morar só na cabeça das pessoas.",
        doing: [
          "organizar a base interna de conhecimento",
          "criar padrão de registro que o time siga",
          "reduzir a dependência de perguntar pra alguém",
        ],
        trying: ["arquitetura de informação", "ferramenta de base de conhecimento (Notion, Confluence)", "taxonomia e organização"],
        neighbor: "BA",
        neighborNote:
          "Gestão de conhecimento é muito processo e organização. Se Business Analysis apareceu junto, os dois se reforçam.",
      },
    ],
    questions: [
      {
        id: "doc1",
        text: "Escrever com calma até a explicação ficar realmente clara combina com você.",
        weights: { writer: 3, devrel: -1 },
      },
      {
        id: "doc2",
        text: "Falar em público, gravar vídeo ou subir num palco te parece empolgante.",
        weights: { devrel: 3, writer: -2 },
      },
      {
        id: "doc3",
        text: "Organizar informação pra outra pessoa achar sozinha te dá satisfação.",
        weights: { conhecimento: 3, writer: 1 },
      },
      {
        id: "doc4",
        text: "Construir exemplo funcionando pra mostrar como se usa combina com você.",
        weights: { devrel: 3, writer: 1 },
      },
      {
        id: "doc5",
        text: "Cuidar pra que o registro fique sempre atualizado te parece trabalho importante.",
        weights: { conhecimento: 3, writer: 2 },
      },
      {
        id: "doc6",
        text: "Estar em contato com comunidade e responder gente o dia todo te atrai.",
        weights: { devrel: 3, conhecimento: -1 },
      },
    ],
  },
};

export const BRANCH_AREAS = Object.keys(BRANCHES) as AreaId[];
