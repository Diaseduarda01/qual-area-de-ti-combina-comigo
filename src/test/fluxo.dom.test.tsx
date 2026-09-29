import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/App";
import { BRANCHES } from "@/data/branches";
import { CONTEXT_QUESTIONS } from "@/data/context";
import { QUESTIONS_IN_ORDER, SCALE } from "@/data/questions";
import type { Answers, LikertValue } from "@/types";

/**
 * Percorre o app de verdade, do começo ao resultado e ao afunilamento.
 *
 * Os testes de `scoring` provam que a conta está certa; estes provam que as
 * telas estão ligadas nela — que o botão existe, que ele leva a algum lugar e
 * que o que aparece na tela é o que a lógica calculou.
 */

const rotulo = (valor: LikertValue) => SCALE.find((s) => s.value === valor)!.label;

/**
 * Atalho: deixa 34 das 35 já respondidas no storage e retoma dali.
 *
 * Existe porque percorrer as 35 na tela custa ~10 s (cada resposta espera os
 * 240 ms de confirmação). O teste `vai da abertura ao resultado` faz o caminho
 * inteiro de verdade; os outros usam este atalho pra testar o que vem depois.
 */
function semearRespostas(mapa: Record<string, LikertValue>) {
  const answers: Answers = {};
  // a última fica de fora de propósito: é o estado real de quem parou na 35ª
  for (const q of QUESTIONS_IN_ORDER.slice(0, -1)) answers[q.id] = mapa[q.id] ?? 0;
  localStorage.setItem(
    "quiz-areas-ti:v1",
    JSON.stringify({ answers, context: {}, index: QUESTIONS_IN_ORDER.length - 1, stage: "questions" }),
  );
}

/** Retoma do storage e vai direto ao resultado. */
async function irAoResultado(mapa: Record<string, LikertValue>) {
  semearRespostas(mapa);
  render(<App />);
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: /^Continuar \(34\/35\)$/i }));

  const ultima = QUESTIONS_IN_ORDER[QUESTIONS_IN_ORDER.length - 1];
  await screen.findByText(ultima.text);
  await user.click(screen.getByRole("button", { name: rotulo(mapa[ultima.id] ?? 0) }));

  for (const c of CONTEXT_QUESTIONS) {
    await screen.findByText(c.text);
    await user.click(screen.getByRole("button", { name: /^(Continuar|Ver meu resultado)$/i }));
  }
  return user;
}

/** Responde o quiz principal inteiro, com o mapa de respostas por id. */
async function responderQuizPrincipal(mapa: Record<string, LikertValue>) {
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: /^Começar$/i }));

  for (const q of QUESTIONS_IN_ORDER) {
    // esperar a pergunta aparecer é obrigatório: a tela só avança 240 ms depois
    // do clique, e nessa janela um segundo clique é ignorado de propósito.
    // Sem esperar, o teste clicaria duas vezes na mesma pergunta e travaria.
    await screen.findByText(q.text);
    await user.click(screen.getByRole("button", { name: rotulo(mapa[q.id] ?? 0) }));
  }

  // as 4 telas de contexto: passa por todas, já que não afetam o cálculo
  for (const c of CONTEXT_QUESTIONS) {
    await screen.findByText(c.text);
    await user.click(screen.getByRole("button", { name: /^(Continuar|Ver meu resultado)$/i }));
  }
  return user;
}

/** Perfil que puxa forte pra Desenvolvimento, pelo lado visual (front-end). */
const PERFIL_DEV_VISUAL: Record<string, LikertValue> = {
  q17: 2, q18: 2, q01: 2, q32: 2, q03: 2, q19: 1,
  q14: 2, q15: 2, q16: 2, q33: 2, q25: 2, q07: 1,
  q09: -2, q28: -2, q29: -2, q31: -2, q10: -2, q11: -2, q12: -2,
};

beforeEach(() => {
  localStorage.clear();
});

describe("fluxo completo na tela", () => {
  it("vai da abertura ao resultado e mostra as 13 áreas", async () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /QUAL ÁREA/i })).toBeInTheDocument();
    await responderQuizPrincipal(PERFIL_DEV_VISUAL);

    // o enquadramento precisa aparecer ANTES dos cards, não no rodapé
    expect(await screen.findByText(/Isso é uma ideia, não um diagnóstico/i)).toBeInTheDocument();
    expect(screen.getByText(/Não é ranking de talento/i)).toBeInTheDocument();

    // nada escondido: as áreas que não entraram no top 3 continuam visíveis
    const outras = screen.getByText(/ver as outras \d+ áreas/i);
    expect(outras).toBeInTheDocument();
    expect(screen.getByText(/Nenhuma delas foi descartada/i)).toBeInTheDocument();

    // 3 cards em destaque + o restante listado = 13 áreas no total
    const cards = screen.getAllByRole("article");
    const listadas = within(outras.closest("details")!).getAllByRole("listitem");
    expect(cards.length + listadas.length).toBe(13);
  });

  it("a escala fala em 'combina', não em 'gosto'", async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /^Começar$/i }));

    expect(screen.getByRole("button", { name: "Combina muito comigo" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Não combina" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Gosto muito" })).not.toBeInTheDocument();
  });
});

