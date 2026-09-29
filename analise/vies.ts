/**
 * Mede o viés estrutural da matriz: com respostas aleatórias, toda área
 * deveria vencer ~7,7% das vezes (1 em 13). O quanto ela se afasta disso é
 * viés que não vem da pessoa, vem do desenho das perguntas.
 *
 * Rodar depois de mexer em peso ou adicionar pergunta:
 *   npx vite-node analise/vies.ts
 */
import { AREA_IDS } from "@/data/areas";
import { QUESTIONS } from "@/data/questions";
import { computeAreaScores, SMAX } from "@/lib/scoring";
import type { Answers, LikertValue } from "@/types";

let seed = 7;
const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
const aleatorio = (): Answers =>
  Object.fromEntries(
    QUESTIONS.map((q) => [q.id, ([-2, -1, 0, 1, 2] as LikertValue[])[Math.floor(rnd() * 5)]]),
  );

const N = 6000;
const vitorias: Record<string, number> = Object.fromEntries(AREA_IDS.map((a) => [a, 0]));
for (let i = 0; i < N; i++) vitorias[computeAreaScores(aleatorio())[0].area]++;

const esperado = 100 / AREA_IDS.length;
const linhas = AREA_IDS.map((id) => ({
  id,
  nq: QUESTIONS.filter((q) => q.weights[id]).length,
  // concentração: quanto do peso total da área está nas 3 perguntas mais pesadas
  conc:
    QUESTIONS.map((q) => Math.abs(q.weights[id] ?? 0))
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((a, b) => a + b, 0) /
    (SMAX[id] / 2),
  win: (vitorias[id] / N) * 100,
})).sort((a, b) => b.win - a.win);

console.log(`\n${N} respostas aleatórias · esperado por área: ${esperado.toFixed(1)}%\n`);
console.log(`${"área".padEnd(8)} ${"perguntas".padStart(9)} ${"top3/total".padStart(11)} ${"vence".padStart(7)}`);
for (const l of linhas) {
  const alerta = Math.abs(l.win - esperado) > 3 ? "  <-- fora da faixa" : "";
  console.log(
    `${l.id.padEnd(8)} ${String(l.nq).padStart(9)} ${(l.conc * 100).toFixed(0).padStart(10)}% ${(l.win.toFixed(1) + "%").padStart(7)}${alerta}`,
  );
}
const v = linhas.map((l) => l.win);
const m = v.reduce((a, b) => a + b, 0) / v.length;
console.log(
  `\ndesvio entre áreas: ${Math.sqrt(v.reduce((t, x) => t + (x - m) ** 2, 0) / v.length).toFixed(2)} pontos percentuais (quanto menor, mais justa a matriz)`,
);
