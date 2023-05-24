// Libs
import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet'

// Utils
import { DarkModeContext } from '../../utils/context/DarkModeContext'

// Componente
import CadeMeuRangoVar from '../../interface/banner/CadeMeuRangoVar'

// CSS
import './login.css'

function Cadastro() {
    const { isDarkMode } = React.useContext(DarkModeContext)
  return (
<section>      
    <Helmet>
      <title> Registrar-se | Cade meu Rango </title>  
    </Helmet>
      <div className='exitDiv'>
        <Link className={isDarkMode ? 'text-light' : 'text-dark'} id="linkArrow" to='/Login'> 
          <i class="bi bi-arrow-left"></i> 
        </Link>
      </div>      
      <div className='CardDiv container'>
        <Card className={isDarkMode ? 'CardCadastro DarkSection' : 'CardCadastro'}>
          <Card.Body>
            <Card.Header>
              <CadeMeuRangoVar/>
              <h2 className={isDarkMode ? 'DarkTitleSubtitleVar text-center user-select-none' : 'TitleSubtitleVar text-center user-select-none'}>Cadastro</h2>
            </Card.Header>
            <form className='FormularioLogin'>
              <div className='form-group'>
                <label htmlFor='name' className={isDarkMode? 'DarkTxt' : 'txt'}>Nome</label>
                <input type='text' className='form-control' id='name' placeholder='Digite seu nome' required />
              </div>
              <div className='form-group'>
                <label htmlFor='email' className={isDarkMode? 'DarkTxt' : 'txt'}>Email</label>
                <input type='email' className='form-control' id='email' placeholder='Digite seu email' required/>
              </div>
              <div className='form-group'>
                <label htmlFor='password' className={isDarkMode? 'DarkTxt' : 'txt'}>Senha</label>
                <input type='password' className='form-control' id='password' placeholder='Digite sua senha' required/>
              </div>
              <div className='form-check' id='termos'>
                <label className={isDarkMode? 'form-check-label DarkTxt' : 'form-check-label txt'} htmlFor='checkTermos'>Aceito os termos de uso</label>
                <input type='checkbox' className='form-check-input' required/>                
              </div>

              <div className='buttonDiv'>
                <button className='btnLoginV2 buttonDif txt' type='submit'> Criar uma Conta </button>                                             
              </div>

              </form>

                         
          </Card.Body>
        </Card>
      </div>

    </section>
  )
}

export default Cadastro