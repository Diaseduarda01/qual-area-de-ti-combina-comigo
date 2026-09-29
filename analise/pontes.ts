/**
 * Mede quantas vezes a ponte de transição cai no texto genérico.
 *
 * Cada área declara tags de repertório; cada origem também. Sem interseção, a
 * pessoa recebe "áreas de TI recebem gente de todo tipo de formação" em vez de
 * uma frase que fala dela. Rodar depois de mexer em tags.
 */
import { AREAS, AREA_IDS } from "@/data/areas";
import { ORIGIN_TAGS } from "@/data/context";

const origens = Object.keys(ORIGIN_TAGS);
const curto = (o: string) => o.split(/[ ,]/)[0].slice(0, 7);

console.log(`\n${"área".padEnd(7)} ${origens.map(curto).map((o) => o.padEnd(8)).join("")}  genérico`);
let totalFallback = 0;
const porArea: Record<string, number> = {};
for (const a of AREA_IDS) {
  const linha: string[] = [];
  let f = 0;
  for (const o of origens) {
    const comum = ORIGIN_TAGS[o].filter((t) => AREAS[a].tags.includes(t));
    if (comum.length === 0) { linha.push("·".padEnd(8)); f++; totalFallback++; }
    else linha.push(String(comum.length).padEnd(8));
  }
  porArea[a] = f;
  console.log(`${a.padEnd(7)} ${linha.join("")}  ${f}/${origens.length}${f >= 5 ? "  <-- muito genérico" : ""}`);
}
console.log(`\ntags por área:`);
for (const a of AREA_IDS) console.log(`  ${a.padEnd(7)} (${AREAS[a].tags.length}) ${AREAS[a].tags.join(", ")}`);
console.log(`\nfallback total: ${totalFallback}/${AREA_IDS.length * origens.length} combinações (${((totalFallback / (AREA_IDS.length * origens.length)) * 100).toFixed(0)}%)`);
