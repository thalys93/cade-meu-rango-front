/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthModeContext";
import { FireStorage, FireStoreDatabase } from "../Firebase";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDropzone } from "react-dropzone";
import { updateUser } from "../../api/apiUtils";

export function userUtils() {

    const authContext = useContext(AuthContext);

    const [editMode, setEditMode] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

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

                const userRef = query(collection(FireStoreDatabase, 'users'), where('UUID', '==', uid));
                const userSnapshot = await getDocs(userRef);

                if (!userSnapshot.empty) {
                    const userDoc = userSnapshot.docs[0];
                    const userDocRef = userDoc.ref;

                    const storageRef = ref(FireStorage, `users_photos/${uid}/profileImage`);
                    await uploadBytes(storageRef, profileImage);

                    const imageURL = await getDownloadURL(storageRef);

                    const userRef = doc(FireStoreDatabase, 'users', userDocRef.id);

                    const updateUserIMG = {
                        UUID: uid,
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        role: '',
                        isAdmin: false,
                        isAuthor: false,
                        terms: false,                        
                        userImageLink: imageURL,
                        userName: ''
                    }
                    
                    const UserUid = authContext?.user?.uid;                    

                    await updateUser(updateUserIMG);

                    await updateDoc(userRef, {
                        userImageLink: imageURL
                    });

                } else {
                    console.error('Documento do usuário não encontrado.');
                }

                setEditMode(false);
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
        profileImage
    }
}