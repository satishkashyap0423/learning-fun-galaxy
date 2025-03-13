
import React from 'react';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
  const { currentUser, language, theme, updateTheme } = useAppContext();

  const toggleTheme = () => {
    updateTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className={`p-4 ${theme === 'light' ? 'bg-blue-500' : 'bg-blue-800'} text-white flex justify-between items-center`}>
      <div className="flex items-center">
        <span className="text-2xl font-bold">Learning Fun Galaxy</span>
        {currentUser.name !== 'Guest' && (
          <span className="ml-4 text-lg">Hi, {currentUser.name}!</span>
        )}
      </div>
      <div className="flex items-center">
        <select
          className="mr-4 p-2 rounded text-black"
          value={language}
          onChange={(e) => {}}
          disabled
        >
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
        </select>
        <button
          onClick={toggleTheme}
          className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full font-bold"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

export default Header;
