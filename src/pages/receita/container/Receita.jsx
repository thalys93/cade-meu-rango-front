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
import { putRecipes } from '../../../utils/api/services/api'

// Componentes
import ReceitaPlaceholder from './ReceitaPlaceholder'
import Voltar from '../../../interface/buttons/back-component/BackBtn'

// CSS
import '../css/Receita.css'

function Receita() {  
  // Dark Mode Context
  const { isDarkMode } = React.useContext(DarkModeContext)
  const {isDev} = React.useContext(DeveLoperContext)
  
  // Hook de Estado e Carregamento
  const { 
    isLoading , 
    receita,
    falha,
    status,
    updateData
  } = ReceitaUtils()  

  
  if (falha) {
    return (
      <section className={isDarkMode ? 'DarkSection' : 'bg-body'} >     
          <Voltar/>
          <h1 className={isDarkMode? 'text-warning text-center mt-5' : 'text-danger text-center mt-5'}> Atenção </h1>
          <h4 className={isDarkMode ? 'DarkTxt text-center' : 'txt text-center'} translate='yes'>{status} </h4>
      </section>
    )
  }  

  return (      
    <main className='RecipeMain'>
      <Helmet>
        <title> {`CMR - ${receita?.titulo} `}</title>
        <link rel="icon" href="https://res.cloudinary.com/dh39ahmpj/image/upload/v1683412274/favicons.dev/cade_meu_rango_nyjbxs.png"/>
      </Helmet>      
      <Voltar/>    
      <section className={isDarkMode ? 'DarkSection receitaSection ' : 'bg-body receitaSection '}>
      {isLoading ? (
        <ReceitaPlaceholder/>
      ) : (
      <>
        <article className='container-fluid'>
          <div id='TitleDiv'> 
            <h5 className={isDarkMode? 'TitleLines DarkSubtitle' : 'TitleLines subtitle'} id='receitaTitulo' contentEditable={isDev? 'true' : 'false'}>
              {receita?.titulo}
            </h5>            
            <p className={isDarkMode ? 'DarkTxt':'txt'} id='receitaDescricao' contentEditable={isDev? 'true' : 'false'}>
              {receita?.descricao}
            </p>                      
          </div>          
          <div id='TitleDiv'>
            <h5 className={isDarkMode? 'TitleLines DarkSubtitle' : 'TitleLines subtitle'}>
              Ingredientes                      
            </h5>
            <ol className='container-fluid list-group'>              
            {receita.ingredientes?.map(( ing, i ) => (
                <li className='listItem' key={ing._id}>    
                  {/* Receita Normal */}
                    <h4 className='enfatize modeNumber' contentEditable={isDev? 'true' : 'false'} id={`ingredienteQuantidade_${i}`}>{ing.quantidade}</h4>                    
                    <span className={isDarkMode? 'DarkTxt user-select-none' : 'txt user-select-none'}> / </span> 
                    <p className={isDarkMode ? 'ingredient DarkTxt' : 'ingredient txt'} id={`ingredienteNome_${i}`} contentEditable={isDev? 'true' : 'false'}> {ing.nome} </p>
                </li>                                                           
            ))}
            {/* <div>
              <button className={isDarkMode? 'btn btn-outline-primary' : 'btn btn-primary'} onClick={addIngredient}> <AiOutlineCheckCircle/> </button>
            </div>  */}
            </ol>
          </div>
        </article>

        <article className='container-fluid'>
          <Image className='ReceitaImg' src={receita?.image} height={130} fluid/>
            <div id='TitleDiv'>
          <h5 className={isDarkMode? 'TitleLines DarkSubtitle' : 'TitleLines subtitle'}>
            Modo de Preparo                      
          </h5>          
          <ol className='container-fluid list-group'>            
          {receita.modoPreparo?.map((mode, index) => (
            <li className='listItem' key={mode._id}>                 
              <h4 className='enfatize modeNumber'>{index + 1}</h4>
              <p className={isDarkMode ? 'ingredient DarkTxt' : 'ingredient txt'} id={`preparoDescricao_${index}`} contentEditable={isDev? 'true' : 'false'}> {mode.descricao} </p>
            </li>            
            ))}  
            {/* <div>
              <button className={isDarkMode? 'btn btn-outline-primary' : 'btn btn-primary'} onClick={addMode}> <AiOutlineCheckCircle/> </button>              
            </div> */}
          </ol>
          </div>
        </article>
          <div className='ConfirmBtn'>
            <button className={isDarkMode? 'btn btn-outline-success' : 'btn btn-success'} onClick={updateData}> Confirmar </button>
          </div>          
      </>          
      )}   
    </section>
  </main>
  )
}

function addIngredient() {
  console.log('Ingredient Added')
}

function addMode() {
  console.log('Mode Added')
}

export default Receita