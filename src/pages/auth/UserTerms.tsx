import React, { useContext } from 'react'
import { Accordion, ListGroup } from 'react-bootstrap'
import { FiChevronDown } from 'react-icons/fi'
import DarkModeComponent from '../components/DarkModeComponent'
import BackComponent from '../components/BackComponent'
import { DarkModeContext } from '../../utils/context/DarkModeContext'


function UserTerms() {

  const { isDarkMode } = useContext(DarkModeContext)

  return (
    <div className={isDarkMode ? 'bg-slate-700 min-h-screen' : "bg-orange_primary min-h-screen"}>

      <div className='absolute right-5 mr-5 darkModeComponentProps'>
        <DarkModeComponent />
      </div>

      <div className='absolute left-1 m-3 text-white backButtonHidden'>
        <BackComponent />
      </div>

      <header className="container mx-auto p-4">
        <h1 className="text-3xl text-white font-title-sy select-none">Termos de Uso - Cadê Meu Rango</h1>
      </header>
      <main className="container mx-auto p-4">
        <section>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey='1' className={isDarkMode ? 'bg-slate-800' : ' bg-white'}>
              <Accordion.Header>
                <FiChevronDown className={isDarkMode ? 'text-white' : ''} />
                <h1 className={isDarkMode ? 'text-white ml-3' : 'ml-3'}>Cadastro e Conta de Usuário</h1>
              </Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  <ListGroup.Item>
                    1.1. Para utilizar o Cadê Meu Rango, você deve criar uma conta de usuário. Você é responsável por manter suas informações de conta precisas e atualizadas.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    1.2. Você é o único responsável por todas as atividades realizadas em sua conta. Não compartilhe sua senha com terceiros.
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='2' className={isDarkMode ? 'bg-slate-800' : ' bg-white'}>
              <Accordion.Header>
                <FiChevronDown className={isDarkMode ? 'text-white' : ''} />
                <h1 className={isDarkMode ? 'text-white ml-3' : 'ml-3'}>Conteúdo de Usuário</h1>
              </Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  <ListGroup.Item>
                    2.1. Ao enviar receitas, dicas culinárias ou qualquer outro conteúdo ("Conteúdo de Usuário") para o Cadê Meu Rango, você concede à equipe o direito não exclusivo, transferível, sublicenciável, livre de royalties, mundial e irrestrito para usar, reproduzir, modificar, adaptar, publicar, traduzir, criar trabalhos derivados, distribuir e exibir seu Conteúdo de Usuário.
                  </ListGroup.Item>

                  <ListGroup.Item>
                    2.2. Você declara e garante que possui todos os direitos necessários para o Conteúdo de Usuário que você envia e que ele não infringe direitos de terceiros.
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='3' className={isDarkMode ? 'bg-slate-800' : ' bg-white'}>
              <Accordion.Header>
                <FiChevronDown className={isDarkMode ? 'text-white' : ''} />
                <h1 className={isDarkMode ? 'text-white ml-3' : 'ml-3'}>Conduta de Usuário</h1>
              </Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  <ListGroup.Item>
                    3.1. Você concorda em usar o Cadê Meu Rango de forma responsável e respeitosa. Não é permitido:
                    <ListGroup variant='flush'>
                      <ListGroup.Item className='text-stone-700'>a. Enviar conteúdo difamatório, obsceno, ilegal, ameaçador, ou de outra forma ofensivo.</ListGroup.Item>
                      <ListGroup.Item className='text-stone-700'>b. Enviar conteúdo que viole direitos autorais, marcas registradas, ou outros direitos de propriedade intelectual.</ListGroup.Item>
                      <ListGroup.Item className='text-stone-700'>c. Realizar atividades que possam prejudicar a segurança ou a integridade do Cadê Meu Rango ou de outros usuários.</ListGroup.Item>
                      <ListGroup.Item className='text-stone-700'>d. Falsificar sua identidade ou informações pessoais.</ListGroup.Item>
                    </ListGroup>
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='4' className={isDarkMode ? 'bg-slate-800' : ' bg-white'}>
              <Accordion.Header>
                <FiChevronDown className={isDarkMode ? 'text-white' : ''} />
                <h1 className={isDarkMode ? 'text-white ml-3' : 'ml-3'}>Privacidade</h1>
              </Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  <ListGroup.Item>
                    4.1. Respeitamos a sua privacidade. Leia nossa <a href='privacy-policy' className='underline text-orange_primary'>Política de Privacidade</a> para entender como coletamos, usamos e protegemos suas informações pessoais.
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='5' className={isDarkMode ? 'bg-slate-800' : ' bg-white'}>
              <Accordion.Header>
                <FiChevronDown className={isDarkMode ? 'text-white' : ''} />
                <h1 className={isDarkMode ? 'text-white ml-3' : 'ml-3'}>Modificações nos Serviços</h1>
              </Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  <ListGroup.Item>
                    5.1. Reservamo-nos o direito de modificar ou encerrar qualquer aspecto do Cadê Meu Rango a qualquer momento, sem aviso prévio
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='6' className={isDarkMode ? 'bg-slate-800' : ' bg-white'}>
              <Accordion.Header>
                <FiChevronDown className={isDarkMode ? 'text-white' : ''} />
                <h1 className={isDarkMode ? 'text-white ml-3' : 'ml-3'}>Encerramento da Conta</h1>
              </Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  <ListGroup.Item>
                    6.1. Podemos encerrar ou suspender sua conta a nosso critério, se acreditarmos que você violou estes Termos de Uso.
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='7' className={isDarkMode ? 'bg-slate-800' : ' bg-white'}>
              <Accordion.Header>
                <FiChevronDown className={isDarkMode ? 'text-white' : ''} />
                <h1 className={isDarkMode ? 'text-white ml-3' : 'ml-3'}>Isenção de Responsabilidade</h1>
              </Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  <ListGroup.Item>
                    7.1. O Cadê Meu Rango é fornecido "no estado em que se encontra" e não fazemos garantias quanto à sua disponibilidade ou precisão.
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='8' className={isDarkMode ? 'bg-slate-800' : ' bg-white'}>
              <Accordion.Header>
                <FiChevronDown className={isDarkMode ? 'text-white' : ''} />
                <h1 className={isDarkMode ? 'text-white ml-3' : 'ml-3'}>Jurisdição e Lei Aplicável</h1>
              </Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  <ListGroup.Item>
                    8.1. Estes Termos de Uso são regidos pelas leis do Brasil, e qualquer disputa relacionada a eles será submetida à jurisdição dos tribunais brasileiros.
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <h1 className='text-xl text-light font-body-rb'> Ao Usar o Cadê Meu rango, você concorda com estes Termos de Uso. </h1>
          <span className='text-lg text-light font-body-rb'> Obrigado por ser parte da nossa comunidade de culinária!! </span>
        </section>
      </main>
    </div>
  )
}

export default UserTerms