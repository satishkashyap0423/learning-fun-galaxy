
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const ImageRecognition: React.FC = () => {
  const { theme, updateProgress } = useAppContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  
  const questions = [
    {
      question: "What animal is this?",
      image: "🐘",
      options: ["Elephant", "Giraffe", "Lion", "Monkey"],
      answer: "Elephant"
    },
    {
      question: "What fruit is this?",
      image: "🍎",
      options: ["Orange", "Banana", "Apple", "Grapes"],
      answer: "Apple"
    },
    {
      question: "What is this?",
      image: "🚗",
      options: ["Bicycle", "Car", "Airplane", "Train"],
      answer: "Car"
    },
    {
      question: "What is this?",
      image: "🏠",
      options: ["School", "Hospital", "House", "Shop"],
      answer: "House"
    },
    {
      question: "What is this?",
      image: "🌮",
      options: ["Pizza", "Burger", "Taco", "Sandwich"],
      answer: "Taco"
    }
  ];

  const handleAnswer = (selectedOption: string) => {
    const isCorrect = selectedOption === questions[currentQuestion].answer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowResult(false);
      } else {
        setQuizComplete(true);
        
        // Convert score to stars (0-3)
        const stars = Math.ceil((score / questions.length) * 3);
        updateProgress('image-recognition', true, stars);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const stars = Math.ceil((score / questions.length) * 3);
    
    return (
      <div className={`p-4 ${theme === 'light' ? 'bg-green-100' : 'bg-green-900'} rounded-lg shadow-lg text-center`}>
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <p className="mb-4">You got {score} out of {questions.length} correct!</p>
        
        <div className="text-4xl mb-6">
          {[...Array(stars)].map((_, i) => <span key={i}>⭐</span>)}
        </div>
        
        <button 
          onClick={resetQuiz}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Play Again
        </button>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className={`p-4 ${theme === 'light' ? 'bg-yellow-100' : 'bg-yellow-900'} rounded-lg shadow-lg`}>
      <div className="mb-2 text-right">
        Question {currentQuestion + 1} of {questions.length}
      </div>
      
      <h2 className="text-2xl font-bold mb-4 text-center">Image Recognition</h2>
      
      <div className={`p-8 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-lg mb-6 text-center`}>
        <p className="mb-4">{currentQ.question}</p>
        <div className="text-9xl">{currentQ.image}</div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {currentQ.options.map((option, index) => (
          <button 
            key={index}
            onClick={() => !showResult && handleAnswer(option)}
            disabled={showResult}
            className={`p-4 rounded-lg shadow transition-colors
              ${showResult && option === currentQ.answer 
                ? 'bg-green-500 text-white' 
                : showResult && option !== currentQ.answer
                  ? 'bg-gray-300 text-gray-700'
                  : theme === 'light' ? 'bg-white hover:bg-blue-100' : 'bg-gray-800 hover:bg-gray-700'}
            `}
          >
            {option}
          </button>
        ))}
      </div>
      
      {showResult && (
        <div className={`mt-4 p-3 rounded-lg text-center ${
          currentQ.options[0] === currentQ.answer 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {currentQ.options[0] === currentQ.answer 
            ? '✅ Correct! Great job!' 
            : `❌ The correct answer is ${currentQ.answer}`
          }
        </div>
      )}
    </div>
  );
};

export default ImageRecognition;
