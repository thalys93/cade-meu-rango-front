/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthModeContext";
import { FireStorage } from "../Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDropzone } from "react-dropzone";
import { getUsersByID, updateUser } from "../../api/apiUtils";
import { EditedUserModel } from "../../interfaces/Users";
import { useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { setStates } from "../../redux/appSlice";
import { setAPIUserData, setEditMode, setProfileImage } from "../../redux/userSlice";
import { useParams } from "react-router-dom";
import * as formik from 'formik';
import * as yup from 'yup'



export function userUtils() {

    const authContext = useContext(AuthContext);
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const userStates = useSelector((state: RootState) => state.userState);
    const commonStates = useSelector((state: RootState) => state.commonState);

    const { Formik } = formik;

    const initialValues: EditedUserModel = {        
        role: '',
        biography: '',
        imageLink: '',
    };

    const FormValidation = yup.object().shape({
        userRole: yup.string(),
        biography: yup.string()
    })

    const toggleEditMode = () => {
        dispatch(setEditMode(!userStates.editMode));
    }

    useEffect(() => {
        const getUserData = async () => {
            try {
                const uid = await getUsersByID(id as string);
                dispatch(setAPIUserData(uid));

            } catch (error) {
                console.error('Erro ao buscar os dados do usuário:', error);
            }
        }
        getUserData();
    }, [dispatch, id])

    const saveChanges = async () => {

        const role = initialValues.role;
        const biography = initialValues.biography;

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
                    const editedUser = { imageLink: imageURL, role: role, biography: biography }

                    // Atualiza o documento do usuário
                    await updateUser(uid, editedUser as never);

                    dispatch(setStates({
                        loading: false,
                        infoMSG: 'Documento do usuário atualizado com sucesso.',
                        resStatus: 200,
                        error: false,
                        success: true,
                        show: true,
                    }))

                    await new Promise(resolve => setTimeout(resolve, 1500));

                    dispatch(setStates({ show: false }))
                    dispatch(setEditMode(false));

                    document.location.reload();
                }

            } catch (error) {

                dispatch(setStates({
                    loading: false,
                    infoMSG: 'Erro ao atualizar o documento do usuário.',
                    resStatus: 500,
                    error: true,
                    success: false,
                    show: true,
                }))

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
        profile: userStates.user,
        Formik,
        initialValues,
        FormValidation,
        toggleEditMode,
        saveChanges,
        getRootProps,
        getInputProps,
    }
}
