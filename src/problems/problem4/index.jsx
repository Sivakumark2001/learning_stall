import React, { useState } from "react";
import QuizConfigurator from "./components/QuizConfigurator";
import QuizQuestion from "./components/QuizQuestion";
import QuestionNavigation from "./components/QuestionNavigation";
import ResultSummary from "./components/ResultSummary";
import { fetchQuestionAI } from "./utils/fetchQuestionAI"; // Only use this
import { useAIQuestionGenerator } from "./hooks/useAIQuestionGenerator";
import QuizLoading from "./components/QuizLoading";

const TIMER_PER_QUESTION = 60;

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function getNextDifficulty(levels, currentIdx) {
  // Progress difficulty: start with easiest, then next, etc.
  if (!levels.length) return "Beginner";
  const idx = Math.min(currentIdx, levels.length - 1);
  return levels[idx];
}

function Problem4() {
  const [stage, setStage] = useState("config"); // config | quiz | summary
  const [config, setConfig] = useState(null);
  // const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [current, setCurrent] = useState(0);
  // const [loading, setLoading] = useState(false);

  const { generateQuestions, questions, loading, error } = useAIQuestionGenerator();

  // Start test: fetch/generate questions
  const startTest = async (cfg) => {
    setConfig(cfg);
    setStage("quiz");

    const subject = cfg.subjects.join(", ");
    const topic = cfg.topics.join(", ");
    const levels = cfg.levels;
    const questionCount = cfg.questionCount || 5;

    await generateQuestions(subject, topic, questionCount, levels);

    setUserAnswers(Array(questionCount).fill(null));
    setCurrent(0);
  };

  // Answer selection
  const handleSelect = (ans) => {
    setUserAnswers((prev) => {
      const next = [...prev];
      next[current] = ans;
      return next;
    });
  };

  // Skip
  const handleSkip = () => {
    setUserAnswers((prev) => {
      const next = [...prev];
      next[current] = null;
      return next;
    });
    handleNext();
  };

  // Timer up
  const handleTimeUp = () => {
    if (!userAnswers[current]) handleSkip();
  };

  // Navigation
  const handleNext = () => {
    if (current === questions.length - 1) {
      // If last question, check if all answered/skipped
      if (userAnswers.every((a) => a !== undefined && a !== null)) {
        setStage("summary");
      }
    } else {
      setCurrent((c) => Math.min(c + 1, questions.length - 1));
    }
  };
  const handlePrev = () => setCurrent((c) => Math.max(c - 1, 0));
  const handleJump = (idx) => setCurrent(idx);

  // Restart
  const handleRestart = () => {
    setStage("config");
    setConfig(null);
    setQuestions([]);
    setUserAnswers([]);
    setCurrent(0);
  };

  // End test handler
  const handleEndTest = () => {
    setStage("summary");
  };

  if (stage === "config") {
    return <QuizConfigurator onStart={startTest} />;
  }

  if (loading) {
    return <QuizLoading />;
  }

  // Prevent rendering QuizQuestion if questions are not loaded yet
  if (!questions || !questions[current]) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-xl font-bold">Loading questions...</span>
      </div>
    );
  }

  if (stage === "summary") {
    return (
      <ResultSummary
        questions={questions}
        userAnswers={userAnswers}
        onRestart={handleRestart}
      />
    );
  }

  // Quiz stage
  return (
    <div>
      <QuizQuestion
        questionObj={questions[current]}
        questionIndex={current}
        totalQuestions={questions.length}
        selectedAnswer={userAnswers[current]}
        onSelect={handleSelect}
        onSkip={handleSkip}
        timer={TIMER_PER_QUESTION}
        onTimeUp={handleTimeUp}
        explanation={questions[current].explanation}
        showExplanation={!!userAnswers[current]}
      />
      <QuestionNavigation
        current={current}
        total={questions.length}
        onPrev={handlePrev}
        onNext={handleNext}
        answered={userAnswers.map((a, i) => (a ? i : null)).filter((v) => v !== null)}
        skipped={userAnswers.map((a, i) => (a === null ? i : null)).filter((v) => v !== null)}
        onJump={handleJump}
      />
      <div className="flex justify-center mt-6">
        <button
          className="bg-red-600 text-blue px-4 py-2 rounded font-semibold"
          onClick={handleEndTest}
        >
          End Test
        </button>
      </div>
    </div>
  );
}

export default Problem4;