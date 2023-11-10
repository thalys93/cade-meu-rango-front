import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthModeContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FireStoreDatabase } from "./Firebase";

interface FirebaseUserData {
    name: string;
    email: string;
    profileImage: string;
    UUID: string;
}


export function AuthUtils() {
    const [userData, setUserData] = useState({} as FirebaseUserData);
    const authContext = useContext(AuthContext);

    // Recupera Dados do Usuario no Firebase
    useEffect(() => {
        const getUserData = async () => {
            try {
                const uid = authContext?.user?.uid;
                if (uid) {
                    const userQuery = query(collection(FireStoreDatabase, 'users'), where('UUID', '==', uid));
                    const userDocs = await getDocs(userQuery);
                    if (!userDocs.empty) {
                        const userDoc = userDocs.docs[0];
                        const userData = userDoc.data() as FirebaseUserData;
                        setUserData(userData);
                    } else {
                        console.log('No user document found with the provided id!');
                    }
                }
            } catch (error) {
                console.error('Error getting user document:', error);
            }
        };

        getUserData();
    }, [authContext?.user?.uid]);

    


    return {
        userData
    }

}



