import { motion } from "framer-motion";

interface IntroProps {
  questionTotal: number;
  hasProgress: boolean;
  savedProgress: number;
  /** True quando o quiz salvo já chegou ao fim. */
  savedFinished: boolean;
  onStart: (resume: boolean) => void;
}

export function Intro({
  questionTotal,
  hasProgress,
  savedProgress,
  savedFinished,
  onStart,
}: IntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="shell flex min-h-[100svh] flex-col justify-center py-8 sm:py-10"
    >
      <p className="tag mb-6">// career.java</p>

      <h1 className="text-display uppercase">
        Qual área
        <br />
        de TI combina
        <br />
        <span className="text-[hsl(var(--primary-display))]">com você?</span>
      </h1>

      <p className="mt-6 max-w-[42ch] text-lede text-[hsl(var(--muted-foreground))]">
        {questionTotal} perguntas rápidas sobre o que você gosta de fazer. No fim, até 3 áreas pra
        explorar — não uma resposta só.
      </p>

      {/* quem abre um quiz chamado "qual área de TI combina com você" já chega
          achando que precisa ser de TI. Se a primeira tela não desarmar isso,
          quem vem de fora fecha antes de responder — e é justamente pra essa
          pessoa que o quiz foi feito. */}
      <div className="mt-6 border-l-2 border-primary pl-4">
        <p className="font-display text-subtitle">Não precisa ser da área.</p>
        <p className="mt-2 max-w-[48ch] text-[hsl(var(--muted-foreground))]">
          Muita gente que trabalha com tecnologia hoje veio de marketing, administração, design,
          sala de aula. Ninguém aqui pergunta o que você já sabe.
        </p>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2">
        {["5 min", "13 áreas", "sem termo técnico", "anônimo"].map((chip) => (
          <li key={chip} className="tag border border-border px-3 py-1.5">
            {chip}
          </li>
        ))}
      </ul>

      {/* quem já tem progresso vê retomar como ação principal: recomeçar
          apaga o que foi respondido, e não deve ser o botão maior da tela */}
      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => onStart(hasProgress)}
          className="w-full bg-primary px-6 py-5 font-display text-xl uppercase tracking-tight text-primary-foreground transition-transform active:scale-[0.99] sm:w-auto sm:self-start sm:px-16"
        >
          {!hasProgress
            ? "Começar"
            : savedFinished
              ? "Ver meu resultado"
              : `Continuar (${savedProgress}/${questionTotal})`}
        </button>

        {hasProgress && (
          <button
            type="button"
            onClick={() => onStart(false)}
            className="flex min-h-11 items-center font-mono text-sm text-[hsl(var(--muted-foreground))] underline underline-offset-4 sm:self-start"
          >
            começar de novo, do zero
          </button>
        )}
      </div>

    </motion.div>
  );
}
