import { describe, expect, it } from "vitest";
import { AREA_IDS } from "@/data/areas";
import { BRANCHES } from "@/data/branches";
import { computeBranchResult } from "@/lib/branchScoring";
import { computeAreaScores } from "@/lib/scoring";
import { QUESTIONS } from "@/data/questions";
import type { Answers, AreaId, LikertValue } from "@/types";

const setDe = (area: AreaId) => BRANCHES[area]!;

const responder = (area: AreaId, mapa: Record<string, LikertValue>): Answers => {
  const answers: Answers = {};
  for (const q of setDe(area).questions) answers[q.id] = mapa[q.id] ?? 0;
  return answers;
};

describe("integridade das vertentes", () => {
  it("toda área tem um conjunto de afunilamento", () => {
    for (const area of AREA_IDS) {
      expect(BRANCHES[area], `${area} não tem vertentes`).toBeDefined();
    }
  });

  it("cada área tem ao menos 2 vertentes e 6 perguntas", () => {
    for (const area of AREA_IDS) {
      const set = setDe(area);
      expect(set.branches.length, `${area}`).toBeGreaterThanOrEqual(2);
      expect(set.questions.length, `${area}`).toBeGreaterThanOrEqual(6);
    }
  });

  it("todo peso aponta pra uma vertente que existe naquela área", () => {
    for (const area of AREA_IDS) {
      const set = setDe(area);
      const ids = new Set(set.branches.map((b) => b.id));
      for (const q of set.questions) {
        for (const alvo of Object.keys(q.weights)) {
          expect(ids.has(alvo), `${area}/${q.id} aponta pra "${alvo}", que não existe`).toBe(true);
        }
      }
    }
  });

  it("toda vertente é alcançada por pelo menos 2 perguntas", () => {
    for (const area of AREA_IDS) {
      const set = setDe(area);
      for (const branch of set.branches) {
        const n = set.questions.filter((q) => q.weights[branch.id]).length;
        expect(n, `${area}/${branch.id} tem ${n} pergunta(s)`).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("toda pergunta separa pelo menos duas vertentes", () => {
    for (const area of AREA_IDS) {
      for (const q of setDe(area).questions) {
        const n = Object.values(q.weights).filter((w) => w !== 0).length;
        expect(n, `${area}/${q.id} não separa nada`).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("ids de pergunta e de vertente não colidem com os do quiz principal", () => {
    const principais = new Set(QUESTIONS.map((q) => q.id));
    for (const area of AREA_IDS) {
      for (const q of setDe(area).questions) {
        expect(principais.has(q.id), `${q.id} colide com o quiz principal`).toBe(false);
      }
    }
  });

  it("toda vizinhança aponta pra uma área real e traz o texto junto", () => {
    for (const area of AREA_IDS) {
      for (const branch of setDe(area).branches) {
        if (!branch.neighbor) continue;
        expect(AREA_IDS).toContain(branch.neighbor);
        expect(branch.neighbor, `${area}/${branch.id} aponta pra si mesma`).not.toBe(area);
        expect(branch.neighborNote, `${area}/${branch.id} sem texto`).toBeTruthy();
      }
    }
  });
});

describe("pontuação da vertente", () => {
  it("separa front-end de back-end em Desenvolvimento", () => {
    const front = computeBranchResult(
      "DEV",
      responder("DEV", { dev1: 2, dev2: 2, dev3: -2, dev4: -1, dev5: 1, dev6: -2 }),
    );
    expect(front!.selected[0].branch.id).toBe("front");

    const back = computeBranchResult(
      "DEV",
      responder("DEV", { dev1: -2, dev2: -1, dev3: 2, dev4: 2, dev5: -2, dev6: 2 }),
    );
    expect(back!.selected[0].branch.id).toBe("back");
  });

  it("separa UI de research em UX", () => {
    const ui = computeBranchResult("UX", responder("UX", { ux2: 2, ux4: 2, ux1: -2, ux5: -2, ux6: -2 }));
    expect(ui!.selected[0].branch.id).toBe("ui");

    const research = computeBranchResult("UX", responder("UX", { ux1: 2, ux5: 2, ux2: -2, ux4: -1 }));
    expect(research!.selected[0].branch.id).toBe("research");
  });

  it("neutro em tudo dá 50 em todas as vertentes e avisa que não há sinal", () => {
    const r = computeBranchResult("DEV", responder("DEV", {}))!;
    for (const s of r.scores) expect(s.n).toBe(50);
    expect(r.notice).toContain("Nenhuma vertente se destacou");
  });

  it("avisa quando as duas primeiras empatam, em vez de fingir que escolheu", () => {
    // gosta de tela E do que roda por trás: front e back sobem quase juntos
    const r = computeBranchResult(
      "DEV",
      responder("DEV", { dev1: 2, dev2: 1, dev3: 1, dev4: 1, dev5: -1, dev6: 1 }),
    )!;
    expect(r.selected.length).toBe(2);
    expect(r.tied).toBe(true);
    expect(r.notice).toContain("empatadas");
  });

  it("mostra no máximo 2 vertentes", () => {
    for (const area of AREA_IDS) {
      const todas = Object.fromEntries(setDe(area).questions.map((q) => [q.id, 2 as LikertValue]));
      const r = computeBranchResult(area, todas)!;
      expect(r.selected.length, `${area}`).toBeLessThanOrEqual(2);
    }
  });

  it("a nota de vizinhança só aparece se a área vizinha pontuou bem", () => {
    const respostas = responder("DEV", { dev1: 2, dev2: 2, dev3: -2, dev5: 1 });

    const semUX = computeBranchResult("DEV", respostas, [])!;
    expect(semUX.selected[0].neighborNote).toBeUndefined();

    // quem gosta de detalhe visual e de pensar em quem usa pontua alto em UX
    const principais: Answers = Object.fromEntries(QUESTIONS.map((q) => [q.id, 0 as LikertValue]));
    for (const id of ["q14", "q15", "q16", "q07", "q33"]) principais[id] = 2;
    const comUX = computeBranchResult("DEV", respostas, computeAreaScores(principais))!;
    expect(comUX.selected[0].branch.id).toBe("front");
    expect(comUX.selected[0].neighborNote).toContain("UX");
  });

  it("avisa quando a pessoa pulou perguntas, em vez de entregar recorte fraco calado", () => {
    const parcial: Answers = { dev1: 2, dev2: 2 };
    const r = computeBranchResult("DEV", parcial)!;
    expect(r.notice).toContain("pulou");
  });
});
