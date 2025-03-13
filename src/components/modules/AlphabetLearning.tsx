
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "../ui/pagination";

const AlphabetLearning: React.FC = () => {
  const { theme, updateProgress } = useAppContext();
  const [currentLetter, setCurrentLetter] = useState('A');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [stars, setStars] = useState(0);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  const getLetterExample = (letter: string) => {
    const examples: Record<string, { word: string, emoji: string }> = {
      'A': { word: 'Apple', emoji: '🍎' },
      'B': { word: 'Balloon', emoji: '🎈' },
      'C': { word: 'Cat', emoji: '🐱' },
      'D': { word: 'Dog', emoji: '🐶' },
      'E': { word: 'Elephant', emoji: '🐘' },
      'F': { word: 'Fish', emoji: '🐠' },
      'G': { word: 'Giraffe', emoji: '🦒' },
      'H': { word: 'House', emoji: '🏠' },
      'I': { word: 'Ice Cream', emoji: '🍦' },
      'J': { word: 'Jellyfish', emoji: '🪼' },
      'K': { word: 'Kite', emoji: '🪁' },
      'L': { word: 'Lion', emoji: '🦁' },
      'M': { word: 'Monkey', emoji: '🐒' },
      'N': { word: 'Nest', emoji: '🪹' },
      'O': { word: 'Orange', emoji: '🍊' },
      'P': { word: 'Penguin', emoji: '🐧' },
      'Q': { word: 'Queen', emoji: '👑' },
      'R': { word: 'Rainbow', emoji: '🌈' },
      'S': { word: 'Sun', emoji: '☀️' },
      'T': { word: 'Tree', emoji: '🌳' },
      'U': { word: 'Umbrella', emoji: '☂️' },
      'V': { word: 'Violin', emoji: '🎻' },
      'W': { word: 'Whale', emoji: '🐳' },
      'X': { word: 'Xylophone', emoji: '🎵' },
      'Y': { word: 'Yo-yo', emoji: '🪀' },
      'Z': { word: 'Zebra', emoji: '🦓' }
    };
    
    return examples[letter] || { word: `${letter} Letter`, emoji: '❓' };
  };

  // Function to speak text using Web Speech API
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = text;
      speech.volume = 1;
      speech.rate = 0.9;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    }
  };

  // Speak the letter and example when it changes
  useEffect(() => {
    if (!showQuiz && !quizComplete) {
      const example = getLetterExample(currentLetter);
      speakText(`${currentLetter} for ${example.word}`);
    }
  }, [currentLetter, showQuiz, quizComplete]);

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

  const handleLetterClick = () => {
    const example = getLetterExample(currentLetter);
    speakText(`${currentLetter} for ${example.word}`);
  };

  // Quiz questions (20 questions)
  const quizQuestions = [
    { question: "Which letter does Apple start with?", options: ["A", "B", "P", "L"], answer: "A" },
    { question: "Which letter does Balloon start with?", options: ["P", "B", "D", "A"], answer: "B" },
    { question: "Which letter does Cat start with?", options: ["K", "G", "C", "T"], answer: "C" },
    { question: "Which letter does Dog start with?", options: ["B", "G", "D", "T"], answer: "D" },
    { question: "Which letter does Elephant start with?", options: ["L", "E", "A", "F"], answer: "E" },
    { question: "Which letter does Fish start with?", options: ["S", "P", "T", "F"], answer: "F" },
    { question: "Which letter does Giraffe start with?", options: ["J", "G", "Z", "D"], answer: "G" },
    { question: "Which letter does House start with?", options: ["H", "O", "U", "S"], answer: "H" },
    { question: "Which letter does Ice Cream start with?", options: ["C", "E", "I", "K"], answer: "I" },
    { question: "Which letter does Jellyfish start with?", options: ["G", "F", "J", "Y"], answer: "J" },
    { question: "Which letter does Kite start with?", options: ["T", "K", "L", "I"], answer: "K" },
    { question: "Which letter does Lion start with?", options: ["T", "N", "O", "L"], answer: "L" },
    { question: "Which letter does Monkey start with?", options: ["N", "K", "M", "R"], answer: "M" },
    { question: "Which letter does Nest start with?", options: ["M", "T", "S", "N"], answer: "N" },
    { question: "Which letter does Orange start with?", options: ["A", "E", "O", "U"], answer: "O" },
    { question: "Which letter does Penguin start with?", options: ["G", "P", "B", "Q"], answer: "P" },
    { question: "Which letter does Queen start with?", options: ["K", "W", "U", "Q"], answer: "Q" },
    { question: "Which letter does Rainbow start with?", options: ["W", "B", "R", "N"], answer: "R" },
    { question: "Which letter does Sun start with?", options: ["N", "T", "S", "A"], answer: "S" },
    { question: "Which letter does Tree start with?", options: ["R", "T", "F", "E"], answer: "T" }
  ];

  const handleQuizAnswer = (selectedOption: string) => {
    const isCorrect = selectedOption === quizQuestions[currentQuizQuestion].answer;
    
    if (isCorrect) {
      setQuizScore(quizScore + 1);
      speakText("Correct! Great job!");
    } else {
      speakText(`The correct answer is ${quizQuestions[currentQuizQuestion].answer}`);
    }
    
    setShowQuizResult(true);
    
    setTimeout(() => {
      if (currentQuizQuestion < quizQuestions.length - 1) {
        setCurrentQuizQuestion(currentQuizQuestion + 1);
        setShowQuizResult(false);
      } else {
        completeQuiz(quizScore);
      }
    }, 2000);
  };

  const completeQuiz = (score: number) => {
    const earnedStars = Math.ceil((score / quizQuestions.length) * 3);
    setStars(earnedStars);
    setQuizComplete(true);
    updateProgress('alphabet', true, earnedStars);
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setQuizComplete(false);
    setCurrentLetter('A');
    setCurrentQuizQuestion(0);
    setQuizScore(0);
    setShowQuizResult(false);
  };

  if (quizComplete) {
    return (
      <div className={`p-4 ${theme === 'light' ? 'bg-green-100' : 'bg-green-900'} rounded-lg shadow-lg text-center animate-fade-in`}>
        <h2 className="text-2xl font-bold mb-4">Congratulations! 🎉</h2>
        <div className="text-4xl mb-4">
          {[...Array(stars)].map((_, i) => <span key={i}>⭐</span>)}
        </div>
        <p className="mb-4">You've completed the alphabet learning module!</p>
        <p>Your score: {quizScore} out of {quizQuestions.length}</p>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4 hover:bg-blue-600 transition-colors"
          onClick={resetQuiz}
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
        <h2 className="text-2xl font-bold mb-4 text-center">Alphabet Quiz</h2>
        <p className="mb-2 text-right">
          Question {currentQuizQuestion + 1} of {quizQuestions.length}
        </p>
        
        <div className={`p-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-lg mb-6 text-center`}>
          <p className="text-xl mb-4">{currentQ.question}</p>
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
            currentQ.options.includes(currentQ.answer) 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {currentQ.options.includes(currentQ.answer) 
              ? '✅ Correct! Great job!' 
              : `❌ The correct answer is ${currentQ.answer}`
            }
          </div>
        )}
        
        {/* Question navigation */}
        <div className="mt-8">
          <Pagination>
            <PaginationContent className="flex flex-wrap justify-center">
              {quizQuestions.map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink 
                    isActive={currentQuizQuestion === index}
                    className={`w-8 h-8 flex items-center justify-center m-1
                      ${index < currentQuizQuestion 
                        ? theme === 'light' ? 'bg-green-100' : 'bg-green-900' 
                        : ''}`}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    );
  }

  const currentExample = getLetterExample(currentLetter);

  return (
    <div className={`p-4 ${theme === 'light' ? 'bg-blue-100' : 'bg-blue-900'} rounded-lg shadow-lg text-center animate-fade-in`}>
      <h2 className="text-2xl font-bold mb-4">Let's Learn the Alphabet!</h2>
      
      <div 
        className={`p-8 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-lg mb-6 cursor-pointer transition-transform hover:scale-105`}
        onClick={handleLetterClick}
      >
        <div className="text-9xl font-bold animate-pulse">{currentLetter}</div>
        <div className="text-4xl mt-4">{currentExample.word} {currentExample.emoji}</div>
        <p className="text-xs mt-4 text-blue-500">Click to hear the pronunciation</p>
      </div>
      
      <div className="flex justify-between items-center">
        <button 
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentLetter === 'A' ? 'opacity-50 cursor-not-allowed' : ''} hover:bg-blue-600 transition-colors`}
          onClick={handlePrevLetter}
          disabled={currentLetter === 'A'}
        >
          Previous
        </button>
        
        <div className="text-lg">
          {alphabet.indexOf(currentLetter) + 1} / {alphabet.length}
        </div>
        
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={handleNextLetter}
        >
          {currentLetter === 'Z' ? 'Take Quiz' : 'Next'}
        </button>
      </div>
      
      {/* Letter navigation */}
      <div className="mt-8">
        <Pagination>
          <PaginationContent className="flex flex-wrap justify-center">
            {alphabet.map((letter) => (
              <PaginationItem key={letter}>
                <PaginationLink 
                  onClick={() => setCurrentLetter(letter)}
                  isActive={currentLetter === letter}
                  className="m-1"
                >
                  {letter}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default AlphabetLearning;
