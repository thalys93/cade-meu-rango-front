/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useContext } from "react";
import { AuthContext } from "../../context/AuthModeContext";
import { FireStorage } from "../Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDropzone } from "react-dropzone";
import { getUsersByID, updateUser } from "../../api/apiUtils";
import { ApiUserModel } from "../../interfaces/Users";
import { useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { setStates } from "../../redux/appSlice";
import { setAPIUserData, setEditMode, setProfileImage } from "../../redux/userSlice";



export function userUtils() {

    const authContext = useContext(AuthContext);
    const dispatch = useDispatch();    
    const userStates = useSelector((state: RootState) => state.userState);
    const commonStates = useSelector((state: RootState) => state.commonState);


    const toggleEditMode = () => {
        dispatch(setEditMode(!userStates.editMode));
    }

    const saveChanges = async () => {
        if (userStates.profileImage) {
            try {
                const uid = authContext?.user?.uid;

                if (!uid) {
                    dispatch(setStates({
                        error: true,
                        infoMSG: 'UID do usuário não encontrado.',
                        show: true,
                    }))
                    console.error('UID do usuário não encontrado.');
                    return;
                }

                const userData = await getUsersByID(uid);
                const storageRef = ref(FireStorage, `users/${uid}/profileImage`);

                dispatch(setStates({                    
                    infoMSG: 'Atualizando o documento do usuário...',
                    error: false,   
                    resStatus: 102,                 
                    success: false,
                    show: true,
                }))

                dispatch(setAPIUserData(userData));

                if (userData) {

                    // Faz o uploud no firebase
                    await uploadBytes(storageRef, userStates.profileImage, { contentType: 'image/jpeg' })

                    // Pega o link da imagem no firebase
                    const imageURL = await getDownloadURL(storageRef);

                    // Cria o modelo para atualizar o usuario
                    const updateUserIMG = {
                        imageLink: imageURL,
                    }

                    // Atualiza o documento do usuário
                    await updateUser(uid, updateUserIMG as ApiUserModel);

                    setTimeout(() => {
                    dispatch(setStates({
                        loading: false,
                        infoMSG: 'Documento do usuário atualizado com sucesso.',
                        resStatus: 200,
                        error: false,
                        success: true,
                        show: true,
                    }))
                    }, 2500);



                    setTimeout(() => {
                        dispatch(setEditMode(false));
                        dispatch(setStates({
                            show: true,
                            infoMSG: "Recarregando...",
                            resStatus: 102,
                        }))
                    }, 2500 );

                    setTimeout(() => {
                        dispatch(setStates({show:false}));
                    }, 2500);
                    
                    
                    window.location.reload();
                }

            } catch (error) {
                console.error('Erro ao atualizar o documento do usuário:', error);
            }
        }
    }

    // Hooks do dropzone    
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        dispatch(setProfileImage(file));
    }, [dispatch]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*' as never,
        multiple: false
    });


    return {       
        editMode: userStates.editMode,      
        profileImage: userStates.profileImage,
        infoMSG: commonStates.infoMSG,        
        error: commonStates.error,        
        resStatus: commonStates.resStatus,        
        show: commonStates.show,       
        toggleEditMode,
        saveChanges,
        getRootProps,
        getInputProps,
    }
}
