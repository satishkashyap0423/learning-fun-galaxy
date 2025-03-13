
import React, { useState } from 'react';
import { AppProvider } from '../context/AppContext';
import Header from '../components/Header';
import ModuleCard from '../components/ModuleCard';
import AlphabetLearning from '../components/modules/AlphabetLearning';
import CountingLearning from '../components/modules/CountingLearning';
import MathLearning from '../components/modules/MathLearning';
import ImageRecognition from '../components/modules/ImageRecognition';
import SentenceFormation from '../components/modules/SentenceFormation';
import ParentalControls from '../components/ParentalControls';
import UserProfile from '../components/UserProfile';

type ActiveModule = 
  | 'home' 
  | 'alphabet' 
  | 'counting' 
  | 'math' 
  | 'image-recognition' 
  | 'sentence-formation' 
  | 'parental-controls'
  | 'profile';

const Index = () => {
  const [activeModule, setActiveModule] = useState<ActiveModule>('home');

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
      case 'parental-controls':
        return <ParentalControls />;
      case 'profile':
        return <UserProfile />;
      default:
        return renderHomePage();
    }
  };

  const renderHomePage = () => {
    const modules = [
      {
        title: 'Learn the Alphabet',
        description: 'Explore letters A to Z with fun pictures and sounds',
        icon: '🔤',
        moduleId: 'alphabet',
        ageGroup: 'pre-student',
      },
      {
        title: 'Counting Numbers',
        description: 'Learn to count from 1 to 20 with interactive exercises',
        icon: '🔢',
        moduleId: 'counting',
        ageGroup: 'pre-student',
      },
      {
        title: 'Math Learning',
        description: 'Learn addition, subtraction and multiplication',
        icon: '🧮',
        moduleId: 'math',
        ageGroup: 'student',
      },
      {
        title: 'Image Recognition',
        description: 'Test your knowledge by identifying objects and animals',
        icon: '🖼️',
        moduleId: 'image-recognition',
        ageGroup: 'student',
      },
      {
        title: 'Sentence Formation',
        description: 'Learn to create simple sentences with words',
        icon: '📝',
        moduleId: 'sentence-formation',
        ageGroup: 'student',
      },
    ];

    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Learning Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module) => (
            <ModuleCard
              key={module.moduleId}
              title={module.title}
              description={module.description}
              icon={module.icon}
              moduleId={module.moduleId}
              ageGroup={module.ageGroup as 'pre-student' | 'student'}
              onPress={() => handleModuleClick(module.moduleId as ActiveModule)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Main content area */}
            <div className="flex-1">
              {activeModule !== 'home' && (
                <button
                  onClick={() => setActiveModule('home')}
                  className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
                >
                  ← Back to Home
                </button>
              )}
              {renderActiveModule()}
            </div>
            
            {/* Side panel */}
            <div className="w-full md:w-64 space-y-4">
              <button
                onClick={() => handleModuleClick('profile')}
                className="w-full p-4 bg-blue-500 text-white rounded-lg shadow flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
              >
                <span>👤</span> My Profile
              </button>
              
              <button
                onClick={() => handleModuleClick('parental-controls')}
                className="w-full p-4 bg-purple-500 text-white rounded-lg shadow flex items-center justify-center gap-2 hover:bg-purple-600 transition-colors"
              >
                <span>🔐</span> Parental Controls
              </button>
            </div>
          </div>
        </main>
        
        <footer className="bg-blue-500 text-white p-4 text-center">
          <p>© 2023 Learning Fun Galaxy - An interactive learning platform for kids</p>
        </footer>
      </div>
    </AppProvider>
  );
};

export default Index;
