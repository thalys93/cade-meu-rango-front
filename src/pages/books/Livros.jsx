//Libs
import React from 'react';
import { Helmet } from 'react-helmet';
import { BsPencilFill } from 'react-icons/bs';

//Utils
import { DarkModeContext } from '../../utils/context/DarkModeContext';
import { DeveLoperContext } from '../../utils/context/DevContext';
import { LivrosUtils } from '../../utils/LivrosUtils';


//Components
import LivrosCardPlaceholder from './placeholder/LivrosCardPlaceholder'
import LivrosCardPlaceholderError from './placeholder/LivrosCardError'
import LivrosCard from './container/LivrosCard'

//CSS

function Livros() {
  const { isDarkMode } = React.useContext(DarkModeContext);
  const { isDev } = React.useContext(DeveLoperContext);

  const {
    timeOut,
    BookCard,
    blankCard,
    selectedCard,
    carregou,
    falha,
    contador,
    setSelectedCard,
    } = LivrosUtils();


  if(!carregou) {
    return  (
      <section className={isDarkMode ? 'DarkSection p-3 mb-5 container-fluid' : 'bg-body p-3 mb-5 container-fluid'}>
        <h3 className={isDarkMode ? 'DarkSubtitle text-center' : 'subtitle text-center'} id='Title'> Aguarde, Carregando os Livros que preparamos para você hoje! </h3>
        <div className="overflow-y-auto overflow-x-hidden" id='listOverflow'>
          <ol className='list-group container break-line-list-Blank'>
            {blankCard.map((index) => (
              <div key={index}>
                <li className="animate__animated animate__fadeIn" key={index}>
                  <LivrosCardPlaceholder/>
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
        <h3 className={isDarkMode ? 'DarkSubtitle text-center' : 'subtitle text-center'} id='Title'> Atenção Erro Interno!! </h3>
        <div className="overflow-y-auto overflow-x-hidden" id='listOverflow'>
          <ol className='list-group container break-line-list-Blank'>
            {blankCard.map((index) => (
              <div key={index}>
                <li className="animate__animated animate__fadeIn" key={index}>
                  <LivrosCardPlaceholderError/>
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
        <h3 className={isDarkMode ? 'DarkSubtitle text-center' : 'subtitle text-center'} id='Title'> A Api Demorou Demais Para Carregar, <br/> <span className={isDarkMode? 'DarkTxt text-secondary text-center' : 'txt text-secondary text-center'}>Tente Novamente mais Tarde!</span> </h3>
        <div className="overflow-y-auto overflow-x-hidden" id='listOverflow'>
          <ol className='list-group container break-line-list-Blank'>
            {blankCard.map((index) => (
              <div key={index}>
                <li className="animate__animated animate__fadeIn" key={index}>
                  <LivrosCardPlaceholderError/>
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
          <h3 className={isDarkMode? 'DarkSubtitle text-center' : 'subtitle txt text-center'} id='Title'> Veja os Livros que Preparamos Para você Hoje</h3>
          <div className="overflow-y-auto overflow-x-hidden" id='listOverflow'>
            <ol className='list-group list-group-horizontal gap-4 container break-line-list'>
              {BookCard.map((Livro, i) => ( 
                contador > i ? (                
              <li className='mt-5' key={i}>
                <div hidden={!isDev}  className='editBtn'>
                  <button 
                  className={isDarkMode? 'btn btn-primary' : 'btn btn-warning'} 
                  onClick={() => setSelectedCard(Card.id)} 
                  disabled={selectedCard === Livro.id}> <BsPencilFill/> </button>
                </div>
                <LivrosCard
                  id={Livro.id}
                  title={Livro.titulo}
                  descricao={Livro.descricao}
                  image={Livro.image}
                  linkPdf={Livro.linkPdf}
                  autor={Livro.autor}                                                  
                  isDev={isDev}
                  cardSelecionado={selectedCard === Livro.id}                                  
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

export default Livros;