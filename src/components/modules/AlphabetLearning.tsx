
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const AlphabetLearning: React.FC = () => {
  const { theme, updateProgress } = useAppContext();
  const [currentLetter, setCurrentLetter] = useState('A');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [stars, setStars] = useState(0);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  const getLetterExample = (letter: string) => {
    const examples: Record<string, string> = {
      'A': 'Apple 🍎',
      'B': 'Balloon 🎈',
      'C': 'Cat 🐱',
      'D': 'Dog 🐶',
      'E': 'Elephant 🐘',
      'F': 'Fish 🐠',
      'G': 'Giraffe 🦒',
      'H': 'House 🏠',
      'I': 'Ice Cream 🍦',
      'J': 'Jellyfish 🪼',
      'K': 'Kite 🪁',
      'L': 'Lion 🦁',
      'M': 'Monkey 🐒',
      'N': 'Nest 🪹',
      'O': 'Orange 🍊',
      'P': 'Penguin 🐧',
      'Q': 'Queen 👑',
      'R': 'Rainbow 🌈',
      'S': 'Sun ☀️',
      'T': 'Tree 🌳',
      'U': 'Umbrella ☂️',
      'V': 'Violin 🎻',
      'W': 'Whale 🐳',
      'X': 'Xylophone 🎵',
      'Y': 'Yo-yo 🪀',
      'Z': 'Zebra 🦓'
    };
    
    return examples[letter] || `${letter} Letter`;
  };

  const handleNextLetter = () => {
    const currentIndex = alphabet.indexOf(currentLetter);
    if (currentIndex < alphabet.length - 1) {
      setCurrentLetter(alphabet[currentIndex + 1]);
    } else {
      setShowQuiz(true);
    }
  };

  const handlePrevLetter = () => {
    const currentIndex = alphabet.indexOf(currentLetter);
    if (currentIndex > 0) {
      setCurrentLetter(alphabet[currentIndex - 1]);
    }
  };

  const completeQuiz = (score: number) => {
    const earnedStars = score >= 80 ? 3 : score >= 60 ? 2 : 1;
    setStars(earnedStars);
    setQuizComplete(true);
    updateProgress('alphabet', true, earnedStars);
  };

  if (quizComplete) {
    return (
      <div className={`p-4 ${theme === 'light' ? 'bg-green-100' : 'bg-green-900'} rounded-lg shadow-lg text-center`}>
        <h2 className="text-2xl font-bold mb-4">Congratulations! 🎉</h2>
        <div className="text-4xl mb-4">
          {[...Array(stars)].map((_, i) => <span key={i}>⭐</span>)}
        </div>
        <p className="mb-4">You've completed the alphabet learning module!</p>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => {
            setShowQuiz(false);
            setQuizComplete(false);
            setCurrentLetter('A');
          }}
        >
          Learn Again
        </button>
      </div>
    );
  }

  if (showQuiz) {
    return (
      <div className={`p-4 ${theme === 'light' ? 'bg-blue-100' : 'bg-blue-900'} rounded-lg shadow-lg`}>
        <h2 className="text-2xl font-bold mb-4 text-center">Alphabet Quiz</h2>
        <p className="mb-4 text-center">Let's see what you've learned!</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          {alphabet.slice(0, 10).map(letter => (
            <button 
              key={letter}
              className={`p-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow text-4xl`}
              onClick={() => {}}
            >
              {letter}
            </button>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={() => completeQuiz(85)}
          >
            Finish Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 ${theme === 'light' ? 'bg-blue-100' : 'bg-blue-900'} rounded-lg shadow-lg text-center`}>
      <h2 className="text-2xl font-bold mb-4">Let's Learn the Alphabet!</h2>
      
      <div className={`p-8 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-lg mb-6`}>
        <div className="text-9xl font-bold">{currentLetter}</div>
        <div className="text-4xl mt-4">{getLetterExample(currentLetter)}</div>
      </div>
      
      <div className="flex justify-between items-center">
        <button 
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentLetter === 'A' ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePrevLetter}
          disabled={currentLetter === 'A'}
        >
          Previous
        </button>
        
        <div className="text-lg">
          {alphabet.indexOf(currentLetter) + 1} / {alphabet.length}
        </div>
        
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={handleNextLetter}
        >
          {currentLetter === 'Z' ? 'Take Quiz' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default AlphabetLearning;
