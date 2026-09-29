# Quiz de Descoberta de Áreas de TI — Arquitetura

`career.java` — documento de definição. Nenhuma linha de código de produto foi escrita ainda.

---

## 0. Decisões de partida

| Decisão | Escolha | Por quê |
|---|---|---|
| Nº de perguntas | **35 Likert + 4 de contexto** | ~4–6 min. Abaixo de 30 a matriz fica instável; acima de 40 a taxa de abandono no mobile sobe. |
| Áreas pontuadas | **13** (todas as da spec) | Nenhuma é descartada no cálculo; o corte acontece só na apresentação. |
| Áreas exibidas | **até 3** | Regra 11. |
| Escala | 5 pontos, discos de preenchimento | Sem emoji de rosto: o ícone é um disco que enche conforme a pessoa gosta mais (cheio → 3/4 → metade → 1/4 → vazio). Lê como intensidade, não como emoção, e não depende de como cada sistema desenha o emoji. |
| Persistência | `localStorage` | Não perder progresso se fechar a aba no celular. |
| Backend | **nenhum** | App 100% client-side. Sem coleta de dado pessoal, sem LGPD a resolver. |

---

## 1. As 13 áreas e suas famílias

As famílias existem só para uma regra: **no máximo 2 áreas da mesma família entram no top 3**. Isso evita o resultado redundante "Dados, BI e Data Science" — que na prática é uma área só.

| Código | Área | Família |
|---|---|---|
| `DEV` | Desenvolvimento de Software (front, back, full stack, mobile) | Construir |
| `DATA` | Dados & BI (analista, BI, engenharia de dados) | Dados |
| `AI` | IA & Machine Learning | Dados |
| `CLOUD` | Cloud, DevOps & SRE | Operar |
| `SUP` | Suporte, Infra & IT Operations | Operar |
| `SEC` | Cibersegurança | Verificar |
| `QA` | Qualidade & Testes | Verificar |
| `UX` | UX/UI & Design de Produto | Experiência |
| `PROD` | Produto / Product Management | Direcionar |
| `BA` | Business Analysis / Análise de Sistemas | Direcionar |
| `GROWTH` | Growth & Marketing Technology | Direcionar |
| `PM` | Gestão de Projetos | Organizar |
| `DOCS` | Technical Writing, Documentação & DevRel | Organizar |

---

## 2. Lista final de perguntas

Notação de peso: `ÁREA:n`. Pesos **negativos** aparecem só nas 3 perguntas marcadas **[trade-off]** — ali, "não gosto" vira sinal *positivo* para a área (quem não gosta de ambiguidade tende a se dar melhor em QA/PM, e isso é informação, não defeito).

O **rótulo** é o trecho que aparece no resultado explicando por que a área foi indicada: *"isso apareceu porque combina muito com você: **investigar a causa antes de corrigir**"*.

### Bloco interno: resolver problemas

| # | Pergunta | Objetivo | Áreas impactadas | Rótulo |
|---|---|---|---|---|
| 01 | Você gosta de quebrar um problema grande em partes menores até descobrir como resolver? | Decomposição / pensamento estruturado | DEV:3 DATA:2 BA:2 QA:1 PM:1 AI:1 | quebrar problemas grandes em partes |
| 02 | Você gosta de investigar a causa de um problema antes de sair corrigindo? | Investigação vs. ação imediata | SEC:3 QA:3 CLOUD:2 SUP:2 DEV:2 DATA:1 | investigar a causa antes de corrigir |
| 03 | Você gosta de testar várias possibilidades até descobrir o que funciona? | Experimentação | QA:3 GROWTH:2 DEV:2 AI:2 UX:1 | testar até achar o que funciona |
| 04 | Você gosta de achar padrões em informações que parecem não ter ligação nenhuma? | Reconhecimento de padrão | DATA:3 AI:3 SEC:2 GROWTH:1 BA:1 | achar padrões em informações soltas |
| 33 | Você gosta de criar uma solução nova do zero, mesmo sem ter um modelo pronto pra seguir? | Criação vs. otimização | DEV:2 UX:2 AI:2 PROD:2 GROWTH:1 | criar coisas do zero |

### Bloco interno: forma de trabalhar

| # | Pergunta | Objetivo | Áreas impactadas | Rótulo |
|---|---|---|---|---|
| 05 | **[trade-off]** Você se sente bem trabalhando quando as informações ainda estão incompletas e nada foi decidido? | Tolerância à ambiguidade | PROD:3 UX:2 AI:2 GROWTH:2 DEV:1 **PM:−1 QA:−1 SUP:−1** | lidar bem com o que ainda não está definido |
| 06 | **[trade-off]** Você prefere trabalhar com processos e critérios bem definidos, em vez de descobrir o caminho no meio do percurso? | Necessidade de estrutura | QA:3 PM:3 SUP:2 BA:2 SEC:1 **PROD:−2 GROWTH:−1 UX:−1** | trabalhar com critérios claros |
| 32 | **[trade-off]** Você prefere mergulhar fundo em um problema só por bastante tempo, em vez de trocar de assunto o dia inteiro? | Profundidade vs. variedade | DEV:2 AI:2 DATA:2 SEC:1 **SUP:−2 PM:−2 PROD:−1 GROWTH:−1** | se aprofundar em um problema só |
| 34 | Você gosta de fazer experimentos pequenos e medir o resultado pra decidir o próximo passo? | Decisão por evidência | GROWTH:3 PROD:2 DATA:2 AI:2 QA:1 | decidir com base em experimentos |

### Bloco interno: pessoas e comunicação

| # | Pergunta | Objetivo | Áreas impactadas | Rótulo |
|---|---|---|---|---|
| 07 | Você gosta de conversar com pessoas pra entender o que elas realmente precisam? | Levantamento de necessidade | BA:3 UX:3 PROD:3 PM:1 SUP:1 DOCS:1 | entender o que as pessoas precisam |
| 08 | Você gosta de explicar assuntos complicados de um jeito simples? | Tradução / didática | DOCS:3 BA:2 SUP:2 PROD:1 UX:1 PM:1 | explicar coisa difícil de um jeito simples |
| 09 | Você gosta de negociar prioridades quando pessoas diferentes querem coisas diferentes? | Negociação / stakeholders | PROD:3 PM:3 BA:2 | negociar prioridades entre pessoas |
| 30 | Você gosta de escrever guias, tutoriais ou explicações pra outras pessoas consultarem depois? | Escrita técnica | DOCS:3 BA:2 QA:1 SUP:1 | escrever guias e explicações |
| 31 | Você gostaria de criar conteúdo e materiais que façam mais gente conhecer e usar um produto? | Alcance / divulgação | GROWTH:3 DOCS:3 PROD:1 UX:1 | criar conteúdo pra alcançar mais gente |
| 35 | Você gosta de organizar informação de um jeito que outra pessoa consiga achar sozinha o que precisa? | Arquitetura de informação | DOCS:3 UX:2 BA:2 SUP:2 PM:1 DATA:1 | organizar informação pros outros acharem |

### Bloco interno: dados

| # | Pergunta | Objetivo | Áreas impactadas | Rótulo |
|---|---|---|---|---|
| 10 | Você gosta de trabalhar com números, métricas e indicadores? | Afinidade quantitativa | DATA:3 GROWTH:3 AI:2 PROD:2 PM:1 BA:1 | trabalhar com números e métricas |
| 11 | Se um número subiu ou caiu do nada, você teria vontade de descobrir o porquê? | Curiosidade analítica | DATA:3 GROWTH:3 PROD:2 AI:1 SEC:1 | descobrir por que um número mudou |
| 12 | Você gosta de transformar informação solta em gráficos, relatórios ou painéis que os outros consigam ler? | Comunicação de dados | DATA:3 GROWTH:2 BA:2 PROD:1 DOCS:1 | transformar informação em gráfico e relatório |
| 13 | Você teria interesse em usar dados pra tentar prever o que vai acontecer? | Modelagem preditiva | AI:3 DATA:2 GROWTH:1 | usar dados pra prever o que vem |

### Bloco interno: experiência e produto

