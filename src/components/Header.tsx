
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Button } from './ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';

const Header: React.FC = () => {
  const { currentUser, theme, updateTheme } = useAppContext();

  const toggleTheme = () => {
    updateTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className={`p-4 ${theme === 'light' 
      ? 'bg-gradient-to-r from-purple-400 to-blue-500' 
      : 'bg-gradient-to-r from-gray-800 to-blue-900'} 
      text-white shadow-lg rounded-b-lg`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-3xl font-bold">
            <span className="text-yellow-300">Learning</span> 
            <span className="text-green-300">Fun</span> 
            <span className="text-pink-300">Galaxy</span>
          </span>
          {currentUser.name !== 'Guest' && (
            <span className="ml-4 text-lg bg-white/20 px-3 py-1 rounded-full">
              Hi, {currentUser.name}! 👋
            </span>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="icon"
            className="bg-white/10 border-none text-white hover:bg-white/20"
          >
            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
