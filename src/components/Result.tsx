import { useState } from "react";
import { motion } from "framer-motion";
import { AreaCard } from "@/components/AreaCard";
import { AREAS } from "@/data/areas";
import { FRAMING } from "@/data/context";
import type { QuizResult } from "@/lib/scoring";
import type { AreaId } from "@/types";

interface ResultProps {
  result: QuizResult;
  onRestart: () => void;
  onAfunilar: (area: AreaId) => void;
  branchDone: (area: AreaId) => boolean;
}

function shareText(result: QuizResult): string {
  // sem áreas o texto não pode virar "Áreas pra explorar: ."
  if (result.areas.length === 0) {
    return "Fiz o quiz de áreas de TI — minhas respostas ainda não apontaram pra um lado. Faz o seu:";
  }
  const areas = result.areas.map((a) => a.area.name).join(", ");
  return `Meu perfil no quiz de áreas de TI: ${result.profile.name}. Áreas pra explorar: ${areas}.`;
}

export function Result({ result, onRestart, onAfunilar, branchDone }: ResultProps) {
  const [copied, setCopied] = useState(false);

  const destaque = new Set(result.areas.map((a) => a.area.id));
  const restante = result.ranking.filter((s) => !destaque.has(s.area));

  const share = async () => {
    const text = `${shareText(result)}\n${window.location.href}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Qual área de TI combina com você?", text });
        return;
      } catch {
        // pessoa cancelou o menu de compartilhar: cai pro copiar
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // sem clipboard (http, permissão negada) não há o que fazer além de ignorar
    }
  };

  return (
    <div className="pb-20">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="on-ink bg-background py-14 text-foreground"
      >
        <div className="shell">
          <p className="tag">// resultado.java</p>
          <p className="tag mt-8">Seu perfil</p>
          <h1 className="mt-2 text-display uppercase text-[hsl(var(--primary-display))]">
            {result.profile.name}
          </h1>
          {result.secondaryProfile && (
            <p className="mt-2 font-mono text-sm text-[hsl(var(--muted-foreground))]">
              com um traço forte de {result.secondaryProfile.name}
            </p>
          )}
          <p className="mt-6 max-w-[52ch] text-lede">{result.profile.text}</p>
        </div>
      </motion.section>

      {/* o quiz sugere, não decide — isso precisa vir antes dos cards, não no rodapé */}
      <div className="shell pt-10">
        <div className="border-l-2 border-primary bg-surface p-5 sm:p-6">
          <p className="font-display text-subtitle">Isso é uma ideia, não um diagnóstico.</p>
          <p className="mt-3 max-w-[60ch] text-[hsl(var(--muted-foreground))]">
            {FRAMING.naoEhVeredito}
          </p>
        </div>
      </div>

      <div className="shell pt-12">
        {result.notice && (
          <p className="mb-10 border-l-2 border-[hsl(var(--primary-ink))] bg-surface p-5 text-sm">
            {result.notice}
          </p>
        )}

        {/* sem cards quando quase nada agradou: sugerir área ali seria inventar
            preferência que a pessoa não demonstrou */}
        {result.areas.length > 0 && (
          <>
            <h2 className="text-title uppercase">
              {result.inconclusive ? "Por onde começar a olhar" : "Áreas pra você explorar"}
            </h2>
            <p className="mt-3 max-w-[56ch] text-sm text-[hsl(var(--muted-foreground))]">
              {FRAMING.subtituloAreas}
            </p>

            <div className="mt-6 flex flex-col gap-4">
              {result.areas.map((selected, index) => (
                <AreaCard
                  key={selected.area.id}
                  selected={selected}
                  position={index + 1}
                  muted={result.inconclusive}
                  onAfunilar={() => onAfunilar(selected.area.id)}
                  afunilada={branchDone(selected.area.id)}
                />
              ))}
            </div>
          </>
        )}

        {/* mostrar o ranking inteiro é o que tira o ar de veredito: nada fica
            escondido, e a pessoa vê que "não apareceu" != "está fora" */}
        {restante.length > 0 && (
          <details className="group mt-8 border border-[hsl(var(--border-strong))] bg-surface p-5 sm:p-6">
            <summary className="disclosure">
              <span className="underline underline-offset-4">
                {result.areas.length === 0
                  ? `ver como as ${restante.length} áreas ficaram`
                  : `ver as outras ${restante.length} áreas`}
              </span>
            </summary>

            <p className="mt-4 max-w-[60ch] text-sm text-[hsl(var(--muted-foreground))]">
              {FRAMING.outrasAreas(result.areas.length)}
            </p>

            <ol className="mt-5 flex flex-col gap-2">
              {restante.map((score, index) => (
                <li key={score.area} className="flex items-center gap-3 text-sm">
                  <span className="tag w-6 shrink-0">
                    {String(result.areas.length + index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">{AREAS[score.area].name}</span>
                  <span
                    className="hidden h-1 w-24 shrink-0 bg-border sm:block"
                    aria-hidden
                  >
                    <span
                      className="block h-full bg-[hsl(var(--primary-ink))] opacity-50"
                      style={{ width: `${score.n}%` }}
                    />
                  </span>
                  <span className="w-7 shrink-0 text-right font-mono text-xs text-[hsl(var(--muted-foreground))]">
                    {Math.round(score.n)}
                  </span>
                </li>
              ))}
            </ol>
          </details>
        )}

        {result.framing.map((text) => (
          <p key={text} className="mt-8 border-l-2 border-[hsl(var(--primary-ink))] pl-4">
            {text}
          </p>
        ))}

        <p className="mt-10 text-sm text-[hsl(var(--muted-foreground))]">{result.footer}</p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={share}
            className="bg-primary px-8 py-4 font-display text-base uppercase tracking-tight text-primary-foreground transition-transform active:scale-[0.99]"
          >
            {copied ? "Copiado!" : "Compartilhar"}
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="flex min-h-11 items-center font-mono text-sm text-[hsl(var(--primary-ink))] underline underline-offset-4"
          >
            refazer o quiz
          </button>
        </div>

        <p className="tag mt-16">dudadias.java</p>
      </div>
    </div>
  );
}
