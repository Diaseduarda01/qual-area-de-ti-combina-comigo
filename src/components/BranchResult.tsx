import { motion } from "framer-motion";
import type { BranchResult as BranchResultData } from "@/lib/branchScoring";

interface BranchResultProps {
  result: BranchResultData;
  onBack: () => void;
  onRedo: () => void;
}

export function BranchResult({ result, onBack, onRedo }: BranchResultProps) {
  const principal = result.selected[0];

  return (
    <div className="pb-20">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="on-ink bg-background py-12 text-foreground"
      >
        <div className="shell">
          <p className="tag">// {result.area.toLowerCase()}.java</p>
          <p className="tag mt-6">Dentro de {result.areaName}</p>

          {result.tied ? (
            <h1 className="mt-2 text-title uppercase text-[hsl(var(--primary-display))]">
              {result.selected.map((s) => s.branch.name).join(" + ")}
            </h1>
          ) : (
            <h1 className="mt-2 text-display uppercase text-[hsl(var(--primary-display))]">
              {principal.branch.name}
            </h1>
          )}

          {!result.tied && (
            <p className="mt-5 max-w-[52ch] text-lede">{principal.branch.tagline}</p>
          )}
        </div>
      </motion.section>

      <div className="shell pt-10">
        {result.notice && (
          <p className="mb-8 border-l-2 border-primary bg-surface p-5 text-sm">{result.notice}</p>
        )}

        <div className="flex flex-col gap-4">
          {result.selected.map((score, index) => (
            <article
              key={score.branch.id}
              className={[
                "border bg-surface p-6 sm:p-8",
                index === 0 ? "border-primary" : "border-border",
              ].join(" ")}
            >
              {/* com uma vertente só, o nome já está no topo da tela a poucos
                  centímetros daqui — repetir vira eco. Com duas, cada card
                  precisa do seu. */}
              <header className="flex flex-wrap items-baseline justify-between gap-2">
                {result.selected.length > 1 ? (
                  <h2 className="text-title uppercase">{score.branch.name}</h2>
                ) : (
                  <h2 className="tag text-foreground">o que isso quer dizer</h2>
                )}
                <span className="font-mono text-xs text-[hsl(var(--muted-foreground))]">
                  {Math.round(score.n)}
                </span>
              </header>

              {/* mesma barra dos cards do resultado principal */}
              <div className="mt-4 h-1.5 w-full bg-border">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${score.n}%` }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.08, ease: "easeOut" }}
                />
              </div>

              {/* a descrição só se repete aqui quando o topo não a mostrou */}
              {(result.tied || index > 0) && <p className="mt-4 text-lede">{score.branch.tagline}</p>}

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <section>
                  <h3 className="tag mb-3 text-foreground">O que você faria</h3>
                  <ul className="space-y-1.5 text-sm text-[hsl(var(--muted-foreground))]">
                    {score.branch.doing.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden className="text-[hsl(var(--primary-ink))]">
                          ·
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3 className="tag mb-3 text-foreground">Por onde começar</h3>
                  <ul className="space-y-1.5 text-sm text-[hsl(var(--muted-foreground))]">
                    {score.branch.trying.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden className="text-[hsl(var(--primary-ink))]">
                          ·
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {score.neighborNote && (
                <p className="mt-6 border-l-2 border-[hsl(var(--primary-ink))] pl-4 text-sm">
                  {score.neighborNote}
                </p>
              )}
            </article>
          ))}
        </div>

        {/* o ranking completo das vertentes, pelo mesmo motivo do quiz principal:
            nada escondido, a pessoa vê tudo e decide */}
        {result.scores.length > result.selected.length && (
          <details className="mt-6 border border-[hsl(var(--border-strong))] bg-surface p-5">
            <summary className="disclosure">
              <span className="underline underline-offset-4">
                ver as outras vertentes de {result.areaName}
              </span>
            </summary>
            <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))]">
              Continuam abertas pra você. Aparecerem aqui embaixo só quer dizer que estas 6
              respostas apontaram mais pro outro lado hoje.
            </p>
            <ol className="mt-4 flex flex-col gap-3">
              {result.scores
                .filter((s) => !result.selected.some((x) => x.branch.id === s.branch.id))
                .map((score) => (
                  <li key={score.branch.id} className="text-sm">
                    {/* sem nota aqui de propósito: um "0" seco ao lado do nome
                        lê como reprovação, e o ponto desta lista é o oposto */}
                    <span className="font-medium">{score.branch.name}</span>
                    <p className="text-[hsl(var(--muted-foreground))]">{score.branch.tagline}</p>
                  </li>
                ))}
            </ol>
          </details>
        )}

        <p className="mt-10 text-sm text-[hsl(var(--muted-foreground))]">
          Seis perguntas dão um recorte, não um veredito. Dentro de qualquer área dessas dá pra
          transitar entre as vertentes a vida toda — muita gente começa em uma e termina em outra
          sem nunca ter "mudado de carreira".
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="bg-foreground px-8 py-4 font-display text-base uppercase tracking-tight text-background transition-transform active:scale-[0.99]"
          >
            Voltar ao resultado
          </button>
          <button
            type="button"
            onClick={onRedo}
            className="flex min-h-11 items-center font-mono text-sm text-[hsl(var(--primary-ink))] underline underline-offset-4"
          >
            refazer este afunilamento
          </button>
        </div>
      </div>
    </div>
  );
}
