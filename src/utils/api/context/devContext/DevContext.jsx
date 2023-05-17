import React, { createContext, useState , useEffect } from 'react'

const DeveLoperContext = createContext();

const DeveloperProvider = ({ children }) => {
    const [isDev, setIsDev] = useState(false);

    useEffect(() => {
      const storedMode = localStorage.getItem('isDev');
      if (storedMode) {
        setIsDev(JSON.parse(storedMode));
      }
    }, []);

    const toggleDevMode = () => {
        const devMode = !isDev;
        setIsDev(devMode);
        localStorage.setItem('devMode', JSON.stringify(devMode));
    };

  return (
    <DeveLoperContext.Provider value={{ isDev, toggleDevMode }}>
        {children}
    </DeveLoperContext.Provider>
  );
};

export { DeveLoperContext, DeveloperProvider };

