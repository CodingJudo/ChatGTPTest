import React, { useState } from 'react';

interface Prompt {
  text: string;
  score: number | null;
}

const PromptScoringApp: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [newPrompt, setNewPrompt] = useState('');

  const handleAddPrompt = () => {
    setPrompts([...prompts, { text: newPrompt, score: null }]);
    setNewPrompt('');
  };

  const handleScoreChange = (index: number, score: number) => {
    const newPrompts = [...prompts];
    newPrompts[index].score = score;
    setPrompts(newPrompts);
  };

  return (
    <div>
      <div>
        <textarea
          value={newPrompt}
          onChange={(e) => setNewPrompt(e.target.value)}
        />
        <button onClick={handleAddPrompt}>Add Prompt</button>
      </div>

      <ul>
        {prompts.map((prompt, index) => (
          <li key={index}>
            {prompt.text}
            <input
              type="number"
              value={prompt.score || ''}
              onChange={(e) => handleScoreChange(index, Number(e.target.value))}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromptScoringApp;
