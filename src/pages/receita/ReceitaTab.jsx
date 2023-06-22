// Libs
import React from 'react'
import { ProgressBar } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { CgDanger } from 'react-icons/cg'
import { Helmet } from 'react-helmet';



// Utils
import { DarkModeContext } from '../../utils/context/DarkModeContext'
import { TabUtils } from '../../utils/ReceitaTabUtils';
import { UserAutenticatedContext } from '../../utils/context/UserContext';

// Componente
import ReceitaCard from './ReceitaCard'
import CardPlaceholder from './placeholder/CardPlaceholder'
import CardPlaceholderError from './placeholder/CardPlaceholderErr'


// CSS
import '../home/home.css'
import { Link } from 'react-router-dom';

function ReceitaTab() {  
  // Dark Mode Context
  const { isDarkMode } = React.useContext(DarkModeContext)
  const { isLogged } = React.useContext(UserAutenticatedContext)
    
  // Hook de Estado e Carregamento
  const {cardReceitas, falha, carregou, timeOut, contador, progressBar, blankCard} = TabUtils();

  // Caso A API Não Carregue
  if(!carregou) {
    return (
<section className={isDarkMode ? 'DarkSection p-3 mb-5 container-fluid' : 'bg-body p-3 mb-5 container-fluid'} id='receitaBorder'>
            <Helmet>
              <title> Carregando Receitas.. </title>
            </Helmet>
        <h3 className={isDarkMode ? 'DarkSubtitle text-center' : 'subtitle text-center'} id='Title'> Aguarde, Carregando as Receitas que preparamos para você hoje! </h3>
        <div className="overflow-y-auto overflow-x-hidden" id='listOverflow'>
            <ol className='list-group container break-line-list-Blank'>
              {blankCard.map((index) => (
                <div key={index}>
                <li className="animate__animated animate__fadeIn" key={index}>
                  <CardPlaceholder/>
                </li>
              </div> 
              ))}                            
            </ol>            
        </div>
          <div className='mt-4 user-select-none'>
            <h2 className={isDarkMode? 'list-group-item bg-warning text-center border-0 txt' : 'list-group-item bg-warning text-center border-0 txt'}> Carregando API </h2>
            <ProgressBar animated  now={progressBar} variant='warning'/>
          </div>
    </section>
    ) 
    } else if (falha) {
    return (
    <section className={isDarkMode ? 'DarkSection p-3 mb-5 container-fluid' : 'bg-body p-3 mb-5 container-fluid'} id='receitaBorder'>
            <Helmet>
              <title> Cadê Meu Rango - Falha Interna </title>
            </Helmet>
          <h3 className={isDarkMode ? 'DarkSubtitle text-center' : 'subtitle text-center'} id='Title'> Error </h3>
          <div className="overflow-y-auto overflow-x-hidden" id='listOverflow'>
              <ol className='list-group container break-line-list-Blank'>
                {blankCard.map((index) => (
                <li className="animate__animated animate__fadeIn" key={index}>
                  <CardPlaceholderError/>
                </li>              
              ))}
              </ol>
          </div>
          <div className='mt-4 user-select-none'>
            <h2 className={isDarkMode? 'list-group-item bg-danger text-center border-0 DarkTxt' : 'list-group-item bg-danger text-center border-0 DarkTxt'}> Falha na API (500) </h2>
            <ProgressBar animated  now={progressBar} variant='danger'/>
          </div>
      </section>
      )
    } else if (timeOut) {
      return (
        <section className={isDarkMode ? 'DarkSection p-3 mb-5 container-fluid' : 'bg-body p-3 mb-5 container-fluid'} id='receitaBorder'>
            <Helmet>
              <title> Cadê Meu Rango - Timeout </title>
            </Helmet>
          <h3 className={isDarkMode ? 'DarkSubtitle text-center' : 'subtitle text-center'} id='Title'> Veja as receitas que preparamos para você hoje! </h3>
          <div className="overflow-y-auto overflow-x-hidden" id='listOverflow'>
              <ol className='list-group container break-line-list-Blank'>
                {blankCard.map((index) => (
                <li className="animate__animated animate__fadeIn" key={index}>
                  <CardPlaceholderError/>
                </li>              
              ))}
              </ol>
          </div>
          <div className='mt-5 user-select-none'>
            <h2 className={isDarkMode? 'list-group-item bg-danger text-center border-0 DarkTxt' : 'list-group-item bg-danger text-center border-0 DarkTxt'}> Falha na API (timeout) </h2>
            <ProgressBar animated  now={progressBar} variant='secondary'/>
          </div>
      </section>
      )
    } else {
  return (
      <section className={isDarkMode ? 'DarkSection p-3 mb-5 container-fluid' : 'bg-body p-3 mb-5 container-fluid'} id='receitaBorder'>
          <Helmet>
            <title> Cadê Meu Rango - Receitas </title>
          </Helmet>
        <h3 className={isDarkMode ? 'DarkSubtitle text-center text-decoration-none' : 'subtitle text-center text-decoration-none'} id='Title'> Veja as receitas que preparamos para você hoje! </h3>
          <div className="overflow-y-auto overflow-x-hidden" id='listOverflow'>
            <ol className='list-group list-group-horizontal gap-4 container break-line-list' id='recipesList'>                
                {cardReceitas.length > 0 ? (
                  cardReceitas.map((card, index) => (    
                  contador > index ? (
                    <li key={index} className="animate__animated animate__fadeIn">
                      <ReceitaCard
                      id={card._id}
                      key={card}
                      title={card.titulo}
                      namespace={card.namespace}
                      imgLink={card.image}/>
                    </li>
                  ) : (                
                    null
                  )
                  ))
                ) : (
                  <div>
                    <Link to='/receita/adicionar_receita'>
                    <button hidden={!isLogged} className={isDarkMode ? 'btn btn-success DarkTxt' : 'btn btn-primary DarkTxt'}>
                        <AiOutlinePlusCircle/> Adicionar Receita
                    </button>
                    </Link>                     
                    <h2 hidden={isLogged} className={isDarkMode ? 'DarkTxt text-warning' : 'txt text-danger'}>  Receitas Não Encontradas <CgDanger className='mb-1'/> </h2>
                  </div>
                )}                                  
            </ol>
          </div>
      </section>
    )
  }
}

export default ReceitaTab