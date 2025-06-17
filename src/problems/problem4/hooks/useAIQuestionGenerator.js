// src/hooks/useAIQuestionGenerator.js
import { useState, useEffect } from "react";

export const useAIQuestionGenerator = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Only run once when the hook is first used
  useEffect(() => {
    if (!window.puter) {
      const script = document.createElement('script');
      script.src = 'https://js.puter.com/v2/';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  const generateQuestions = async (subject, topic, count = 5, levels = []) => {
    setLoading(true);
    setError(null);

    const difficultyText = levels.length
      ? `The questions should cover these difficulty levels (in order): ${levels.join(", ")}.`
      : "";

    const prompt = `
You are an expert exam question generator.

Generate ${count} multiple-choice questions based on the subject "${subject}" and "${topic}".
${difficultyText}
Response format:
question:::Your question text here|||options:::Option A;Option B;Option C;Option D|||correctAnswer:::A|||explanation:::Brief explanation of the correct answer???
(Repeat for each question, separated by '???')
Rules:
- use only ??? to separate questions.
- Use only ||| to separate fields.
- Use only ::: to separate keys and values.
- Use only ; to separate the four options.
- Dont give anything before first question and after last question end
- Do NOT use JSON, markdown, or any extra formatting.

Example:
question:::Which account is debited when cash is received from a customer?|||options:::Sales Account;Cash Account;Customer Account;Capital Account|||correctAnswer:::B|||explanation:::Cash Account is debited when cash is received.???question:::Which account is debited when cash is received from a customer?|||options:::Sales Account;Cash Account;Customer Account;Capital Account|||correctAnswer:::B|||explanation:::Cash Account is debited when cash is received.???
    `.trim();

    try {
      const response = await window.puter.ai.chat(prompt, {
        model: 'openrouter:meta-llama/llama-3.1-8b-instruct:free',
      });

      console.log('AI Response:', response);
      debugger

      const rawText = response.message.content.trim();
      console.log('Raw AI Response:', rawText);

      // Split the response into individual questions
      const rawQuestions = rawText.split('???');
      console.log('Raw Questions:', rawQuestions);

      let parsedQuestions = [];

      // Parse each question into an object
      rawQuestions.map((q,index) => { 
        const parts = q.split('|||');
        if (parts.length < 4) return; // Skip if not enough parts

        const questionObj = {
          question: '',
          options: [],
          correctAnswer: '',
          explanation: ''
        };

        parts.forEach(part => {
          const [key, value] = part.split(':::');
          if (key && value) {
            switch (key.trim()) {
              case 'question':
                questionObj.question = value.trim();
                break;
              case 'options':
                questionObj.options = value.split(';').map(opt => opt.trim());
                break;
              case 'correctAnswer':
                questionObj.correctAnswer = value.trim();
                break;
              case 'explanation':
                questionObj.explanation = value.trim();
                break;
            }
          }
        });

        parsedQuestions.push(questionObj);
      });

      setQuestions(parsedQuestions);
    } catch (err) {
      setError('Error generating questions: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return { generateQuestions, questions, loading, error, setQuestions };
};
