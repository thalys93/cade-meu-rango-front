import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { DarkModeContext } from '../../utils/api/context/darkModeContext/DarkModeContext'

import CadeMeuRangoVar from '../../interface/banner/CadeMeuRangoVar'

import './login.css'
import Voltar from '../../interface/buttons/back-component/BackBtn'

function Login() {
  const { isDarkMode } = React.useContext(DarkModeContext)  

  return (
    <section>    
      <Helmet>
        <title> Login | Cade meu Rango </title>  
      </Helmet>  
          <Voltar/>
      <div className='CardDiv container'>
        <Card className={isDarkMode ? 'CardLogin DarkSection' : 'CardLogin'}>
          <Card.Body>
            <Card.Header>
              <CadeMeuRangoVar/>
              <h2 className={isDarkMode ? 'DarkTitleSubtitleVar text-center user-select-none' : 'TitleSubtitleVar text-center user-select-none'}>Bem Vindo</h2>
            </Card.Header>
            <form className='FormularioLogin'>
              <div className='form-group'>
                <label htmlFor='email' className={isDarkMode ? 'DarkTxt' : 'txt'}>Email</label>
                <input type='email' className='form-control' id='email' placeholder='Digite seu email' required/>
              </div>
              <div className='form-group'>
                <label htmlFor='password' className={isDarkMode ? 'DarkTxt' : 'txt'}>Senha</label>
                <input type='password' className='form-control' id='password' placeholder='Digite sua senha' required/>
              </div>
              
                <div className='buttonDiv'>
                  <button className='btnLoginV2 buttonDif txt' type='submit'> Login </button>
                </div>
              </form>
              
              <div className='CadDiv'>
                <p className={isDarkMode ? 'DarkTxt' : 'txt'}>Ainda não tem uma conta? 
                  <Link className="enfatize"  to='/Cadastro'> Cadastre-se</Link>
                </p> 
              </div>              
          </Card.Body>
        </Card>
      </div>      
    </section>
  )
}

export default Login