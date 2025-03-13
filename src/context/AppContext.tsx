
import React, { createContext, useState, useContext } from 'react';

// Define user types
type UserType = 'pre-student' | 'student';

// Define language types
type LanguageType = 'english' | 'spanish' | 'french';

// Define theme types
type ThemeType = 'light' | 'dark';

// Define progress type
type ProgressType = {
  [module: string]: {
    completed: boolean;
    stars: number;
  };
};

// Context interface
interface AppContextType {
  currentUser: {
    name: string;
    age: number;
    type: UserType;
    progress: ProgressType;
  };
  language: LanguageType;
  theme: ThemeType;
  parentalControls: {
    difficultyLevel: number;
    timeLimit: number;
    isEnabled: boolean;
  };
  updateUser: (user: Partial<AppContextType['currentUser']>) => void;
  updateLanguage: (language: LanguageType) => void;
  updateTheme: (theme: ThemeType) => void;
  updateParentalControls: (controls: Partial<AppContextType['parentalControls']>) => void;
  updateProgress: (module: string, completed: boolean, stars: number) => void;
}

// Create context with initial values
const AppContext = createContext<AppContextType>({
  currentUser: {
    name: 'Guest',
    age: 4,
    type: 'pre-student',
    progress: {},
  },
  language: 'english',
  theme: 'light',
  parentalControls: {
    difficultyLevel: 1,
    timeLimit: 30,
    isEnabled: true,
  },
  updateUser: () => {},
  updateLanguage: () => {},
  updateTheme: () => {},
  updateParentalControls: () => {},
  updateProgress: () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AppContextType['currentUser']>({
    name: 'Guest',
    age: 4,
    type: 'pre-student',
    progress: {},
  });

  const [language, setLanguage] = useState<LanguageType>('english');
  const [theme, setTheme] = useState<ThemeType>('light');
  const [parentalControls, setParentalControls] = useState({
    difficultyLevel: 1,
    timeLimit: 30,
    isEnabled: true,
  });

  const updateUser = (user: Partial<AppContextType['currentUser']>) => {
    setCurrentUser((prev) => ({ ...prev, ...user }));
  };

  const updateLanguage = (newLanguage: LanguageType) => {
    setLanguage(newLanguage);
  };

  const updateTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
  };

  const updateParentalControls = (controls: Partial<AppContextType['parentalControls']>) => {
    setParentalControls((prev) => ({ ...prev, ...controls }));
  };

  const updateProgress = (module: string, completed: boolean, stars: number) => {
    setCurrentUser((prev) => ({
      ...prev,
      progress: {
        ...prev.progress,
        [module]: { completed, stars },
      },
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        language,
        theme,
        parentalControls,
        updateUser,
        updateLanguage,
        updateTheme,
        updateParentalControls,
        updateProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = () => useContext(AppContext);
