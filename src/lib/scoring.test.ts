import { describe, expect, it } from "vitest";
import { AREA_IDS, AREAS, TIEBREAK_ORDER } from "@/data/areas";
import { DISPLAY_ORDER, QUESTIONS } from "@/data/questions";
import { ORIGIN_TAGS } from "@/data/context";
import { AXES } from "@/data/profiles";
import { computeAreaScores, computeResult, SMAX } from "@/lib/scoring";
import type { Answers, LikertValue } from "@/types";

const answerAll = (value: LikertValue): Answers =>
  Object.fromEntries(QUESTIONS.map((q) => [q.id, value]));

const answer = (liked: string[], disliked: string[] = []): Answers => {
  const answers = answerAll(0);
  for (const id of liked) answers[id] = 2;
  for (const id of disliked) answers[id] = -1;
  return answers;
};

const top = (answers: Answers, count = 5) =>
  computeAreaScores(answers)
    .slice(0, count)
    .map((s) => s.area);

describe("integridade dos dados", () => {
  it("toda pergunta diferencia pelo menos duas áreas", () => {
    for (const question of QUESTIONS) {
      const touched = Object.values(question.weights).filter((w) => w !== 0);
      expect(touched.length, `${question.id} toca poucas áreas`).toBeGreaterThanOrEqual(2);
    }
  });

  it("toda área é tocada por pelo menos 12 perguntas", () => {
    for (const area of AREA_IDS) {
      const count = QUESTIONS.filter((q) => q.weights[area]).length;
      expect(count, `${area} tem poucas perguntas`).toBeGreaterThanOrEqual(12);
    }
  });

  it("nenhuma área é decidida por poucas perguntas pesadas", () => {
    // concentração alta = a área vira refém de 3 respostas, oscila mais e passa
    // a vencer por desenho da matriz, não por afinidade de quem respondeu
    for (const area of AREA_IDS) {
      const pesos = QUESTIONS.map((q) => Math.abs(q.weights[area] ?? 0)).sort((a, b) => b - a);
      const total = pesos.reduce((a, b) => a + b, 0);
      const top3 = pesos.slice(0, 3).reduce((a, b) => a + b, 0);
      expect(top3 / total, `${area} concentra demais o peso`).toBeLessThanOrEqual(0.42);
    }
  });

  it("pesos negativos só existem nas perguntas marcadas como trade-off", () => {
    for (const question of QUESTIONS) {
      const hasNegative = Object.values(question.weights).some((w) => (w ?? 0) < 0);
      if (hasNegative) expect(question.tradeOff, `${question.id}`).toBe(true);
    }
  });

  it("a ordem de exibição cobre todas as perguntas, sem repetir", () => {
    expect(DISPLAY_ORDER).toHaveLength(QUESTIONS.length);
    expect(new Set(DISPLAY_ORDER).size).toBe(QUESTIONS.length);
    expect([...DISPLAY_ORDER].sort()).toEqual(QUESTIONS.map((q) => q.id).sort());
  });

  it("a ordem de exibição nunca põe duas perguntas da mesma família em sequência", () => {
    // se três perguntas de segurança vêm coladas, a pessoa percebe o padrão
    const principal = (id: string) => {
      const weights = QUESTIONS.find((q) => q.id === id)!.weights;
      return AREA_IDS.reduce((best, area) =>
        (weights[area] ?? 0) > (weights[best] ?? 0) ? area : best,
      );
    };
    for (let i = 1; i < DISPLAY_ORDER.length; i++) {
      const previous = AREAS[principal(DISPLAY_ORDER[i - 1])].family;
      const current = AREAS[principal(DISPLAY_ORDER[i])].family;
      expect(current, `posição ${i} repete a família ${previous}`).not.toBe(previous);
    }
  });

  it("a ordem de desempate lista as 13 áreas", () => {
    expect([...TIEBREAK_ORDER].sort()).toEqual([...AREA_IDS].sort());
  });

  it("todo eixo de perfil referencia perguntas existentes", () => {
    const ids = new Set(QUESTIONS.map((q) => q.id));
    for (const axis of AXES) {
      for (const qid of axis.questions) expect(ids.has(qid), `${axis.id} → ${qid}`).toBe(true);
      for (const qid of axis.inverted ?? []) expect(axis.questions).toContain(qid);
    }
  });
});

