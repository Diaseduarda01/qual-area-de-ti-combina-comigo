import { AREAS, AREA_IDS } from "@/data/areas";
import { QUESTIONS } from "@/data/questions";
import { computeResult } from "@/lib/scoring";
import type { Answers, LikertValue } from "@/types";

// gerador determinístico, pra a análise ser reproduzível
let seed = 42;
const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);

const VALORES: LikertValue[] = [-2, -1, 0, 1, 2];

/** Respondente sintético: escolhe 2 "temas" e responde alto neles, morno no resto. */
function respondente(): Answers {
  const a: Answers = {};
  const favoritas = AREA_IDS.filter(() => rnd() < 0.18);
  for (const q of QUESTIONS) {
    const puxa = favoritas.some((ar) => (q.weights[ar] ?? 0) >= 2);
    const base = puxa ? 1.2 : -0.4;
    const ruido = (rnd() - 0.5) * 2.4;
    const v = Math.max(-2, Math.min(2, Math.round(base + ruido)));
    a[q.id] = VALORES.find((x) => x === v)!;
  }
  return a;
}

const N = 4000;
const vitorias: Record<string, number> = {};
const aparicoes: Record<string, number> = {};
const perfis: Record<string, number> = {};
const qtdAreas: Record<number, number> = {};
let inconclusivos = 0;

for (const id of AREA_IDS) { vitorias[id] = 0; aparicoes[id] = 0; }

for (let i = 0; i < N; i++) {
  const r = computeResult(respondente());
  if (r.inconclusive) inconclusivos++;
  qtdAreas[r.areas.length] = (qtdAreas[r.areas.length] ?? 0) + 1;
  perfis[r.profile.name] = (perfis[r.profile.name] ?? 0) + 1;
  if (r.areas[0]) vitorias[r.areas[0].area.id]++;
  for (const a of r.areas) aparicoes[a.area.id]++;
}

const pct = (n: number) => ((n / N) * 100).toFixed(1) + "%";
console.log(`\n=== ${N} respondentes sintéticos ===`);
console.log(`inconclusivos: ${pct(inconclusivos)}`);
console.log(`nº de áreas mostradas:`, Object.entries(qtdAreas).map(([k,v]) => `${k}→${pct(v)}`).join("  "));
console.log(`\nperfis:`, Object.entries(perfis).sort((a,b)=>b[1]-a[1]).map(([k,v]) => `${k} ${pct(v)}`).join("  "));

console.log(`\n${"área".padEnd(8)} ${"1º lugar".padStart(9)} ${"aparece".padStart(9)}  família`);
for (const [id, v] of Object.entries(vitorias).sort((a,b)=>b[1]-a[1])) {
  console.log(`${id.padEnd(8)} ${pct(v).padStart(9)} ${pct(aparicoes[id]).padStart(9)}  ${AREAS[id as never].family}`);
}
