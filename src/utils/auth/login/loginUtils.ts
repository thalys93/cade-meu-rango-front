import { useState } from "react";
import testUsers from '../testUser.json'

export interface CreatedUserModel {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    isAdmin: boolean;
    isAuthor: boolean;
}

export function LoginUtils() {

    const [user, setUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<{user? : string, password? : string, message? : string}>({});

    const loginValidation = (e) => {
        e.preventDefault();
        const newErros: {user? : string, password? : string} = {};

        if(!user){
            newErros.user = 'Usuário Não Pode Ficar Vazio'
        }

        if(!password){
            newErros.password = 'Senha Não Pode Ficar Vazio'
        }
        
        setError(newErros);

        if(user && password){
            const findUser = testUsers.find((i) => i.name === user && i.password === password);
            if(findUser){
                console.log('usuário encontrado!');                
            } else {
                console.error('usuário não encontrado!');
            }
        }
    }


    return{user, setUser, password, setPassword, error, loginValidation}
}