| # | Pergunta | Objetivo | Áreas impactadas | Rótulo |
|---|---|---|---|---|
| 14 | Você repara em detalhes visuais de aplicativos e sites — espaçamento, cor, tamanho do texto? | Sensibilidade visual | UX:3 DEV:2 QA:1 | reparar em detalhes visuais |
| 15 | Você gosta de pensar em como a pessoa vai se sentir usando alguma coisa? | Empatia com quem usa | UX:3 PROD:2 GROWTH:1 DOCS:1 | pensar em como a pessoa vai se sentir |
| 16 | Você gosta de observar alguém usando uma ferramenta pra descobrir o que dava pra melhorar? | Pesquisa / observação | UX:3 QA:2 PROD:2 BA:1 | observar o uso pra achar melhorias |
| 27 | Você gosta de entender por que uma empresa decidiu criar determinado produto? | Visão de negócio | PROD:3 BA:3 GROWTH:2 UX:1 | entender a decisão por trás do produto |
| 28 | Você gosta de decidir o que vem primeiro quando não dá pra fazer tudo ao mesmo tempo? | Priorização | PROD:3 PM:3 BA:1 | decidir o que vem primeiro |
| 29 | Você gosta de organizar tarefas, prazos e pessoas pra chegar numa entrega? | Coordenação | PM:3 BA:1 SUP:1 PROD:1 | organizar tarefas, prazos e pessoas |

### Bloco interno: construção e sistemas

| # | Pergunta | Objetivo | Áreas impactadas | Rótulo |
|---|---|---|---|---|
| 17 | Você gostaria de construir aplicativos, sites ou sistemas que outras pessoas usem? | Intenção de construir | DEV:3 AI:1 UX:1 CLOUD:1 | construir coisas que os outros usam |
| 18 | Você teria curiosidade de entender o que acontece "por trás da tela" quando você clica num botão? | Curiosidade de sistemas | DEV:3 CLOUD:2 SEC:2 AI:1 QA:1 SUP:1 | entender o que acontece por trás da tela |
| 19 | Você gosta da ideia de automatizar tarefa repetitiva pra não precisar fazer na mão? | Automação | CLOUD:3 QA:2 DEV:2 GROWTH:2 SUP:2 DATA:1 | automatizar o que é repetitivo |
| 20 | Você teria paciência pra passar um tempo investigando por que um sistema parou de funcionar? | Troubleshooting | SUP:3 CLOUD:3 DEV:2 QA:2 SEC:2 | investigar sistema que parou |
| 21 | Você teria curiosidade de entender onde os aplicativos ficam hospedados e como eles continuam no ar mesmo quando alguma coisa dá errado? | Infra e resiliência | CLOUD:3 SUP:3 SEC:2 DEV:1 QA:1 | entender como os sistemas ficam no ar |

### Bloco interno: segurança e qualidade

| # | Pergunta | Objetivo | Áreas impactadas | Rótulo |
|---|---|---|---|---|
| 22 | Você gosta de pensar nas formas que alguém poderia usar uma falha a favor próprio? | Mentalidade ofensiva | SEC:3 QA:2 | pensar em como uma falha seria explorada |
| 23 | Você teria vontade de investigar um comportamento estranho antes que ele vire um problema maior? | Detecção / vigilância | SEC:3 SUP:2 CLOUD:2 QA:1 | investigar o que parece estranho |
| 24 | Você se importa em proteger informação das pessoas e pensar em quem pode acessar o quê? | Proteção / privacidade | SEC:3 CLOUD:1 BA:1 | proteger informação das pessoas |
| 25 | Você costuma perceber errinhos que a maioria das pessoas deixa passar? | Atenção a detalhe | QA:3 UX:2 DOCS:2 DEV:1 SEC:1 | perceber os errinhos que passam |
| 26 | Você prefere achar o problema antes que ele chegue em quem vai usar? | Prevenção | QA:3 SEC:2 SUP:1 CLOUD:1 PM:1 | achar o problema antes do usuário |

### Perguntas de contexto (não pontuam)

| # | Pergunta | Formato |
|---|---|---|
| C1 | Qual é a sua situação hoje? | Escolha única: Estudo TI · Trabalho com TI · Estudo outra área · Trabalho em outra área · Estou em transição de carreira · Ainda não estudo nem trabalho · Outro |
| C2 | De qual área você vem? | Escolha única, opcional: Marketing · Administração e Gestão · Design · Comunicação e Jornalismo · RH · Engenharia · Educação · Saúde · Direito · Financeiro e Contábil · Atendimento, Vendas e Operações · Outra · Prefiro não dizer |
| C3 | Você já teve contato com alguma área de tecnologia? | Múltipla escolha: Desenvolvimento · Dados · Design · Produto · Infra/Cloud · Segurança · QA/Testes · Marketing/Growth · Nenhuma · Outra |
| C4 | O que você está procurando agora? | Escolha única: Primeira profissão · Transição de carreira · Primeira oportunidade em TI · Conhecer possibilidades · Mudar de área dentro de TI · Evoluir na carreira · Só curiosidade |

**As respostas C1–C4 não entram no cálculo.** Elas só escolhem qual texto de enquadramento aparece no resultado (seção 9).

---

## 3. Matriz completa de pesos

Linha = pergunta, coluna = área. Célula vazia = peso 0 (a pergunta não diz nada sobre aquela área).

| # | DEV | DATA | AI | CLOUD | SUP | SEC | QA | UX | PROD | BA | PM | GROWTH | DOCS |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 01 | **3** | 2 | 1 | 1 |  |  | 1 |  |  | 2 | 1 |  |  |
| 02 | 2 | 1 |  | 2 | 2 | **3** | **3** |  |  |  | 1 |  |  |
| 03 | 2 |  | 2 |  |  |  | **3** | 1 |  |  |  | 2 |  |
| 04 |  | **3** | **3** |  |  | 2 |  |  |  | 1 |  | 1 |  |
| 05 | 1 |  | 2 |  | −1 |  | −1 | 2 | **3** |  | −1 | 2 |  |
| 06 |  | 1 |  | 1 | 2 | 1 | **3** | −1 | −2 | 2 | **3** | −1 |  |
| 07 |  |  |  |  | 1 |  |  | **3** | **3** | **3** | 1 |  | 1 |
| 08 |  |  |  |  | 2 |  |  | 1 | 1 | 2 | 1 |  | **3** |
| 09 |  |  |  |  |  |  |  |  | **3** | 2 | **3** |  |  |
| 10 |  | **3** | 2 |  |  |  |  |  | 2 | 1 | 1 | **3** |  |
| 11 |  | **3** | 1 |  |  | 1 |  |  | 2 |  |  | **3** |  |
| 12 |  | **3** | 1 |  |  |  |  |  | 1 | 2 | 1 | 2 | 1 |
| 13 |  | 2 | **3** |  |  |  |  |  |  |  |  | 1 |  |
| 14 | 2 |  |  |  |  |  | 1 | **3** |  |  |  |  |  |
| 15 |  |  |  |  |  |  |  | **3** | 2 |  |  | 1 | 1 |
| 16 |  |  |  |  |  |  | 2 | **3** | 2 | 1 |  |  | 1 |
| 17 | **3** |  | 1 | 1 |  |  |  | 1 |  |  |  |  |  |
| 18 | **3** |  | 1 | 2 | 1 | 2 | 1 |  |  |  |  |  |  |
| 19 | 2 | 1 |  | **3** | 2 |  | 2 |  |  |  | 1 | 2 | 1 |
| 20 | 2 |  |  | **3** | **3** | 2 | 2 |  |  |  |  |  |  |
| 21 | 1 |  |  | **3** | **3** | 2 | 1 |  |  |  |  |  |  |
| 22 |  |  |  |  |  | **3** | 2 |  |  |  |  |  |  |
| 23 |  |  |  | 2 | 2 | **3** | 1 |  |  |  |  |  |  |
| 24 |  |  |  | 1 |  | **3** |  |  |  | 1 |  |  |  |
| 25 | 1 |  | 1 | 1 |  | 1 | **3** | 2 |  |  |  |  | 2 |
| 26 |  | 1 | 1 | 1 | 1 | 2 | **3** |  |  |  | 1 |  | 1 |
| 27 |  | 1 |  |  |  |  |  | 1 | **3** | **3** | 1 | 2 | 1 |
| 28 |  |  |  |  |  |  |  |  | **3** | 1 | **3** |  |  |
| 29 |  |  |  |  | 1 |  |  |  | 1 | 1 | **3** |  |  |
| 30 |  |  |  |  | 1 |  | 1 |  |  | 2 | 1 |  | **3** |
| 31 |  |  |  |  |  |  |  | 1 | 1 |  |  | **3** | **3** |
| 32 | 2 | 2 | 2 | 1 | −2 | 1 |  |  | −1 |  | −2 | −1 |  |
| 33 | 2 |  | 2 |  |  |  |  | 2 | 2 |  |  | 1 | 1 |
| 34 |  | 2 | 2 |  |  |  | 1 |  | 2 |  |  | **3** | 1 |
| 35 |  | 1 |  | 1 | 2 |  |  | 2 |  | 2 | 1 |  | **3** |

