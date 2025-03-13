
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const CountingLearning: React.FC = () => {
  const { theme, updateProgress } = useAppContext();
  const [currentNumber, setCurrentNumber] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [stars, setStars] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  
  const maxNumber = 20;
  
  const getNumberItems = (num: number) => {
    const items = ['🍎', '🍌', '🍒', '🍓', '🍊', '🥝', '🍉', '🍍', '🥭', '🍇'];
    const item = items[num % items.length];
    return Array(num).fill(item);
  };

  // Function to speak text using Web Speech API
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const speech = new SpeechSynthesisUtterance();
      speech.text = text;
      speech.volume = 1;
      speech.rate = 0.9;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    }
  };

  // Speak the number when it changes
  useEffect(() => {
    if (!showQuiz && !quizComplete) {
      speakText(`Number ${currentNumber}`);
    }
  }, [currentNumber, showQuiz, quizComplete]);

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

  const handleNumberClick = () => {
    speakText(`Number ${currentNumber}`);
  };

  // Quiz questions (20 questions about counting)
  const quizQuestions = [
    { question: "How many apples are there?", numItems: 3, options: [2, 3, 4, 5], answer: 3 },
    { question: "How many bananas are there?", numItems: 5, options: [4, 5, 6, 7], answer: 5 },
    { question: "How many cherries are there?", numItems: 7, options: [6, 7, 8, 9], answer: 7 },
    { question: "How many strawberries are there?", numItems: 2, options: [1, 2, 3, 4], answer: 2 },
    { question: "How many oranges are there?", numItems: 4, options: [3, 4, 5, 6], answer: 4 },
    { question: "How many kiwis are there?", numItems: 6, options: [5, 6, 7, 8], answer: 6 },
    { question: "How many watermelons are there?", numItems: 1, options: [1, 2, 3, 4], answer: 1 },
    { question: "How many pineapples are there?", numItems: 8, options: [6, 7, 8, 9], answer: 8 },
    { question: "How many mangoes are there?", numItems: 9, options: [7, 8, 9, 10], answer: 9 },
    { question: "How many grapes are there?", numItems: 10, options: [8, 9, 10, 11], answer: 10 },
    { question: "How many apples are there?", numItems: 12, options: [11, 12, 13, 14], answer: 12 },
    { question: "How many bananas are there?", numItems: 14, options: [13, 14, 15, 16], answer: 14 },
    { question: "How many cherries are there?", numItems: 16, options: [15, 16, 17, 18], answer: 16 },
    { question: "How many strawberries are there?", numItems: 11, options: [10, 11, 12, 13], answer: 11 },
    { question: "How many oranges are there?", numItems: 13, options: [12, 13, 14, 15], answer: 13 },
    { question: "How many kiwis are there?", numItems: 15, options: [14, 15, 16, 17], answer: 15 },
    { question: "How many watermelons are there?", numItems: 17, options: [16, 17, 18, 19], answer: 17 },
    { question: "How many pineapples are there?", numItems: 18, options: [17, 18, 19, 20], answer: 18 },
    { question: "How many mangoes are there?", numItems: 19, options: [18, 19, 20, 21], answer: 19 },
    { question: "How many grapes are there?", numItems: 20, options: [19, 20, 21, 22], answer: 20 },
  ];

  const handleQuizAnswer = (selectedOption: number) => {
    const currentQ = quizQuestions[currentQuizQuestion];
    const isCorrect = selectedOption === currentQ.answer;
    
    if (isCorrect) {
      setQuizScore(quizScore + 1);
      speakText("Correct! Great job!");
    } else {
      speakText(`The correct answer is ${currentQ.answer}`);
    }
    
    setShowQuizResult(true);
    
    setTimeout(() => {
      if (currentQuizQuestion < quizQuestions.length - 1) {
        setCurrentQuizQuestion(currentQuizQuestion + 1);
        setShowQuizResult(false);
      } else {
        completeQuiz();
      }
    }, 2000);
  };

  const completeQuiz = () => {
    const earnedStars = Math.ceil((quizScore / quizQuestions.length) * 3);
    setStars(earnedStars);
    setQuizComplete(true);
    updateProgress('counting', true, earnedStars);
  };

  if (quizComplete) {
    return (
      <div className={`p-4 ${theme === 'light' ? 'bg-green-100' : 'bg-green-900'} rounded-lg shadow-lg text-center animate-fade-in`}>
        <h2 className="text-2xl font-bold mb-4">Congratulations! 🎉</h2>
        <div className="text-4xl mb-4">
          {[...Array(stars)].map((_, i) => <span key={i}>⭐</span>)}
        </div>
        <p className="mb-4">You've completed the counting learning module!</p>
        <p>Your score: {quizScore} out of {quizQuestions.length}</p>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4 hover:bg-blue-600 transition-colors"
          onClick={() => {
            setShowQuiz(false);
            setQuizComplete(false);
            setCurrentNumber(1);
            setQuizScore(0);
            setCurrentQuizQuestion(0);
            setShowQuizResult(false);
          }}
        >
          Learn Again
        </button>
      </div>
    );
  }

  if (showQuiz) {
    const currentQ = quizQuestions[currentQuizQuestion];
    
    return (
      <div className={`p-4 ${theme === 'light' ? 'bg-blue-100' : 'bg-blue-900'} rounded-lg shadow-lg animate-fade-in`}>
        <h2 className="text-2xl font-bold mb-4 text-center">Counting Quiz</h2>
        <p className="mb-2 text-right">
          Question {currentQuizQuestion + 1} of {quizQuestions.length}
        </p>
        
        <div className={`p-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-lg mb-6 text-center`}>
          <p className="text-xl mb-4">{currentQ.question}</p>
          <div className="flex flex-wrap justify-center">
            {getNumberItems(currentQ.numItems).map((item, index) => (
              <span key={index} className="text-4xl m-1">{item}</span>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          {currentQ.options.map((option, index) => (
            <button 
              key={index}
              className={`p-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow text-4xl hover:bg-blue-100 transition-colors
                ${showQuizResult && option === currentQ.answer ? 'bg-green-500 text-white' : ''}
                ${showQuizResult && option !== currentQ.answer ? 'opacity-50' : ''}
              `}
              onClick={() => !showQuizResult && handleQuizAnswer(option)}
              disabled={showQuizResult}
            >
              {option}
            </button>
          ))}
        </div>
        
        {showQuizResult && (
          <div className={`mt-4 p-3 rounded-lg text-center ${
            quizQuestions[currentQuizQuestion].options.includes(quizQuestions[currentQuizQuestion].answer) 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {quizQuestions[currentQuizQuestion].options.includes(quizQuestions[currentQuizQuestion].answer) 
              ? '✅ Correct! Great job!' 
              : `❌ The correct answer is ${quizQuestions[currentQuizQuestion].answer}`
            }
          </div>
        )}
        
        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <div className="flex flex-wrap justify-center">
            {quizQuestions.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 m-1 flex items-center justify-center rounded-full
                  ${currentQuizQuestion === index 
                    ? 'bg-blue-500 text-white' 
                    : index < currentQuizQuestion 
                      ? theme === 'light' ? 'bg-green-100' : 'bg-green-900' 
                      : theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 ${theme === 'light' ? 'bg-blue-100' : 'bg-blue-900'} rounded-lg shadow-lg text-center animate-fade-in`}>
      <h2 className="text-2xl font-bold mb-4">Let's Count Together!</h2>
      
      <div 
        className={`p-8 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-lg mb-6 cursor-pointer transition-transform hover:scale-105`}
        onClick={handleNumberClick}
      >
        <div className="text-9xl font-bold animate-pulse">{currentNumber}</div>
        <div className="flex flex-wrap justify-center mt-4">
          {getNumberItems(currentNumber).map((item, index) => (
            <span key={index} className="text-4xl m-1">{item}</span>
          ))}
        </div>
        <p className="text-xs mt-4 text-blue-500">Click to hear the pronunciation</p>
      </div>
      
      <div className="flex justify-between items-center">
        <button 
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentNumber === 1 ? 'opacity-50 cursor-not-allowed' : ''} hover:bg-blue-600 transition-colors`}
          onClick={handlePrevNumber}
          disabled={currentNumber === 1}
        >
          Previous
        </button>
        
        <div className="text-lg">
          {currentNumber} / {maxNumber}
        </div>
        
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={handleNextNumber}
        >
          {currentNumber === maxNumber ? 'Take Quiz' : 'Next'}
        </button>
      </div>
      
      {/* Number navigation */}
      <div className="mt-8 overflow-x-auto">
        <div className="flex flex-wrap justify-center">
          {[...Array(maxNumber)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentNumber(index + 1)}
              className={`w-10 h-10 m-1 rounded-full flex items-center justify-center
                ${currentNumber === index + 1 
                  ? 'bg-blue-500 text-white' 
                  : theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'} 
                hover:bg-blue-400 transition-colors`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountingLearning;
