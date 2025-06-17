import React from "react";
import { motion } from "framer-motion";

function QuestionNavigation({
  current,
  total,
  onPrev,
  onNext,
  answered,
  skipped,
  onJump,
}) {
  return (
    <motion.div
      className="d-flex align-items-center justify-content-center gap-2 mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        className="btn btn-outline-secondary"
        onClick={onPrev}
        disabled={current === 0}
      >
        Previous
      </button>
      {[...Array(total)].map((_, idx) => (
        <button
          key={idx}
          className={
            "btn rounded-circle mx-1 " +
            (current === idx
              ? "btn-primary text-white fw-bold border-3 border-primary"
              : skipped.includes(idx)
              ? "btn-warning text-dark"
              : answered.includes(idx)
              ? "btn-success text-white"
              : "btn-outline-secondary")
          }
          style={{ width: 38, height: 38, fontWeight: 600, fontSize: 16 }}
          onClick={() => onJump(idx)}
        >
          {idx + 1}
        </button>
      ))}
      <button
        className="btn btn-outline-secondary"
        onClick={onNext}
        disabled={current === total - 1}
      >
        Next
      </button>
    </motion.div>
  );
}

export default QuestionNavigation;