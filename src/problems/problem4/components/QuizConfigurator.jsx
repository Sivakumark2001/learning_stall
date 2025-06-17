import React, { useState } from "react";
import { DIFFICULTY_LEVELS } from "../utils/constants";
import { motion } from "framer-motion";

function QuizConfigurator({ onStart }) {
  const [subjectInput, setSubjectInput] = useState("");
  const [topicInput, setTopicInput] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [questionCount, setQuestionCount] = useState(5);

  const handleAddSubject = () => {
    if (subjectInput.trim() && !subjects.includes(subjectInput.trim())) {
      setSubjects([...subjects, subjectInput.trim()]);
      setSubjectInput("");
    }
  };

  const handleAddTopic = () => {
    if (topicInput.trim() && !topics.includes(topicInput.trim())) {
      setTopics([...topics, topicInput.trim()]);
      setTopicInput("");
    }
  };

  const handleRemoveSubject = (subj) => setSubjects(subjects.filter(s => s !== subj));
  const handleRemoveTopic = (topic) => setTopics(topics.filter(t => t !== topic));

  const handleLevelChange = (e) => {
    const { value, checked } = e.target;
    setSelectedLevels((prev) =>
      checked ? [...prev, value] : prev.filter((l) => l !== value)
    );
  };

  return (
    <motion.div
      className="card shadow-lg p-4 mx-auto mt-5"
      style={{ maxWidth: 500 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="mb-4 text-primary">Configure Your Test</h2>
      <div className="mb-3">
        <label className="form-label fw-bold">Subjects:</label>
        <div className="d-flex gap-2 mb-2">
          <input
            className="form-control"
            placeholder="Add subject"
            value={subjectInput}
            onChange={e => setSubjectInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAddSubject()}
          />
          <button className="btn btn-outline-primary" type="button" onClick={handleAddSubject}>
            Add
          </button>
        </div>
        <div className="d-flex flex-wrap gap-2">
          {subjects.map(subj => (
            <span key={subj} className="badge bg-primary">
              {subj}
              <button
                type="button"
                className="btn-close btn-close-white btn-sm ms-2"
                aria-label="Remove"
                onClick={() => handleRemoveSubject(subj)}
                style={{ fontSize: 10, marginLeft: 6 }}
              />
            </span>
          ))}
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label fw-bold">Topics:</label>
        <div className="d-flex gap-2 mb-2">
          <input
            className="form-control"
            placeholder="Add topic"
            value={topicInput}
            onChange={e => setTopicInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAddTopic()}
          />
          <button className="btn btn-outline-primary" type="button" onClick={handleAddTopic}>
            Add
          </button>
        </div>
        <div className="d-flex flex-wrap gap-2">
          {topics.map(topic => (
            <span key={topic} className="badge bg-secondary">
              {topic}
              <button
                type="button"
                className="btn-close btn-close-white btn-sm ms-2"
                aria-label="Remove"
                onClick={() => handleRemoveTopic(topic)}
                style={{ fontSize: 10, marginLeft: 6 }}
              />
            </span>
          ))}
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label fw-bold">Difficulty:</label>
        <div className="d-flex gap-2">
          {DIFFICULTY_LEVELS.map((level) => (
            <div className="form-check me-3" key={level}>
              <input
                className="form-check-input"
                type="checkbox"
                value={level}
                checked={selectedLevels.includes(level)}
                onChange={handleLevelChange}
                id={`level-${level}`}
              />
              <label className="form-check-label" htmlFor={`level-${level}`}>
                {level}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label fw-bold">Number of Questions:</label>
        <input
          type="number"
          min={1}
          max={20}
          className="form-control"
          value={questionCount}
          onChange={e => setQuestionCount(Math.max(1, Math.min(20, Number(e.target.value))))}
          style={{ width: 120 }}
        />
        <div className="form-text text-warning">
          Note: Generating more questions may take extra time.
        </div>
      </div>
      <button
        className="btn btn-primary mt-2"
        disabled={
          !subjects.length ||
          !topics.length ||
          !selectedLevels.length ||
          !questionCount
        }
        onClick={() =>
          onStart({
            subjects,
            topics,
            levels: selectedLevels,
            questionCount,
          })
        }
      >
        Start Test
      </button>
    </motion.div>
  );
}

export default QuizConfigurator;