### Valores derivados (conferidos por script)

| Área | Nº de perguntas | `Smax` | `Smin` |
|---|---|---|---|
| DEV | 13 | 52 | −52 |
| DATA | 14 | 52 | −52 |
| AI | 15 | 50 | −50 |
| CLOUD | 14 | 46 | −46 |
| SUP | 15 | 52 | −52 |
| SEC | 13 | 52 | −52 |
| QA | 17 | 62 | −62 |
| UX | 14 | 52 | −52 |
| PROD | 17 | 68 | −68 |
| BA | 15 | 52 | −52 |
| PM | 17 | 52 | −52 |
| GROWTH | 15 | 56 | −56 |
| DOCS | 14 | 46 | −46 |

Checagens que a matriz passa:

- toda pergunta afeta **pelo menos 2 áreas** (regra 19 da spec);
- toda área é tocada por **pelo menos 8 perguntas** — nenhuma é decidida por 2 ou 3 respostas;
- CLOUD (`Smax` 36) e PROD (`Smax` 68) têm escalas muito diferentes. **É por isso que a normalização da seção 4 é obrigatória** — comparar pontuação bruta faria PROD vencer quase sempre.

---

## 4. Fórmula de pontuação

**Passo 1 — multiplicador da resposta**

| Resposta | Multiplicador |
|---|---|
| Combina muito comigo (disco cheio) | `+2` |
| Combina (3/4) | `+1` |
| Tanto faz (metade) | `0` |
| Combina pouco (1/4) | `−1` |
| Não combina (disco vazio) | `−2` |

**Passo 2 — pontuação bruta da área**

```
S(área) = Σ  peso[pergunta][área] × multiplicador[resposta da pergunta]
```

**Passo 3 — normalização para 0–100**

```
Smax(área) = Σ |peso[pergunta][área]| × 2

N(área) = 50 × ( 1 + S(área) / Smax(área) )
```

Propriedades que importam:

- neutro em tudo → **50 em todas as áreas** (ponto morto, tratado na seção 6);
- `N` fica sempre entre 0 e 100, comparável entre áreas de tamanhos diferentes;
- quem responde de forma contraditória nas perguntas de trade-off (gosta de ambiguidade **e** de processo rígido) é levemente penalizado nas áreas polarizadas. Isso é intencional: sinal contraditório não deve virar afinidade alta.

**Passo 4 — contribuição por pergunta** (só para escrever o texto do resultado)

```
C(pergunta, área) = peso[pergunta][área] × multiplicador[resposta]
```

As 2 perguntas com maior `C` positivo viram a explicação: *"isso apareceu principalmente porque combina muito com você: **{rótulo}** e **{rótulo}**"*. A fórmula nunca é mostrada — só o rótulo.

---

## 5. Critério de seleção das 3 áreas

```
1. ordena as 13 áreas por N, decrescente
2. piso de relevância: descarta tudo com N < 55
3. A1 = a primeira colocada
4. A2 entra se:  N(A2) >= 55  e  N(A1) − N(A2) <= 12
5. A3 entra se:  N(A3) >= 55  e  N(A1) − N(A3) <= 15
6. diversidade: no máximo 2 áreas da mesma família (seção 1).
   Se a candidata violar, pula pra próxima elegível da lista.
7. resultado final: 1, 2 ou 3 áreas
```

### Rótulo de intensidade de cada card

| Distância para a 1ª | Rótulo mostrado |
|---|---|
| — (é a primeira) | `afinidade mais alta` |
| ≤ 3 pontos | `praticamente empatada com a primeira` |
| ≤ 8 pontos | `afinidade forte` |
| ≤ 15 pontos | `vale explorar` |

### Empate exato em N

Desempate determinístico, nesta ordem — o mesmo conjunto de respostas sempre produz o mesmo resultado, nada de aleatório:

1. maior soma de contribuições vindas de respostas **Combina muito comigo** (entusiasmo pesa mais que morno);
2. maior número de perguntas com contribuição positiva (afinidade mais espalhada, menos dependente de uma resposta só);
3. ordem fixa de desempate: `DEV, DATA, UX, QA, PROD, CLOUD, SEC, BA, AI, GROWTH, PM, SUP, DOCS`.

### Resultados muito próximos

Se **4 ou mais áreas** ficarem dentro de 3 pontos da primeira, o resultado abre com um aviso honesto antes dos cards:

> Suas respostas ficaram bem distribuídas — várias áreas apareceram quase empatadas. Isso costuma acontecer com quem tem interesse amplo, e não é problema nenhum. Escolhemos 3 pra você começar a olhar, mas as outras continuam abertas.

---

## 6. Casos de borda

| Situação | Detecção | O que o quiz faz |
|---|---|---|
| **Nenhuma área ≥ 55** | `max(N) < 55` | Perfil vira **Explorador**. Mostra as 3 maiores mesmo assim, com o aviso: *"suas respostas não puxaram forte pra nenhum lado. Isso é normal quando a gente ainda não experimentou muita coisa — essas 3 são só um ponto de partida."* |
| **Respostas uniformes** | ≥ 70% das respostas na mesma opção | Mesmo tratamento acima, mais a sugestão de refazer com calma. |
| **Muito neutro** | ≥ 60% na metade | Idem. |
| **Tudo "Combina muito"** | ≥ 70% no disco cheio | Perfil **Explorador**, texto: *"você marcou interesse em quase tudo — o ranking abaixo é por diferença de intensidade, não por exclusão."* |
| **Tudo "Não combina"** | ≥ 70% no disco vazio | Não força resultado. Tela: *"pelas suas respostas, quase nada aqui despertou interesse. Talvez o momento não seja esse — e tudo bem. Se quiser, refaça pensando em atividades específicas que você já gostou de fazer."* |
| **Abandono no meio** | `localStorage` | Retoma na pergunta onde parou. |

---

## 7. Os 9 perfis

O perfil **não sai das áreas** — sai de 8 eixos de comportamento calculados em paralelo. Assim o perfil descreve *como a pessoa trabalha*, e as áreas descrevem *onde isso costuma caber*. Duas pessoas podem ser "Investigador" e receber áreas diferentes.

**Cálculo do eixo:** `E = 50 × (1 + média(multiplicadores das perguntas do eixo) / 2)`, também de 0 a 100.

| Perfil | Eixo | Perguntas do eixo |
|---|---|---|
| **Investigador** | INVESTIGAR | 02, 04, 11, 18, 20, 22, 23, 25 |
| **Analista** | ANALISAR | 01, 04, 10, 11, 12, 13, 34 |
| **Construtor** | CONSTRUIR | 01, 17, 18, 19, 32, 33 |
| **Guardião** | PROTEGER | 06, 21, 22, 24, 25, 26 |
| **Criador** | CRIAR | 03, 05, 14, 15, 16, 33 |
| **Conector** | CONECTAR | 07, 08, 09, 30, 31, 35 |
| **Estrategista** | DIRECIONAR | 05, 09, 10, 27, 28, 34 |
| **Organizador** | ORGANIZAR | 06, 12, 29, 35, 32 *(sinal invertido)* |
| **Explorador** | — | fallback (ver abaixo) |

**Regras:**

- perfil = eixo com maior `E`;
- se o 2º eixo estiver a ≤ 6 pontos do 1º, o resultado ganha uma linha de traço secundário: *"com um traço forte de {2º perfil}"*;
- **Explorador** entra quando: todos os eixos estão dentro de 8 pontos entre si, **ou** ≥ 70% das respostas foram "Combina muito comigo", **ou** nenhuma área passou de 55.

> **Correção feita na implementação.** A regra original também disparava Explorador com ≥ 60%% de respostas neutras. Na prática isso quebrava: um perfil que responde neutro em 21 das 35 mas tem preferência nítida no resto (o cenário "investigação + infra" da seção 13, que crava SEC 88,5) era rotulado Explorador — contradizendo as próprias áreas que o quiz tinha acabado de achar com folga. Respostas neutras em quantidade continuam disparando o **aviso** da seção 6; o que caracteriza Explorador é eixo achatado ou ausência de sinal, que são medidas diretas de "interesse espalhado". O teste `investigação + infra devolve segurança e cloud` trava essa regra.

### Textos dos perfis

> **INVESTIGADOR** — Você gosta de entender o que está por trás das coisas. Antes de arrumar, você quer saber por que quebrou. Costuma notar o detalhe que não fecha e não sossega enquanto não acha a explicação.

> **ANALISTA** — Você gosta de olhar informação e tirar sentido dela. Prefere decidir com evidência na mão a decidir no feeling, e curte quando um número finalmente explica o que estava acontecendo.

