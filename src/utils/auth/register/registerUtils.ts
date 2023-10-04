import * as formik from 'formik';
import * as yup from 'yup';
import { postUser } from '../../api/apiUtils';

export interface newUserModel {
    id: string;
    name: string;
    email: string;
    password: string;    
    role: string;
    isAdmin: boolean;
    isAuthor: boolean;
}

export function RegisterUtils() {

    const { Formik } = formik;
    const initialValues = {name: '', email: '', password: '', confirmPassword: '', terms: false};

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
        userData.role = "Usuário";
        userData.isAdmin = false;
        userData.isAuthor = false;

        try {
            const response = await postUser(userData);
            console.log("Usuário criado com sucesso: " , response.data );
            console.log("Status : ", response.status)
            return response;
        } catch (error) {
            console.error("falha ao criar o usuário: " ,  error);
        }
    }

    return{Formik, initialValues, FormValidation, onSubmit}
}