import React, {createContext, useState, useEffect} from "react";

const UserAutenticatedContext = createContext();

const UserAutenticatedProvider = ({children}) => {
    const {isLogged, setIsLogged} = useState(false);

    useEffect(() => {
        const storedMode = localStorage.getItem('isLogged');
        if (storedMode) {
            setIsLogged(JSON.parse(storedMode));
        }
    }, []);

    // Ativar o Usuário (a ideia é que ele busque o usuário na api e valide o login)
    // const toggleUserAutenticated = () => {
    //     const userAutenticated = !isLogged;
    //     setIsLogged(userAutenticated);
    //     localStorage.setItem('userAutenticated', JSON.stringify(userAutenticated));
    // }        

    return(
        <UserAutenticatedContext.Provider value={{isLogged}}>
            {children}
        </UserAutenticatedContext.Provider>
    );
}

export {UserAutenticatedContext, UserAutenticatedProvider,};