describe("viés estrutural", () => {
  // com respostas aleatórias nenhuma área deveria vencer mais que as outras.
  // o que passar disso é viés da matriz, não afinidade de ninguém.
  it("nenhuma área vence demais com respostas aleatórias", () => {
    let seed = 20260928;
    const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
    const rodadas = 3000;
    const vitorias: Record<string, number> = Object.fromEntries(AREA_IDS.map((a) => [a, 0]));

    for (let i = 0; i < rodadas; i++) {
      const answers: Answers = Object.fromEntries(
        QUESTIONS.map((q) => [q.id, ([-2, -1, 0, 1, 2] as LikertValue[])[Math.floor(rnd() * 5)]]),
      );
      vitorias[computeAreaScores(answers)[0].area] += 1;
    }

    const esperado = 100 / AREA_IDS.length; // 7,7%
    for (const area of AREA_IDS) {
      const pct = (vitorias[area] / rodadas) * 100;
      expect(pct, `${area} vence ${pct.toFixed(1)}% (esperado ~${esperado.toFixed(1)}%)`).toBeLessThan(12);
      expect(pct, `${area} vence só ${pct.toFixed(1)}% (esperado ~${esperado.toFixed(1)}%)`).toBeGreaterThan(3.5);
    }
  });
});

describe("normalização", () => {
  it("neutro em tudo dá exatamente 50 em todas as áreas", () => {
    for (const score of computeAreaScores(answerAll(0))) expect(score.n).toBe(50);
  });

  it("N fica sempre entre 0 e 100", () => {
    for (const value of [-2, -1, 0, 1, 2] as LikertValue[]) {
      for (const score of computeAreaScores(answerAll(value))) {
        expect(score.n).toBeGreaterThanOrEqual(0);
        expect(score.n).toBeLessThanOrEqual(100);
      }
    }
  });

  it("compensa áreas de tamanhos diferentes", () => {
    // CLOUD tem Smax 46 e PROD tem 68: sem normalizar, PROD venceria quase sempre
    expect(SMAX.CLOUD).toBeLessThan(SMAX.PROD);
    const scores = computeAreaScores(answerAll(1));
    const cloud = scores.find((s) => s.area === "CLOUD")!;
    const prod = scores.find((s) => s.area === "PROD")!;
    expect(cloud.raw).toBeLessThan(prod.raw);
    expect(cloud.n).toBeGreaterThan(prod.n); // PROD paga pelas perguntas de trade-off
  });
});

describe("cenários da seção 13 do documento", () => {
  it("investigação + infra devolve segurança e cloud", () => {
    const answers = answer(
      ["q02", "q18", "q20", "q21", "q22", "q23", "q24", "q25", "q32"],
      ["q07", "q09", "q28", "q29", "q31"],
    );
    expect(top(answers, 2)).toEqual(["SEC", "CLOUD"]);

    const result = computeResult(answers);
    // a 3ª colocada fica a mais de 15 pontos da 1ª: o resultado sai com 2 cards
    expect(result.areas.map((a) => a.area.id)).toEqual(["SEC", "CLOUD"]);
    expect(result.profile.name).toBe("Investigador");
  });

  it("perfil de marketing devolve produto, growth e UX", () => {
    const answers = answer(
      ["q05", "q07", "q10", "q11", "q12", "q15", "q16", "q27", "q28", "q31", "q34"],
      ["q18", "q20", "q21", "q22"],
    );
    const result = computeResult(answers);
    expect(result.areas.map((a) => a.area.id)).toEqual(["PROD", "GROWTH", "UX"]);
  });

  it("aplica o limite de 2 áreas por família", () => {
    const result = computeResult(answerAll(2));
    const families = result.areas.map((a) => a.area.family);
    for (const family of new Set(families)) {
      expect(families.filter((f) => f === family).length).toBeLessThanOrEqual(2);
    }
  });
});

