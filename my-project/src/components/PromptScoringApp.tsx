import React, { useState, useEffect } from 'react';

interface Prompt {
  text: string;
  score: number | null;
}

const getStyleByScore = (score: number | null) => {
  if (score === null) return {};

  let color = 'black'; // default color for no score or score = 0
  if (score > 7) {
    color = 'green';
  } else if (score > 4) {
    color = 'orange';
  } else if (score > 0) {
    color = 'red';
  }

  return {
    color: color,
  };
};

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
    if (newPrompt.trim()) {
      const updatedPrompts = [...prompts, { text: newPrompt, score: null }];
      setPrompts(updatedPrompts);
      setNewPrompt('');
    }
  };

  const handleScoreChange = (index: number, score: number) => {
    const updatedPrompts = [...prompts];
    updatedPrompts[index].score = score;
    setPrompts(updatedPrompts);
  };

  return (
    <div>
      <div>
        <textarea
          value={newPrompt}
          onChange={(e) => setNewPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddPrompt();
            }
          }}
        />
        <button onClick={handleAddPrompt}>Add Prompt</button>
      </div>

      <ul>
        {prompts.map((prompt, index) => (
          <li key={index} style={getStyleByScore(prompt.score)}>
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
