import { useContext, useState } from "react";
import { UserAutenticatedContext } from "../context/UserContext";

export function loginUtils () {

        
    const [isLogged , setIsLogged] = useState(false);

    const [usuario, setUsuario] = useState('');
    const [salvaDados, setSalvaDados] = useState('');
    const [senha, setSenha] = useState('');
    const [aviso, setAviso] = useState(false);

    const handleUsernameChange = (event) => {
        setUsuario(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setSenha(event.target.value);
    };        
    
    const enviarDados = (e) => {
        e.preventDefault();

        if (usuario === 'admin' && senha === 'admin') {            
            setAviso(false);
            setIsLogged(true);                      
        } else {
            setAviso(true);
            setIsLogged(false)
        }
    }

    return {
        handleUsernameChange,
        handlePasswordChange,
        setAviso,    
        enviarDados,    
        aviso,
        isLogged,
        setIsLogged,
        usuario,
        salvaDados,
    }

}