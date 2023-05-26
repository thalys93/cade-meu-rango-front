import React, {createContext, useState, useEffect} from "react";
import { loginUtils } from "../auth/login";

const UserAutenticatedContext = createContext();

const UserAutenticatedProvider = ({children}) => {

    const {isLogged, setIsLogged} = loginUtils();

    useEffect(() => {
        const storedMode = localStorage.getItem('isLogged');
        if (storedMode) {
            setIsLogged(JSON.parse(storedMode));
        }
    }, []);

    const toggleLoggedMode = () => {
        const loggedMode = !isLogged;
        setIsLogged(loggedMode);
        localStorage.setItem('isLogged', JSON.stringify(loggedMode));
    };

    return(        
        <UserAutenticatedContext.Provider value={{isLogged, toggleLoggedMode}}>
            {children}
        </UserAutenticatedContext.Provider>
    );
}

export {UserAutenticatedContext, UserAutenticatedProvider,};