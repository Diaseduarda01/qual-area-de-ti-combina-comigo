import { useCallback, useEffect, useMemo, useState } from "react";
import { CONTEXT_QUESTIONS } from "@/data/context";
import { QUESTIONS_IN_ORDER } from "@/data/questions";
import { computeBranchResult, getBranchSet } from "@/lib/branchScoring";
import { computeResult } from "@/lib/scoring";
import type { Answers, AreaId, ContextAnswers, LikertValue } from "@/types";

export type Stage = "intro" | "questions" | "context" | "result" | "branch" | "branchResult";

const STORAGE_KEY = "quiz-areas-ti:v1";

interface PersistedState {
  answers: Answers;
  context: ContextAnswers;
  index: number;
  stage: Stage;
  /** Respostas do afunilamento, por área. */
  branchAnswers?: Record<string, Answers>;
}

const VALORES_VALIDOS: LikertValue[] = [-2, -1, 0, 1, 2];
const ESTAGIOS_SALVOS: Stage[] = ["questions", "context", "result"];

/**
 * O storage é a única entrada não confiável do app.
 *
 * Basta uma resposta com valor estranho — storage escrito pela metade, quota
 * estourada, mudança futura de schema, DevTools — pra `peso × valor` virar NaN
 * e o card renderizar "NaN". Então tudo que entra aqui é validado item a item:
 * o que não for reconhecido é descartado, não corrigido por adivinhação.
 */
function sanitizeAnswers(bruto: unknown): Answers {
  if (!bruto || typeof bruto !== "object") return {};
  const limpo: Answers = {};
  const validos = new Set<string>(QUESTIONS_IN_ORDER.map((q) => q.id));
  for (const [id, valor] of Object.entries(bruto as Record<string, unknown>)) {
    if (!validos.has(id) && !id.match(/^[a-z]{2,6}\d$/)) continue;
    if (!VALORES_VALIDOS.includes(valor as LikertValue)) continue;
    limpo[id] = valor as LikertValue;
  }
  return limpo;
}

function sanitizeContext(bruto: unknown): ContextAnswers {
  if (!bruto || typeof bruto !== "object") return {};
  const b = bruto as Record<string, unknown>;
  const texto = (v: unknown) => (typeof v === "string" ? v : undefined);
  return {
    situacao: texto(b.situacao),
    origem: texto(b.origem),
    buscando: texto(b.buscando),
    contato: Array.isArray(b.contato) ? b.contato.filter((x) => typeof x === "string") : undefined,
  };
}

function load(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, unknown>;

    const answers = sanitizeAnswers(parsed.answers);
    const total = QUESTIONS_IN_ORDER.length;
    const index =
      typeof parsed.index === "number" && Number.isInteger(parsed.index)
        ? Math.min(Math.max(parsed.index, 0), total - 1)
        : 0;
    const stage = ESTAGIOS_SALVOS.includes(parsed.stage as Stage)
      ? (parsed.stage as Stage)
      : "questions";

    const branchAnswers: Record<string, Answers> = {};
    if (parsed.branchAnswers && typeof parsed.branchAnswers === "object") {
      for (const [area, respostas] of Object.entries(
        parsed.branchAnswers as Record<string, unknown>,
      )) {
        const limpas = sanitizeAnswers(respostas);
        if (Object.keys(limpas).length > 0) branchAnswers[area] = limpas;
      }
    }

    return { answers, context: sanitizeContext(parsed.context), index, stage, branchAnswers };
  } catch {
    // aba anônima, storage bloqueado, JSON corrompido — o quiz começa do zero
    return null;
  }
}

function save(state: PersistedState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // sem persistência o quiz continua funcionando, só não retoma
  }
}

