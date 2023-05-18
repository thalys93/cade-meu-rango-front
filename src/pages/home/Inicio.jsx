import React from 'react'
import { Figure } from 'react-bootstrap'
import { DarkModeContext } from '../../utils/api/context/darkModeContext/DarkModeContext'

import './home.css'

function Inicio() {
    const { isDarkMode } = React.useContext(DarkModeContext)

  return (
    <section className={isDarkMode ? 'DarkSection m-2 p-3 border-3' : 'bg-body m-2 p-3 border-2'}>
        <article className='container-fluid'>
            <h3 className={isDarkMode ? 'DarkSubtitle' :'subtitle'}> Bem-vindo ao Cadê Meu Rango </h3>
            <h5 className={isDarkMode ? 'DarkRegular' :'regular'}> o seu destino online para compartilhar, categorizar e cadastrar suas receitas favoritas! <br/>
                Nosso site é um paraíso culinário projetado para entusiastas da cozinha e amantes da gastronomia. 
            </h5>
        </article>
            <hr/>
        <article className='container-fluid'>
            <h3 className={isDarkMode ? 'DarkSubtitle' : 'subtitle'}> Aqui Você Pode :</h3>
            <ul className='list-unstyled list-group'>
                <li className={isDarkMode ? 'list-group-item bg-dark border-dark' : 'list-group-item'}>
                    <p className={isDarkMode ? 'DarkTxt' : 'txt'}> <b className='enfatize'>1. Cadastrar Receitas:</b> Com nosso sistema intuitivo de cadastro de receitas, você pode facilmente compartilhar suas <b className='enfatize'>criações</b> culinárias com a comunidade. Adicione os ingredientes necessários, o passo a passo detalhado e <b className='enfatize'>fotos apetitosas</b> para tornar sua receita irresistível.</p>
                </li>
                <li className={isDarkMode ? 'list-group-item bg-dark border-dark' : 'list-group-item'}>
                    <p className={isDarkMode ? 'DarkTxt' : 'txt'}> <b className='enfatize'>2. Categorização:</b> Organize suas receitas em diversas <b className='enfatize'>categorias</b> para facilitar a navegação. Seja <b className={isDarkMode ? 'enfatize' : 'text-dark-emphasis'}>culinária internacional, pratos vegetarianos, sobremesas ou receitas saudáveis</b>, temos categorias <b className='enfatize'>abrangentes</b> para atender a todos os gostos e preferências.</p>
                </li>
                <li className={isDarkMode ? 'list-group-item bg-dark border-dark' : 'list-group-item'}>
                    <p className={isDarkMode ? 'DarkTxt' : 'txt'}> <b className='enfatize'>3. Livros de Receitas:</b> Crie e compartilhe seus próprios <b className='enfatize'>livros de receitas personalizados.</b> Organize suas receitas favoritas em um único lugar, adicione notas e comentários, e tenha acesso fácil a elas sempre que precisar. Além disso, você pode explorar os livros de receitas de outros <b className='enfatize'>usuários</b> e se inspirar em novas criações.</p>
                </li>                
            </ul>        
        </article>
                <hr/>
        <article className='container-fluid'>
            <h3 className={isDarkMode ? 'DarkSubtitle' : 'subtitle'}> Sobre Nós: </h3>
            <p className={isDarkMode ? 'DarkTxt' : 'txt'}>
                O <b className='enfatize'>Cadê Meu Rango</b> é resultado do trabalho conjunto de um grupo de Alunos dedicados e experientes, <br/>
                apaixonados por tecnologia. <br/>
                <b className='enfatize'>Conheça a equipe que desenvolveu esta plataforma:</b>
            </p>            
            <div>
                <ul className='UlRow list-group'>
                <li>
                    <Figure>
                        <a href='https://github.com/pedrohkunz' target='_blank'>
                        <Figure.Image                
                            id='githubImg'       
                            className='rounded-circle'
                            src="https://avatars.githubusercontent.com/u/56512310?v=4"
                            />
                        </a>
                        <Figure.Caption>
                            <h5 className={isDarkMode ? 'DarkTxt' : 'txt'}> Pedro </h5>
                            <span className={isDarkMode ? 'DarkTxt' : ''}> Back End (java)</span>
                        </Figure.Caption>
                    </Figure>                                    
                </li>

                <li>
                    <Figure>
                        <a href='https://github.com/Maathias01' target='_blank'>
                        <Figure.Image
                            id='githubImg'
                            className='rounded-circle'
                            src="https://avatars.githubusercontent.com/u/105599144?v=4"
                            />
                        </a>
                        <Figure.Caption>
                            <h5 className={isDarkMode ? 'DarkTxt' : 'txt'}> Mathias </h5>
                            <span className={isDarkMode ? 'DarkTxt' : ''}> Back End (java)</span>
                        </Figure.Caption>
                    </Figure>
                </li>

                <li>
                    <Figure>
                        <a href='https://github.com/nathazz' target='_blank'>
                        <Figure.Image
                            id='githubImg'
                            className='rounded-circle'
                            src="https://avatars.githubusercontent.com/u/105741461?v=4"
                            />
                        </a>
                        <Figure.Caption>
                            <h5 className={isDarkMode ? 'DarkTxt' : 'txt'}> Nathan </h5>
                            <span className={isDarkMode ? 'DarkTxt' : ''}> Front End (react) </span>
                        </Figure.Caption>
                    </Figure>
                </li>

                <li>
                    <Figure>
                        <a href='https://github.com/thalys93' target='_blank'>
                        <Figure.Image
                            id='githubImg'
                            className='rounded-circle'
                            src="https://avatars.githubusercontent.com/u/102838847?s=400&u=06a81f298e6379f9d246d1ba76fd88ad0294738d&v=4"
                            />
                        </a>
                        <Figure.Caption>
                            <h5 className={isDarkMode ? 'DarkTxt' : 'txt'}> Thalys </h5>
                            <span className={isDarkMode ? 'DarkTxt' : ''} > Front End (react)</span>
                        </Figure.Caption>
                    </Figure>
                </li>

                </ul>
            </div>            
        </article>

    </section>
  )
}

export default Inicio