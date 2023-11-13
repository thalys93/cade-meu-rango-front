import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthModeContext";
import { getUsersByID } from "../api/apiUtils";
import { ApiUserModel } from "../interfaces/Users";

export function AuthUtils() {
    const [userData, setUserData] = useState({} as ApiUserModel);
    const authContext = useContext(AuthContext);

    // Recupera Dados do Usuario Autenticado na API
    useEffect(() => {
        const getUserData = async () => {
            try {
                const uid = authContext?.user?.uid;
                if (uid) {
                    const response = await getUsersByID(uid);                    
                    // console.log(response)
                    if (response) {
                        setUserData(response);                      
                    } else {
                        console.error('Nenhum Usuário Encontrado');
                    }
                }
            } catch (error) {
                console.error('Falha ao Encontrar o Usuário', error);
            }
        };
        getUserData();
    }, [authContext?.user?.uid]);    

    return {
        userData
    }

}



