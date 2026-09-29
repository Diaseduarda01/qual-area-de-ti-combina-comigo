import { useEffect } from "react";
import { AREAS } from "@/data/areas";
import { BranchResult } from "@/components/BranchResult";
import { BranchStep } from "@/components/BranchStep";
import { ContextStep } from "@/components/ContextStep";
import { Intro } from "@/components/Intro";
import { QuestionStep } from "@/components/QuestionStep";
import { Result } from "@/components/Result";
import { useQuiz } from "@/hooks/useQuiz";

export default function App() {
  const quiz = useQuiz();

  // cada etapa começa do topo — no celular, a pergunta seguinte não pode nascer
  // no meio da rolagem da anterior
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [quiz.stage, quiz.questionNumber, quiz.contextNumber, quiz.branchNumber]);

  if (quiz.stage === "intro") {
    return (
      <Intro
        questionTotal={quiz.questionTotal}
        hasProgress={quiz.hasProgress}
        savedProgress={quiz.savedProgress}
        savedFinished={quiz.savedFinished}
        onStart={quiz.start}
      />
    );
  }

  if (quiz.stage === "questions") {
    return (
      <QuestionStep
        question={quiz.question}
        number={quiz.questionNumber}
        total={quiz.questionTotal}
        current={quiz.currentAnswer}
        onAnswer={quiz.answer}
        onBack={quiz.back}
      />
    );
  }

  if (quiz.stage === "context") {
    return (
      <ContextStep
        question={quiz.contextQuestion}
        number={quiz.contextNumber}
        total={quiz.contextTotal}
        context={quiz.context}
        onAnswer={quiz.answerContext}
        onNext={quiz.nextContext}
        onBack={quiz.back}
      />
    );
  }

  if (quiz.stage === "branch" && quiz.branchSet && quiz.branchQuestion) {
    return (
      <BranchStep
        set={quiz.branchSet}
        areaName={AREAS[quiz.branchSet.area].name}
        question={quiz.branchQuestion}
        number={quiz.branchNumber}
        total={quiz.branchTotal}
        current={quiz.branchCurrent}
        onAnswer={quiz.answerBranch}
        onBack={quiz.backBranch}
        onCancel={quiz.closeBranch}
      />
    );
  }

  if (quiz.stage === "branchResult" && quiz.branchResult) {
    return (
      <BranchResult result={quiz.branchResult} onBack={quiz.closeBranch} onRedo={quiz.redoBranch} />
    );
  }

  return quiz.result ? (
    <Result
      result={quiz.result}
      onRestart={quiz.restart}
      onAfunilar={quiz.startBranch}
      branchDone={quiz.branchDone}
    />
  ) : null;
}
