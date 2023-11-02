import React, { useState, useEffect } from 'react';

interface Prompt {
  text: string;
  score: number | null;
}

const PromptScoringApp: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [newPrompt, setNewPrompt] = useState('');

  // Load prompts from localStorage on component mount
  useEffect(() => {
    const savedPrompts = localStorage.getItem('prompts');
    if (savedPrompts) {
      setPrompts(JSON.parse(savedPrompts));
    }
  }, []);

  // Save prompts to localStorage when prompts state changes
  useEffect(() => {
    localStorage.setItem('prompts', JSON.stringify(prompts));
  }, [prompts]);

  const handleAddPrompt = () => {
    const updatedPrompts = [...prompts, { text: newPrompt, score: null }];
    setPrompts(updatedPrompts);
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
