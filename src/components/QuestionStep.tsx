import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ScaleIcon } from "@/components/ScaleIcon";
import { SCALE } from "@/data/questions";
import type { LikertValue, Question } from "@/types";

/** Tempo que a resposta fica marcada antes de avançar. */
const CONFIRM_MS = 240;

interface QuestionStepProps {
  question: Question;
  number: number;
  total: number;
  current?: LikertValue;
  onAnswer: (value: LikertValue) => void;
  onBack: () => void;
}

export function QuestionStep({
  question,
  number,
  total,
  current,
  onAnswer,
  onBack,
}: QuestionStepProps) {
  // resposta já clicada mas ainda não confirmada — existe só pra pessoa ver a
  // própria escolha marcar antes da tela virar
  const [pending, setPending] = useState<LikertValue | undefined>();
  const timer = useRef<number>();

  useEffect(() => {
    setPending(undefined);
    return () => window.clearTimeout(timer.current);
  }, [question.id]);

  const choose = useCallback(
    (value: LikertValue) => {
      // ignora toques repetidos durante a confirmação: sem isso, quem toca
      // rápido pula uma pergunta sem ver
      if (pending !== undefined) return;
      setPending(value);
      timer.current = window.setTimeout(() => onAnswer(value), CONFIRM_MS);
    },
    [pending, onAnswer],
  );

  // teclado no desktop: 1–5 responde, ← volta
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const index = Number(event.key) - 1;
      if (index >= 0 && index < SCALE.length) {
        event.preventDefault();
        choose(SCALE[index].value);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onBack();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [choose, onBack]);

  const selected = pending ?? current;

  return (
    <div className="shell flex min-h-[100svh] flex-col py-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          aria-label="Voltar para a pergunta anterior"
          className="-ml-3 flex h-11 w-11 items-center justify-center font-mono text-lg text-[hsl(var(--muted-foreground))] transition-colors hover:text-foreground"
        >
          ←
        </button>
        <span className="tag" aria-live="polite">
          {number}/{total}
        </span>
      </div>

      <div
        className="mt-3 h-1 w-full bg-border"
        role="progressbar"
        aria-valuenow={number}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label="Progresso do quiz"
      >
        <motion.div
          className="h-full bg-primary"
          initial={false}
          animate={{ width: `${(number / total) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* sem AnimatePresence de propósito: um exit animado deixaria o card
          vazio entre uma pergunta e outra, e quem responde rápido veria isso */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.22 }}
        className="flex flex-1 flex-col justify-center py-10"
      >
        <h2 className="text-subtitle">{question.text}</h2>

        <div className="mt-8 flex flex-col gap-2">
          {SCALE.map((option, optionIndex) => {
            const active = selected === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => choose(option.value)}
                aria-pressed={active}
                className={[
                  "flex min-h-[3.5rem] items-center gap-4 border px-5 text-left transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-[hsl(var(--border-strong))] bg-surface hover:border-[hsl(var(--primary-ink))]",
                ].join(" ")}
              >
                <ScaleIcon level={option.value + 2} />
                <span className="flex-1 font-medium">{option.label}</span>
                <span
                  aria-hidden
                  className={[
                    "font-mono text-xs",
                    active ? "opacity-60" : "text-[hsl(var(--muted-foreground))]",
                  ].join(" ")}
                >
                  {optionIndex + 1}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      <p className="hidden text-center font-mono text-xs text-[hsl(var(--muted-foreground))] sm:block">
        use as teclas 1–5 para responder
      </p>
    </div>
  );
}
