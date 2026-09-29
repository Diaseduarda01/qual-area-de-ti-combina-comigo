/** Gera a tabela de pesos e a de Smax do ARQUITETURA_QUIZ.md a partir do código. */
import { AREA_IDS } from "@/data/areas";
import { QUESTIONS } from "@/data/questions";
import { SMAX } from "@/lib/scoring";

const ordenadas = [...QUESTIONS].sort((a, b) => a.id.localeCompare(b.id));
console.log(`| # | ${AREA_IDS.join(" | ")} |`);
console.log(`|---|${AREA_IDS.map(() => "---").join("|")}|`);
for (const q of ordenadas) {
  const cels = AREA_IDS.map((a) => {
    const w = q.weights[a];
    if (!w) return "";
    const txt = String(w).replace("-", "−");
    return Math.abs(w) >= 3 ? `**${txt}**` : txt;
  });
  console.log(`| ${q.id.slice(1)} | ${cels.join(" | ")} |`);
}
console.log(`\n| Área | Nº de perguntas | \`Smax\` | \`Smin\` |`);
console.log(`|---|---|---|---|`);
for (const a of AREA_IDS) {
  const n = QUESTIONS.filter((q) => q.weights[a]).length;
  console.log(`| ${a} | ${n} | ${SMAX[a]} | −${SMAX[a]} |`);
}