> **CONSTRUTOR** — Você gosta de sair da ideia e chegar na coisa pronta. Prefere passar um tempo bom num problema só até funcionar de verdade, e tem paciência com o processo de montar.

> **GUARDIÃO** — Você repara no que pode dar errado antes de dar errado. Gosta de critério claro, de proteger o que é importante e de entregar coisa que aguenta o tranco.

> **CRIADOR** — Você gosta de imaginar como as coisas poderiam ser melhores. Pensa primeiro em quem vai usar, repara em detalhe que os outros não veem e se sente bem começando do zero.

> **CONECTOR** — Você é a ponte. Gosta de entender o que as pessoas precisam, traduzir o complicado pro simples e deixar a informação num formato que os outros consigam usar sozinhos.

> **ESTRATEGISTA** — Você gosta de decidir o que importa. Fica confortável quando nem tudo está definido, equilibra o que o negócio quer com o que as pessoas precisam e não trava na hora de escolher o que vem primeiro.

> **ORGANIZADOR** — Você gosta de transformar bagunça em plano. Enxerga prazo, dependência e risco antes dos outros, e sente prazer quando a coisa toda anda porque alguém organizou.

> **EXPLORADOR** — Seu interesse está espalhado, e isso não é indecisão. É que você ainda não teve contato suficiente com essas áreas pra saber do que gosta mais. A melhor coisa agora é experimentar, não escolher.

---

## 8. Textos das 13 áreas

Cada card tem: **nome**, **o que é** (1 linha), **por que apareceu** (base + as 2 perguntas de maior contribuição), **o que você faria** (4 itens), **vale experimentar** (4 itens).

### DEV — Desenvolvimento de Software
*Escrever o código que faz aplicativos, sites e sistemas funcionarem.*

> Suas respostas mostraram afinidade com construir coisas, entender como elas funcionam por dentro e ficar num problema até resolver.

**O que você faria:** transformar uma ideia em algo que roda · montar telas ou a lógica por trás delas · descobrir por que alguma coisa quebrou · melhorar código que já existe.

**Vale experimentar:** lógica de programação · uma linguagem só pra começar (Python ou JavaScript) · montar um projetinho pequeno de ponta a ponta · Git e GitHub.

### DATA — Dados & BI
*Pegar informação espalhada e transformar em resposta que ajuda a decidir.*

> Suas respostas mostraram afinidade com números, padrões e decisão baseada em evidência.

**O que você faria:** achar o motivo de um número ter mudado · montar painéis e relatórios · organizar dados bagunçados · responder pergunta de negócio com dado na mão.

**Vale experimentar:** Excel/Sheets a fundo (é mais do que parece) · SQL · Power BI ou Looker Studio · estatística básica.

### AI — IA & Machine Learning
*Usar dados pra fazer sistemas reconhecerem padrões e preverem coisas.*

> Suas respostas mostraram afinidade com padrões, previsão e experimentação em cima de dados.

**O que você faria:** treinar modelos pra reconhecer ou prever · testar hipóteses e medir acerto · preparar dados pro modelo aprender · avaliar quando o modelo erra e por quê.

**Vale experimentar:** Python · estatística e probabilidade · um curso introdutório de machine learning · brincar com APIs de IA prontas antes de treinar qualquer coisa.

### CLOUD — Cloud, DevOps & SRE
*Cuidar de onde os sistemas rodam e garantir que continuem no ar.*

> Suas respostas mostraram afinidade com automação, infraestrutura e manter as coisas funcionando mesmo quando algo dá errado.

**O que você faria:** automatizar o que hoje é feito na mão · configurar os ambientes onde os sistemas rodam · investigar lentidão e queda · montar alertas que avisam antes do usuário reclamar.

**Vale experimentar:** fundamentos de redes · Linux e linha de comando · Docker · o nível gratuito de uma nuvem (AWS, Azure ou GCP).

### SUP — Suporte, Infra & IT Operations
*Ser quem resolve quando o sistema não está fazendo o que deveria.*

> Suas respostas mostraram afinidade com resolver problema real, atender pessoas e entender como as coisas estão montadas.

**O que você faria:** atender chamado e destravar quem está parado · investigar problema com pouca informação · cuidar de equipamentos, acessos e ambientes · documentar a solução pra próxima vez ser rápida.

**Vale experimentar:** Windows e Linux no dia a dia · redes básicas · ITIL (o vocabulário do mercado) · um help desk voluntário pra pegar prática real.

### SEC — Cibersegurança
*Pensar como alguém que quer invadir, pra conseguir proteger antes.*

> Suas respostas mostraram afinidade com investigação, desconfiança saudável e proteção de informação.

**O que você faria:** procurar falha antes que alguém use · investigar comportamento suspeito · definir quem pode acessar o quê · responder quando acontece um incidente.

**Vale experimentar:** fundamentos de redes (é a base de tudo aqui) · segurança da informação · laboratórios de CTF, tipo TryHackMe · os conceitos do OWASP Top 10.

### QA — Qualidade & Testes
*Achar o problema antes que ele chegue em quem vai usar.*

> Suas respostas mostraram afinidade com atenção a detalhe, teste e critério claro pra dizer se algo está certo.

**O que você faria:** testar de jeitos que ninguém pensou · escrever cenários de teste · reportar bug de um jeito que dê pra reproduzir · automatizar teste repetitivo.

**Vale experimentar:** teste manual e escrita de caso de teste · testar API com Postman · fundamentos de automação (Cypress ou Playwright) · a certificação CTFL, se quiser o vocabulário formal.

### UX — UX/UI & Design de Produto
*Fazer com que usar aquilo não seja um sofrimento.*

> Suas respostas mostraram afinidade com pensar na pessoa que usa, reparar em detalhe e imaginar como poderia ser melhor.

**O que você faria:** conversar com quem usa pra entender a dor · desenhar telas e fluxos · testar o desenho com pessoas de verdade · defender a experiência nas decisões do time.

**Vale experimentar:** Figma · fundamentos de usabilidade (as heurísticas de Nielsen) · refazer a tela de um app que te irrita · pesquisa com usuário, mesmo que com 3 pessoas.

### PROD — Produto / Product Management
*Decidir qual problema o time resolve primeiro, e por quê.*

> Suas respostas mostraram afinidade com visão de negócio, priorização e lidar bem com o que ainda não está definido.

**O que você faria:** descobrir qual problema vale a pena resolver · dizer não pra ideia boa que não é agora · alinhar negócio, usuário e time técnico · acompanhar o que aconteceu depois que lançou.

**Vale experimentar:** fundamentos de discovery · métricas de produto · escrever a proposta de uma melhoria de um app que você usa · noções de Scrum e Kanban.

### BA — Business Analysis / Análise de Sistemas
*Traduzir o que a área de negócio precisa pro que o time técnico vai construir.*

> Suas respostas mostraram afinidade com entender processo, conversar com pessoas e organizar informação.

**O que você faria:** entrevistar quem conhece o processo · desenhar como o processo funciona hoje e como poderia funcionar · escrever requisito que o time consiga usar · validar se o que foi entregue resolve mesmo.

**Vale experimentar:** BPMN (desenho de processo) · escrita de requisito e user story · SQL básico pra investigar dado sozinha · UML no essencial.

### PM — Gestão de Projetos
*Fazer as peças e as pessoas chegarem juntas no fim.*

> Suas respostas mostraram afinidade com organização, coordenação e antecipar risco.

**O que você faria:** organizar prazo, escopo e dependência · destravar o que está parado · antecipar risco antes de virar crise · manter todo mundo sabendo onde a coisa está.

**Vale experimentar:** Scrum e Kanban · uma ferramenta de gestão (Jira, Trello ou Notion) · fundamentos do PMBOK · organizar um projeto real, mesmo que pequeno.

### GROWTH — Growth & Marketing Technology
*Usar dado, teste e tecnologia pra mais gente conhecer e usar o produto.*

> Suas respostas mostraram afinidade com métrica, experimentação e alcance.

**O que você faria:** rodar experimento e medir resultado · entender por onde as pessoas chegam e por onde desistem · automatizar campanha e jornada · montar painel de acompanhamento.

**Vale experimentar:** Google Analytics · teste A/B · SQL básico · uma ferramenta de automação (HubSpot, RD Station ou similar).

### DOCS — Technical Writing, Documentação & DevRel
*Fazer com que a tecnologia seja compreensível pra quem precisa usar.*

> Suas respostas mostraram afinidade com escrita, explicação e organização de conhecimento.

**O que você faria:** escrever guia e documentação que as pessoas realmente leem · organizar conhecimento pro time achar sozinho · produzir conteúdo técnico · ajudar quem está usando a entender.

