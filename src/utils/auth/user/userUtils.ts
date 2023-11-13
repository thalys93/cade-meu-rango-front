/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthModeContext";
import { FireStorage } from "../Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDropzone } from "react-dropzone";
import { getUsersByID, updateUser } from "../../api/apiUtils";
import { ApiUserModel } from "../../interfaces/Users";


export function userUtils() {

    const authContext = useContext(AuthContext);

    const [editMode, setEditMode] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [APIuserData, setUserData] = useState({} as ApiUserModel);


    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    const saveChanges = async () => {
        if (profileImage) {
            try {
                const uid = authContext?.user?.uid;

                if (!uid) {
                    console.error('UID do usuário não encontrado.');
                    return;
                }

                const userData = await getUsersByID(uid);
                const storageRef = ref(FireStorage, `users/${uid}/profileImage`);
                setUserData(APIuserData);

                if (userData) {
                                    
                    // Faz o uploud no firebase
                    await uploadBytes(storageRef, profileImage, { contentType: 'image/jpeg' })

                    // Pega o link da imagem no firebase
                    const imageURL = await getDownloadURL(storageRef);

                    // Cria o modelo para atualizar o usuario
                    const updateUserIMG = {
                        imageLink: imageURL,
                    }

                    // Atualiza o documento do usuário
                    await updateUser(uid, updateUserIMG as ApiUserModel);
                    
                    setEditMode(false);

                }

            } catch (error) {
                console.error('Erro ao atualizar o documento do usuário:', error);
            }
        }
    }

    // Hooks do dropzone    
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        setProfileImage(file);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*' as never,
        multiple: false
    });


    return {
        editMode,
        toggleEditMode,
        saveChanges,
        getRootProps,
        getInputProps,
        profileImage,
        APIuserData
    }
}