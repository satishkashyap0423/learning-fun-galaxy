
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: string;
  moduleId: string;
  ageGroup: 'pre-student' | 'student';
  onPress: () => void;
  animeImage?: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ 
  title, 
  description, 
  icon, 
  moduleId, 
  ageGroup, 
  onPress,
  animeImage
}) => {
  const { currentUser, theme } = useAppContext();
  const progress = currentUser.progress[moduleId];
  const [isHovered, setIsHovered] = useState(false);
  
  const isAvailable = currentUser.type === ageGroup || 
    (currentUser.type === 'student' && ageGroup === 'pre-student');

  const renderStars = () => {
    if (!progress) return null;
    
    return (
      <div className="flex mt-2">
        {[...Array(3)].map((_, index) => (
          <span key={index} className={`text-xl ${index < progress.stars ? 'animate-pulse' : ''}`}>
            {index < progress.stars ? '⭐' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  const getCardBg = () => {
    if (theme === 'light') {
      return ageGroup === 'pre-student' 
        ? 'bg-gradient-to-br from-pink-100 to-pink-200' 
        : 'bg-gradient-to-br from-blue-100 to-blue-200';
    } else {
      return ageGroup === 'pre-student' 
        ? 'bg-gradient-to-br from-pink-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-900 to-indigo-900';
    }
  };

  // Function to speak the module title
  const speakModuleTitle = () => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = title;
      speech.volume = 1;
      speech.rate = 0.9;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <div 
      onClick={() => {
        if (isAvailable) {
          speakModuleTitle();
          onPress();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`p-6 rounded-xl shadow-lg m-3 transition-all duration-300
        ${getCardBg()}
        ${isAvailable 
          ? 'cursor-pointer transform hover:scale-105 hover:shadow-xl' 
          : 'opacity-50 cursor-not-allowed'}
        ${progress?.completed ? 'border-2 border-green-500' : ''}
      `}
    >
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {animeImage ? (
          <div className={`w-24 h-24 rounded-full overflow-hidden ${isHovered ? 'animate-pulse' : ''}`}>
            <img src={animeImage} alt="Anime character" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className={`text-5xl mb-3 ${isHovered ? 'animate-bounce' : ''}`}>{icon}</div>
        )}
        
        <div>
          <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-blue-600' : 'text-blue-300'} ${isHovered ? 'animate-pulse' : ''}`}>
            {title}
          </h3>
          <p className={`mt-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            {description}
          </p>
          {renderStars()}
          {!isAvailable && (
            <div className="mt-2 px-2 py-1 bg-red-100 text-red-500 rounded-lg text-sm inline-block">
              For {ageGroup === 'pre-student' ? 'ages 3-5' : 'ages 6-8'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
