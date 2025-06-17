import React, { useEffect, useState } from 'react';

const OpenRouterChat = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('Explain how LLMs work');

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

  const handleGenerate = async () => {
    setResponse('');
    setLoading(true);

    try {
      const result = await window.puter.ai.chat(prompt, {
        model: 'openrouter:meta-llama/llama-3.1-8b-instruct',
      });
      console.log('AI Response:', result);
      setResponse(result);
    } catch (error) {
      console.log('AI error:', error);
      setResponse('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '20px auto', fontFamily: 'Arial' }}>
      <h2>🧠 OpenRouter AI Chat</h2>
      <textarea
        rows="4"
        style={{ width: '100%', padding: 10 }}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handleGenerate} style={{ marginTop: 10, padding: '10px 20px' }}>
        Generate
      </button>
      {loading && <p>⏳ Generating response...</p>}
      <div style={{ marginTop: 20, background: '#f0f0f0', padding: 15 }}>
        {response}
      </div>
    </div>
  );
};

export default OpenRouterChat;