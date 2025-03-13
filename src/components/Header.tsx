
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Button } from './ui/button';
import { MoonIcon, SunIcon, LogOutIcon } from 'lucide-react';
import { toast } from 'sonner';

const Header: React.FC = () => {
  const { currentUser, theme, updateTheme, updateUser } = useAppContext();
  const navigate = useNavigate();

  const toggleTheme = () => {
    updateTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    updateUser({
      name: 'Guest',
      age: 4,
      type: 'pre-student',
      progress: {},
    });
    toast.success('You have been logged out successfully!');
    navigate('/login');
  };

  return (
    <header className={`p-4 ${theme === 'light' 
      ? 'bg-gradient-to-r from-purple-400 to-blue-500' 
      : 'bg-gradient-to-r from-gray-800 to-blue-900'} 
      text-white shadow-lg rounded-b-lg`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-3xl font-bold">
            <span className="text-yellow-300 animate-pulse">Learning</span> 
            <span className="text-green-300">Fun</span> 
            <span className="text-pink-300 animate-pulse">Galaxy</span>
          </span>
          {currentUser.name !== 'Guest' && (
            <span className="ml-4 text-lg bg-white/20 px-3 py-1 rounded-full">
              Hi, {currentUser.name}! 👋 <span className="text-xs">(Age: {currentUser.age})</span>
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
          
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-white/10 border-none text-white hover:bg-white/20 flex gap-2"
          >
            <LogOutIcon className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
