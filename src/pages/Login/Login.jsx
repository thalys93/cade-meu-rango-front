// Libs
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, ToastContainer } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { Toast } from 'react-bootstrap'

// Utils
import { DarkModeContext } from '../../utils/context/DarkModeContext'
import { UserAutenticatedContext } from '../../utils/context/UserContext'
import { loginUtils } from '../../utils/auth/login'

// Componentes
import CadeMeuRangoVar from '../../interface/banner/CadeMeuRangoVar'
import Voltar from '../../interface/buttons/back-component/BackBtn'

// CSS
import './login.css'
import BannerUtils from '../../interface/banner/offCanvas/bannerUtils'

function Login() {
  const { isDarkMode } = useContext(DarkModeContext);
  const {toggleLoggedMode} = useContext(UserAutenticatedContext);
  
  const { handlePasswordChange , handleUsernameChange , aviso, enviarDados, isLogged } = loginUtils();  


  
  const nav = useNavigate();

  const verificaLogin = () => {
    if (isLogged) {      
      toggleLoggedMode();
      nav('/');
    }
  }



    
  return (
    <section>

    <ToastContainer position='top-center' className='user-select-none'>
    <Toast show={aviso} bg='danger' animation={true} onClose={() => setAviso(false)} delay='3000' autohide>
        <Toast.Body className='text-light text-center'>
          Atenção um ou mais Dados Inválidos!!
        </Toast.Body>
      </Toast>
      </ToastContainer>

      <Helmet>
        <title> Login | Cade meu Rango </title>  
      </Helmet>  
          <Voltar/>
      <div className='CardDiv'>
        <Card className={isDarkMode ? 'CardLogin DarkSection' : 'CardLogin'}>
          <Card.Body>
            <Card.Header>
              <CadeMeuRangoVar/>
              <h2 className={isDarkMode ? 'DarkTitleSubtitleVar text-center user-select-none' : 'TitleSubtitleVar text-center user-select-none'}>Bem Vindo</h2>
            </Card.Header>
            <form onSubmit={enviarDados} className='FormularioLogin'>
              <div className='form-group'>
                <label className={isDarkMode ? 'DarkTxt' : 'txt'}>Usuario</label>
                <input type='text' onChange={handleUsernameChange} name='username' className={aviso ? 'form-control border-danger formBG' : 'form-control formBG'} placeholder='Digite seu Usuario' required/>
              </div>
              <div className='form-group'>
                <label className={isDarkMode ? 'DarkTxt' : 'txt'}>Senha</label>
                <input type='password' onChange={handlePasswordChange} name='password' className={aviso ? 'form-control border-danger formBG' : 'form-control formBG'} placeholder='Digite sua senha' required/>
              </div>
              
                <div className='buttonDiv'>
                  <button className='btnLoginV2 buttonDif txt' type='submit' onClick={verificaLogin}> Login </button>
                </div>
              </form>              
                            
              <div className='CadDiv'>
                <p className={isDarkMode ? 'DarkTxt' : 'txt'}>Ainda não tem uma conta? 
                  <Link className="enfatize ms-2 btn btn-outline-secondary disabled" to='/Cadastro'> Cadastre-se</Link>
                </p> 
              </div>              
          </Card.Body>
        </Card>
      </div>      
    </section>
  )
}

export default Login