import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthModeContext";
import { ApiUserModel } from "./register/registerUtils"; 
import { getUsersByID } from "../api/apiUtils";

export function AuthUtils() {
    const [userData, setUserData] = useState({} as ApiUserModel);

    const authContext = useContext(AuthContext);

    // Recupera Dados do Usuario na API
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
                        console.log('Nenhum Usuário Encontrado');
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



