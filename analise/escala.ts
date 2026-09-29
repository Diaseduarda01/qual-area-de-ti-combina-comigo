/**
 * A escala é "Gosto muito ... Não gosto". Isso só encaixa em pergunta de
 * PREFERÊNCIA. Pergunta escrita como hábito ("você costuma perceber") ou como
 * disposição ("você teria paciência") não aceita "Gosto muito" como resposta.
 */
import { QUESTIONS } from "@/data/questions";

const PREFERENCIA = /^Você (gosta|gostaria|prefere|se sente bem)/;
const desencaixe = QUESTIONS.filter((q) => !PREFERENCIA.test(q.text));

console.log(`\n${desencaixe.length} de ${QUESTIONS.length} perguntas não são de preferência:\n`);
for (const q of desencaixe) {
  const inicio = q.text.split(" ").slice(0, 4).join(" ");
  console.log(`  ${q.id}  "${inicio}..."`);
  console.log(`        → "Gosto muito" como resposta soa estranho\n`);
}
