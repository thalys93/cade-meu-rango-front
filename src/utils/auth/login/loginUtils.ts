// import testUsers from '../testUser.json';

import * as formik from 'formik';
import * as yup from 'yup';

export interface CreatedUserModel {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    isAdmin: boolean;
    isAuthor: boolean;
}

export function LoginUtils() {

    const { Formik } = formik;
    const initialValues = {name: '', password: ''};

    const loginValidation = yup.object().shape({
      name: yup.string().required('Campo obrigatório').min(3,"Precisa ter no minimo 3 caracteres"),
      password: yup.string().required('Campo obrigatório').min(6,"Precisa ter no minimo 6 caracteres").uppercase("precisa ter um caracter minusculo")
    });

    return{Formik, initialValues, loginValidation}

}