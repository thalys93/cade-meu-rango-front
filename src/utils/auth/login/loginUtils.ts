import * as formik from 'formik';
import * as yup from 'yup';
import { Fauth } from './../Firebase';
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence, signOut } from 'firebase/auth';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';


export interface CreatedUserModel {
  email: string;
  password: string;
}

export function LoginUtils() {

  const { Formik } = formik;
  const initialValues: CreatedUserModel = { email: '', password: '' };  

  const [success, setSucess] = useState(false);
  const [successMSG, setSucessMSG] = useState('');
  const [resStatus, setResStatus] = useState(0);
  const [resOk, setResOk] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const loginValidation = yup.object().shape({
    email: yup.string().required('Campo obrigatório').email("Email Inválido"),
    password: yup.string().required('Campo obrigatório').min(6, "Precisa ter no minimo 6 caracteres").uppercase("precisa ter um caracter minusculo")
  });

  const doLogin = async (userData: CreatedUserModel) => {
    try {
      const { email, password } = userData;
      const userCredential = await signInWithEmailAndPassword(Fauth, email, password);
      setPersistence(Fauth, browserSessionPersistence);
      // Estados
      setSucess(true);
      setSucessMSG('Login bem-sucedido!');
      setResStatus(200);
      setResOk(true);
      setIsAuth(true); // Estado se Está autenticado ou não
      setError(false);
      const authenticatedUser = userCredential.user;
      console.log("Usuário Logado : ", authenticatedUser);

    } catch (error) {
      console.error('Falha ao Logar: ' + error);
      // Estados
      setSucess(false);
      setSucessMSG('Falha ao Logar: ' + error.message);
      setResStatus(400);
      setResOk(false);
      setIsAuth(false);
      setError(true);
    }
  }


  //Validação de Login
//   setTimeout(() => {
//     navigate('/');
// }, 2500);

  const doLogout = async () => {
    try {
      await signOut(Fauth);
      // Estados
      setSucess(true);
      setSucessMSG('Logout bem-sucedido!');
      setResStatus(200);
      setResOk(true);
      setIsAuth(false);
      setError(false);
    } catch (error) {
      console.error('Falha ao Deslogar: ' + error);
      // Estados
      setSucess(false);
      setSucessMSG('Falha ao Deslogar: ' + error.message);
      setResStatus(400);
      setResOk(false);
      setIsAuth(true);
      setError(true);
    }
  }



  return {
    Formik,
    doLogin,
    doLogout,
    initialValues,
    loginValidation,
    success,
    successMSG,
    resStatus,
    resOk,
    error,
    isAuth,
    setIsAuth
  }

}