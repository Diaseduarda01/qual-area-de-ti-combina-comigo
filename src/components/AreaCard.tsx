import { motion } from "framer-motion";
import { getBranchSet } from "@/lib/branchScoring";
import { TIER_LABELS, type SelectedArea } from "@/lib/scoring";

interface AreaCardProps {
  selected: SelectedArea;
  position: number;
  /** Quando o resultado é inconclusivo, o card não se apresenta como recomendação. */
  muted: boolean;
  onAfunilar: () => void;
  /** True se a pessoa já afunilou esta área — o botão vira "ver". */
  afunilada: boolean;
}

export function AreaCard({ selected, position, muted, onAfunilar, afunilada }: AreaCardProps) {
  const { area, n, tier, reasons, bridge } = selected;
  const primary = position === 1 && !muted;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: position * 0.08 }}
      className={[
        "bg-surface p-6 sm:p-8",
        // faixa vermelha grossa na primeira: 1px de borda contra bege não
        // diferencia nada no celular
        primary
          ? "border border-l-[6px] border-primary"
          : "border border-border sm:ml-4",
      ].join(" ")}
    >
      <header className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={[
            "tag px-2 py-1",
            primary ? "bg-primary text-primary-foreground" : "border border-border",
          ].join(" ")}
        >
          {String(position).padStart(2, "0")}
        </span>
        {!muted && <span className="tag text-[hsl(var(--primary-ink))]">{TIER_LABELS[tier]}</span>}
      </header>

      <h3 className={["mt-3 uppercase", primary ? "text-title" : "text-subtitle"].join(" ")}>
        {area.name}
      </h3>

      <div className="mt-4 flex items-center gap-3">
        <div className="h-1.5 flex-1 bg-border">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${n}%` }}
            transition={{ duration: 0.6, delay: 0.2 + position * 0.08, ease: "easeOut" }}
          />
        </div>
        <span className="font-mono text-xs text-[hsl(var(--muted-foreground))]">
          {Math.round(n)}
        </span>
      </div>

      <p className="mt-5 text-lede">{area.tagline}</p>

      <p className="mt-4 text-[hsl(var(--muted-foreground))]">{area.affinity}</p>

      {reasons.length > 0 && !muted && (
        <p className="mt-3 text-[hsl(var(--muted-foreground))]">
          Apareceu principalmente porque combina muito com você:{" "}
          {reasons.map((reason, index) => (
            <span key={reason}>
              {index > 0 && " e "}
              <span className="text-foreground">“{reason}”</span>
            </span>
          ))}
          .
        </p>
      )}

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <section>
          <h4 className="tag mb-3 text-foreground">O que você faria</h4>
          <ul className="space-y-1.5 text-sm text-[hsl(var(--muted-foreground))]">
            {area.doing.map((item) => (
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
          <h4 className="tag mb-3 text-foreground">Vale experimentar</h4>
          <ul className="space-y-1.5 text-sm text-[hsl(var(--muted-foreground))]">
            {area.trying.map((item) => (
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

      {bridge && (
        <p className="mt-6 border-l-2 border-[hsl(var(--primary-ink))] pl-4 text-sm">{bridge}</p>
      )}

      {getBranchSet(area.id) && (
        <button
          type="button"
          onClick={onAfunilar}
          className="mt-6 flex min-h-11 w-full items-center justify-between gap-3 border border-[hsl(var(--primary-ink))] px-5 py-3 text-left transition-colors hover:bg-primary hover:text-primary-foreground sm:w-auto"
        >
          <span className="font-mono text-sm">
            {afunilada ? `ver seu recorte de ${area.name}` : `que tipo de ${area.name}?`}
          </span>
          <span aria-hidden className="font-mono text-sm">
            →
          </span>
        </button>
      )}
    </motion.article>
  );
}
