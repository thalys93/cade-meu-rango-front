//Libs
import React from 'react';
import { Helmet } from 'react-helmet';
import { BsPencilFill } from 'react-icons/bs';


//Utils
import { DarkModeContext } from '../../utils/context/DarkModeContext';
import { UserAutenticatedContext } from '../../utils/context/UserContext';
import { TipUtils } from '../../utils/TipUtils.js'


//Components
import DicasCard from './container/DicasCard'
import DicasCardPlaceholder from './placeholder/DicasCardPlaceholder'
import DicasCardPlaceholderError from './placeholder/DicasCardError'

//CSS
import './tips.css'

function Dicas() {
  const { isDarkMode } = React.useContext(DarkModeContext);
  const { isUserAutenticated } = React.useContext(UserAutenticatedContext);

  const { 
    cardTips,
    cardTipDate,
    blankCard, 
    selectedCard,
    setSelectedCard,
    atualizarDica,
    deletarDica,
    carregou, 
    falha, 
    contador,    
    timeOut} = TipUtils();

  if(!carregou) {
    return  (
      <section className={isDarkMode ? 'DarkSection p-3 mb-5 container-fluid' : 'bg-body p-3 mb-5 container-fluid'}>
        <Helmet>
          <title> Carregando Dicas.. </title>
        </Helmet>
        <h3 className={isDarkMode ? 'DarkSubtitle text-center' : 'subtitle text-center'} id='Title'> Aguarde, Carregando as Dicas que preparamos para você hoje! </h3>
        <div className="overflow-y-auto overflow-x-hidden" id='listOverflow'>
          <ol className='list-group container break-line-list-Blank'>
            {blankCard.map((index) => (
              <div key={index}>
                <li className="animate__animated animate__fadeIn" key={index}>
                  <DicasCardPlaceholder/>
                  </li>
                  </div>
                  ))}
                  </ol>
                  </div>
                </section>    
      ) 
    } else if (falha) {    
      return(                                    
        <section className={isDarkMode ? 'DarkSection p-3 mb-5 container-fluid' : 'bg-body p-3 mb-5 container-fluid'}>
        <Helmet>
          <title> Erro Interno </title>
        </Helmet>
        <h3 className={isDarkMode ? 'DarkSubtitle text-center' : 'subtitle text-center'} id='Title'> Atenção Erro Interno!! </h3>
        <div className="overflow-y-auto overflow-x-hidden" id='listOverflow'>
          <ol className='list-group container break-line-list-Blank'>
            {blankCard.map((index) => (
              <div key={index}>
                <li className="animate__animated animate__fadeIn" key={index}>
                  <DicasCardPlaceholderError/>
                  </li>
                  </div>
                  ))}
                  </ol>
                  </div>
                </section>
      )
      } else if (timeOut) {
        return (
                <section className={isDarkMode ? 'DarkSection p-3 mb-5 container-fluid' : 'bg-body p-3 mb-5 container-fluid'}>
        <Helmet>
          <title> Carregando Dicas.. </title>
        </Helmet>
        <h3 className={isDarkMode ? 'DarkSubtitle text-center' : 'subtitle text-center'} id='Title'> A Api Demorou Demais Para Carregar, <br/> <span className={isDarkMode? 'DarkTxt text-secondary text-center' : 'txt text-secondary text-center'}>Tente Novamente mais Tarde!</span> </h3>
        <div className="overflow-y-auto overflow-x-hidden" id='listOverflow'>
          <ol className='list-group container break-line-list-Blank'>
            {blankCard.map((index) => (
              <div key={index}>
                <li className="animate__animated animate__fadeIn" key={index}>
                  <DicasCardPlaceholderError/>
                  </li>
                  </div>
                  ))}
                  </ol>
                  </div>
                </section>  
        )
      } else {
  return (    
      <section className={isDarkMode ? 'DarkSection p-3 mb-5 container-fluid' : 'bg-body p-3 mb-5 container-fluid'}>
        <Helmet>
          <title>Cadê Meu Rango - Dicas</title>
        </Helmet>
          <h3 className={isDarkMode? 'DarkSubtitle text-center' : 'subtitle txt'} id='Title'> Veja as Dicas que Preparamos Para você Hoje</h3>
          <div className="overflow-y-auto overflow-x-hidden" id='listOverflow'>
            <ol className='list-group list-group-horizontal gap-4 container break-line-list'>
              {cardTips.map((Card, i) => ( 
                contador > i ? (                
              <li className='mt-5' key={i}>
                <div className='editBtn'>
                  <button className={isDarkMode? 'btn btn-primary' : 'btn btn-warning'} onClick={() => setSelectedCard(Card.id)} disabled={selectedCard === Card.id}> <BsPencilFill/> </button>
                </div>                
                <DicasCard
                  id={Card.id}
                  title={Card.titulo}
                  descricao={Card.descricao}
                  cardData={cardTipDate[i]}
                  cardSelecionado={selectedCard === Card.id}
                  deletarDica={deletarDica === Card.id}
                  onUpdateCard={atualizarDica === Card.id}
                />
              </li>   
                ) : null            
              ))}
            </ol>
          </div>
      </section>    
  )
}

}

export default Dicas;