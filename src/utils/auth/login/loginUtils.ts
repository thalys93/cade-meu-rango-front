import * as formik from 'formik';
import * as yup from 'yup';
import { Fauth } from '../Firebase';
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { CreatedUserModel } from './../../interfaces/Users';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setStates } from '../../redux/appSlice';

export function LoginUtils() {

  const { Formik } = formik;
  const navigate = useNavigate();

  const initialValues: CreatedUserModel = { email: '', password: '' };

  const dispatch = useDispatch();
  const commonStates = useSelector((state: RootState) => state.commonState);

  const loginValidation = yup.object().shape({
    email: yup.string().required('Campo obrigatório').email("Email Inválido"),
    password: yup.string().required('Campo obrigatório').min(6, "Precisa ter no minimo 6 caracteres").uppercase("precisa ter um caracter minusculo")
  });

  const doLogin = async (userData: CreatedUserModel) => {
    try {
      const { email, password } = userData;
      dispatch(setStates({ show: true }));
      dispatch(setStates({ infoMSG: 'Validando Login..', resStatus: 102 }));

      await signInWithEmailAndPassword(Fauth, email, password);      

      await new Promise(resolve => setTimeout(resolve, 1500));

      dispatch(setStates({
        infoMSG: 'Login realizado com sucesso! Redirecionando...',
        resStatus: 200,
        success: true,
        show: true,
        loading: false,
        resOk: true,
        error: false,
      }));

      setPersistence(Fauth, browserSessionPersistence);

      await new Promise(resolve => setTimeout(resolve, 1500));

      navigate('/');
      dispatch(setStates({ show: false }));

    } catch (error) {
      // console.error('Falha ' + error);
      
      dispatch(setStates({
        success: false,
        infoMSG: 'Dados Incorretos ou Usuário não existe!',
        resStatus: 500,
        resOk: false,
        error: true,
      }))
    }
  }

  const doLogout = async () => {
    try {
      dispatch(setStates({ loading: true, show: true }))

      dispatch(setStates({
        infoMSG: 'Realizando Logout',
        resStatus: 102,
      }));

      await new Promise(resolve => setTimeout(resolve, 1500));

      dispatch(setStates({
        infoMSG: 'Logout realizado com sucesso!',
        resStatus: 200,
        success: true,
        loading: false,
        resOk: true,
        error: false,
      }))

      await new Promise(resolve => setTimeout(resolve, 1500));

      dispatch(setStates({ show: false }));
      signOut(Fauth);

    } catch (error) {
      console.error('Falha ao Deslogar: ' + error);
      dispatch(setStates({
        success: false,
        infoMSG: 'Falha ao Deslogar: ' + error.message,
        resStatus: 400,
        resOk: false,
        error: true,
      }));
    }
  }



  return {
    Formik,
    doLogin,
    doLogout,
    initialValues,
    loginValidation,
    show: commonStates.show,
    loading: commonStates.loading,    
    infoMSG: commonStates.infoMSG,
    resStatus: commonStates.resStatus,
    resOk: commonStates.resOk,
    error: commonStates.error,
  }

}