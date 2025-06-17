import MOCK_QUESTIONS from "./mockQuestions.json";

const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/gpt2";
const HUGGINGFACE_API_KEY = "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"; // Add your key if available

export async function fetchQuestionAI({ subject, module, level }) {
  // Prompt engineering
  const prompt = `Generate a CA Intern-level multiple-choice question (MCQ) from the topic '${module}' in ${subject} at a ${level} level. Include 4 options (A, B, C, D), mark the correct one, and provide a short explanation for the correct answer. Respond in JSON format as: {"question":"...","options":{"A":"...","B":"...","C":"...","D":"..."},"correctAnswer":"B","explanation":"..."}`;

  try {
    const res = await fetch(HUGGINGFACE_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });
    const data = await res.json();
    // Parse and validate AI response
    const match = data[0]?.generated_text?.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("Invalid AI response");
  } catch (e) {
    // Fallback: pick a random mock question
    const fallback = MOCK_QUESTIONS[Math.floor(Math.random() * MOCK_QUESTIONS.length)];
    return fallback;
  }
}


export async function fetchQuestionOpenAI({ subject, module, level, apiKey }) {
  const prompt = `Generate a CA Intern-level multiple-choice question (MCQ) from the topic '${module}' in ${subject} at a ${level} level. Include 4 options (A, B, C, D), mark the correct one, and provide a short explanation for the correct answer. Respond in JSON format as: {"question":"...","options":{"A":"...","B":"...","C":"...","D":"..."},"correctAnswer":"B","explanation":"..."}`;

  const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

  try {
    const res = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful CA Intern exam quiz generator." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 512,
      }),
    });
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || "";
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("Invalid OpenAI response");
  } catch (e) {
    return null;
  }
}