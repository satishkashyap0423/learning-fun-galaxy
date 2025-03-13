
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ModuleCard from '../components/ModuleCard';
import AlphabetLearning from '../components/modules/AlphabetLearning';
import CountingLearning from '../components/modules/CountingLearning';
import MathLearning from '../components/modules/MathLearning';
import ImageRecognition from '../components/modules/ImageRecognition';
import SentenceFormation from '../components/modules/SentenceFormation';
import UserProfile from '../components/UserProfile';
import { useAppContext } from '../context/AppContext';

type ActiveModule = 
  | 'home' 
  | 'alphabet' 
  | 'counting' 
  | 'math' 
  | 'image-recognition' 
  | 'sentence-formation' 
  | 'profile';

// Anime character images
const animeCharacters = {
  preStudent: [
    "https://i.pinimg.com/originals/e5/6e/1b/e56e1b2e6034ba4633ac8a0d94cb95fc.jpg",
    "https://i.pinimg.com/originals/c3/0c/7c/c30c7c71746e8f6e62e3c36c1516f9f4.jpg"
  ],
  student: [
    "https://i.pinimg.com/originals/04/7f/d6/047fd6849a1b084e5996288d48f2116f.jpg",
    "https://i.pinimg.com/originals/42/d7/90/42d790c24a5677cacde958859c979c4f.jpg",
    "https://i.pinimg.com/originals/e4/34/2a/e4342a4e0e968344b75cf50cf1936c09.jpg"
  ]
};

const Index = () => {
  const [activeModule, setActiveModule] = useState<ActiveModule>('home');
  const { currentUser } = useAppContext();
  const [showPreStudentModules, setShowPreStudentModules] = useState(true);
  const [showStudentModules, setShowStudentModules] = useState(true);

  useEffect(() => {
    // Determine which sections to show based on user age
    if (currentUser.age <= 5) {
      setShowPreStudentModules(true);
      setShowStudentModules(false);
    } else {
      setShowPreStudentModules(false);
      setShowStudentModules(true);
    }
  }, [currentUser.age]);

  const handleModuleClick = (module: ActiveModule) => {
    setActiveModule(module);
  };

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'alphabet':
        return <AlphabetLearning />;
      case 'counting':
        return <CountingLearning />;
      case 'math':
        return <MathLearning />;
      case 'image-recognition':
        return <ImageRecognition />;
      case 'sentence-formation':
        return <SentenceFormation />;
      case 'profile':
        return <UserProfile />;
      default:
        return renderHomePage();
    }
  };

  const renderHomePage = () => {
    const preStudentModules = [
      {
        title: 'Learn the Alphabet',
        description: 'Explore letters A to Z with fun pictures and sounds',
        icon: '🔤',
        moduleId: 'alphabet',
        ageGroup: 'pre-student',
        animeImage: animeCharacters.preStudent[0]
      },
      {
        title: 'Counting Numbers',
        description: 'Learn to count from 1 to 20 with interactive exercises',
        icon: '🔢',
        moduleId: 'counting',
        ageGroup: 'pre-student',
        animeImage: animeCharacters.preStudent[1]
      },
    ];

    const studentModules = [
      {
        title: 'Math Learning',
        description: 'Learn addition, subtraction and multiplication',
        icon: '🧮',
        moduleId: 'math',
        ageGroup: 'student',
        animeImage: animeCharacters.student[0]
      },
      {
        title: 'Image Recognition',
        description: 'Test your knowledge by identifying objects and animals',
        icon: '🖼️',
        moduleId: 'image-recognition',
        ageGroup: 'student',
        animeImage: animeCharacters.student[1]
      },
      {
        title: 'Sentence Formation',
        description: 'Learn to create simple sentences with words',
        icon: '📝',
        moduleId: 'sentence-formation',
        ageGroup: 'student',
        animeImage: animeCharacters.student[2]
      },
    ];

    return (
      <div className="animate-fade-in">
        {showPreStudentModules && (
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center text-white mr-3 animate-pulse">
                <span className="text-sm font-bold">1</span>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                Ages 3-5 (Pre-Student)
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {preStudentModules.map((module) => (
                <ModuleCard
                  key={module.moduleId}
                  title={module.title}
                  description={module.description}
                  icon={module.icon}
                  moduleId={module.moduleId}
                  ageGroup={module.ageGroup as 'pre-student' | 'student'}
                  onPress={() => handleModuleClick(module.moduleId as ActiveModule)}
                  animeImage={module.animeImage}
                />
              ))}
            </div>
          </div>
        )}
        
        {showStudentModules && (
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-3 animate-pulse">
                <span className="text-sm font-bold">2</span>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
                Ages 6-8 (Student)
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentModules.map((module) => (
                <ModuleCard
                  key={module.moduleId}
                  title={module.title}
                  description={module.description}
                  icon={module.icon}
                  moduleId={module.moduleId}
                  ageGroup={module.ageGroup as 'pre-student' | 'student'}
                  onPress={() => handleModuleClick(module.moduleId as ActiveModule)}
                  animeImage={module.animeImage}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main content area */}
          <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            {activeModule !== 'home' && (
              <button
                onClick={() => setActiveModule('home')}
                className="mb-6 flex items-center text-blue-500 hover:text-blue-700 transition-colors transform hover:translate-x-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Learning Modules
              </button>
            )}
            {renderActiveModule()}
          </div>
          
          {/* Side panel */}
          <div className="w-full md:w-72">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <button
                onClick={() => handleModuleClick('profile')}
                className="w-full p-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow flex items-center justify-center gap-2 hover:from-purple-600 hover:to-indigo-700 transition-all mb-4 hover:scale-105 transform"
              >
                <span>👤</span> My Profile
              </button>
              
              <div className="p-4 bg-amber-100 dark:bg-amber-900 rounded-lg mt-4 animate-pulse">
                <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-2 flex items-center">
                  <span className="mr-2">💡</span> Learning Tip
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  Complete activities to earn stars and track your progress in your profile!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gradient-to-r from-purple-400 to-blue-500 text-white p-4 text-center mt-8">
        <p>© 2023 Learning Fun Galaxy - An interactive learning platform for kids</p>
      </footer>
    </div>
  );
};

export default Index;
