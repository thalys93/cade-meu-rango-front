// Libs
import React from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Image } from 'react-bootstrap'
import { AiOutlineCheckCircle } from 'react-icons/ai'

// Utils
import { DarkModeContext } from "../../../utils/context/DarkModeContext";
import { DeveLoperContext } from "../../../utils/context/DevContext";
import { ReceitaUtils } from "../../../utils/receitaUtils";

// Componentes
import ReceitaPlaceholder from './ReceitaPlaceholder'
import Voltar from '../../../interface/buttons/back-component/BackBtn'

// CSS
import '../css/Receita.css'

function Receita() {  
  // Dark Mode Context
  const { isDarkMode } = React.useContext(DarkModeContext)
  const {isDev} = React.useContext(DeveLoperContext)
  
  // Nested Routes
  const {nome} = useParams();  
  const errorID = 404;

  // Hook de Estado e Carregamento
  const { 
    isLoading , 
    receita,
    ingredientes,
    modoDePreparo,
    falha, 
  } = ReceitaUtils()

  

  if (falha) {
    return (
      <section className={isDarkMode ? 'DarkSection' : 'bg-body'} >     
          <Voltar/>
          <h1 className={isDarkMode? 'text-warning text-center mt-5' : 'text-danger text-center mt-5'}> Atenção </h1>
          <h4 className={isDarkMode ? 'DarkTxt text-center' : 'txt text-center'}>Falha Ao Obter Dados Da API : {errorID} </h4>        
      </section>
    )
  }  


  return (      
    <main className='RecipeMain'>
      <Helmet>
        <title> {`CMR - ${nome} `}</title>
        <link rel="icon" href="https://res.cloudinary.com/dh39ahmpj/image/upload/v1683412274/favicons.dev/cade_meu_rango_nyjbxs.png"/>
      </Helmet>      
      <Voltar/>    
      <section className={isDarkMode ? 'DarkSection receitaSection ' : 'bg-body receitaSection '}>
      {isLoading ? (
        <ReceitaPlaceholder/>
      ) : (
      <>
        <article className='container'>
          <div id='TitleDiv'> 
            <h5 className={isDarkMode? 'TitleLines DarkSubtitle' : 'TitleLines subtitle'}>
              {nome}
            </h5>            
            <p className={isDarkMode ? 'DarkTxt':'txt'}>
              {receita?.descricao}
            </p>                      
          </div>          
          <div id='TitleDiv'>
            <h5 className={isDarkMode? 'TitleLines DarkSubtitle' : 'TitleLines subtitle'}>
              Ingredientes                      
            </h5>
            <ol className='container-fluid list-group'>              
            {ingredientes.map(( ing ) => (
                <li className='listItem' key={ing.id}>    
                  {/* Receita Normal */}
                    <h4 className='enfatize modeNumber'>{ing.quantidade}</h4>
                    {/* <h6 className='enfatizeSecondary'>{ingrediente.unidade}</h6> */}
                    <span className={isDarkMode? 'DarkTxt user-select-none' : 'txt user-select-none'}> / </span>
                    <p  className={isDarkMode ? 'ingredient DarkTxt' : 'ingredient txt'}> {ing.nome} </p>
                </li>                                                           
            ))}
            </ol>
          </div>
        </article>

        <article className='container'>
          <Image className='ReceitaImg' src={receita?.imagem} height={130} fluid/>
            <div id='TitleDiv'>
          <h5 className={isDarkMode? 'TitleLines DarkSubtitle' : 'TitleLines subtitle'}>
            Modo de Preparo                      
          </h5>

          
          <ol className='container-fluid list-group'>            
          {modoDePreparo.map((mode, index) => (
            <li className='listItem' key={mode.id}>                 
              <h4 className='enfatize modeNumber'>{index + 1}</h4>
              <p className={isDarkMode ? 'ingredient DarkTxt' : 'ingredient txt'}> {mode.descricao} </p>
            </li>
            ))}                
          </ol>
          </div>
        </article>  
      </>          
      )}   
    </section>
  </main>
  )
}

export default Receita