
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "../ui/pagination";

const ImageRecognition: React.FC = () => {
  const { theme, updateProgress } = useAppContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  
  // Expanded to 20 questions as requested
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
    },
    {
      question: "What animal is this?",
      image: "🐕",
      options: ["Cat", "Dog", "Rabbit", "Hamster"],
      answer: "Dog"
    },
    {
      question: "What fruit is this?",
      image: "🍌",
      options: ["Apple", "Banana", "Pear", "Orange"],
      answer: "Banana"
    },
    {
      question: "What is this?",
      image: "✈️",
      options: ["Car", "Airplane", "Helicopter", "Ship"],
      answer: "Airplane"
    },
    {
      question: "What planet is this?",
      image: "🌍",
      options: ["Mars", "Venus", "Earth", "Jupiter"],
      answer: "Earth"
    },
    {
      question: "What is this?",
      image: "📱",
      options: ["Laptop", "Phone", "Tablet", "Computer"],
      answer: "Phone"
    },
    {
      question: "What animal is this?",
      image: "🐈",
      options: ["Dog", "Tiger", "Cat", "Lion"],
      answer: "Cat"
    },
    {
      question: "What is this?",
      image: "🚲",
      options: ["Motorcycle", "Bicycle", "Car", "Bus"],
      answer: "Bicycle"
    },
    {
      question: "What weather is this?",
      image: "☀️",
      options: ["Rain", "Snow", "Sunny", "Cloudy"],
      answer: "Sunny"
    },
    {
      question: "What is this?",
      image: "🏫",
      options: ["House", "Hospital", "School", "Library"],
      answer: "School"
    },
    {
      question: "What fruit is this?",
      image: "🍊",
      options: ["Apple", "Orange", "Banana", "Strawberry"],
      answer: "Orange"
    },
    {
      question: "What is this?",
      image: "📚",
      options: ["Books", "Newspapers", "Magazines", "Letters"],
      answer: "Books"
    },
    {
      question: "What animal is this?",
      image: "🐢",
      options: ["Fish", "Snake", "Turtle", "Lizard"],
      answer: "Turtle"
    },
    {
      question: "What is this?",
      image: "🎸",
      options: ["Drum", "Piano", "Guitar", "Violin"],
      answer: "Guitar"
    },
    {
      question: "What is this?",
      image: "⚽",
      options: ["Basketball", "Tennis Ball", "Soccer Ball", "Baseball"],
      answer: "Soccer Ball"
    },
    {
      question: "What is this?",
      image: "🍕",
      options: ["Burger", "Sandwich", "Pasta", "Pizza"],
      answer: "Pizza"
    }
  ];

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

  // Speak the question when it changes
  useEffect(() => {
    if (!showResult && !quizComplete) {
      const currentQ = questions[currentQuestion];
      speakText(`${currentQ.question} ${currentQ.answer}`);
    }
  }, [currentQuestion, showResult, quizComplete]);

  const handleAnswer = (selectedOption: string) => {
    const isCorrect = selectedOption === questions[currentQuestion].answer;
    
    if (isCorrect) {
      setScore(score + 1);
      speakText("Correct! Great job!");
    } else {
      speakText(`The correct answer is ${questions[currentQuestion].answer}`);
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
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setQuizComplete(false);
  };

  const handleImageClick = () => {
    const currentQ = questions[currentQuestion];
    speakText(currentQ.answer);
  };

  // Function to navigate to a specific question
  const goToQuestion = (index: number) => {
    if (!showResult) {
      setCurrentQuestion(index);
    }
  };

  if (quizComplete) {
    const stars = Math.ceil((score / questions.length) * 3);
    
    return (
      <div className={`p-4 ${theme === 'light' ? 'bg-green-100' : 'bg-green-900'} rounded-lg shadow-lg text-center animate-fade-in`}>
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <p className="mb-4">You got {score} out of {questions.length} correct!</p>
        
        <div className="text-4xl mb-6">
          {[...Array(stars)].map((_, i) => <span key={i}>⭐</span>)}
        </div>
        
        <button 
          onClick={resetQuiz}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Play Again
        </button>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className={`p-4 ${theme === 'light' ? 'bg-yellow-100' : 'bg-yellow-900'} rounded-lg shadow-lg animate-fade-in`}>
      <div className="mb-2 text-right">
        Question {currentQuestion + 1} of {questions.length}
      </div>
      
      <h2 className="text-2xl font-bold mb-4 text-center">Image Recognition</h2>
      
      <div 
        className={`p-8 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-lg mb-6 text-center cursor-pointer transition-transform hover:scale-105`}
        onClick={handleImageClick}
      >
        <p className="mb-4">{currentQ.question}</p>
        <div className="text-9xl animate-bounce-slow">{currentQ.image}</div>
        <p className="text-xs mt-4 text-blue-500">Click on the image to hear the pronunciation</p>
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
          currentQ.answer === questions[currentQuestion].options.find(option => option === currentQ.answer) 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {currentQ.options.includes(currentQ.answer) && currentQ.answer === questions[currentQuestion].answer
            ? '✅ Correct! Great job!' 
            : `❌ The correct answer is ${currentQ.answer}`
          }
        </div>
      )}

      {/* Question navigation */}
      <div className="mt-8">
        <Pagination>
          <PaginationContent className="flex flex-wrap justify-center">
            {questions.map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink 
                  onClick={() => goToQuestion(index)}
                  isActive={currentQuestion === index}
                  className={`w-8 h-8 flex items-center justify-center m-1
                    ${index < currentQuestion 
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
};

export default ImageRecognition;
