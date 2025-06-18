import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const tips = [
  "💡 Did you know? Practicing MCQs boosts your memory retention!",
  "🧠 Fun Fact: The CA exam is one of the toughest in the world.",
  "⏳ Tip: Stay calm and read each question carefully.",
  "🎯 Pro Tip: Eliminate obviously wrong answers first.",
  "📚 Learning is a journey, not a race. Enjoy the ride!",
  "🤖 Powered by AI: Your questions are being generated live!",
];

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: { repeat: Infinity, duration: 1, ease: "linear" }
  }
};

function QuizLoading() {
  const [seconds, setSeconds] = useState(0);
  const [tipIdx, setTipIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const tipTimer = setInterval(() => setTipIdx((i) => (i + 1) % tips.length), 3500);
    return () => clearInterval(tipTimer);
  }, []);

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        minHeight: 320,
        color: "var(--text-main)"
      }}
    >
      <motion.div
        style={{
          width: 64,
          height: 64,
          border: "8px solid #e3e9f7",
          borderTop: "8px solid #1976d2",
          borderRadius: "50%",
          marginBottom: 24,
        }}
        variants={spinnerVariants}
        animate="animate"
      />
      <div className="fw-bold mb-2" style={{ fontSize: 22 }}>
        Generating your quiz...
      </div>
      <div className="mb-2 text-secondary" style={{ fontSize: 16 }}>
        Please wait <b>{seconds}s</b>
      </div>
      <motion.div
        key={tipIdx}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="text-info"
        style={{ fontSize: 16, minHeight: 32, textAlign: "center", maxWidth: 400 }}
      >
        {tips[tipIdx]}
      </motion.div>
    </div>
  );
}

export default QuizLoading;