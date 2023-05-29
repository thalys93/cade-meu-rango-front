// Libs
import React from 'react'
import { Tab } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { Helmet } from 'react-helmet'

// Utils
import { DarkModeContext } from '../utils/context/DarkModeContext'
import { homeUtils } from '../utils/homeUtils'


// Componentes
import Inicio from './home/Home'
import ReceitaTab from './receita/ReceitaTab'
import Dicas from './tips/Dicas'
import Livros from './books/Livros'

// CSS
import './home/home.css'

function Index() {    

  // Contexto Modo Escuro
  const { isDarkMode } = React.useContext(DarkModeContext)

  // Funções do Home
  const { activeTab, tabSelect } = homeUtils();

  return (
    <section id='homeSection'>
      <Helmet>    
        <title>Cadê Meu Rango</title>            
      </Helmet>         
      <Tab.Container className={isDarkMode ? 'custom-tabsDark' : 'custom-tabs'} defaultActiveKey='home' activeKey={activeTab} onSelect={tabSelect} >
      <div className={isDarkMode ? 'NavTabs DarkSection' : 'NavTabs'} id='navDiv'>
        <Nav variant="pills" defaultActiveKey='home' className={isDarkMode ? 'custom-tabsDark' : 'custom-tabs'}>
          <Nav.Item>
            <Nav.Link eventKey='Home' className={isDarkMode ? 'DarkTxt' :'txt'}>Home</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey='Receitas' className={isDarkMode ? 'DarkTxt' :'txt'}>Receitas</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey='Dicas' className={isDarkMode ? 'DarkTxt' :'txt'}>Dicas</Nav.Link>
            </Nav.Item>

            <Nav.Item>
            <Nav.Link eventKey='Livros' className={isDarkMode ? 'DarkTxt' :'txt'}>Livros</Nav.Link>
            </Nav.Item>
          </Nav>            
        </div>
        

        <Tab.Content>
          <Tab.Pane eventKey='Home'>
            <Inicio/>            
          </Tab.Pane>
        </Tab.Content>

        <Tab.Content>
          <Tab.Pane eventKey="Receitas">
            <ReceitaTab/>
          </Tab.Pane>
        </Tab.Content>

        <Tab.Content>
          <Tab.Pane eventKey="Dicas">
            <Dicas/>      
          </Tab.Pane>
        </Tab.Content>

        <Tab.Content>
          <Tab.Pane eventKey="Livros">
            <Livros/>
          </Tab.Pane>
        </Tab.Content>

      </Tab.Container>              
      
    </section>
  )
}

export default Index