**Vale experimentar:** Markdown e Git · escrever um tutorial do zero sobre algo que você aprendeu · documentação de API · estudar como as boas docs são estruturadas (Stripe, Vercel).

---

## 9. Enquadramento por contexto

Três variantes de texto, escolhidas por C1 e C3. **Nenhuma altera o cálculo.**

### 9.1 Vem de fora de TI (transição ou outra área)

Em vez de uma matriz de 13 áreas × 12 origens (156 textos pra escrever e manter), cada origem carrega **tags de repertório** e cada área declara as tags que aproveita. A frase é montada pela interseção:

> Você vem de **{origem}**. Isso não significa começar do zero: **{tags em comum}** é repertório que já conta em **{área}** — o que você desenvolve daqui pra frente é a parte técnica.

| Origem | Tags |
|---|---|
| Marketing | métricas, público, comunicação, experimentação |
| Administração e Gestão | processos, negócio, organização, métricas |
| Design | estética, público, criação |
| Comunicação e Jornalismo | comunicação, escrita, público |
| RH | pessoas, processos, comunicação, organização |
| Engenharia | lógica, investigação, processos, cálculo |
| Educação | comunicação, escrita, organização, pessoas |
| Saúde | atendimento, pessoas, processos, investigação |
| Direito | escrita, investigação, detalhe, processos |
| Financeiro e Contábil | métricas, cálculo, processos, detalhe |
| Atendimento, Vendas e Operações | atendimento, pessoas, comunicação, processos |

| Área | Tags que aproveita |
|---|---|
| DEV | lógica, organização, criação |
| DATA | métricas, cálculo, investigação, detalhe |
| AI | lógica, cálculo, investigação, métricas |
| CLOUD | processos, investigação, organização, lógica |
| SUP | atendimento, pessoas, comunicação, investigação, processos |
| SEC | investigação, detalhe, processos |
| QA | detalhe, processos, investigação, escrita |
| UX | público, estética, comunicação, pessoas, criação |
| PROD | negócio, público, métricas, comunicação |
| BA | processos, negócio, comunicação, escrita, investigação |
| PM | organização, processos, pessoas, comunicação |
| GROWTH | métricas, público, comunicação, experimentação, criação |
| DOCS | escrita, comunicação, organização, público |

Se a interseção for vazia: *"Você vem de {origem}. Áreas de TI recebem gente de todo tipo de formação — o que pesa aqui é interesse, e o resto se aprende."*

Sem promessa de empregabilidade, sem "é fácil migrar", sem prazo.

### 9.2 Nunca teve contato com TI (C3 = Nenhuma)

> Esse resultado é sobre **afinidade**, não sobre habilidade. Ninguém já sabe fazer nada disso antes de aprender. O que ele diz é: pelo jeito que você gosta de trabalhar, essas são as áreas onde provavelmente você se sentiria mais em casa.

### 9.3 Já está em TI (C1 = Estudo TI / Trabalho com TI)

> Você já está em tecnologia. Se apareceu uma área diferente da sua, não é sinal de que você está no lugar errado — pode ser um caminho de especialização, ou simplesmente uma vizinhança que vale conhecer. Boa parte das carreiras em TI se move de lado, não pra cima.

### 9.4 Rodapé fixo (todos os casos)

> Isso aqui é uma indicação de afinidade, não um teste de carreira. Nenhum quiz de 5 minutos define o que você vai fazer da vida — mas dá pra usar como ponto de partida pra escolher o que experimentar primeiro. A única forma de saber se você gosta de uma área é encostar nela.

---

## 10. Telas

### 10.1 Inicial

```
┌──────────────────────────────────────┐
│  // career.java            ← mono    │
│                                      │
│  QUAL ÁREA DE TI                     │ ← display, Bricolage
│  COMBINA COM                         │
│  VOCÊ?                               │
│                                      │
│  35 perguntas rápidas sobre o que    │ ← lede
│  você gosta de fazer. Sem termo      │
│  técnico, sem precisar saber nada    │
│  de programação.                     │
│                                      │
│  ┌ 5 min ┐ ┌ 13 áreas ┐ ┌ anônimo ┐  │ ← chips mono
│                                      │
│  [  COMEÇAR  ]                       │ ← bloco vermelho, texto preto
│                                      │
│  Não é teste de carreira.            │
│  É um ponto de partida.              │
└──────────────────────────────────────┘
```

Fundo creme. Se houver progresso salvo, aparece um segundo botão discreto: `continuar de onde parei (12/35)`.

### 10.2 Pergunta

```
┌──────────────────────────────────────┐
│  ←        12/35                      │
│  ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░            │ ← barra vermelha
│                                      │
│  Você gosta de investigar a causa    │ ← subtitle, display
│  de um problema antes de sair        │
│  corrigindo?                         │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ ●  Combina muito comigo                  │  │ ← alvo mín. 56px de altura
│  ├────────────────────────────────┤  │
│  │ ◕  Combina                        │  │
│  ├────────────────────────────────┤  │
│  │ ◑  Tanto faz                       │  │
│  ├────────────────────────────────┤  │
│  │ ◔  Combina pouco              │  │
│  ├────────────────────────────────┤  │
│  │ ○  Não combina                    │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

- toque marca a resposta e avança sozinho 240 ms depois (sem botão "próxima"); toques repetidos dentro dessa janela são ignorados, senão quem responde rápido pula uma pergunta sem ver;
- `←` volta e mostra a resposta anterior já selecionada;
- teclado `1`–`5` responde, `←`/`→` navegam (desktop);
- nenhuma indicação de qual área a pergunta mede;
- ordem fixa e intercalada — nunca agrupada por bloco temático, pra pessoa não perceber o padrão;
- `prefers-reduced-motion` respeitado nas transições.

### 10.3 Contexto (C1–C4)

Mesma moldura, chips selecionáveis em vez da escala. Todas puláveis — `pular` sempre visível.

### 10.4 Resultado

```
┌──────────────────────────────────────┐
│  // resultado.java                   │
│                                      │
│  ┌──── bloco preto ───────────────┐  │
│  │  SEU PERFIL                    │  │
│  │  INVESTIGADOR                  │  │ ← display, vermelho sobre preto
│  │  com um traço forte de Analista│  │
│  │  "Você gosta de entender o     │  │
│  │   que está por trás..."        │  │
│  └────────────────────────────────┘  │
│                                      │
│  ÁREAS PRA VOCÊ EXPLORAR             │
│                                      │
│  ┌ 01 ────── afinidade mais alta ─┐  │
│  │ CIBERSEGURANÇA                 │  │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░            │  │
│  │ Pensar como alguém que quer    │  │
│  │ invadir, pra proteger antes.   │  │
│  │                                │  │
│  │ Apareceu porque você marcou    │  │
│  │ "Gosto muito" em "investigar a  │  │
│  │ de corrigir" e em "proteger    │  │
│  │ informação das pessoas".       │  │
│  │                                │  │
│  │ O QUE VOCÊ FARIA   ▸ 4 itens   │  │
│  │ VALE EXPERIMENTAR  ▸ 4 itens   │  │
│  └────────────────────────────────┘  │
│  ┌ 02 ... ┐  ┌ 03 ... ┐              │
│                                      │
│  ┌ ponte de transição de carreira ┐  │
│  ┌ rodapé: afinidade ≠ carreira   ┐  │
│                                      │
│  [ refazer ]  [ compartilhar ]       │
└──────────────────────────────────────┘
```

Card 01 recebe borda vermelha; 02 e 03 ficam em creme mais fechado (`--surface`). Compartilhar usa `navigator.share` no mobile e copia o texto no desktop.

---

## 11. Identidade visual aplicada

Reaproveita os tokens do `portfolio/src/index.css` — mesma linguagem do site e do Instagram.

| Elemento | Token |
|---|---|
| Fundo | creme `#F7F5F0` |
| Texto | preto `#171717` |
| Destaque, barras, card 01 | vermelho `#E76F51` |
| Bloco do perfil | preto com texto creme (`.on-ink`) |
| Roxo e azul | **não usar** — o quiz é curto demais pra comportar cor secundária sem virar ruído |
| Títulos | Bricolage Grotesque, escala `display` / `title` / `subtitle` |
| Corpo | Inter |
| `// career.java`, `12/35`, chips | JetBrains Mono |
| Raio de borda | `0.25rem` (quase reto, editorial) |

Contraste: texto pequeno em vermelho usa `--primary-ink` (6:1 sobre creme), nunca o `#E76F51` cheio. Sobre o vermelho, a tinta é preta (5,8:1) — não creme.

