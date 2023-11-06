import * as formik from 'formik';
import * as yup from 'yup';
import { Fauth } from './../Firebase';
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence, signOut } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export interface CreatedUserModel {
  email: string;
  password: string;
}

export function LoginUtils() {

  const { Formik } = formik;
  const initialValues: CreatedUserModel = { email: '', password: '' };
  const navigate = useNavigate();

  const [success, setSucess] = useState(false);
  const [successMSG, setSucessMSG] = useState('');
  const [resStatus, setResStatus] = useState(0);
  const [resOk, setResOk] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginValidation = yup.object().shape({
    email: yup.string().required('Campo obrigatório').email("Email Inválido"),
    password: yup.string().required('Campo obrigatório').min(6, "Precisa ter no minimo 6 caracteres").uppercase("precisa ter um caracter minusculo")
  });

  const doLogin = async (userData: CreatedUserModel) => {
    try {
      const { email, password } = userData;

      setLoading(true);
      await signInWithEmailAndPassword(Fauth, email, password);

      setTimeout(() => {
        setSucessMSG('Validando Login..');
        setResStatus(102);
        setPersistence(Fauth, browserSessionPersistence);

        setTimeout(() => {
          setSucessMSG('Login realizado com sucesso! Redirecionando...');
          setResStatus(200);
          setSucess(true);
          setLoading(false);
          setResOk(true);
          setError(false);
          setTimeout(() => {
            navigate('/');
          }, 1500);
        }, 1500);
      }, 1500);

    } catch (error) {
      console.error('Falha ' + error);
      // Estados
      setSucess(false);
      setSucessMSG('Falha: ' + error.message);
      setResStatus(400);
      setResOk(false);
      setError(true);
    }
  }

  const doLogout = async () => {
    try {
      setLoading(true);

      setTimeout(() => {
        setSucessMSG('Realizando Logout');
        setResStatus(102);
      }, 1500)

      setTimeout(() => {
        setSucessMSG('Logout realizado com sucesso! Recarregando...');
        setResStatus(200);

        setTimeout(() => {
          signOut(Fauth);
        }, 500)
        setLoading(false);
        setSucess(true);
        setResOk(true);
        setError(false);
      }, 2000);

      setTimeout(() => {
        window.location.reload();
      }, 3700)

    } catch (error) {
      console.error('Falha ao Deslogar: ' + error);
      setSucess(false);
      setSucessMSG('Falha ao Deslogar: ' + error.message);
      setResStatus(400);
      setResOk(false);
      setError(true);
    }
  }



  return {
    Formik,
    doLogin,
    doLogout,
    loading,
    initialValues,
    loginValidation,
    success,
    successMSG,
    resStatus,
    resOk,
    error,
  }

}