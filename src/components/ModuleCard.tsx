
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

  return (
    <div 
      onClick={isAvailable ? onPress : undefined}
      className={`p-4 rounded-lg shadow-lg m-2 transition-all duration-300
        ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} 
        ${isAvailable 
          ? 'cursor-pointer transform hover:scale-105' 
          : 'opacity-50 cursor-not-allowed'}
        ${progress?.completed ? 'border-2 border-green-500' : ''}
      `}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-blue-600' : 'text-blue-300'}`}>
        {title}
      </h3>
      <p className={`mt-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
        {description}
      </p>
      {renderStars()}
      {!isAvailable && (
        <div className="mt-2 text-sm text-red-500">
          For {ageGroup === 'pre-student' ? 'ages 3-5' : 'ages 6-8'}
        </div>
      )}
    </div>
  );
};

export default ModuleCard;
