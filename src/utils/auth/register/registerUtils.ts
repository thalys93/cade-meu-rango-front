
import * as formik from 'formik';
import * as yup from 'yup';
import { postUser } from '../../api/apiUtils';
import { useNavigate } from 'react-router-dom';
import { Fauth } from '../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { newUserModel } from './../../interfaces/Users';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setStates } from '../../redux/appSlice';

export function RegisterUtils() {

    const { Formik } = formik;
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const commonStates = useSelector((state: RootState) => state.commonState);

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
            dispatch(setStates({
                success: true,
                infoMSG: 'Criando usuário...',
                resStatus: 102
            }));

            const { user } = await createUserWithEmailAndPassword(Fauth, userData.email, userData.password);

            setTimeout(() => {
                // Conclui Criação do Usuario
                dispatch(setStates({
                    resStatus: 201,
                    infoMSG: 'Passando Dados para API!',
                }))
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
                dispatch(setStates({
                    infoMSG: 'Usuário Criado com Sucesso!',
                    resStatus: 200,
                    success: true,
                    resOk: true,
                    error: false,

                }))

                setTimeout(() => {
                    navigate('/');
                }, 3000);

            } else if (response.status === 500) {
                dispatch(setStates({
                    infoMSG: 'Falha ao criar o usuário!! : ' + response.message,
                    resStatus: 500,
                    success: false,
                    resOk: false,
                    error: true,
                }))
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } else {
                dispatch(setStates({
                    infoMSG: 'Falha ao criar o usuário!! : ' + response.message,
                    resStatus: 500,
                    success: false,
                    resOk: false,
                    error: true,
                }))
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }

        } catch (error) {
            console.error("falha ao criar o usuário: ", error);
            dispatch(setStates({
                resStatus: 500,
                success: false,
                resOk: false,
                error: true,
            }))
        }
    }

    return {
        Formik,
        initialValues,
        FormValidation, onSubmit,
        error: commonStates.error,
        success: commonStates.success,
        infoMSG: commonStates.infoMSG,
        resStatus: commonStates.resStatus,
        resOk: commonStates.resOk,
    }
}