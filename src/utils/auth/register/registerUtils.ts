
import * as formik from 'formik';
import * as yup from 'yup';
import { postUser } from '../../api/apiUtils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fauth } from '../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { newUserModel } from './../../interfaces/Users';

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
        imageLink: '',
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
            // Primeiro Bloco de Mensagem
            setSucess(true);
            setResStatus(102);
            setSucessMSG("Criando usuário...");

            // Inicia Função de Criação de Usuário 
            const { user } = await createUserWithEmailAndPassword(Fauth, userData.email, userData.password);

            setTimeout(() => {
                // Conclui Criação do Usuario
                setResStatus(201);
                setSucessMSG("Passando Dados para API!!");
            }, 1500);

            const RemaingUserData = {
                UUID: user?.uid,
                name: userData.name,
                email: userData.email,
                role: userData.role,
                imageLink: '',
                isAdmin: userData.isAdmin,
                isAuthor: userData.isAuthor,
                terms: userData.terms
            }
            // Faz o Post para a API            
            const response = await postUser(RemaingUserData);
            console.log(response.message);

            // Envia dados remanescentes para a API
            if (response.status === 200) {
                setSucessMSG("Usuário Criado com Sucesso!");
                setResStatus(200);
                setResOk(true);
                setError(false);

                setTimeout(() => {
                    navigate('/');
                }, 3000);

            } else if (response.status === 500) {
                setSucess(false);
                setError(true);
                setSucessMSG("Falha ao criar o usuário!! : " + response.message);
                console.log(response);
                setResStatus(response.status);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } else {
                setSucess(false);
                setError(true);
                setSucessMSG("Falha ao criar o usuário!! : " + response.message);
                console.log(response);
                setResStatus(response.status);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }

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