export function useQuiz() {
  const [saved] = useState(load);
  const [stage, setStage] = useState<Stage>("intro");
  const [answers, setAnswers] = useState<Answers>(saved?.answers ?? {});
  const [context, setContext] = useState<ContextAnswers>(saved?.context ?? {});
  const [index, setIndex] = useState(saved?.index ?? 0);
  const [contextIndex, setContextIndex] = useState(0);
  // quantas respostas havia no storage ao abrir. Vira 0 quando a pessoa
  // recomeça, senão a intro continuaria oferecendo retomar um progresso
  // que acabou de ser apagado.
  const [savedProgress, setSavedProgress] = useState(
    saved ? Object.keys(saved.answers).length : 0,
  );
  // afunilamento: respostas guardadas por área, pra a pessoa poder afunilar
  // mais de uma área sem perder o que já respondeu
  const [branchAnswers, setBranchAnswers] = useState<Record<string, Answers>>(
    saved?.branchAnswers ?? {},
  );
  const [branchArea, setBranchArea] = useState<AreaId | null>(null);
  const [branchIndex, setBranchIndex] = useState(0);

  const hasProgress = savedProgress > 0;
  const savedFinished = hasProgress && saved?.stage === "result";

  useEffect(() => {
    if (stage === "intro") return;
    // o estágio salvo nunca é o de afunilamento: retomar ali sem a área
    // escolhida deixaria a pessoa numa tela sem contexto
    const persistido: Stage = stage === "branch" || stage === "branchResult" ? "result" : stage;
    save({ answers, context, index, stage: persistido, branchAnswers });
  }, [answers, context, index, stage, branchAnswers]);

  const start = useCallback(
    (resume: boolean) => {
      if (!resume) {
        setAnswers({});
        setContext({});
        setIndex(0);
        setSavedProgress(0);
        setContextIndex(0);
        setStage("questions");
        return;
      }
      // retomar tem que voltar pra onde a pessoa parou de verdade. Quem já
      // terminou espera o resultado, não a pergunta 35 de novo.
      setContextIndex(0);
      setStage(saved?.stage === "result" || saved?.stage === "context" ? saved.stage : "questions");
    },
    [saved],
  );

  const answer = useCallback(
    (value: LikertValue) => {
      const question = QUESTIONS_IN_ORDER[index];
      setAnswers((previous) => ({ ...previous, [question.id]: value }));
      if (index + 1 < QUESTIONS_IN_ORDER.length) {
        setIndex(index + 1);
      } else {
        setStage("context");
      }
    },
    [index],
  );

  const back = useCallback(() => {
    if (stage === "context") {
      if (contextIndex > 0) {
        setContextIndex(contextIndex - 1);
      } else {
        setStage("questions");
        setIndex(QUESTIONS_IN_ORDER.length - 1);
      }
      return;
    }
    if (index > 0) setIndex(index - 1);
    else setStage("intro");
  }, [stage, index, contextIndex]);

  const answerContext = useCallback(
    (id: keyof ContextAnswers, value: string | string[] | undefined) => {
      setContext((previous) => ({ ...previous, [id]: value }));
    },
    [],
  );

  const nextContext = useCallback(() => {
    if (contextIndex + 1 < CONTEXT_QUESTIONS.length) setContextIndex(contextIndex + 1);
    else setStage("result");
  }, [contextIndex]);

  const startBranch = useCallback(
    (area: AreaId) => {
      const set = getBranchSet(area);
      if (!set) return;
      setBranchArea(area);
      // quem já afunilou essa área espera rever o recorte, não responder tudo
      // de novo — o botão diz "ver seu recorte de", então tem que mostrar
      const completo = set.questions.every((q) => branchAnswers[area]?.[q.id] !== undefined);
      if (completo) {
        setStage("branchResult");
        return;
      }
      setBranchIndex(0);
      setStage("branch");
    },
    [branchAnswers],
  );

  const answerBranch = useCallback(
    (value: LikertValue) => {
      if (!branchArea) return;
      const set = getBranchSet(branchArea);
      if (!set) return;
      const question = set.questions[branchIndex];
      setBranchAnswers((previous) => ({
        ...previous,
        [branchArea]: { ...previous[branchArea], [question.id]: value },
      }));
      if (branchIndex + 1 < set.questions.length) setBranchIndex(branchIndex + 1);
      else setStage("branchResult");
    },
    [branchArea, branchIndex],
  );

  const backBranch = useCallback(() => {
    if (branchIndex > 0) setBranchIndex(branchIndex - 1);
    else setStage("result");
  }, [branchIndex]);

  const closeBranch = useCallback(() => {
    setStage("result");
    setBranchArea(null);
  }, []);

  const redoBranch = useCallback(() => {
    if (!branchArea) return;
    setBranchAnswers((previous) => {
      const copia = { ...previous };
      delete copia[branchArea];
      return copia;
    });
    setBranchIndex(0);
    setStage("branch");
  }, [branchArea]);

  const restart = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // idem: sem storage, o reset em memória já basta
    }
    setAnswers({});
    setContext({});
    setIndex(0);
    setContextIndex(0);
    setSavedProgress(0);
    setBranchAnswers({});
    setBranchArea(null);
    setBranchIndex(0);
    setStage("intro");
  }, []);

  const result = useMemo(
    () => (stage === "intro" || stage === "questions" ? null : computeResult(answers, context)),
    [stage, answers, context],
  );

  const branchSet = branchArea ? getBranchSet(branchArea) : undefined;

  const branchResult = useMemo(() => {
    if (stage !== "branchResult" || !branchArea) return null;
    return computeBranchResult(branchArea, branchAnswers[branchArea] ?? {}, result?.ranking ?? []);
  }, [stage, branchArea, branchAnswers, result]);

  return {
    stage,
    question: QUESTIONS_IN_ORDER[index],
    questionNumber: index + 1,
    questionTotal: QUESTIONS_IN_ORDER.length,
    currentAnswer: answers[QUESTIONS_IN_ORDER[index]?.id],
    contextQuestion: CONTEXT_QUESTIONS[contextIndex],
    contextNumber: contextIndex + 1,
    contextTotal: CONTEXT_QUESTIONS.length,
    context,
    hasProgress,
    savedProgress,
    savedFinished,
    result,
    // afunilamento
    branchArea,
    branchSet,
    branchQuestion: branchSet?.questions[branchIndex],
    branchNumber: branchIndex + 1,
    branchTotal: branchSet?.questions.length ?? 0,
    branchCurrent:
      branchArea && branchSet
        ? branchAnswers[branchArea]?.[branchSet.questions[branchIndex].id]
        : undefined,
    branchResult,
    branchDone: (area: AreaId) => Boolean(branchAnswers[area]),
    startBranch,
    answerBranch,
    backBranch,
    closeBranch,
    redoBranch,
    start,
    answer,
    back,
    answerContext,
    nextContext,
    restart,
  };
}
