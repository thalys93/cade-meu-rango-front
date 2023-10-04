import React, { useContext } from 'react'
import { Accordion, Card, ListGroup } from 'react-bootstrap'
import { FiChevronDown } from 'react-icons/fi'
import DarkModeComponent from '../components/DarkModeComponent'
import BackComponent from '../components/BackComponent'
import { DarkModeContext } from '../../utils/context/DarkModeContext'

function PrivacyTerms() {
    const { isDarkMode } = useContext(DarkModeContext)

    const date = new Date().toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    return (
        <div className={isDarkMode ? 'bg-slate-700 min-h-screen' : "bg-orange_primary min-h-screen"}>

            <div className='absolute right-5 mr-5 darkModeComponentProps'>
                <DarkModeComponent />
            </div>
            <div className='absolute left-1 m-3 text-white backButtonHidden'>
                <BackComponent />
            </div>

            <header className="container mx-auto p-4">
                <h1 className="text-3xl text-white font-title-sy select-none">Política de Privacidade - Cadê Meu Rango</h1>
            </header>
            <main className="container mx-auto p-4">
                <section>
                    <Card className={isDarkMode? 'bg-slate-800 text-white border-white' : '' }>
                    <Card.Header className='border'><h2> Ultima Atualização : <span> {date} </span></h2></Card.Header>
                    <Card.Body>
                    <p>
                        O Cadê Meu Rango ("nós", "nosso", "a equipe") respeita sua privacidade e está comprometido em proteger suas informações pessoais. Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações quando você usa nosso aplicativo ou site ("Serviços"). Ao usar os Serviços, você concorda com os termos desta política.
                    </p>
                    </Card.Body>
                    </Card>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey='1' className={isDarkMode ? 'bg-slate-800' : ' bg-white'}>
                            <Accordion.Header>
                                <FiChevronDown className={isDarkMode ? 'text-white' : ''} />
                                <h1 className={isDarkMode ? 'text-white ml-3' : 'ml-3'}>Informações que Coletamos</h1>
                            </Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    <ListGroup.Item>
                                        1.1. <b>Informações de Registro:</b> Quando você cria uma conta, podemos coletar seu nome, endereço de e-mail, senha e outras informações de registro.
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        1.2. <b>Informações de Perfil:</b> Você pode escolher fornecer informações adicionais em seu perfil, como uma foto de perfil, localização e outras informações pessoais.
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        1.3. <b>Conteúdo de Usuário:</b> Quando você envia receitas, dicas culinárias ou outro conteúdo para o Cadê Meu Rango, coletamos e armazenamos esse conteúdo.
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        1.4. <b>Informações de Uso:</b> Coletamos informações sobre como você utiliza os Serviços, incluindo as receitas que você visualiza e as interações com outros usuários.
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        1.4. <b>Informações de Uso:</b> Coletamos informações sobre como você utiliza os Serviços, incluindo as receitas que você visualiza e as interações com outros usuários.
                                    </ListGroup.Item>
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey='2' className={isDarkMode ? 'bg-slate-800' : ' bg-white'}>
                            <Accordion.Header>
                                <FiChevronDown className={isDarkMode ? 'text-white' : ''} />
                                <h1 className={isDarkMode ? 'text-white ml-3' : 'ml-3'}>Como Usamos Suas Informações</h1>
                            </Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    <ListGroup.Item>
                                        2.1. <b>Fornecimento e Melhoria dos Serviços:</b> Utilizamos suas informações para fornecer, manter e melhorar nossos Serviços, personalizando sua experiência e desenvolvendo novos recursos.
                                    </ListGroup.Item>                                        
                                    <ListGroup.Item>
                                        2.2. <b>Comunicação:</b> Podemos usar seu endereço de e-mail para enviar atualizações sobre o Cadê Meu Rango, como notificações sobre novas receitas, dicas culinárias ou informações importantes.
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        2.3. <b>Segurança e Proteção:</b> Usamos suas informações para proteger nossos Serviços e a comunidade de usuários, incluindo a detecção e prevenção de atividades fraudulentas ou abusivas.
                                    </ListGroup.Item>
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey='3' className={isDarkMode ? 'bg-slate-800' : ' bg-white'}>
                            <Accordion.Header>
                                <FiChevronDown className={isDarkMode ? 'text-white' : ''} />
                                <h1 className={isDarkMode ? 'text-white ml-3' : 'ml-3'}>Compartilhamento de Informações</h1>
                            </Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    <ListGroup.Item>
                                        3.1. <b>Compartilhamento com Terceiros:</b> Não compartilharemos suas informações pessoais com terceiros sem seu consentimento, exceto quando exigido por lei ou para proteger nossos interesses legais.
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        3.1. <b>Compartilhamento com Terceiros:</b> Não compartilharemos suas informações pessoais com terceiros sem seu consentimento, exceto quando exigido por lei ou para proteger nossos interesses legais.
                                    </ListGroup.Item>
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey='4' className={isDarkMode ? 'bg-slate-800' : ' bg-white'}>
                            <Accordion.Header>
                                <FiChevronDown className={isDarkMode ? 'text-white' : ''} />
                                <h1 className={isDarkMode ? 'text-white ml-3' : 'ml-3'}>Suas Escolhas</h1>
                            </Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    <ListGroup.Item>
                                        4.1. <b>Configurações de Privacidade:</b> Você pode controlar suas configurações de privacidade nas opções da sua conta para escolher quem pode ver suas informações e atividades.                                 
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        4.2. <b>Exclusão de Conta:</b> Você pode excluir sua conta a qualquer momento, entrando em contato conosco.
                                    </ListGroup.Item>
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey='5' className={isDarkMode ? 'bg-slate-800' : ' bg-white'}>
                            <Accordion.Header>
                                <FiChevronDown className={isDarkMode ? 'text-white' : ''} />
                                <h1 className={isDarkMode ? 'text-white ml-3' : 'ml-3'}>Segurança de Dados</h1>
                            </Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    <ListGroup.Item>
                                        5.1. Levamos a segurança dos seus dados a sério e implementamos medidas para proteger suas informações contra acesso não autorizado, alteração ou destruição.
                                    </ListGroup.Item>
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey='6' className={isDarkMode ? 'bg-slate-800' : ' bg-white'}>
                            <Accordion.Header>
                                <FiChevronDown className={isDarkMode ? 'text-white' : ''} />
                                <h1 className={isDarkMode ? 'text-white ml-3' : 'ml-3'}>Alterações nesta Política de Privacidade</h1>
                            </Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    <ListGroup.Item>
                                        6.1. Podemos atualizar esta Política de Privacidade ocasionalmente. A versão mais recente estará sempre disponível em nossos Serviços, e a data da última atualização será indicada no topo do documento.
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

export default PrivacyTerms