describe("casos de borda", () => {
  it("neutro em tudo não força recomendação", () => {
    const result = computeResult(answerAll(0));
    expect(result.inconclusive).toBe(true);
    expect(result.profile.name).toBe("Explorador");
    expect(result.areas.length).toBeGreaterThan(0); // ainda mostra ponto de partida
    expect(result.notice).toBeTruthy();
  });

  it("gosto muito em tudo vira Explorador e avisa que é por intensidade", () => {
    const result = computeResult(answerAll(2));
    expect(result.profile.name).toBe("Explorador");
    expect(result.notice).toContain("intensidade");
  });

  it("não gosto em tudo não empurra área nenhuma como recomendação", () => {
    const result = computeResult(answerAll(-2));
    expect(result.inconclusive).toBe(true);
    expect(result.notice).toContain("despertou interesse");
  });

  it("é determinístico: as mesmas respostas dão o mesmo resultado", () => {
    const answers = answer(["q01", "q10", "q17", "q25", "q30"]);
    const a = computeResult(answers);
    const b = computeResult(answers);
    expect(a.areas.map((x) => x.area.id)).toEqual(b.areas.map((x) => x.area.id));
  });
});

describe("contexto", () => {
  const answers = answer(["q10", "q11", "q12", "q13", "q34"]);

  it("não altera as áreas selecionadas", () => {
    const sem = computeResult(answers);
    const com = computeResult(answers, {
      situacao: "Trabalho em outra área",
      origem: "Marketing",
      contato: ["Nenhuma"],
    });
    expect(com.areas.map((a) => a.area.id)).toEqual(sem.areas.map((a) => a.area.id));
  });

  it("monta a ponte de repertório pela interseção de tags", () => {
    const result = computeResult(answers, {
      situacao: "Estou em transição de carreira",
      origem: "Marketing",
    });
    const dados = result.areas.find((a) => a.area.id === "DATA");
    expect(dados?.bridge).toContain("Marketing");
    expect(dados?.bridge).toContain("leitura de métricas");
    expect(dados?.bridge).not.toMatch(/fácil|rápido|garant/i); // nada de promessa
  });

  it("não monta ponte pra quem já está em TI", () => {
    const result = computeResult(answers, { situacao: "Trabalho com TI", origem: "Marketing" });
    expect(result.areas.every((a) => a.bridge === undefined)).toBe(true);
    expect(result.framing.join(" ")).toContain("já está em tecnologia");
  });

  it("reconhece quem nunca teve contato com TI", () => {
    const result = computeResult(answers, { situacao: "Estudo outra área", contato: ["Nenhuma"] });
    expect(result.framing.join(" ")).toContain("afinidade, não sobre habilidade");
  });
});

describe("robustez contra estado corrompido", () => {
  // o storage é a única entrada não confiável: basta um valor estranho pra
  // `peso × valor` virar NaN e o card renderizar "NaN"
  const lixo = [99, -99, "x", null, undefined, NaN, Infinity, 1.5, true, {}, []];

  it("valor inválido nunca produz NaN nem nota fora de 0-100", () => {
    for (const mau of lixo) {
      const answers = { ...answerAll(0) } as Record<string, unknown>;
      answers.q01 = mau;
      for (const score of computeAreaScores(answers as Answers)) {
        expect(Number.isFinite(score.n), `q01=${String(mau)} → ${score.area}=${score.n}`).toBe(true);
        expect(score.n).toBeGreaterThanOrEqual(0);
        expect(score.n).toBeLessThanOrEqual(100);
      }
    }
  });

  it("valor inválido é tratado como não respondido, não como zero mágico", () => {
    const comLixo = { ...answerAll(0) } as Record<string, unknown>;
    comLixo.q01 = "x";
    const semQ01 = { ...answerAll(0) };
    delete semQ01.q01;
    expect(computeAreaScores(comLixo as Answers).map((s) => s.n)).toEqual(
      computeAreaScores(semQ01).map((s) => s.n),
    );
  });

  it("o perfil e os eixos também aguentam lixo", () => {
    const answers = { ...answerAll(1) } as Record<string, unknown>;
    answers.q02 = "abc";
    answers.q18 = Infinity;
    const r = computeResult(answers as Answers);
    expect(r.profile.name).toBeTruthy();
    expect(r.areas.every((a) => Number.isFinite(a.n))).toBe(true);
  });
});

