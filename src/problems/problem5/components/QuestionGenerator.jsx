// src/components/QuestionGenerator.jsx
import React, { useState } from 'react';
import { useAIQuestionGenerator } from '../hooks/useAIQuestionGenerator';

const QuestionGenerator = () => {
  const [subject, setSubject] = useState('Auditing');
  const [topic, setTopic] = useState('Code of Ethics');
  const { generateQuestions, questions, loading, error } = useAIQuestionGenerator();

  const handleGenerate = () => {
    if (subject && topic) {
      generateQuestions(subject, topic);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '20px auto', fontFamily: 'Arial' }}>
      <h2>📚 AI-Based MCQ Generator</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Subject (e.g. Auditing)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ padding: 10, width: '45%', marginRight: 10 }}
        />
        <input
          placeholder="Topic (e.g. Code of Ethics)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{ padding: 10, width: '45%' }}
        />
        <br />
        <button onClick={handleGenerate} style={{ marginTop: 10, padding: '10px 20px' }}>
          Generate Questions
        </button>
      </div>

      {loading && <p>⏳ Generating questions...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {questions.map((q, i) => (
        <div
          key={i}
          style={{
            background: '#f9f9f9',
            padding: 15,
            marginBottom: 10,
            border: '1px solid #ddd',
            borderRadius: 4,
          }}
        >
          <p><strong>Q{i + 1}:</strong> {q.question}</p>
          <ul>
            {Object.entries(q.options).map(([key, val]) => (
              <li key={key}>
                <strong>{key}:</strong> {val}
              </li>
            ))}
          </ul>
          <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
          <p><strong>Explanation:</strong> {q.explanation}</p>
        </div>
      ))}
    </div>
  );
};

export default QuestionGenerator;
