import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function QuizQuestion({
  questionObj,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onSelect,
  onSkip,
  timer,
  onTimeUp,
  explanation,
  showExplanation,
}) {
  const [seconds, setSeconds] = useState(timer);

  useEffect(() => {
    setSeconds(timer);
  }, [questionObj]);

  useEffect(() => {
    if (seconds === 0) {
      onTimeUp();
      return;
    }
    const interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(interval);
  }, [seconds, onTimeUp]);

  return (
    <motion.div
      className="card shadow-lg p-4 mx-auto mt-5"
      style={{
        maxWidth: 600,
        width: "100%",
        background: "var(--bg-card)",
        color: "var(--text-main)",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex justify-content-between mb-2">
        <span>
          <b>
            Question {questionIndex + 1} / {totalQuestions}
          </b>
        </span>
        <span
          className={
            seconds <= 10 ? "text-danger fw-bold" : "text-secondary"
          }
        >
          ⏰ {seconds}s
        </span>
      </div>
      <div className="mb-3 fw-semibold">{questionObj.question}</div>
      <div className="d-flex flex-column gap-2">
        {Object.entries(questionObj.options).map(([key, val], idx) => {
          // Map key ("1", "2", ...) to letter ("A", "B", ...)
          const letter = String.fromCharCode(65 + idx); // 65 is "A"
          let btnClass = "btn btn-outline-secondary text-start w-100";
          if (selectedAnswer) {
            if (letter === questionObj.correctAnswer) {
              btnClass = "btn btn-success text-white fw-bold";
            } else if (
              key === selectedAnswer &&
              letter !== questionObj.correctAnswer
            ) {
              btnClass = "btn btn-danger text-white fw-bold";
            } else {
              btnClass = "btn btn-outline-secondary opacity-75";
            }
          }
          return (
            <motion.button
              key={key}
              className={btnClass}
              disabled={!!selectedAnswer}
              onClick={() => onSelect(key)}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: selectedAnswer ? 1 : 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <b>{letter}.</b> {val}
            </motion.button>
          );
        })}
      </div>
      <div className="d-flex gap-3 mt-4">
        <button
          className="btn btn-link text-primary"
          onClick={onSkip}
          disabled={!!selectedAnswer}
        >
          Skip
        </button>
      </div>
      {showExplanation && (
        <motion.div
          className="alert alert-info mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <b>Explanation:</b> {explanation}
        </motion.div>
      )}
    </motion.div>
  );
}

export default QuizQuestion;