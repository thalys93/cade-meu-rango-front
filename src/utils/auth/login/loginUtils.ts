import { useEffect, useState, useState } from "react";
import testUsers from '../testUser.json'

export interface CreatedUserModel {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    isAdmin: boolean;
    isAuthor: boolean;
}

export function RegisterUtils() {
    const [User, setUser] = useState<CreatedUserModel[]>([]);

    const verifyUser = (name: 'admin', password: 'admin@password') => {
        const userToVerify = User.find((user) => user.name === name && user.password === password);
        return userToVerify;
    }

    useEffect(() => {
        fetch('../testUser.json')
        .then((response) => response.json())
        .then((data) => {
            if (Array.isArray(data)) {
                setUser(data)
            }
        })
        .catch((error) => {
            console.error(`erro ao localizar o usuário : ${error}`)
        });      
    }, []);

    return{verifyUser}
}