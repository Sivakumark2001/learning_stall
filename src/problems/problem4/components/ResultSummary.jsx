import React from "react";
import { MOTIVATIONAL_QUOTES } from "../utils/motivationalQuotes";
import { motion } from "framer-motion";

function getQuote(score) {
  const found = MOTIVATIONAL_QUOTES.find(
    (q) => score >= q.min && score <= q.max
  );
  return found ? found.text : "";
}

function toLetter(ans) {
  // If already a letter, return as is
  if (typeof ans === "string" && /^[A-D]$/.test(ans)) return ans;
  // If number or string number, convert to letter
  const idx = typeof ans === "number" ? ans : parseInt(ans, 10);
  if (!isNaN(idx) && idx >= 0 && idx <= 3) return String.fromCharCode(65 + idx);
  return ans;
}

function ResultSummary({ questions, userAnswers, onRestart }) {
  const total = questions.length;
  const correct = userAnswers.filter(
    (ans, idx) => toLetter(ans) === questions[idx].correctAnswer
  ).length;
  const skipped = userAnswers.filter((ans) => ans === null).length;
  const percent = Math.round((correct / total) * 100);

  return (
    <motion.div
      className="card shadow-lg p-4 mx-auto mt-5"
      style={{ maxWidth: 600 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-4 text-primary">Test Summary</h2>
      <div className="mb-2">Score: {correct} / {total} ({percent}%)</div>
      <div className="mb-2 text-info fw-semibold">{getQuote(percent)}</div>
      <div className="mb-4">
        <b>Details:</b>
        <ul className="mt-2 list-group">
          {questions.map((q, idx) => {
            const userLetter = toLetter(userAnswers[idx]);
            const userText = q.options[userLetter] || "";

            return (
              <li key={idx} className="mb-2 list-group-item">
                <div>
                  <b>Q{idx + 1}:</b> {q.question}
                </div>
                <div>
                  <b>Your Answer:</b>{" "}
                  {userAnswers[idx] !== null && userAnswers[idx] !== undefined
                    ? `${userLetter}. ${userText}`
                    : <span className="text-warning">Skipped</span>}
                </div>
                <div>
                  <b>Correct:</b> {q.correctAnswer}. {q.options[q.correctAnswer]}
                </div>
                <div>
                  <b>Explanation:</b> {q.explanation}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <button
        className="btn btn-primary mt-2"
        onClick={onRestart}
      >
        Restart Test
      </button>
    </motion.div>
  );
}

export default ResultSummary;