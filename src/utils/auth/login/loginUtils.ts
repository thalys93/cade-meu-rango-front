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

      await signInWithEmailAndPassword(Fauth, email, password);

      setTimeout(() => {
        dispatch(setStates({ infoMSG: 'Validando Login..', resStatus: 102 }));

        setPersistence(Fauth, browserSessionPersistence);

        setTimeout(() => {
          dispatch(setStates({
            infoMSG: 'Login realizado com sucesso! Redirecionando...',
            resStatus: 200,
            success: true,
            show: true,
            loading: false,
            resOk: true,
            error: false,
          }));
          setTimeout(() => {
            navigate('/');
            dispatch(setStates({ show: false }));
          }, 1500);
        }, 1500);
      }, 1500);

    } catch (error) {
      console.error('Falha ' + error);

      dispatch(setStates({
        success: false,
        infoMSG: 'Falha: ' + error.message,
        resStatus: 400,
        resOk: false,
        error: true,
      }))
    }
  }

  const doLogout = async () => {
    try {
      dispatch(setStates({ loading: true, }))

      setTimeout(() => {
        dispatch(setStates({
          infoMSG: 'Realizando Logout',
          resStatus: 102,
        }));
      }, 1500)

      setTimeout(() => {
        dispatch(setStates({
          infoMSG: 'Logout realizado com sucesso! Recarregando...',
          resStatus: 200,
          success: true,
          loading: false,
          resOk: true,
          error: false,
        }))
        setTimeout(() => {
          signOut(Fauth);
        }, 500)
      }, 2000);

      setTimeout(() => {
        window.location.reload();
      }, 3700)

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
    success: commonStates.success,
    infoMSG: commonStates.infoMSG,
    resStatus: commonStates.resStatus,
    resOk: commonStates.resOk,
    error: commonStates.error,
  }

}