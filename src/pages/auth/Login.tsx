import React, { useContext } from 'react'
import { DarkModeContext } from '../../utils/context/DarkModeContext'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import DarkModeComponent from './../components/DarkModeComponent';
import BackComponent from './../components/BackComponent';

function Login() {

    const {isDarkMode} = useContext(DarkModeContext)

  return (
    <section className='m-3 pt-28 font-body-rb '>
      <div className='absolute right-1/3 mr-5'>
        <DarkModeComponent/>
      </div>
      <div className='absolute left-1/3 m-3 '>
        <BackComponent/>
      </div>
      <Container className={isDarkMode? 'bg-slate-700 rounded w-1/3 p-5' : 'bg-white rounded w-1/3 p-5'}>
      <article>
        <div className='flex flex-col text-center mb-2 gap-2 justify-center select-none'>
          <h1 className={isDarkMode? 'text-4xl font-title-sy mt-3 text-light' : 'text-4xl font-title-sy mt-3'}> Cadê Meu Rango </h1>
          <h2 className={isDarkMode? 'text-2xl font-title-sy text-light' : 'text-2xl font-title-sy'}> Tela de Acesso </h2>
        </div>
        <div className='flex justify-center'>
        <Row className={isDarkMode? 'justify-center p-3 text-light' : 'justify-center p-3'}>
          <Col>
            <Form>
              <Form.Group controlId="formUserLogin">
                <Form.Label className='select-none'>Usuário</Form.Label>
                <Form.Control type="text" placeholder="Digite seu usuário"/>
              </Form.Group>
              <Form.Group controlId="formUserPassword">
                <Form.Label className='select-none'>Senha</Form.Label>
                <Form.Control type="password" placeholder="Digite sua senha" />
                <Form.Text className={isDarkMode? "text-stone-300 select-none" : "text-stone-400 select-none"}>
                  Nunca Compartilhe sua senha com terceiros
                </Form.Text>
              </Form.Group> 
              <div className='flex justify-center mt-3'>
              <Button disabled className='bg-orange_primary border-none w-28 hover:bg-orange-600 disabled:bg-orange-950' type="submit">
                Entrar
              </Button>           
              </div>
            </Form>
            <div className='mt-3'>
              <a href='/auth/register' className='hover:text-stone-400'>Ainda não tem uma conta? <b className='text-orange_primary hover:text-orange-400'>Cadastre-se</b> </a>       
            </div>
          </Col>    
        </Row>
        </div>

      </article>
      </Container>
    </section>
  )
}

export default Login