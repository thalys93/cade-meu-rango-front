import React, { useContext } from 'react';
import { Button, Col, Container, Row , Form } from 'react-bootstrap';
import { LoginUtils } from '../../utils/auth/login/loginUtils';
import { DarkModeContext } from '../../utils/context/DarkModeContext';
import DarkModeComponent from './../components/DarkModeComponent';
import BackComponent from './../components/BackComponent';

function Login() {

    const {isDarkMode} = useContext(DarkModeContext)

    const {Formik, initialValues, loginValidation} = LoginUtils()

  return (
    <section className='m-3 pt-3 font-body-rb '>
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
          <Formik validationSchema={loginValidation} onSubmit={console.log} initialValues={initialValues}>
          {({handleSubmit ,handleChange, values, touched, errors}) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="formUserLogin">
                <Form.Label className='select-none' >Usuário</Form.Label>
                <Form.Control                 
                type="text" 
                name="user"              
                placeholder="Digite seu usuário" 
                value={values.user}
                onChange={handleChange} 
                isValid={touched.user && !errors.user}
                isInvalid={!!errors.user}/>
                <Form.Control.Feedback type="invalid">{errors.user}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formUserPassword">
                <Form.Label className='select-none'>Senha</Form.Label>
                <Form.Control                 
                type="password"  
                name="password"
                placeholder="Digite sua senha" 
                value={values.password}                       
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}/>
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group> 
              <div className='flex justify-center mt-3'>
              <Button className='bg-orange_primary border-none w-28 hover:bg-orange-600 disabled:bg-orange-950' type="submit">
                Entrar
              </Button>           
              </div>
            </Form>
            )}
            </Formik>
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