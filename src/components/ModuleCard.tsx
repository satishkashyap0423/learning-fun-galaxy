
import React from 'react';
import { useAppContext } from '../context/AppContext';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: string;
  moduleId: string;
  ageGroup: 'pre-student' | 'student';
  onPress: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ 
  title, 
  description, 
  icon, 
  moduleId, 
  ageGroup, 
  onPress 
}) => {
  const { currentUser, theme } = useAppContext();
  const progress = currentUser.progress[moduleId];
  
  const isAvailable = currentUser.type === ageGroup || 
    (currentUser.type === 'student' && ageGroup === 'pre-student');

  const renderStars = () => {
    if (!progress) return null;
    
    return (
      <div className="flex mt-2">
        {[...Array(3)].map((_, index) => (
          <span key={index} className="text-xl">
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

  return (
    <div 
      onClick={isAvailable ? onPress : undefined}
      className={`p-6 rounded-xl shadow-lg m-3 transition-all duration-300
        ${getCardBg()}
        ${isAvailable 
          ? 'cursor-pointer transform hover:scale-105 hover:shadow-xl' 
          : 'opacity-50 cursor-not-allowed'}
        ${progress?.completed ? 'border-2 border-green-500' : ''}
      `}
    >
      <div className="text-5xl mb-3">{icon}</div>
      <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-blue-600' : 'text-blue-300'}`}>
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
  );
};

export default ModuleCard;