describe("coerência entre perfil e confiança", () => {
  it("resultado inconclusivo nunca vem com perfil afirmativo", () => {
    // a tela não pode dizer "você é Estrategista" e silenciar as áreas ao lado
    const casos: Answers[] = [
      answerAll(0),
      answerAll(2),
      answerAll(-2),
      answer(["q10", "q11", "q12", "q27", "q28", "q07", "q14", "q15"]), // 27/35 neutras
    ];
    for (const a of casos) {
      const r = computeResult(a);
      if (r.inconclusive) {
        expect(r.profile.name, "perfil afirmativo com áreas em baixa confiança").toBe("Explorador");
      }
    }
  });
});

describe("quando quase nada agradou", () => {
  it("não monta pódio com as áreas de peso invertido", () => {
    // com tudo em "não combina", quem sobe é só quem tem mais peso negativo
    // (PM, SUP, PROD). Isso é artefato da matriz, não afinidade.
    const r = computeResult(answerAll(-2));
    expect(r.areas).toHaveLength(0);
    expect(r.inconclusive).toBe(true);
    expect(r.notice).toContain("despertou interesse");
    // o ranking completo continua disponível pra quem quiser ver
    expect(r.ranking).toHaveLength(13);
  });

  it("mas um perfil normal continua recebendo suas áreas", () => {
    const r = computeResult(answer(["q17", "q18", "q01", "q32"], ["q07", "q09", "q31"]));
    expect(r.areas.length).toBeGreaterThan(0);
  });
});

describe("ponte de transição quando não há repertório em comum", () => {
  const respostas = answer(["q17", "q18", "q01", "q32"], ["q07", "q09", "q31"]);

  it("assume que não há atalho, em vez de soltar frase genérica", () => {
    // marketing não transfere pra escrever código, e a própria matriz concorda:
    // q34 (experimento medido, o forte de marketing) tem peso 0 em DEV
    const r = computeResult(respostas, {
      situacao: "Estou em transição de carreira",
      origem: "Marketing",
    });
    const dev = r.areas.find((a) => a.area.id === "DEV");
    expect(dev?.bridge).toContain("Marketing");
    expect(dev?.bridge).toContain("Desenvolvimento de Software");
    expect(dev?.bridge).toMatch(/não existe um atalho óbvio/);
  });

  it("nenhuma variante da ponte promete facilidade ou emprego", () => {
    for (const origem of Object.keys(ORIGIN_TAGS)) {
      const r = computeResult(respostas, { situacao: "Estou em transição de carreira", origem });
      for (const a of r.areas) {
        expect(a.bridge, `${origem} → ${a.area.id}`).not.toMatch(
          /fácil|rápido|garant|em poucos meses|certeza de/i,
        );
      }
    }
  });

  it("origens com repertório real recebem a ponte específica", () => {
    // design compartilha repertório visual e criação com desenvolvimento
    const r = computeResult(respostas, {
      situacao: "Estou em transição de carreira",
      origem: "Design",
    });
    const dev = r.areas.find((a) => a.area.id === "DEV");
    expect(dev?.bridge).toMatch(/repertório visual|criação/);
    expect(dev?.bridge).not.toMatch(/não existe um atalho/);
  });
});