**Responsivo:** mobile-first, coluna única até 768px, gutter de 16px, alvos de toque ≥ 56px, sem scroll horizontal. Desktop: largura máxima ~720px centralizada (quiz não ganha nada com layout largo) e navegação por teclado.

---

## 12. Stack proposta

Espelha o `portfolio/` pra você não ter dois padrões diferentes pra manter:

```
Vite + React 18 + TypeScript + Tailwind 3 + framer-motion
sem backend · sem shadcn (o quiz usa ~5 componentes próprios)
deploy: Vercel ou Netlify, build estático
```

Estrutura:

```
projeto-quiz/
├── src/
│   ├── data/
│   │   ├── questions.ts     # 35 perguntas + rótulos + pesos
│   │   ├── areas.ts         # 13 áreas, famílias, textos, tags
│   │   ├── profiles.ts      # 9 perfis + eixos
│   │   └── context.ts       # C1–C4, tags de origem, textos de enquadramento
│   ├── lib/
│   │   ├── scoring.ts       # S, N, seleção, empate, casos de borda
│   │   └── scoring.test.ts  # testes das simulações da seção 13
│   ├── components/          # Intro, Question, Scale, Progress, Context, Result, AreaCard
│   ├── hooks/useQuiz.ts     # máquina de estado + localStorage
│   └── index.css            # tokens da identidade
```

---

## 13. Simulações já rodadas

Rodadas com a regra de seleção da seção 5 implementada de verdade, não estimada no olho.

| Perfil simulado | Ranking (N normalizado) | O que a regra devolve |
|---|---|---|
| Investigação + infra (combina muito em 02, 18, 20, 21, 22, 23, 24, 25, 32; combina pouco em 07, 09, 28, 29, 31) | SEC 88,5 · CLOUD 86,1 · DEV 71,2 · QA 71,0 · SUP 65,4 | **2 áreas:** SEC + CLOUD |
| Marketing (combina muito em 05, 07, 10, 11, 12, 15, 16, 27, 28, 31, 34; combina pouco em 18, 20, 21, 22) | PROD 85,3 · GROWTH 83,9 · UX 75,0 · DATA 73,9 · BA 71,2 | **3 áreas:** PROD + GROWTH + UX |
| Tudo neutro | todas em 50,0 | **nenhuma ≥ 55** → cai no fallback da seção 6 |
| Tudo "Combina muito" | 7 áreas empatadas em 100 | desempate + diversidade decidem |

Três coisas que essas rodadas revelaram e que valem ser decisão consciente, não acidente:

**1. Perfil muito definido pode receber só 2 áreas.** No caso "investigação + infra", a 3ª colocada (DEV, 71,2) está a 17,3 pontos da primeira — acima do teto de 15. A regra corta, e o resultado sai com 2 cards. Isso é o comportamento correto: quando o sinal é forte e concentrado, inventar uma terceira área só pra preencher o card seria ruído. A spec pede "até 3", não "exatamente 3". *Se você preferir sempre 3 cards, é só afrouxar o teto da A3 de 15 pra 20 — me avisa.*

**2. A regra de diversidade só corta redundância real.** No caso "marketing", PROD e GROWTH são as duas da família *Direcionar*, e as duas entram — o limite é 2 por família, não 1. BA (3ª de *Direcionar*, 71,2) seria barrado, mas nem chega a ser testado porque UX já está à frente dele. A regra é conservadora de propósito.

**3. O caso "tudo Combina muito" expõe o desempate.** Sete áreas cravam 100. Sem a regra de desempate da seção 5, o resultado vira a ordem em que as áreas estão declaradas no array — arbitrário. Com ela, cai na ordem fixa `DEV, DATA, UX, QA, ...`, que foi montada **intercalando famílias** justamente pra que o pior caso ainda devolva três áreas diferentes entre si. Esse perfil também dispara o fallback Explorador (≥70% no anel cheio), então o texto já avisa que o ranking é por intensidade, não por exclusão.

---

## 14. Viés estrutural: medido e corrigido

Uma auditoria da matriz revelou um problema que os testes de lógica não pegavam: **a matriz tinha polegar na balança.**

Com respostas **100% aleatórias**, onde toda área deveria vencer 1 vez em 13 (7,7%):

| Antes | Vencia | Concentração (top 3 pesos / total) |
|---|---|---|
| DOCS | 15,2% | 53% |
| PM | 12,6% | 43% |
| CLOUD | 11,5% | 50% |
| ... | | |
| QA | 4,4% | 29% |
| BA | 4,0% | 31% |
| SUP | 3,1% | 31% |

Correlação entre nº de perguntas e taxa de vitória: **−0,88**.

**Causa.** Dividir por `Smax` iguala a *escala* das áreas, mas não a *variância*. O desvio de `N` cai com `1/√k`, onde `k` é o número de perguntas. Área medida por poucas perguntas pesadas oscila mais, atinge picos mais altos com mais frequência e por isso vence mais. Não era afinidade de ninguém — era desenho da matriz.

**Correção: conteúdo, não fórmula.** Testei a correção estatística (dividir pela raiz da soma dos quadrados, que iguala variância por construção): derrubava o desvio de 3,48 para 1,43, mas fazia algumas áreas nunca alcançarem 100 no placar. O resíduo, além disso, vinha de **concentração** — DOCS era decidida na prática por 3 perguntas de peso 3, o que dá cauda pesada. Nenhuma fórmula conserta isso.

Então a correção foi espalhar: 21 pesos novos (quase todos de valor 1) em perguntas que aquelas áreas legitimamente tocam e estavam ignorando — documentação que observa como usam a doc, cloud que decompõe arquitetura, projeto que investiga atraso.

| Depois | Vence |
|---|---|
| UX | 9,9% |
| ... | |
| QA | 5,3% |

Desvio entre áreas: **3,48 → 1,52**. Distorção de **5x → 1,9x**. Nenhuma área com menos de 13 perguntas (antes: 8). `Smax` entre 46 e 68 (antes: 34 e 68).

**Trancado por teste.** `nenhuma área vence demais com respostas aleatórias` roda 3.000 simulações e falha se qualquer área sair da faixa 3,5%–12%. E `nenhuma área é decidida por poucas perguntas pesadas` barra concentração acima de 42%. O viés não volta sem alguém ver.

Rodar depois de mexer em peso: `npx vite-node analise/vies.ts`.

---

## 15. Segunda etapa: afunilamento por área

O quiz principal responde *quais áreas combinam com você*. Ele **não** responde *que tipo de dev* — e não deve fingir que responde: só duas das 35 perguntas tocam a fronteira front/back. Derivar "você é front-end" de duas respostas seria chute com cara de resultado.

A resposta honesta é perguntar mais. Cada card do resultado ganha um botão — *"que tipo de Desenvolvimento de Software?"* — que abre **6 perguntas novas, específicas daquela área**.

### As 37 vertentes

| Área | Vertentes |
|---|---|
| DEV | Front-end · Back-end · Mobile |
| DATA | Análise & BI · Engenharia de Dados |
| AI | Data Science · ML Engineering · IA Aplicada |
| CLOUD | DevOps & Plataforma · SRE & Confiabilidade · Arquitetura de Nuvem |
| SUP | Service Desk · Infraestrutura & SysAdmin · IT Operations |
| SEC | Ofensiva (Red Team) · Defensiva (Blue Team) · GRC & Governança |
| QA | QA Exploratório · Automação de Testes · Performance & Carga |
| UX | UX Research · UI & Visual · Product Design |
| PROD | Discovery & Estratégia · Delivery & Execução · Product Ops & Dados |
| BA | Analista de Negócio · Analista de Sistemas · Analista de Processos |
| PM | Ágil & Scrum Master · Gestão de Projetos · PMO & Portfólio |
| GROWTH | Growth Analytics · MarTech & Automação · SEO & Conteúdo |
| DOCS | Technical Writer · Developer Advocate · Gestão de Conhecimento |

### Pontuação

Mesma fórmula do principal, dentro da área: `N = 50 × (1 + S / Smax)` por vertente. Mostra **1 ou 2** — a segunda entra se estiver a 10 pontos ou menos da primeira. Se as duas ficarem a 4 pontos ou menos, o resultado diz que empataram em vez de fingir que escolheu:

> As duas ficaram praticamente empatadas. Não é indecisão: muita gente trabalha exatamente no meio dessas duas, e o mercado tem vaga pra esse perfil.

### Vizinhança: a fronteira que mais confunde

Algumas vertentes vivem coladas em **outra área inteira**. Front-end e UX é o caso clássico — e era exatamente a dúvida que originou esta etapa.

