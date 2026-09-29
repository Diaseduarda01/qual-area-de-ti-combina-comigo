# Quiz de Áreas de TI — devduda_

Quiz que indica até 3 áreas de tecnologia com mais afinidade com o jeito da pessoa
trabalhar. 35 perguntas, ~5 minutos, sem termo técnico e sem precisar saber programar.

Público: quem estuda TI, quem trabalha em TI, e principalmente quem vem de fora —
Marketing, Administração, Design, Comunicação, RH, Engenharia, transição de carreira
ou só curiosidade.

## Rodar

```bash
npm install
npm run dev      # http://localhost:8080
npm test         # 21 testes da lógica de pontuação
npm run build    # build estático em dist/
```

Sem backend e sem coleta de dado: tudo roda no navegador, e o progresso fica em
`localStorage` só pra não se perder se a aba fechar.

## Onde mexer

| Quero mudar | Arquivo |
|---|---|
| Texto das perguntas, pesos, ordem de exibição | `src/data/questions.ts` |
| Nome, descrição e sugestões das áreas | `src/data/areas.ts` |
| Vertentes do afunilamento e suas perguntas | `src/data/branches.ts` |
| Perfis e os eixos que os calculam | `src/data/profiles.ts` |
| Perguntas de contexto e textos de transição | `src/data/context.ts` |
| Regra de seleção, empate, casos de borda | `src/lib/scoring.ts` |
| Pontuação das vertentes | `src/lib/branchScoring.ts` |
| Cores, tipografia, tokens | `src/index.css` |

## Duas etapas

O quiz principal (35 perguntas) diz **quais áreas** combinam com a pessoa. Cada
card do resultado abre uma segunda etapa opcional de **6 perguntas novas** que
diz **que tipo** dentro daquela área — front-end, back-end ou mobile, dentro de
Desenvolvimento; UI, research ou product design, dentro de UX. São 37 vertentes
no total.

A segunda etapa existe porque o quiz principal genuinamente não consegue
responder isso: só duas das 35 perguntas tocam a fronteira front/back. Derivar
"você é front-end" dali seria chute com cara de resultado.

A decisão de produto por trás de cada número está em
[`ARQUITETURA_QUIZ.md`](./ARQUITETURA_QUIZ.md) — leia antes de mudar peso ou limiar,
porque quase todos foram escolhidos por um motivo específico.

## O que os testes protegem

São três arquivos com papéis diferentes:

| Arquivo | O que prova |
|---|---|
| `src/lib/scoring.test.ts` | a conta das 13 áreas está certa e é justa |
| `src/lib/branchScoring.test.ts` | a conta das 37 vertentes está certa |
| `src/test/fluxo.dom.test.tsx` | as telas estão ligadas nessa conta |

O de fluxo renderiza o app de verdade e percorre da abertura ao resultado e ao
afunilamento — clicando nos botões, como uma pessoa faria. Ele pega o tipo de
quebra que teste de lógica não pega: botão que não aparece, tela que não avança,
texto que some.

As invariantes travadas, que se quebrarem produzem resultado errado **sem**
quebrar a tela:

- toda pergunta diferencia ≥ 2 áreas, e toda área é tocada por ≥ 12 perguntas;
- duas perguntas seguidas nunca são da mesma família (senão a pessoa percebe o
  padrão e responde o que acha que dá o resultado que ela quer);
- neutro em tudo dá exatamente 50 em todas as áreas;
- a normalização compensa áreas de tamanhos diferentes (CLOUD tem `Smax` 46 e PROD
  tem 68 — sem normalizar, PROD venceria quase sempre);
- os cenários da seção 13 do documento continuam dando o mesmo resultado;
- contexto (situação, origem, contato) **não** altera as áreas selecionadas;
- a ponte de transição de carreira nunca promete empregabilidade;
- **nenhuma área vence demais com respostas aleatórias** (3.000 simulações) —
  esse é o que impede o viés estrutural de voltar sem ninguém perceber;
- nenhuma área é decidida por 3 perguntas pesadas (concentração ≤ 42%);
- no afunilamento, toda pergunta separa ≥ 2 vertentes e toda vertente é
  alcançada por ≥ 2 perguntas.

## Identidade visual

Creme `#F7F5F0` + preto `#171717` + vermelho `#E76F51`, Bricolage Grotesque para
títulos, Inter para corpo, JetBrains Mono nos detalhes. Os tokens são os mesmos do
`portfolio/`. Roxo e azul ficam de fora: o quiz é curto demais pra comportar cor
secundária sem virar ruído.
