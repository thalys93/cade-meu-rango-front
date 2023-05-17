import React from 'react'
import { Placeholder } from 'react-bootstrap'
import { DarkModeContext } from '../../../utils/api/context/darkModeContext/DarkModeContext'

import './Receita.css'


function ReceitaPlaceholder() {
    // Dark Mode Context
    const { isDarkMode } = React.useContext(DarkModeContext)
    
  return (
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
  )
}

export default ReceitaPlaceholder