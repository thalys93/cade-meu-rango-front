/* eslint-disable @typescript-eslint/no-unused-vars */
import * as formik from 'formik';
import * as yup from 'yup';
import { postUser } from '../../api/apiUtils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fauth, FireStoreDatabase } from '../Firebase';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


export interface newUserModel {
    UUID: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    isAdmin: boolean;
    isAuthor: boolean;
    terms: boolean;
}

export function RegisterUtils() {

    const { Formik } = formik;
    const navigate = useNavigate();

    const [success, setSucess] = useState(false);
    const [successMSG, setSucessMSG] = useState('');
    const [resStatus, setResStatus] = useState(0);
    const [resOk, setResOk] = useState<boolean | undefined>(undefined);
    const [error, setError] = useState(false);


    const initialValues: newUserModel = {
        UUID: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Usuário',
        isAdmin: false,
        isAuthor: false,
        terms: false
    };

    const FormValidation = yup.object().shape({
        name: yup.string().required('Campo obrigatório').min(3, "Precisa ter no minimo 3 caracteres"),
        email: yup.string().required('Campo obrigatório').email("Email inválido"),

        password: yup
            .string()
            .required('Campo obrigatório')
            .min(6, "Precisa ter no minimo 6 caracteres"),

        confirmPassword: yup
            .string()
            .required('Campo obrigatório')
            .oneOf([yup.ref('password')], 'Senhas não coincidem'),

        terms: yup.boolean().oneOf([true], 'Você precisa aceitar os termos')
    });

    const onSubmit = async (userData: newUserModel) => {
        userData.role = initialValues.role;
        userData.isAdmin = initialValues.isAdmin;
        userData.isAuthor = initialValues.isAuthor;

        try {
            const { user } = await createUserWithEmailAndPassword(Fauth, userData.email, userData.password);

            const RemaingUserData = {
                UUID: user?.uid || '',
                name: userData.name,
                email: userData.email,
                role: userData.role,
                isAdmin: userData.isAdmin,
                isAuthor: userData.isAuthor,
                terms : userData.terms
            }

            await addDoc(collection(FireStoreDatabase, 'users') , RemaingUserData)

            // Remove Espaços do UserName
            const userName = userData.name.replace(/\s+/g, '')            

            // Cria o Objeto com apenas o UserName(para o banco de dados)
            const userDataForAPI = {
                UUID: RemaingUserData.UUID,
                userName: userName,
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: '',
                isAdmin: false,
                isAuthor: false,
                terms: false
            };            

            // Faz o Post para a API
            await postUser(userDataForAPI);
            
            setSucess(true);
            setSucessMSG("Usuário criado com sucesso!!");
            setResStatus(201);
            setResOk(true);
            setError(false);

            setTimeout(() => {
                navigate('/auth/login');
            }, 3000);

        } catch (error) {
            console.error("falha ao criar o usuário: ", error);
            setSucess(false);
            setError(true);
            setSucessMSG("Falha ao criar o usuário!! : " + error.message);
            setResStatus(error.status);
        }
    }

    return {
        Formik,
        initialValues,
        FormValidation, onSubmit,
        error,
        success,
        successMSG,
        resStatus,
        resOk
    }
}