
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const SentenceFormation: React.FC = () => {
  const { theme, updateProgress } = useAppContext();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);
  
  const levels = [
    {
      words: ["I", "am", "happy", "today"],
      correctSentence: "I am happy today"
    },
    {
      words: ["The", "dog", "is", "running", "fast"],
      correctSentence: "The dog is running fast"
    },
    {
      words: ["She", "likes", "to", "eat", "apples"],
      correctSentence: "She likes to eat apples"
    },
    {
      words: ["We", "are", "going", "to", "school"],
      correctSentence: "We are going to school"
    },
    {
      words: ["They", "play", "in", "the", "park"],
      correctSentence: "They play in the park"
    }
  ];

  const shuffleWords = (words: string[]) => {
    return [...words].sort(() => Math.random() - 0.5);
  };

  const [availableWords, setAvailableWords] = useState(shuffleWords(levels[currentLevel - 1].words));

  const selectWord = (word: string, index: number) => {
    if (showResult) return;
    
    setSelectedWords([...selectedWords, word]);
    setAvailableWords(availableWords.filter((_, i) => i !== index));
  };

  const removeWord = (index: number) => {
    if (showResult) return;
    
    const word = selectedWords[index];
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
    setAvailableWords([...availableWords, word]);
  };

  const checkSentence = () => {
    const currentSentence = selectedWords.join(" ");
    const correct = currentSentence === levels[currentLevel - 1].correctSentence;
    
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      if (correct) {
        if (currentLevel < levels.length) {
          setCurrentLevel(currentLevel + 1);
          setSelectedWords([]);
          setAvailableWords(shuffleWords(levels[currentLevel].words));
          setShowResult(false);
        } else {
          setLevelComplete(true);
          updateProgress('sentence-formation', true, 3); // Full stars for completing all levels
        }
      } else {
        // Reset the sentence for retry
        setAvailableWords(shuffleWords(levels[currentLevel - 1].words));
        setSelectedWords([]);
        setShowResult(false);
      }
    }, 2000);
  };

  const resetActivity = () => {
    setCurrentLevel(1);
    setSelectedWords([]);
    setAvailableWords(shuffleWords(levels[0].words));
    setShowResult(false);
    setLevelComplete(false);
  };

  if (levelComplete) {
    return (
      <div className={`p-4 ${theme === 'light' ? 'bg-green-100' : 'bg-green-900'} rounded-lg shadow-lg text-center`}>
        <h2 className="text-2xl font-bold mb-4">Congratulations! 🎉</h2>
        <p className="mb-4">You've completed all sentence formation levels!</p>
        
        <div className="text-4xl mb-6">
          ⭐⭐⭐
        </div>
        
        <button 
          onClick={resetActivity}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Start Again
        </button>
      </div>
    );
  }

  return (
    <div className={`p-4 ${theme === 'light' ? 'bg-indigo-100' : 'bg-indigo-900'} rounded-lg shadow-lg`}>
      <h2 className="text-2xl font-bold mb-4 text-center">Sentence Formation</h2>
      <div className="mb-2 text-right">
        Level {currentLevel} of {levels.length}
      </div>
      
      {/* Selected words (forming sentence) */}
      <div className={`min-h-20 p-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-lg mb-6 flex flex-wrap gap-2 items-center`}>
        {selectedWords.length === 0 ? (
          <p className="text-gray-500 w-full text-center">Select words to form a sentence</p>
        ) : (
          selectedWords.map((word, index) => (
            <button
              key={index}
              onClick={() => removeWord(index)}
              className={`px-3 py-2 rounded ${theme === 'light' ? 'bg-blue-100 hover:bg-blue-200' : 'bg-blue-900 hover:bg-blue-800'} transition-colors`}
            >
              {word}
            </button>
          ))
        )}
      </div>
      
      {/* Available words */}
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        {availableWords.map((word, index) => (
          <button
            key={index}
            onClick={() => selectWord(word, index)}
            className={`px-3 py-2 rounded ${theme === 'light' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-700 hover:bg-gray-600'} transition-colors`}
          >
            {word}
          </button>
        ))}
      </div>
      
      {/* Check button */}
      <div className="text-center">
        <button
          onClick={checkSentence}
          disabled={selectedWords.length !== levels[currentLevel - 1].words.length || showResult}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedWords.length === levels[currentLevel - 1].words.length && !showResult
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-300 text-gray-700 cursor-not-allowed'
          }`}
        >
          Check Sentence
        </button>
      </div>
      
      {/* Feedback */}
      {showResult && (
        <div className={`mt-4 p-3 rounded-lg text-center ${
          isCorrect 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {isCorrect 
            ? '✅ Correct! Well done!' 
            : `❌ Not quite right. The correct sentence is: "${levels[currentLevel - 1].correctSentence}"`
          }
        </div>
      )}
    </div>
  );
};

export default SentenceFormation;
