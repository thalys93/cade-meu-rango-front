import React, { createContext, useEffect } from 'react'

const DarkModeContext = createContext({ isDarkMode: false, toggleDarkMode: () => {} });

const DarkModeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    useEffect(() => {
        const storedMode = localStorage.getItem('darkmode');
        

        if (storedMode) {
            setIsDarkMode(JSON.parse(storedMode));            
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);        
        localStorage.setItem('darkmode', JSON.stringify(newMode));
    }

    useEffect(() => {
        if 
        (isDarkMode){document.body.classList.add("Darkbody");} 
        else 
        {document.body.classList.remove("Darkbody");}
        }, [isDarkMode])

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};
        
export { DarkModeContext, DarkModeProvider };

