import * as formik from 'formik';
import * as yup from 'yup';
import { postUser } from '../../api/apiUtils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface newUserModel {    
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
    const [resStatus , setResStatus] = useState(0);
    const [resOk, setResOk] = useState<boolean | undefined>(undefined);
    const [error, setError] = useState(false);
    

    const initialValues: newUserModel = {        
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
        name: yup.string().required('Campo obrigatório').min(3,"Precisa ter no minimo 3 caracteres"),
        email: yup.string().required('Campo obrigatório').email("Email inválido"),

        password: yup
        .string()
        .required('Campo obrigatório')
        .min(6,"Precisa ter no minimo 6 caracteres"),        

        confirmPassword: yup
        .string()
        .required('Campo obrigatório')
        .oneOf([yup.ref('password')], 'Senhas não coincidem'),        

        terms: yup.boolean().oneOf([true], 'Você precisa aceitar os termos')
    });    

    const onSubmit = async (userData: newUserModel ) => {                                   
        userData.role = initialValues.role;
        userData.isAdmin = initialValues.isAdmin;
        userData.isAuthor = initialValues.isAuthor; 
        const response = await postUser(userData);       

        try {            
            if(response.status === 201){setSucess(true), setSucessMSG("Usuário Criado com Sucesso!") , setResStatus(response.status), setError(false);}
        } catch (error) {
            console.error("falha ao criar o usuário: " ,  error);
            setSucess(false);
            setError(true);
            setSucessMSG("Falha ao criar o usuário!! : " + response.status);
            setResStatus(response.status);
        }

        if(response.status === 201){
                setResOk(true);
            setTimeout(() => {
                navigate('/auth/login');
            }, 3000);
        } else {
            setResOk(false);
        }
    }

    return{Formik, 
        initialValues, 
        FormValidation, onSubmit, 
        error, 
        success, 
        successMSG,
        resStatus,
        resOk
        }
}