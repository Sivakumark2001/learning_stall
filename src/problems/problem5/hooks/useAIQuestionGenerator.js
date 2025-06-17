// src/hooks/useAIQuestionGenerator.js
import { useState, useEffect } from "react";

export const useAIQuestionGenerator = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
      // Dynamically add the Puter.js script
      const script = document.createElement('script');
      script.src = 'https://js.puter.com/v2/';
      script.async = true;
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      };
    }, []);

  const generateQuestions = async (subject, topic, count = 10) => {
    setLoading(true);
    setError(null);

    const prompt = `
You are an expert CA exam question generator.

Your task:
- Generate exactly 2 unique, non-repeating multiple-choice questions for CA Interns based on the subject "${subject}" and topic "${topic}".
- Each question must have a detailed and informative explanation.
- Output ONLY a valid JSON array, with NO markdown, comments, or extra text.

Format:
[
  {
    "question": "string",
    "options": {
      "A": "string",
      "B": "string",
      "C": "string",
      "D": "string"
    },
    "correctAnswer": "A" | "B" | "C" | "D",
    "explanation": "string"
  },
  ...
]

Rules:
- Do NOT include any text, markdown, or explanation outside the JSON array.
- All property names and string values must use double quotes.
- All option values must be wrapped in double quotes, and must NOT contain extra quotes inside.
- Do NOT escape or double-quote the entire value.
- Do NOT use single quotes or trailing commas.
- Do NOT include any commas or quotes outside the double quotes for each option value.
- The response MUST be valid JSON that can be parsed by JSON.parse in JavaScript.
    `.trim();

    try {
      const response = await window.puter.ai.chat(prompt, {
        model: 'openrouter:meta-llama/llama-3.1-8b-instruct:free',
      });

      console.log('AI Response:', response);

      // Ensure response is a string
      let clean = typeof response === "string" ? response.trim() : String(response).trim();

      // Remove triple backticks and language tag if present
      if (clean.startsWith('```')) {
        clean = clean.replace(/^```[a-zA-Z]*\s*/, '').replace(/```$/, '').trim();
      }

      // Try to extract the largest JSON array from the response
      let jsonBlock = null;
      const arrayMatch = clean.match(/\[[\s\S]*\]/);
      if (arrayMatch) {
        jsonBlock = arrayMatch[0];
      } else {
        // fallback: try to extract the first object
        const objectMatch = clean.match(/\{[\s\S]*\}/);
        if (objectMatch) jsonBlock = `[${objectMatch[0]}]`;
      }

      if (!jsonBlock) {
        setError('No JSON found in AI response.');
        setLoading(false);
        return;
      }

      // Final strict clean-up for common JSON issues
      jsonBlock = jsonBlock
        .replace(/(\r\n|\n|\r)/gm, "") // remove newlines
        .replace(/,\s*}/g, '}')        // remove trailing commas in objects
        .replace(/,\s*]/g, ']');       // remove trailing commas in arrays

      // Fix unquoted option values (e.g., "D": All of the above)
      jsonBlock = jsonBlock.replace(/"([A-D])":\s*([^"][^,}\]]*)/g, (_, key, val) => {
        return `"${key}": "${val.trim().replace(/"/g, '\\"')}"`;
      });

      // Remove extra quotes at the start/end of option values (e.g., "\"Some text\"" -> "Some text")
      jsonBlock = jsonBlock.replace(/"([A-D])":\s*"(.*?)"(,|\})/g, (_, key, val, end) => {
        // Remove leading/trailing quotes inside the value
        const cleanVal = val.replace(/^"+|"+$/g, '').replace(/\\"/g, '"');
        return `"${key}": "${cleanVal}"${end}`;
      });

      // Fix double double-quotes and trailing backslashes in option values
      jsonBlock = jsonBlock.replace(/"([A-D])":\s*""(.*?)\\?"/g, (_, key, val) => {
        return `"${key}": "${val.replace(/"/g, '\\"')}"`;
      });

      let parsed = null;
      try {
        parsed = JSON.parse(jsonBlock);
      } catch (err) {
        console.error('Error parsing JSON:', err, '\nRaw:', jsonBlock);
        setError('AI did not return valid JSON. Please try again.');
        setLoading(false);
        return;
      }

      if (Array.isArray(parsed)) {
        setQuestions(parsed);
      } else if (parsed && typeof parsed === "object") {
        setQuestions([parsed]);
      } else {
        setError('Unexpected format. Could not parse JSON.');
      }
    } catch (err) {
      console.error('Error generating questions:', err);
      setError('Error generating questions: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return { generateQuestions, questions, loading, error, setQuestions };
};
