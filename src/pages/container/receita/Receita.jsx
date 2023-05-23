import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Image } from 'react-bootstrap'
import { DarkModeContext } from '../../../utils/api/context/darkModeContext/DarkModeContext'
import { DeveLoperContext } from '../../../utils/api/context/devContext/DevContext'
import { ReceitaUtils } from '../../../utils/receitaUtils'
import { AiOutlineCheckCircle } from 'react-icons/ai'

import ReceitaPlaceholder from './ReceitaPlaceholder'
import Voltar from '../../../interface/buttons/back-component/BackBtn'
import './Receita.css'


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
    receita , 
    falha, 
    ingredientes, 
    modoPreparo,
    modificarIngredientes,
    modificarModoPreparo
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
                <li className='listItem' key={receita.ingrediente.id}>    
                  {/* Receita Normal */}
                    <h4 className='enfatize modeNumber'>{receita.ingrediente.quantidade}</h4>
                    {/* <h6 className='enfatizeSecondary'>{ingrediente.unidade}</h6> */}
                    <span className={isDarkMode? 'DarkTxt user-select-none' : 'txt user-select-none'}> / </span>
                    <p  className={isDarkMode ? 'ingredient DarkTxt' : 'ingredient txt'}> {receita.ingrediente.nome} </p>
                    {/* <AiOutlineCheckCircle hidden={!isDev} className={isDarkMode ? 'ConfirmButtonDark' : 'ConfirmButton'} onClick={() => modificarIngredientes(ingrediente.id)}/>                                                          */}
                </li>                                                           
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
            <li className='listItem' key={receita.modoDePreparo.id}>                 
              <h4 className='enfatize modeNumber'>{receita.modoDePreparo.id}</h4>
              <p className={isDarkMode ? 'ingredient DarkTxt' : 'ingredient txt'}> {receita.modoDePreparo.descricao} </p>
            </li>                
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