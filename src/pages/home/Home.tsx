import React from 'react'
import { Accordion, Figure } from 'react-bootstrap'

function Home() {


  return (
    <section className='bg-light_primary font-body-rb rounded-b-xl'>      
        <article className='container-fluid'> 
          <h3 className='text-3xl pb-2 pt-2'> Bem-vindos ao Cadê Meu Rango </h3>          
          <h5 className='text-xl font-light'> o seu destino online para compartilhar, categorizar e cadastrar suas receitas favoritas! <br />
            Nosso site é um paraíso culinário projetado para entusiastas da cozinha e amantes da gastronomia.
          </h5>      
        </article>

        <article className="container-fluid">
          <h3 className='text-3xl pb-2 pt-3 font-light underline underline-offset-8'> Aqui você Pode: </h3>          
          {SiteInstructions()}
        </article>

        <article className="container-fluid">
          <h3 className='text-3xl pb-2 pt-3 font-light underline underline-offset-8'> Sobre Nós: </h3>
          <p className='text-xl font-light'>
            Somos uma equipe de desenvolvedores apaixonados por tecnologia e aspirantes em gastronomia.
            Nosso objetivo é criar uma comunidade online para compartilhar receitas e dicas culinárias.
            Seja você um chef amador ou um cozinheiro experiente, nosso site é o lugar perfeito para você. <br/>
            <b className='text-orange_secondary font-body-rb'>
              Conheça a equipe que desenvolveu está plataforma:
            </b>
          </p>

          <ul className='p-4 flex gap-5 select-none'>
            <li className='hover:scale-105 transition-all'>
              <Figure>
                <a href='https://github.com/thalys93' target='_blank'>
                <Figure.Image
                  width={100}
                  height={100}
                  alt="githubUser"
                  src="https://avatars.githubusercontent.com/u/102838847?s=400&u=06a81f298e6379f9d246d1ba76fd88ad0294738d&v=4"
                  roundedCircle
                />
              </a>
                <Figure.Caption className='text-center font-body-rb text-orange_primary font-bold'>
                  <h5>Thalys</h5>
                  <span> Full-Stack Dev</span>
                </Figure.Caption>
              </Figure>
            </li>
          <li className='hover:scale-105 transition-all'>
            <Figure>
              <a href='https://github.com/pedrohkunz' target='_blank'>
                <Figure.Image
                  width={100}
                  height={100}
                  alt="githubUser"
                  src="https://avatars.githubusercontent.com/u/56512310?v=4"
                  roundedCircle
                />
              </a>
              <Figure.Caption className='text-center font-body-rb text-orange_primary font-bold'>
                <h5>Pedro</h5>
                <span>Back-End Dev</span>
              </Figure.Caption>
            </Figure>
          </li>
          <li className='hover:scale-105 transition-all'>
            <Figure>
              <a href='https://github.com/Maathias01' target='_blank'>
                <Figure.Image
                  width={100}
                  height={100}
                  alt="githubUser"
                  src="https://avatars.githubusercontent.com/u/105599144?v=4"
                  roundedCircle
                />
              </a>
              <Figure.Caption className='text-center font-body-rb text-orange_primary font-bold'>
                <h5>Mathias</h5>
                <span>Back-End Dev</span>
              </Figure.Caption>
            </Figure>
          </li>
          <li className='hover:scale-105 transition-all'>
            <Figure>
              <a href='https://github.com/nathazz' target='_blank'>
                <Figure.Image
                  width={100}
                  height={100}
                  alt="githubUser"
                  src="https://avatars.githubusercontent.com/u/105741461?v=4"
                  roundedCircle
                />
              </a>
              <Figure.Caption className='text-center font-body-rb text-orange_primary font-bold'>
                <h5>Nathan</h5>
                <span>Front-End Dev</span>
              </Figure.Caption>
            </Figure>
          </li>
          </ul>

        </article>
    </section>
  )

  function SiteInstructions() {


    return (
    <Accordion flush alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header> 1. Cadastrar Receitas:</Accordion.Header>
        <Accordion.Body>
          <p className='font-light'>
            Com nosso sistema intuitivo de cadastro de receitas, você pode facilmente compartilhar suas
            <b className='text-orange_secondary'> criações</b> culinárias com a comunidade.
            Adicione os ingredientes necessários, o passo a passo detalhado e
            <b className='text-orange_secondary'> fotos apetitosas</b> para tornar sua receita irresistível.</p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header> 2. Categorização:</Accordion.Header>
        <Accordion.Body>
            <p className='font-light'>
            <b className='text-orange_secondary'> Organize suas receitas em diversas</b> <b className='text-orange_secondary'>categorias</b> para facilitar a navegação.
            Seja <b className='text-orange_secondary'>culinária internacional,
              pratos vegetarianos, sobremesas ou receitas saudáveis</b>,
            temos categorias
            <b className='text-orange_secondary'>abrangentes</b> para atender a todos os gostos e preferências.
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey='3'>
        <Accordion.Header> 3. Dicas de Receitas </Accordion.Header>
        <Accordion.Body>
            <p className='font-light'>
            Agora, você pode <b className='text-orange_secondary'>criar e compartilhar suas dicas culinárias exclusivas com a comunidade gastronômica.</b>
            Compartilhe seus truques, segredos e técnicas especiais para aprimorar qualquer prato.
            Inspire outros amantes da comida,
            aprenda com os <b className='text-orange_secondary'>melhores chefs amadores</b> e construa uma coleção de dicas que transformarão suas experiências na cozinha.
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    )
  }
}

export default Home