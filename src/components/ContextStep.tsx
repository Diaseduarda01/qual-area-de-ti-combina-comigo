import { motion } from "framer-motion";
import type { ContextQuestion } from "@/data/context";
import type { ContextAnswers } from "@/types";

interface ContextStepProps {
  question: ContextQuestion;
  number: number;
  total: number;
  context: ContextAnswers;
  onAnswer: (id: keyof ContextAnswers, value: string | string[] | undefined) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ContextStep({
  question,
  number,
  total,
  context,
  onAnswer,
  onNext,
  onBack,
}: ContextStepProps) {
  const value = context[question.id];
  const selected = Array.isArray(value) ? value : value ? [value] : [];

  const toggle = (option: string) => {
    if (!question.multiple) {
      onAnswer(question.id, option);
      onNext();
      return;
    }
    // "Nenhuma" não convive com as outras opções
    if (option === "Nenhuma") {
      onAnswer(question.id, selected.includes("Nenhuma") ? [] : ["Nenhuma"]);
      return;
    }
    const withoutNone = selected.filter((item) => item !== "Nenhuma");
    onAnswer(
      question.id,
      withoutNone.includes(option)
        ? withoutNone.filter((item) => item !== option)
        : [...withoutNone, option],
    );
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.22 }}
      className="shell flex min-h-[100svh] flex-col py-8"
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          aria-label="Voltar"
          className="-ml-3 flex h-11 w-11 items-center justify-center font-mono text-lg text-[hsl(var(--muted-foreground))] transition-colors hover:text-foreground"
        >
          ←
        </button>
        <span className="tag">quase lá · {number}/{total}</span>
      </div>

      <div className="flex flex-1 flex-col justify-center py-10">
        <h2 className="text-subtitle">{question.text}</h2>
        {question.hint && (
          <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">{question.hint}</p>
        )}

        <div className="mt-8 flex flex-wrap gap-2">
          {question.options.map((option) => {
            const active = selected.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggle(option)}
                aria-pressed={active}
                className={[
                  "flex min-h-[2.75rem] items-center gap-2 border px-4 py-2 text-left text-sm transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-[hsl(var(--border-strong))] bg-surface hover:border-[hsl(var(--primary-ink))]",
                ].join(" ")}
              >
                {/* quadradinho só na múltipla: sem ele, ela fica idêntica à
                    escolha única e o aviso vira só texto que ninguém lê */}
                {question.multiple && (
                  <span
                    aria-hidden
                    className={[
                      "flex h-4 w-4 shrink-0 items-center justify-center border text-[0.6rem] leading-none",
                      active ? "border-current" : "border-[hsl(var(--muted-foreground))]",
                    ].join(" ")}
                  >
                    {active ? "x" : ""}
                  </span>
                )}
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={onNext}
          className="bg-foreground px-8 py-4 font-display text-base uppercase tracking-tight text-background transition-transform active:scale-[0.99]"
        >
          {number === total ? "Ver meu resultado" : "Continuar"}
        </button>
        {question.optional && (
          <button
            type="button"
            onClick={onNext}
            className="flex min-h-11 items-center font-mono text-sm text-[hsl(var(--muted-foreground))] underline underline-offset-4"
          >
            pular
          </button>
        )}
      </div>
    </motion.div>
  );
}