describe("afunilamento na tela", () => {
  it("o card oferece afunilar, e as 6 perguntas levam a uma vertente", async () => {
    const user = await irAoResultado(PERFIL_DEV_VISUAL);

    const botao = await screen.findByRole("button", {
      name: /que tipo de Desenvolvimento de Software\?/i,
    });
    await user.click(botao);

    // responde as 6 do jeito que caracteriza front-end
    const respostas: Record<string, LikertValue> = {
      dev1: 2, dev2: 2, dev3: -2, dev4: -2, dev5: 1, dev6: -2,
    };
    for (const q of BRANCHES.DEV!.questions) {
      expect(await screen.findByText(q.text)).toBeInTheDocument();
      await user.click(screen.getByRole("button", { name: rotulo(respostas[q.id]) }));
    }

    expect(await screen.findByRole("heading", { name: /^Front-end$/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Dentro de Desenvolvimento de Software/i)).toBeInTheDocument();
    // as outras vertentes continuam visíveis, mesma regra do quiz principal
    expect(screen.getByText(/ver as outras vertentes/i)).toBeInTheDocument();
    expect(screen.getByText(/Seis perguntas dão um recorte, não um veredito/i)).toBeInTheDocument();
  });

  it("avisa sobre a fronteira com UX quando UX também pontuou bem", async () => {
    const user = await irAoResultado(PERFIL_DEV_VISUAL);

    await user.click(
      await screen.findByRole("button", { name: /que tipo de Desenvolvimento de Software\?/i }),
    );
    const respostas: Record<string, LikertValue> = {
      dev1: 2, dev2: 2, dev3: -2, dev4: -2, dev5: 1, dev6: -2,
    };
    for (const q of BRANCHES.DEV!.questions) {
      await screen.findByText(q.text);
      await user.click(screen.getByRole("button", { name: rotulo(respostas[q.id]) }));
    }

    // esse perfil é visual, então UX pontua alto — a nota de vizinhança aparece
    expect(await screen.findByText(/Front-end e UX vivem colados/i)).toBeInTheDocument();
  });

  it("volta pro resultado, e o card lembra que já foi afunilado", async () => {
    const user = await irAoResultado(PERFIL_DEV_VISUAL);

    await user.click(
      await screen.findByRole("button", { name: /que tipo de Desenvolvimento de Software\?/i }),
    );
    for (const q of BRANCHES.DEV!.questions) {
      await screen.findByText(q.text);
      await user.click(screen.getByRole("button", { name: rotulo(2) }));
    }

    // esperar o resultado da vertente antes de sair: a tela de pergunta tem um
    // link "voltar ao resultado" quase homônimo, e sair ali descartaria a 6ª
    // resposta, que ainda está na janela de confirmação
    await screen.findByText(/Dentro de Desenvolvimento de Software/i);
    await user.click(screen.getByRole("button", { name: "Voltar ao resultado" }));

    expect(await screen.findByText(/Áreas pra você explorar/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /ver seu recorte de Desenvolvimento de Software/i }),
    ).toBeInTheDocument();
  });

  it("dá pra desistir no meio do afunilamento sem perder o resultado", async () => {
    const user = await irAoResultado(PERFIL_DEV_VISUAL);

    await user.click(
      await screen.findByRole("button", { name: /que tipo de Desenvolvimento de Software\?/i }),
    );
    await screen.findByText(BRANCHES.DEV!.questions[0].text);
    await user.click(screen.getByRole("button", { name: /voltar ao resultado/i }));

    expect(await screen.findByText(/Áreas pra você explorar/i)).toBeInTheDocument();
  });

  it("'ver seu recorte' mostra o recorte, não a pergunta 1 de novo", async () => {
    const user = await irAoResultado(PERFIL_DEV_VISUAL);

    await user.click(
      await screen.findByRole("button", { name: /que tipo de Desenvolvimento de Software\?/i }),
    );
    for (const q of BRANCHES.DEV!.questions) {
      await screen.findByText(q.text);
      await user.click(screen.getByRole("button", { name: rotulo(2) }));
    }
    // esperar o resultado da vertente antes de sair: a tela de pergunta tem um
    // link "voltar ao resultado" quase homônimo, e sair ali descartaria a 6ª
    // resposta, que ainda está na janela de confirmação
    await screen.findByText(/Dentro de Desenvolvimento de Software/i);
    await user.click(screen.getByRole("button", { name: "Voltar ao resultado" }));

    await user.click(
      await screen.findByRole("button", { name: /ver seu recorte de Desenvolvimento de Software/i }),
    );

    // tem que cair direto no resultado da vertente, sem passar pelas 6 de novo
    expect(await screen.findByText(/Dentro de Desenvolvimento de Software/i)).toBeInTheDocument();
    expect(screen.queryByText(BRANCHES.DEV!.questions[0].text)).not.toBeInTheDocument();
  });
});

