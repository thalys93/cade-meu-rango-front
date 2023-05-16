import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Image, Placeholder } from 'react-bootstrap'
import { DarkModeContext } from '../../../utils/api/context/darkModeContext/DarkModeContext'

import './Receita.css'


function Receita() {  
  const { isDarkMode } = React.useContext(DarkModeContext)
  
  const {nome} = useParams(); 

  const [isLoading, setIsLoading] = React.useState(true)
  const [receita, setReceita] = React.useState([])

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500);
    
    return () => clearTimeout(timer)
  }, []);



  return (      
    <main>      
      <Helmet>
        <title> {`CMR - ${nome} `}</title>
        <link rel="icon" href="https://res.cloudinary.com/dh39ahmpj/image/upload/v1683412274/favicons.dev/cade_meu_rango_nyjbxs.png"/>
      </Helmet>
      
        <Link className={isDarkMode ? 'text-light m-2' : 'text-dark m-2'} id="linkArrow" to='/'>                    
          <i class="bi bi-arrow-left"></i> 
        </Link>
    <section className={isDarkMode ? 'DarkSection' : 'bg-body'} id='receitaSection'>
      {isLoading ? (
        <section id='receitaDetailsBlank'>
          <article className='DetailsLeft'>
            <div id='TitleDiv'>
              {/* Titulo */}
              <Placeholder as='h5' animation="wave">
                <Placeholder xs={6} className={isDarkMode ? 'TitleLines subtitle bg-body' : 'TitleLines subtitle'}/>
              </Placeholder>                   
              {/* Descrição */}
              <Placeholder xs={6} as='p' animation="wave" className='text-center'>                
                <Placeholder xs={6} className={isDarkMode ? 'TitleLines subtitle bg-body' : 'TitleLines subtitle'} /> <br/>
                <Placeholder xs={7} className={isDarkMode ? 'TitleLines subtitle bg-body' : 'TitleLines subtitle'} /> <br/>
                <Placeholder xs={8} className={isDarkMode ? 'TitleLines subtitle bg-body' : 'TitleLines subtitle'} />
              </Placeholder>

              {/* Ingredientes */}
              <Placeholder xs={6} animation="wave" className='text-center'>
                <Placeholder xs={12} as='h5' className={isDarkMode ? 'TitleLines subtitle bg-body' : 'TitleLines subtitle'} /> 
              </Placeholder>

              {/* Lista de Ingredientes */}
              <Placeholder xs={6} animation="wave" className='listItem'>                
                  <Placeholder xs={2} as='h6' className={isDarkMode ? 'TitleLines subtitle bg-body' : 'TitleLines subtitle'}/> 
                  <Placeholder xs={6} as='h6' className={isDarkMode ? 'TitleLines subtitle bg-body' : 'TitleLines subtitle'}/>                 
              </Placeholder>

              <Placeholder xs={6} animation="wave" className='listItem'>                
                  <Placeholder xs={2} as='h6' className={isDarkMode ? 'TitleLines subtitle bg-body' : 'TitleLines subtitle'}/> 
                  <Placeholder xs={6} as='h6' className={isDarkMode ? 'TitleLines subtitle bg-body' : 'TitleLines subtitle'}/>                 
              </Placeholder>

              <Placeholder xs={6} animation="wave" className='listItem'>                
                <Placeholder xs={2} as='h6' className={isDarkMode ? 'TitleLines subtitle bg-body' : 'TitleLines subtitle'}/>
                <Placeholder xs={6} as='h6' className={isDarkMode ? 'TitleLines subtitle bg-body' : 'TitleLines subtitle'}/>                 
              </Placeholder>
            </div>
          </article>

          <article className='DetailsRight'>            
            <div id='TitleDiv'>
              <Placeholder xs={6} as='h1' animation="wave">                
                <Placeholder className={isDarkMode ? 'blankImg bg-body' : 'blankImg'}/>
              </Placeholder>

                            {/* Ingredientes */}
              <Placeholder xs={6} animation="wave" className='text-center'>
                <Placeholder xs={12} as='h5' className={isDarkMode ? 'TitleLines subtitle bg-body' : 'TitleLines subtitle'}/> 
              </Placeholder>

              {/* Lista de Ingredientes */}
              <Placeholder xs={6} animation="wave" className='listItem'>                
                  <Placeholder xs={2} as='h6' className={isDarkMode ? 'TitleLines subtitle bg-body' : 'TitleLines subtitle'}/> 
                  <Placeholder xs={6} as='h6' className={isDarkMode ? 'TitleLines subtitle bg-body' : 'TitleLines subtitle'}/>                 
              </Placeholder>

              <Placeholder xs={6} animation="wave" className='listItem'>                
                  <Placeholder xs={2} as='h6' className={isDarkMode ? 'TitleLines subtitle bg-body' : 'TitleLines subtitle'}/> 
                  <Placeholder xs={6} as='h6' className={isDarkMode ? 'TitleLines subtitle bg-body' : 'TitleLines subtitle'}/>                 
              </Placeholder>

              <Placeholder xs={6} animation="wave" className='listItem'>                
                <Placeholder xs={2} as='h6' className={isDarkMode ? 'TitleLines subtitle bg-body' : 'TitleLines subtitle'} />
                <Placeholder xs={6} as='h6' className={isDarkMode ? 'TitleLines subtitle bg-body' : 'TitleLines subtitle'} />                 
              </Placeholder>
              
            </div>
          </article>
        </section>
      ) : (
        <section id='receitaDetails'>
          <article className='DetailsLeft'>            
          <div id='TitleDiv'> 
            <h5 className={isDarkMode? 'TitleLines DarkSubtitle' : 'TitleLines subtitle'}>
              Titulo da Receita
            </h5>
            <p className={isDarkMode ? 'DarkTxt':'txt'}>
              descrição da receita <br/>
              informações e detalhes da receita <br/>
              informações e detalhes da receita <br/>              
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
          <article className='DetailsRight'>
            <Image className='ReceitaImg' src="https://media.istockphoto.com/id/491517422/pt/foto/fuba-bolo.jpg?s=612x612&w=0&k=20&c=8EwL15sJ1Gcstj0P9dJRi1DPgZAm5AYaGTfjHfM0_KQ=" height={130} fluid/>
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