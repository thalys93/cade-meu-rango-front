import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Image } from 'react-bootstrap'
import { DarkModeContext } from '../../../utils/api/context/darkModeContext/DarkModeContext'
import { getRecipesById } from '../../../utils/api/services/api'

import './Receita.css'
import ReceitaPlaceholder from './ReceitaPlaceholder'
import Voltar from '../../../interface/buttons/back-component/BackBtn'


function Receita() {  
  // Dark Mode Context
  const { isDarkMode } = React.useContext(DarkModeContext)
  
  // Nested Routes
  const {nome} = useParams();
  const {id} = useParams();
  const errorID = 404;


  // States Loading e da Receita
  const [isLoading, setIsLoading] = React.useState(true)
  const [receita, setReceita] = React.useState([])
  const [falha , setFalha] = React.useState(false)

  // Busca a Informação na api
  useEffect(() => {
    const fetchData = async () => {
    try {
      const data = await getRecipesById(id);
      setReceita(data);      
      setFalha(false);
    } catch (error) {
      console.log('Falha Ao Obter Dados Da API' , error);
      setFalha(true);
    }
  };
  fetchData();
    setTimeout(() => {
      setIsLoading(true);
    }, 250);

  }, [id]);  

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
    <main className='container-fluid'>
      <Helmet>
        <title> {`CMR - ${nome} `}</title>
        <link rel="icon" href="https://res.cloudinary.com/dh39ahmpj/image/upload/v1683412274/favicons.dev/cade_meu_rango_nyjbxs.png"/>
      </Helmet>      
      <Voltar/>
    <section id='receitaSection'>
      {isLoading ? (
        <ReceitaPlaceholder/>
      ) : (
        <section className={isDarkMode ? 'DarkSection receitaDetails' : 'bg-body receitaDetails'}>
          <article className='DetailsLeft container'>
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
                <li className='listItem'>                 
                    <h6 className='enfatize'>(Medida)</h6>
                    <p className={isDarkMode ? 'ingredient DarkTxt' : 'ingredient txt'}> Ingrediente 1 </p>
                </li>    

                <li className='listItem'>                 
                    <h6 className='enfatize'>(Medida)</h6>
                    <p className={isDarkMode ? 'ingredient DarkTxt' : 'ingredient txt'}> Ingrediente 2 </p>
                </li>

                <li className='listItem'>                 
                    <h6 className='enfatize'>(Medida)</h6>
                    <p className={isDarkMode ? 'ingredient DarkTxt' : 'ingredient txt'}> Ingrediente 3 </p>
                </li>
            </ol>
          </div>
          </article>

          <article className='DetailsRight container'>
            <Image className='ReceitaImg' src={receita?.imagem} height={130} fluid/>
              <div id='TitleDiv'>
            <h5 className={isDarkMode? 'TitleLines DarkSubtitle' : 'TitleLines subtitle'}>
              Modo de Preparo                      
            </h5>
            <ol className='container-fluid list-group'>
                <li className='listItem'>                 
                    <h6 className='enfatize'>(passo)</h6>
                    <p className={isDarkMode ? 'ingredient DarkTxt' : 'ingredient txt'}> Modo de Preparo 1 </p>
                </li>    

                <li className='listItem'>                 
                    <h6 className='enfatize'>(passo)</h6>
                    <p className={isDarkMode ? 'ingredient DarkTxt' : 'ingredient txt'}> Modo de Preparo 2 </p>
                </li>

                <li className='listItem'>                 
                    <h6 className='enfatize'>(passo)</h6>
                    <p className={isDarkMode ? 'ingredient DarkTxt' : 'ingredient txt'}> Modo de Preparo 3 </p>
                </li>
            </ol>
          </div>
          </article>
        </section>
      )}      
    </section>
  </main>
  )
}

export default Receita