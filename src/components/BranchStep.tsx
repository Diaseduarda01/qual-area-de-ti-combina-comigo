import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ScaleIcon } from "@/components/ScaleIcon";
import { SCALE } from "@/data/questions";
import type { BranchQuestion, BranchSet, LikertValue } from "@/types";

const CONFIRM_MS = 240;

interface BranchStepProps {
  set: BranchSet;
  areaName: string;
  question: BranchQuestion;
  number: number;
  total: number;
  current?: LikertValue;
  onAnswer: (value: LikertValue) => void;
  onBack: () => void;
  onCancel: () => void;
}

export function BranchStep({
  set,
  areaName,
  question,
  number,
  total,
  current,
  onAnswer,
  onBack,
  onCancel,
}: BranchStepProps) {
  const [pending, setPending] = useState<LikertValue | undefined>();
  const timer = useRef<number>();

  useEffect(() => {
    setPending(undefined);
    return () => window.clearTimeout(timer.current);
  }, [question.id]);

  const choose = useCallback(
    (value: LikertValue) => {
      if (pending !== undefined) return;
      setPending(value);
      timer.current = window.setTimeout(() => onAnswer(value), CONFIRM_MS);
    },
    [pending, onAnswer],
  );

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
          aria-label="Voltar"
          className="-ml-3 flex h-11 w-11 items-center justify-center font-mono text-lg text-[hsl(var(--muted-foreground))] transition-colors hover:text-foreground"
        >
          ←
        </button>
        <span className="tag flex-1">
          {number}/{total}
        </span>
        <button
          type="button"
          onClick={onCancel}
          className="flex min-h-11 items-center font-mono text-xs text-[hsl(var(--muted-foreground))] underline underline-offset-4"
        >
          voltar ao resultado
        </button>
      </div>

      <div
        className="mt-3 h-1 w-full bg-border"
        role="progressbar"
        aria-valuenow={number}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label="Progresso do afunilamento"
      >
        <motion.div
          className="h-full bg-primary"
          initial={false}
          animate={{ width: `${(number / total) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* o nome da área vai embaixo da barra, não na barra de cima: em 375px
          "afunilando Desenvolvimento de Software" era truncado pela metade */}
      <p className="tag mt-3">afunilando {areaName}</p>

      {number === 1 && (
        <p className="mt-4 border-l-2 border-primary pl-4 text-sm text-[hsl(var(--muted-foreground))]">
          {set.intro}
        </p>
      )}

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
    </div>
  );
}
