import React from 'react'
import { DarkModeContext } from '../../utils/api/context/darkModeContext/DarkModeContext'
import { ProgressBar } from 'react-bootstrap';
import { TabUtils } from '../../utils/ReceitaTabUtils';
import ReceitaCard from './ReceitaCard'

import '../home/home.css'

function ReceitaTab() {  
  // Dark Mode Context
  const { isDarkMode } = React.useContext(DarkModeContext)
    
  // Hook de Estado e Carregamento
  const {cardReceitas, falha, carregou, timeOut, contador, progressBar} = TabUtils();

  // Caso A API Não Carregue
  if(!carregou) {
    return (
<section className={isDarkMode ? 'DarkSection p-3 mb-5 container-fluid' : 'bg-body p-3 mb-5 container-fluid'} id='receitaBorder'>
        <h3 className={isDarkMode ? 'DarkSubtitle text-center' : 'subtitle text-center'} id='Title'> Veja as receitas que preparamos para você hoje! </h3>
        <div className="overflow-y-auto overflow-x-hidden" id='listOverflow'>
            <ol className='list-group container break-line-list'>
              <li className="animate__animated animate__fadeIn">
                <h2 className={isDarkMode? 'list-group-item bg-warning text-center border-0 txt' : 'list-group-item bg-warning text-center border-0 txt'}> Carregando API </h2>
                <ProgressBar animated  now={progressBar} variant='warning'/>
              </li>              
            </ol>
        </div>
    </section>
    ) 
    } else if (falha) {
    return (
    <section className={isDarkMode ? 'DarkSection p-3 mb-5 container-fluid' : 'bg-body p-3 mb-5 container-fluid'} id='receitaBorder'>
          <h3 className={isDarkMode ? 'DarkSubtitle text-center' : 'subtitle text-center'} id='Title'> Veja as receitas que preparamos para você hoje! </h3>
          <div className="overflow-y-auto overflow-x-hidden" id='listOverflow'>
              <ol className='list-group container break-line-list'>              
                <li className="animate__animated animate__fadeIn">
                  <h2 className={isDarkMode? 'list-group-item bg-danger text-center border-0 DarkTxt' : 'list-group-item bg-danger text-center border-0 DarkTxt'}> Falha na API (500) </h2>
                  <ProgressBar animated  now={progressBar} variant='danger'/>
                </li>              
              </ol>
          </div>
      </section>
      )
    } else if (timeOut) {
      return (
        <section className={isDarkMode ? 'DarkSection p-3 mb-5 container-fluid' : 'bg-body p-3 mb-5 container-fluid'} id='receitaBorder'>
          <h3 className={isDarkMode ? 'DarkSubtitle text-center' : 'subtitle text-center'} id='Title'> Veja as receitas que preparamos para você hoje! </h3>
          <div className="overflow-y-auto overflow-x-hidden" id='listOverflow'>
              <ol className='list-group container break-line-list'>              
                <li className="animate__animated animate__fadeIn">
                  <h2 className={isDarkMode? 'list-group-item bg-danger text-center border-0 DarkTxt' : 'list-group-item bg-danger text-center border-0 DarkTxt'}> Falha na API (timeout) </h2>
                  <ProgressBar animated  now={progressBar} variant='secondary'/>
                </li>              
              </ol>
          </div>
      </section>
      )
    } else {
  return (
      <section className={isDarkMode ? 'DarkSection p-3 mb-5 container-fluid' : 'bg-body p-3 mb-5 container-fluid'} id='receitaBorder'>
        <h3 className={isDarkMode ? 'DarkSubtitle text-center text-decoration-none' : 'subtitle text-center text-decoration-none'} id='Title'> Veja as receitas que preparamos para você hoje! </h3>
          <div className="overflow-y-auto overflow-x-hidden" id='listOverflow'>
            <ol className='list-group list-group-horizontal gap-4 container break-line-list' id='recipesList'>
                
                {cardReceitas.map((card, index) => (    
                contador > index ? (                  
                  <div>                   
                <li key={index} className="animate__animated animate__fadeIn">
                    <ReceitaCard
                    id={card.id}
                    key={card}
                    title={card.titulo}
                    imgLink={card.imagem}/>
                  </li>
                </div>                                                           
                ) : null                

              ))}                    
            </ol>
          </div>
      </section>
    )
  }
}

export default ReceitaTab