import React, { useEffect, useState, createContext } from "react";
import { Fauth } from "../auth/Firebase";
import { User } from "firebase/auth";

type AuthContextType = { 
    user: User | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = (props) => {
    const { children } = props;
    const [user, setUser] = useState<User | null>(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Fauth.onAuthStateChanged((authUser) => {
            setUser(authUser);
            setLoading(false);
        })
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
}

