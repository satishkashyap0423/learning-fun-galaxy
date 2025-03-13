
import React from 'react';
import { useAppContext } from '../context/AppContext';

const ParentalControls: React.FC = () => {
  const { theme } = useAppContext();
  
  return (
    <div className={`p-4 ${theme === 'light' ? 'bg-red-100' : 'bg-red-900'} rounded-lg shadow-lg`}>
      <h2 className="text-2xl font-bold mb-4">Parental Controls</h2>
      <p className="mb-4">This feature has been removed as requested.</p>
    </div>
  );
};

export default ParentalControls;