describe("retomar", () => {
  it("quem já terminou volta pro resultado, não pra última pergunta", async () => {
    // simula quem fechou a aba com o resultado na tela
    const answers: Answers = {};
    for (const q of QUESTIONS_IN_ORDER) answers[q.id] = PERFIL_DEV_VISUAL[q.id] ?? 0;
    localStorage.setItem(
      "quiz-areas-ti:v1",
      JSON.stringify({ answers, context: {}, index: QUESTIONS_IN_ORDER.length - 1, stage: "result" }),
    );

    render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /^Ver meu resultado$/i }));

    expect(await screen.findByText(/Áreas pra você explorar/i)).toBeInTheDocument();
  });

  it("retomar é a ação principal; recomeçar do zero é o link secundário", async () => {
    semearRespostas(PERFIL_DEV_VISUAL);
    render(<App />);

    // o botão grande não pode ser o que apaga o progresso
    expect(screen.getByRole("button", { name: /^Continuar \(34\/35\)$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /começar de novo, do zero/i })).toBeInTheDocument();
  });
});

describe("linguagem do resultado", () => {
  it("o texto das outras áreas acompanha quantos cards saíram", async () => {
    await irAoResultado(PERFIL_DEV_VISUAL);

    const cards = screen.getAllByRole("article").length;
    const esperado = cards === 1 ? /a de cima/ : cards === 2 ? /as duas de cima/ : /as três de cima/;
    expect(screen.getByText(esperado)).toBeInTheDocument();
  });

  it("as vertentes preteridas não levam nota numérica junto do nome", async () => {
    const user = await irAoResultado(PERFIL_DEV_VISUAL);
    await user.click(
      await screen.findByRole("button", { name: /que tipo de Desenvolvimento de Software\?/i }),
    );
    const respostas: Record<string, LikertValue> = {
      dev1: 2, dev2: 2, dev3: -2, dev4: -2, dev5: 1, dev6: -2,
    };
    for (const q of BRANCHES.DEV!.questions) {
      await screen.findByText(q.text);
      await user.click(screen.getByRole("button", { name: rotulo(respostas[q.id]) }));
    }

    // "Back-end 0" lê como reprovação; a lista existe pra dizer o contrário
    const lista = (await screen.findByText(/ver as outras vertentes/i)).closest("details")!;
    expect(within(lista).getByText("Back-end")).toBeInTheDocument();
    expect(within(lista).queryByText("0")).not.toBeInTheDocument();
  });
});

describe("estados de baixa confiança na tela", () => {
  it("quem marcou 'não combina' em tudo não vê pódio, mas vê o ranking", async () => {
    const answers: Answers = {};
    for (const q of QUESTIONS_IN_ORDER) answers[q.id] = -2;
    localStorage.setItem(
      "quiz-areas-ti:v1",
      JSON.stringify({ answers, context: {}, index: 34, stage: "result" }),
    );
    render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /^Ver meu resultado$/i }));

    expect(await screen.findByText(/quase nada aqui despertou interesse/i)).toBeInTheDocument();
    expect(screen.queryAllByRole("article")).toHaveLength(0);
    expect(screen.queryByText(/Áreas pra você explorar/i)).not.toBeInTheDocument();
    // mas nada fica escondido: as 13 continuam listadas
    expect(screen.getByText(/ver como as 13 áreas ficaram/i)).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/NaN|undefined|Infinity/);
  });

  it("storage corrompido não coloca NaN na tela", async () => {
    localStorage.setItem(
      "quiz-areas-ti:v1",
      JSON.stringify({
        answers: { q01: "x", q02: 99, q03: null, q17: 2, q18: 2 },
        context: { origem: 12345 },
        index: 999,
        stage: "resultado-inexistente",
      }),
    );
    render(<App />);
    // o estágio inválido cai em "questions", e as respostas sujas são descartadas
    expect(screen.getByRole("button", { name: /^Continuar \(2\/35\)$/ })).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/NaN|undefined|Infinity/);
  });
});
