import React, { createContext, useState , useEffect } from 'react'

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
      const storedMode = localStorage.getItem('darkMode');
      if (storedMode) {
        setIsDarkMode(JSON.parse(storedMode));
      }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', JSON.stringify(newMode));
    };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
        {children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext, DarkModeProvider };

