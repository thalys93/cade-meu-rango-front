import React, { useContext } from 'react'
import { DarkModeContext } from '../../utils/context/DarkModeContext'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import DarkModeComponent from './../components/DarkModeComponent';
import BackComponent from './../components/BackComponent';
import { RegisterUtils } from '../../utils/auth/register/registerUtils';
import PopupComponent from '../components/PopupComponent';
import '../components/custom/popup.css'

function Register() {
  const {isDarkMode} = useContext(DarkModeContext)

  const {Formik, 
    initialValues, 
    FormValidation, 
    onSubmit, 
    error, 
    resStatus , 
    success, 
    successMSG,
    resOk} = RegisterUtils()  

  return (
    <section className='m-3 font-body-rb '>    
      <div className='popupCenter' hidden={!success == !error}>
        {PopupComponent({title: successMSG , statusCode: resStatus, error: error})}
      </div>
    <div className='absolute right-1/3 mr-5'>
      <DarkModeComponent/>
    </div>
    <div className='absolute left-1/3 m-3 '>
      <BackComponent/>
    </div>
    <Container className={isDarkMode? 'bg-slate-700 rounded w-1/3 p-4' : 'bg-white rounded w-1/3 p-4'}>
    <article>
      <div className='flex flex-col text-center mb-2 gap-2 justify-center select-none'>
        <h1 className={isDarkMode? 'text-4xl font-title-sy mt-3 text-light' : 'text-4xl font-title-sy mt-3'}> Cadê Meu Rango </h1>
        <h2 className={isDarkMode? 'text-2xl font-title-sy text-light' : 'text-2xl font-title-sy'}> Tela de Cadastro </h2>
      </div>
      <div className='flex justify-center'>
        {resOk === undefined ? (
          RegisterForm()
        ) : (
          RegisterFormOK()
        )}
      </div>

    </article>
    </Container>
  </section>
  )

  function RegisterForm() {
    return <Row className={isDarkMode ? 'justify-center p-3 text-light' : 'justify-center p-3'}>
      <Col>
        <Formik validationSchema={FormValidation} initialValues={initialValues} onSubmit={onSubmit}>
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="formNameCad">
                <Form.Label className='select-none'>Nome</Form.Label>
                <Form.Control type="text"
                  placeholder="João da Silva"
                  name='name'
                  onChange={handleChange}
                  isValid={touched.name && !errors.name}
                  isInvalid={!!errors.name} />
                <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='formEmailCad' className='pt-2'>
                <Form.Label className='select-none'>E-mail</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="joao@email.com"
                  name='email'
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={!!errors.email} />
                <Form.Text className={isDarkMode ? "text-stone-300 select-none" : "text-stone-400 select-none"}>
                  EX: email@exemplo.com.br
                </Form.Text>
                <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <br className='select-none' />

              <Form.Group controlId="formUserPassword" className='pt-2'>
                <Form.Label className='select-none'>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="*********"
                  name='password'
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={!!errors.password} />
                <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formUserPasswordConfirm" className='mt-2'>
                <Form.Label className='select-none'>Confirme sua senha</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={values.confirmPassword}
                  isValid={touched.confirmPassword && !errors.confirmPassword}
                  isInvalid={!!errors.confirmPassword}
                  placeholder="*********" />
                <Form.Text className={isDarkMode ? "text-stone-300 select-none" : "text-stone-400 select-none"}>
                  Nunca Compartilhe sua senha com terceiros
                </Form.Text>
                <Form.Control.Feedback type='invalid'>{errors.confirmPassword}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='pt-2'>
                <Form.Check
                  type="checkbox"
                  name="terms"
                  onChange={handleChange}
                  isValid={touched.terms && !errors.terms}
                  isInvalid={!!errors.terms}
                  feedback={errors.terms}
                  feedbackType='invalid'
                  label={<span>
                    Aceito os <a href='termos' className='underline underline-offset-4 text-orange_primary select-none cursor-pointer'>Termos de Uso</a> e a <a href="privacy-policy" className='underline underline-offset-4 text-orange_primary select-none cursor-pointer'>Política de Privacidade</a>
                  </span>} />
              </Form.Group>
              <div className='flex justify-center mt-3'>
                <Button className='bg-orange_primary border-none w-28 hover:bg-orange-600 disabled:bg-orange-950' type="submit">
                  Cadastrar
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>;
  }

  function RegisterFormOK() {
    return <Row className={isDarkMode ? 'justify-center p-3 text-light' : 'justify-center p-3'}>
      <Col>       
        <Formik validationSchema={FormValidation} initialValues={initialValues} onSubmit={onSubmit}>
          {({ values }) => (
            <Form noValidate>
              <Form.Group controlId="formNameCad">
                <Form.Label className='select-none'>Nome</Form.Label>
                <Form.Control type="text"
                  placeholder={values.name}
                  name='name'
                  className='animate-pulse'                  
                  />                
              </Form.Group>
              <Form.Group controlId='formEmailCad' className='pt-2'>
                <Form.Label className='select-none'>E-mail</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={values.email}
                  name='email'
                  className='animate-pulse'
                  />
                <Form.Text className={isDarkMode ? "text-stone-300 select-none" : "text-stone-400 select-none"}>
                  EX: email@exemplo.com.br
                </Form.Text>                
              </Form.Group>

              <br className='select-none' />

              <Form.Group controlId="formUserPassword" className='pt-2'>
                <Form.Label className='select-none'>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={values.password}
                  name='password'
                  className='animate-pulse'
                  />                
              </Form.Group>
              <Form.Group controlId="formUserPasswordConfirm" className='mt-2'>
                <Form.Label className='select-none'>Confirme sua senha</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder={values.password}
                  className='animate-pulse' />
                <Form.Text className={isDarkMode ? "text-stone-300 select-none" : "text-stone-400 select-none"}>
                  Nunca Compartilhe sua senha com terceiros
                </Form.Text>                
              </Form.Group>
              <Form.Group className='pt-2'>
                <Form.Check
                  type="checkbox"
                  name="terms"
                  defaultChecked
                  feedbackType='invalid'
                  label={<span>
                    Aceito os <a href='termos' className='underline underline-offset-4 text-orange_primary select-none cursor-pointer' target='_blank'>Termos de Uso</a> e a Política de Privacidade
                  </span>} />
              </Form.Group>
              <div className='flex justify-center mt-3'>
                <Button className='bg-orange_primary border-none w-28 hover:bg-orange-600 disabled:bg-orange-950' type="submit" disabled>
                  Cadastrar
                </Button>
              </div>              
            </Form> 
          )}          
          </Formik>          
      </Col>      
    </Row>
  }
}

export default Register