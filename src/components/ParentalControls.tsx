
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const ParentalControls: React.FC = () => {
  const { parentalControls, updateParentalControls, theme } = useAppContext();
  const [pin, setPin] = useState('');
  const [showControls, setShowControls] = useState(false);
  const [error, setError] = useState('');
  
  const correctPin = '1234'; // In a real app, this would be stored securely
  
  const handlePinSubmit = () => {
    if (pin === correctPin) {
      setShowControls(true);
      setError('');
    } else {
      setError('Incorrect PIN. Please try again.');
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateParentalControls({
      difficultyLevel: parseInt(e.target.value)
    });
  };

  const handleTimeLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateParentalControls({
      timeLimit: parseInt(e.target.value)
    });
  };

  const handleToggleControls = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateParentalControls({
      isEnabled: e.target.checked
    });
  };

  if (!showControls) {
    return (
      <div className={`p-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-lg`}>
        <h2 className="text-2xl font-bold mb-4">Parental Controls</h2>
        <p className="mb-4">Please enter your PIN to access parental controls:</p>
        
        <div className="mb-4">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            maxLength={4}
            className="px-4 py-2 border rounded-lg w-full text-black"
            placeholder="Enter 4-digit PIN"
          />
        </div>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <button
          onClick={handlePinSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Submit
        </button>
      </div>
    );
  }

  return (
    <div className={`p-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-lg`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Parental Controls</h2>
        <button
          onClick={() => setShowControls(false)}
          className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg text-sm"
        >
          Lock
        </button>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="font-medium">Enable Parental Controls</label>
          <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
            <input
              type="checkbox"
              className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border rounded-full appearance-none cursor-pointer peer checked:translate-x-full checked:bg-blue-500"
              checked={parentalControls.isEnabled}
              onChange={handleToggleControls}
            />
            <span className="absolute inset-0 transition duration-200 ease-in-out bg-gray-300 rounded-full peer-checked:bg-blue-200"></span>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block font-medium mb-2">Difficulty Level</label>
        <input
          type="range"
          min="1"
          max="3"
          value={parentalControls.difficultyLevel}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm mt-1">
          <span>Easy</span>
          <span>Medium</span>
          <span>Hard</span>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block font-medium mb-2">
          Daily Time Limit: {parentalControls.timeLimit} minutes
        </label>
        <input
          type="range"
          min="10"
          max="60"
          step="5"
          value={parentalControls.timeLimit}
          onChange={handleTimeLimitChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm mt-1">
          <span>10 min</span>
          <span>30 min</span>
          <span>60 min</span>
        </div>
      </div>
      
      <div className="p-4 bg-blue-100 text-blue-800 rounded-lg">
        <p className="font-medium">Tip for Parents</p>
        <p className="text-sm mt-1">Set appropriate time limits and difficulty levels based on your child's age and learning capabilities.</p>
      </div>
    </div>
  );
};

export default ParentalControls;
