import React, { useContext } from 'react'
import { Accordion, Figure } from 'react-bootstrap'
import { DarkModeContext } from '../../utils/context/DarkModeContext'
import '../components/custom/accordion.css'

function Home() {

  const {isDarkMode} = useContext(DarkModeContext)



  return (
    <section className={isDarkMode? 'bg-slate-700 text-white font-body-rb rounded-b-xl' : 'bg-white font-body-rb rounded-b-xl'}>      
        <article className='container-fluid'> 
          <h3 className='text-xl pb-2 pt-2 select-none'> Bem-vindos ao Cadê Meu Rango!! </h3>          
          <p className='font-light'> O Seu destino online para compartilhar, categorizar e cadastrar suas receitas favoritas! <br />
            Nosso site é um paraíso culinário projetado para entusiastas da cozinha e amantes da gastronomia.
          </p> 
            <br/>
          <p className='font-light'>
          Estamos constantemente aprimorando a plataforma e adicionando novas funcionalidades e melhorias para tornar a sua experiência ainda mais incrível! Fique ligado para descobrir todas as novidades que preparamos para você.
          </p>
        </article>

        <article className="container-fluid">
          <h3 className='text-xl pb-2 pt-3 font-light'> Aqui você Pode: </h3>          
          {SiteInstructions()}
        </article>

        <article className="container-fluid">
          <h3 className='text-xl pb-2 pt-3 font-light '> Sobre mim: </h3>
          {/* <p className='font-body-rb  font-light'>
            <b className='text-orange_primary font-body-rb'> O Cadê Meu Rango </b> é Resultado do trabalho conjunto de um grupo de alunos dedicados e experientes, <br/>
            Apaixonados por Tecnologia.
          </p> */}
            {/* <br/> */}
          <p className='font-light'>
            Sou um desenvolvedor apaixonado por tecnologia e um aspirante em gastronomia. Meu objetivo é criar uma comunidade online para compartilhar receitas e dicas culinárias. Seja você um chef amador ou um cozinheiro experiente, meu site é o lugar perfeito para você. <br/>
            <b className='text-orange_primary font-body-rb underline underline-offset-8'>
              Meu github:
            </b>
          </p>

          {DevelopersList()}

        </article>
    </section>
  )

  function DevelopersList() {
    return <ul className='p-4 flex gap-5 select-none'>
      <li className='hover:scale-105 transition-all'>
        <Figure>
          <a href='https://github.com/thalys93' target='_blank'>
            <Figure.Image
              width={100}
              height={100}
              alt="githubUser"
              src="https://avatars.githubusercontent.com/u/102838847?s=400&u=06a81f298e6379f9d246d1ba76fd88ad0294738d&v=4"
              roundedCircle />
          </a>
          <Figure.Caption className='text-center font-body-rb '>
            <h5 className='text-orange_primary font-bold'>Thalys</h5>
            <span className={isDarkMode? 'text-white' : 'text-slate-900 '}> Full-Stack Dev</span>
          </Figure.Caption>
        </Figure>
      </li>
    </ul>
  }

  function SiteInstructions() {
    return (      
    <Accordion flush alwaysOpen>
      <Accordion.Item eventKey="0" className={isDarkMode? 'bg-slate-800' : ' bg-transparent'}>
        <Accordion.Header> <span className={isDarkMode? 'text-white' : ''}>1. Cadastrar Receitas:</span></Accordion.Header>
        <Accordion.Body>
          <p className={isDarkMode? 'font-light text-white' : 'font-light'}>
            Com nosso sistema intuitivo de cadastro de receitas, você pode facilmente compartilhar suas
            <b className={isDarkMode? 'text-orange_primary' : 'text-orange_secondary'}> criações</b> culinárias com a comunidade.
            Adicione os ingredientes necessários, o passo a passo detalhado e
            <b className={isDarkMode? 'text-orange_primary' : 'text-orange_secondary'}> fotos apetitosas</b> para tornar sua receita irresistível.</p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" className={isDarkMode? 'bg-slate-800' : ' bg-transparent'}>
        <Accordion.Header><span className={isDarkMode? 'text-white' : ''}>2. Categorização:</span></Accordion.Header>
        <Accordion.Body>
            <p className={isDarkMode? 'font-light text-white' : 'font-light'}>
            <b className={isDarkMode? 'text-orange_primary' : 'text-orange_secondary'}> Organize suas receitas em diversas</b> <b className={isDarkMode? 'text-orange_primary' : 'text-orange_secondary'}>categorias</b> para facilitar a navegação.
            Seja <b className={isDarkMode? 'text-orange_primary' : 'text-orange_secondary'}>culinária internacional,
              pratos vegetarianos, sobremesas ou receitas saudáveis</b>,
            temos categorias
            <b className={isDarkMode? 'text-orange_primary' : 'text-orange_secondary'}>abrangentes</b> para atender a todos os gostos e preferências.
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey='3' className={isDarkMode? 'bg-slate-800' : ' bg-transparent'}>
        <Accordion.Header><span className={isDarkMode? 'text-white' : ''}>3. Dicas de Receitas</span> </Accordion.Header>
        <Accordion.Body>
            <p className={isDarkMode? 'font-light text-white' : 'font-light'}>
            Agora, você pode <b className={isDarkMode? 'text-orange_primary' : 'text-orange_secondary'}>criar e compartilhar suas dicas culinárias exclusivas com a comunidade gastronômica.</b>
            Compartilhe seus truques, segredos e técnicas especiais para aprimorar qualquer prato.
            Inspire outros amantes da comida,
            aprenda com os <b className={isDarkMode? 'text-orange_primary' : 'text-orange_secondary'}>melhores chefs amadores</b> e construa uma coleção de dicas que transformarão suas experiências na cozinha.
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>    
    )
  }
}

export default Home