Cada vertente pode declarar uma área vizinha. Quando essa vizinha **também pontuou bem no quiz principal daquela pessoa** (≥ 55), o resultado avisa:

> Front-end e UX vivem colados, e é a confusão mais comum de todas. A diferença prática: UX decide como a tela deve ser, front-end faz ela existir. Você pode começar por um e migrar pro outro — muita gente faz exatamente isso.

A condição importa: sem ela, viraria curiosidade genérica em todo resultado. Com ela, só aparece pra quem a dúvida é real.

### Regras que os testes garantem

- toda área tem vertentes, com ao menos 2 vertentes e 6 perguntas;
- toda pergunta separa **pelo menos 2** vertentes (uma pergunta que só aponta pra uma não separa nada — 7 tinham esse defeito e foram corrigidas);
- toda vertente é alcançada por ao menos 2 perguntas;
- ids de pergunta não colidem com os do quiz principal;
- toda vizinhança aponta pra uma área real, diferente de si mesma, com texto junto.

### Casos de borda

| Situação | O que acontece |
|---|---|
| Neutro em tudo | Todas em 50. Avisa que nenhuma vertente se destacou e sugere experimentar um pouco de cada. |
| Pulou perguntas | Avisa que o recorte é mais chute que leitura, e sugere refazer. |
| Duas empatadas | Mostra as duas e diz que trabalhar no meio delas é caminho válido. |

O rodapé é explícito sobre o alcance disso:

> Seis perguntas dão um recorte, não um veredito. Dentro de qualquer área dessas dá pra transitar entre as vertentes a vida toda — muita gente começa em uma e termina em outra sem nunca ter "mudado de carreira".

---

## 16. O resultado não é veredito

Três mudanças, da mais estrutural pra a mais textual.

**1. O ranking inteiro fica visível.** O resultado mostra as 13 áreas, não 3. As outras 10 aparecem em *"ver as outras 10 áreas"*, com posição, barra e nota. Isso tira o ar de veredito de um jeito que disclaimer nenhum tira: nada está escondido, e a pessoa vê que "não apareceu no top 3" é diferente de "está fora".

> Nenhuma delas foi descartada. Elas só ficaram mais abaixo nas suas respostas de hoje — o que é diferente de "você não serve pra isso". Se bater o olho e alguma te chamar mais que as três de cima, segue essa.

**2. O enquadramento vem antes dos cards, não no rodapé.** Em destaque, logo depois do perfil:

> **Isso é uma ideia, não um diagnóstico.**
> O quiz leu as suas respostas e devolveu o que combina com elas. Só isso. Se o resultado não te representa, confie mais em você do que no quiz — acontece de a gente responder pensando em quem gostaria de ser, e não em quem é. Nenhuma área aqui está fechada pra você, e nenhuma está garantida.

**3. A escala fala em "combina", não em "gosto".** 9 das 35 perguntas são de hábito ou disposição — *"você costuma perceber"*, *"você teria paciência"*. Ninguém gosta de ter paciência, então "Gosto muito" não era resposta que se desse. "Combina comigo" encaixa nas 35, e soa como leitura da pessoa em vez de julgamento dela.

---

## 17. Correções vindas da revisão visual

Uma revisão externa percorreu o fluxo inteiro em desktop e 375px. Achou o que teste automatizado não pega. O que era problema de verdade:

### Bugs de comportamento

| Problema | Correção |
|---|---|
| **"ver seu recorte de…" reabria a pergunta 1/6.** O botão prometia mostrar o resultado e mandava responder tudo de novo. | `startBranch` agora checa se as 6 já foram respondidas e vai direto ao recorte. |
| **Retomar um quiz já terminado voltava pra pergunta 35.** | `start(resume)` restaura o estágio salvo. Quem terminou vê "Ver meu resultado". |
| **Na home, a ação destrutiva era o botão principal.** "Começar de novo" (que apaga tudo) era o bloco grande; retomar era um link pequeno. | Invertido: retomar é o botão, recomeçar do zero é o link. |

### Linguagem

| Problema | Correção |
|---|---|
| **O texto dizia "as três de cima" mesmo com 2 cards.** O resultado pode sair com 1, 2 ou 3. | `FRAMING.outrasAreas` virou função do número de cards. |
| **"Back-end 0" na lista de vertentes preteridas.** Um zero seco lê como reprovação — o oposto do que a lista existe pra dizer. | Nota removida dali. Só nome, descrição e uma frase dizendo que continuam abertas. |
| **O aviso de "não é veredito" aparecia 3 vezes.** Repetição tira força. | O rodapé virou complemento (afinidade ≠ competência) em vez de eco do bloco. |

### Visual

| Problema | Correção |
|---|---|
| **A tela da vertente repetia nome e descrição palavra por palavra** entre o topo e o card. | O card só mostra a descrição quando o topo não mostrou (empate, ou 2ª vertente). Ganhou também a barra que os cards principais têm. |
| **Hierarquia entre card 1 e 2 fraca:** só 1px de borda de diferença, imperceptível no celular. | Card 1 ganhou faixa vermelha de 6px, número em bloco vermelho e título maior; os outros recuam. |
| **Raio de borda era 0px, e este documento especificava 0.25rem.** Não havia uma única classe `rounded` no projeto. | Aplicado 0.25rem, igual ao portfólio. |
| **"ver as outras N áreas" tinha 20px de alvo de toque** e nenhum sinal de que abre/fecha. | Classe `.disclosure`: 44px de altura e indicador `+` / `−`. |
| **No mobile o cabeçalho do afunilamento truncava** em "AFUNILANDO DESEN…". | O nome da área saiu da barra superior e foi pra linha de baixo. |
| **Múltipla escolha tinha a mesma aparência da escolha única.** | Quadradinho marcável só nas de múltipla. |
| **Possível estouro de 16px durante a animação de entrada.** | `overflow-x: hidden` também no `html` — só no `body` não segura em todo navegador móvel. |

### O que foi verificado e mantido

- **Os três vermelhos diferentes são de propósito**, e é acessibilidade, não descuido. `--primary` `#E76F51` para preenchimentos, `--primary-ink` (mais escuro, 6:1 sobre creme) para texto pequeno, `--primary-display` para texto grande. Usar o vermelho cheio em texto pequeno daria 3,8:1 e reprovaria em contraste.
- **"Transição de carreira" aparecer em C1 e C4** vem da especificação original, onde as duas perguntas existem. São coisas diferentes: onde a pessoa está e o que ela procura.

### Testes novos

5 testes de regressão cobrindo exatamente esses bugs, entre eles `'ver seu recorte' mostra o recorte, não a pergunta 1 de novo` e `retomar é a ação principal`.

Um deles expôs uma armadilha que vale registrar: a tela de pergunta tem um link *"voltar ao resultado"* e a de resultado um botão *"Voltar ao resultado"*. Um seletor com `/i` pega os dois — e no teste isso cancelava o afunilamento dentro da janela de 240 ms, descartando a última resposta. Os seletores agora são exatos e sensíveis a caixa.

---

## 18. Correções da bateria de QA

Uma bateria de 48 cenários (167 asserções) rodou contra a lógica real. A recomendação passou em tudo que era essencial — 12 perfis arquétipo coerentes, determinismo, simetria, invariância em 262 pares, contexto sem influência. Cinco itens foram corrigidos.

### Robustez: `NaN` a partir do storage

O `localStorage` era a única entrada não confiável e não tinha validação de valores. Uma resposta com valor estranho fazia `peso × valor` virar `NaN`:

```
q01 = 99    →  DEV = 335,6   (fora de 0-100)
q01 = "x"   →  DEV = NaN     (renderizava "NaN" no card)
```

Não é só adulteração por DevTools: storage escrito pela metade, quota estourada ou mudança futura de schema produzem o mesmo.

Corrigido em **duas camadas**. `load()` valida item a item — resposta fora de −2..2 é descartada, `index` é limitado à faixa, `stage` só aceita valores conhecidos, `context` só aceita strings. E `scoring.ts` ganhou `multiplicador()`, que trata qualquer coisa fora do domínio como "não respondeu". A segunda camada existe porque a garantia de não gerar `NaN` pertence a quem faz a conta, não a quem chama.

### Coerência: perfil afirmativo com áreas silenciadas

Um perfil com 27 das 35 respostas neutras produzia isto na mesma tela:

```
perfil: "Estrategista"     ← afirmativo
inconclusivo: true         ← cards silenciados, rótulos ocultos
aviso: "o resultado tem pouco a dizer"
```

`uniform` disparava `inconclusive` mas não o perfil Explorador. As duas metades se contradiziam. Agora `uniform` também leva a Explorador, e um teste garante a regra geral: **resultado inconclusivo nunca vem com perfil afirmativo**.

