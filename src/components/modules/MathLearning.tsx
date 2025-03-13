
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const MathLearning: React.FC = () => {
  const { theme, updateProgress } = useAppContext();
  const [currentOperation, setCurrentOperation] = useState<'addition' | 'subtraction' | 'multiplication'>('addition');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  
  const operations = {
    addition: { symbol: '+', name: 'Addition' },
    subtraction: { symbol: '-', name: 'Subtraction' },
    multiplication: { symbol: '×', name: 'Multiplication' }
  };

  const totalQuestions = 5;
  
  // Generate a simple math problem based on current operation
  const generateProblem = () => {
    let num1, num2, answer, options;
    
    switch (currentOperation) {
      case 'addition':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 + num2;
        break;
      case 'subtraction':
        num1 = Math.floor(Math.random() * 10) + 5; // Ensure num1 is larger
        num2 = Math.floor(Math.random() * num1);
        answer = num1 - num2;
        break;
      case 'multiplication':
        num1 = Math.floor(Math.random() * 5) + 1; // Keep it simple
        num2 = Math.floor(Math.random() * 5) + 1;
        answer = num1 * num2;
        break;
      default:
        num1 = 1;
        num2 = 1;
        answer = 2;
    }
    
    // Generate 4 options including the correct answer
    options = [answer];
    
    while (options.length < 4) {
      const randomOption = answer + Math.floor(Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1);
      if (randomOption > 0 && !options.includes(randomOption)) {
        options.push(randomOption);
      }
    }
    
    // Shuffle options
    options = options.sort(() => Math.random() - 0.5);
    
    return { num1, num2, answer, options };
  };

  // Memoize the current problem so it doesn't change on re-renders
  const [currentProblem, setCurrentProblem] = useState(generateProblem());

  const checkAnswer = (selectedOption: number) => {
    setSelectedAnswer(selectedOption);
    setShowResult(true);
    
    if (selectedOption === currentProblem.answer) {
      setScore(score + 1);
    }
    
    // Move to next question after a delay
    setTimeout(() => {
      if (questionNumber < totalQuestions) {
        setQuestionNumber(questionNumber + 1);
        setCurrentProblem(generateProblem());
        setShowResult(false);
        setSelectedAnswer(null);
      } else {
        // Quiz complete - calculate stars
        const earnedStars = score + (selectedOption === currentProblem.answer ? 1 : 0);
        const totalScore = Math.ceil((earnedStars / totalQuestions) * 3); // Convert to 0-3 stars
        updateProgress(`math-${currentOperation}`, true, totalScore);
        
        // Reset for next operation or complete
        if (currentOperation === 'addition') {
          setCurrentOperation('subtraction');
          setQuestionNumber(1);
          setScore(0);
          setShowResult(false);
          setSelectedAnswer(null);
          setCurrentProblem(generateProblem());
        } else if (currentOperation === 'subtraction') {
          setCurrentOperation('multiplication');
          setQuestionNumber(1);
          setScore(0);
          setShowResult(false);
          setSelectedAnswer(null);
          setCurrentProblem(generateProblem());
        }
      }
    }, 1500);
  };

  return (
    <div className={`p-4 ${theme === 'light' ? 'bg-purple-100' : 'bg-purple-900'} rounded-lg shadow-lg`}>
      <h2 className="text-2xl font-bold mb-4 text-center">
        {operations[currentOperation].name} Practice
      </h2>
      
      <div className="mb-2 text-right">
        Question {questionNumber} of {totalQuestions}
      </div>
      
      <div className={`p-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-lg mb-6 text-center`}>
        <div className="text-6xl font-bold flex justify-center items-center">
          <span>{currentProblem.num1}</span>
          <span className="mx-4">{operations[currentOperation].symbol}</span>
          <span>{currentProblem.num2}</span>
          <span className="mx-4">=</span>
          <span>?</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {currentProblem.options.map((option, index) => (
          <button 
            key={index}
            onClick={() => !showResult && checkAnswer(option)}
            disabled={showResult}
            className={`p-4 text-3xl font-bold rounded-lg shadow transition-colors
              ${showResult && option === currentProblem.answer 
                ? 'bg-green-500 text-white' 
                : showResult && option === selectedAnswer && option !== currentProblem.answer
                  ? 'bg-red-500 text-white'
                  : theme === 'light' ? 'bg-white hover:bg-blue-100' : 'bg-gray-800 hover:bg-gray-700'}
            `}
          >
            {option}
          </button>
        ))}
      </div>
      
      {showResult && (
        <div className={`mt-4 p-3 rounded-lg text-center ${
          selectedAnswer === currentProblem.answer 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {selectedAnswer === currentProblem.answer 
            ? '✅ Correct! Great job!' 
            : `❌ Oops! The correct answer is ${currentProblem.answer}`
          }
        </div>
      )}
    </div>
  );
};

export default MathLearning;
