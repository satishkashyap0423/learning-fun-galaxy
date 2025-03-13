
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const CountingLearning: React.FC = () => {
  const { theme, updateProgress } = useAppContext();
  const [currentNumber, setCurrentNumber] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [stars, setStars] = useState(0);
  
  const maxNumber = 20;
  
  const getNumberItems = (num: number) => {
    const items = ['🍎', '🍌', '🍒', '🍓', '🍊', '🥝', '🍉', '🍍', '🥭', '🍇'];
    const item = items[num % items.length];
    return Array(num).fill(item);
  };

  const handleNextNumber = () => {
    if (currentNumber < maxNumber) {
      setCurrentNumber(currentNumber + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handlePrevNumber = () => {
    if (currentNumber > 1) {
      setCurrentNumber(currentNumber - 1);
    }
  };

  const completeQuiz = (score: number) => {
    const earnedStars = score >= 80 ? 3 : score >= 60 ? 2 : 1;
    setStars(earnedStars);
    setQuizComplete(true);
    updateProgress('counting', true, earnedStars);
  };

  if (quizComplete) {
    return (
      <div className={`p-4 ${theme === 'light' ? 'bg-green-100' : 'bg-green-900'} rounded-lg shadow-lg text-center`}>
        <h2 className="text-2xl font-bold mb-4">Congratulations! 🎉</h2>
        <div className="text-4xl mb-4">
          {[...Array(stars)].map((_, i) => <span key={i}>⭐</span>)}
        </div>
        <p className="mb-4">You've completed the counting learning module!</p>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => {
            setShowQuiz(false);
            setQuizComplete(false);
            setCurrentNumber(1);
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
        <h2 className="text-2xl font-bold mb-4 text-center">Counting Quiz</h2>
        <p className="mb-4 text-center">How many fruits do you see?</p>
        
        <div className="p-6 bg-white rounded-lg shadow-lg mb-6 text-center">
          <div className="flex flex-wrap justify-center text-4xl">
            {getNumberItems(7).map((item, index) => (
              <span key={index} className="m-1">{item}</span>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[5, 6, 7, 8].map(num => (
            <button 
              key={num}
              className={`p-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow text-4xl`}
              onClick={() => completeQuiz(num === 7 ? 100 : 0)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 ${theme === 'light' ? 'bg-blue-100' : 'bg-blue-900'} rounded-lg shadow-lg text-center`}>
      <h2 className="text-2xl font-bold mb-4">Let's Count Together!</h2>
      
      <div className={`p-8 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-lg mb-6`}>
        <div className="text-9xl font-bold">{currentNumber}</div>
        <div className="flex flex-wrap justify-center mt-4">
          {getNumberItems(currentNumber).map((item, index) => (
            <span key={index} className="text-4xl m-1">{item}</span>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <button 
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentNumber === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePrevNumber}
          disabled={currentNumber === 1}
        >
          Previous
        </button>
        
        <div className="text-lg">
          {currentNumber} / {maxNumber}
        </div>
        
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={handleNextNumber}
        >
          {currentNumber === maxNumber ? 'Take Quiz' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default CountingLearning;