### Honestidade: pódio com "não combina" em tudo

Quem respondia "não combina" em tudo recebia PM, Suporte e Produto no topo. Matematicamente correto — são as áreas com mais pesos invertidos — mas o pódio era artefato da matriz, não afinidade.

Agora esse caso **não devolve card nenhum**. O aviso explica, e o ranking completo das 13 continua acessível. Sugerir área para quem não demonstrou interesse em nada seria inventar preferência.

### Acessibilidade: contraste de borda

A borda dava 1,36:1 contra o creme, e a WCAG 1.4.11 exige 3:1 para limites de componente de interface. Como o `surface` fica a 1,06:1 do fundo, o botão praticamente não tinha contorno para quem enxerga pouco.

Novo token `--border-strong` (3,4:1 sobre creme, 3,2:1 sobre surface, 3,4:1 sobre o preto no bloco escuro), aplicado só a **componentes clicáveis** — botões de escala, chips e os blocos de "ver mais". A borda decorativa dos cards continua suave: a norma trata de componentes, não de divisórias.

As outras 9 verificações de contraste já passavam, incluindo os três vermelhos.

### Documentação: desempate por lista fixa

O desempate final usa `TIEBREAK_ORDER`, uma lista fixa. Não é alfabética nem ordem de declaração — é intercalada por família. Sortear seria pior, porque o quiz precisa ser reprodutível. E sempre que essa lista decide algo, o resultado já vem marcado inconclusivo, então ninguém recebe o desempate apresentado como afinidade.

### O que a bateria confirmou sem achar problema

- **12 de 12 perfis arquétipo** coerentes, incluindo dev→produto (a ocupação atual não prende o resultado)
- **Determinismo:** 10 execuções idênticas → 1 resultado
- **Simetria:** `+2` e `−2` com efeito exatamente oposto em todas as perguntas × áreas
- **Invariância:** 262 pares (pergunta × área de peso zero) — zero vazamento
- **Contexto:** 20 combinações de origem × situação → 1 resultado
- **Explicações:** 16 justificativas auditadas, todas com contribuição positiva real
- **Limites:** 500 perfis aleatórios — sempre 1 a 3 áreas, zero duplicadas
- **Superfície de injeção:** zero campos de texto livre no quiz inteiro
- **Cálculo:** 0,1 ms por resultado

---

## 19. Ponte de transição: cobertura e honestidade

A ponte de repertório caía no texto genérico em **29% das combinações** (41 de 143: 13 áreas × 11 origens). Pior em Desenvolvimento (6 de 11) e Cibersegurança, que declaravam só 3 tags cada.

### Correção 1 — tags derivadas da matriz, não do gosto

Em vez de escolher tags por intuição, derivei da própria matriz de pesos: se as perguntas dizem que uma área valoriza algo, ela deveria declarar aquilo. Cada tag foi mapeada às perguntas que a encarnam, e só entraram as adições com peso ≥ 2 na área.

| Área | Tag nova | Sustentada por |
|---|---|---|
| DEV | `estetica`, `investigacao` | q14 detalhes visuais (DEV:2); q02 e q20 investigar (DEV:2) |
| AI | `experimentacao`, `criacao` | q03 e q34 testar e medir (AI:2); q33 criar do zero (AI:2) |
| SUP | `organizacao`, `escrita` | q35 organizar informação (SUP:2); q30 escrever guias |
| QA | `experimentacao` | q03 testar até funcionar (QA:3) |
| PROD | `pessoas` | q07 entender o que precisam (PROD:3); q09 negociar (PROD:3) |
| BA | `pessoas`, `organizacao` | q07 (BA:3); q09 (BA:2); q35 (BA:2) |
| PM | `negocio` | q28 o que vem primeiro (PM:3) |
| GROWTH | `calculo` | q10 métricas (GROWTH:3) |
| DOCS | `detalhe` | q25 perceber errinhos (DOCS:2) |

Fallback caiu para **24%**, e Desenvolvimento de 6 para 4 de 11.

**O script também sugeriu remoções — e todas foram descartadas.** Ele acusou "Dados não sustenta `investigacao`", mas isso é artefato do mapeamento: as perguntas que usei para essa tag são de depurar sistema (q02, q20), não de investigar dado. Analista de dados investiga, obviamente. Mesma coisa em Growth × `publico`. A ferramenta serve para sugerir, não para decidir.

### Correção 2 — quando não há ponte, dizer isso

Marketing × Desenvolvimento continua sem interseção, e **deve continuar**. As tags de Marketing são métricas, público, comunicação e experimentação medida — e a matriz diz explicitamente que Desenvolvimento não valoriza a última (q34 tem peso 0 em DEV). Forçar ali seria inventar repertório que não existe.

O texto genérico antigo soava como encolher de ombros:

> Áreas de TI recebem gente de todo tipo de formação — o que pesa aqui é interesse, e o resto se aprende.

Agora nomeia origem e área, e assume a ausência:

> Você vem de Marketing, e entre Marketing e Desenvolvimento de Software não existe um atalho óbvio de repertório. O que te leva pra lá é interesse, não bagagem anterior — e isso basta: quase todo mundo que trabalha com isso hoje começou sem saber nada.

Três testes travam isso: a variante específica aparece quando há interseção, a de ausência aparece quando não há, e **nenhuma das 11 origens produz texto que prometa facilidade ou emprego**.

Medir depois de mexer em tags: `npx vite-node analise/pontes.ts`.

---

## 20. A tela inicial fala com quem vem de fora

A preocupação: quem vem de marketing ou administração pode achar que só existe um caminho pra ela, ou que precisa ser da área pra fazer o quiz.

### A primeira metade não era problema de lógica

Medido: **mesma origem (Marketing), perfis de resposta diferentes alcançam 12 das 13 áreas.**

| Perfil de respostas | Resultado |
|---|---|
| curte tela e detalhe visual | UX |
| curte número e experimento | DATA · GROWTH · AI |
| curte priorizar e negociar | PROD · BA · PM |
| curte achar erro e critério | QA · SEC |
| curte explicar e escrever | DOCS |
| curte construir e automatizar | DEV · CLOUD · AI |
| curte organizar e prazo | PM · BA |
| curte investigar e proteger | SEC |

Administração idem. Não existe funil — o contexto não entra no cálculo, e um teste já travava isso. O risco era de percepção, não de matemática.

### A segunda era, e ficava na entrada

Um quiz chamado "qual área de TI combina com você" faz a pessoa de fora presumir que precisa ser de TI. Se a primeira tela não desarma isso, ela fecha antes de responder — e é exatamente pra ela que o quiz existe.

A intro ganhou um bloco em destaque:

> **Não precisa ser da área.**
> Muita gente que trabalha com tecnologia hoje veio de marketing, administração, design, sala de aula. Ninguém aqui pergunta o que você já sabe.

E a linha de apoio passou a prometer pluralidade desde o começo: *"No fim, até 3 áreas pra explorar — não uma resposta só."*

### O custo, medido e corrigido

O bloco novo empurrou o botão **abaixo da dobra** em 1440×700 (notebook comum) e 375×667 (iPhone SE). Introduzir um texto de acolhimento que esconde o botão de começar seria trocar um problema por outro pior.

Corrigido apertando o respiro (`py-16` → `py-8 sm:py-10`, gaps de 32px → 24px) e removendo o rodapé *"Não é teste de carreira. É um ponto de partida."*, que virou eco do bloco novo.

| Viewport | Antes | Depois |
|---|---|---|
| 1440×700 | escondido | visível, 17px de folga |
| 1280×720 | — | visível, 32px |
| 375×667 | escondido | visível, 6px |
| 390×844 | visível | visível, 114px |
| 360×640 | escondido | ainda escondido, 21px |

360×640 ficou de fora de propósito: ganhar essa tela exigiria cortar justamente a mensagem que motivou a mudança, e o bloco continua visível acima do botão de qualquer forma.

---

## 21. O que falta decidir com você

1. **Nome e domínio.** `quiz.dudadias.dev`? Algo na linha de `descobre.java`?
2. **Captura de e-mail no final?** Hoje o desenho é 100% anônimo, sem backend. Se você quiser lista de e-mail, a arquitetura muda (passa a precisar de um serviço).
3. **Compartilhamento com imagem?** Gerar um card PNG do resultado pro story do Instagram é bem viável, mas é trabalho a mais.
4. **Revisão do conteúdo.** Principalmente as 35 perguntas e os textos das 13 áreas — é a parte que mais vale seu olho antes de virar código.

---

*Aprovado isto, implemento o app completo na stack da seção 12.*
