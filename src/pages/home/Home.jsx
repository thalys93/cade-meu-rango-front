// React
import React, { useEffect } from 'react'
import Banner from '../../interface/banner/Banner'
import { Tab } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { DarkModeContext } from '../../utils/api/context/darkModeContext/DarkModeContext'


// Css
import './home.css'
import Inicio from './Inicio'
import ReceitaTab from '../receita/ReceitaTab'
import Dicas from '../dicas/Dicas'
import { Helmet } from 'react-helmet'


function Home() {    

  const { isDarkMode } = React.useContext(DarkModeContext)

  const [activeTab, setActiveTab] = React.useState('Home');

  useEffect(() => {
    const savedTab = localStorage.getItem('defaultActiveKey');

    if (savedTab) {
      setActiveTab(savedTab);
    }

  }, []);

  const tabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
    localStorage.setItem('defaultActiveKey', selectedTab);
  };

  return (
    <section id='homeSection'>
      <Helmet>    
        <title>Cadê Meu Rango</title>            
      </Helmet> 
        <Banner />
      <Tab.Container className={isDarkMode ? 'custom-tabsDark' : 'custom-tabs'} defaultActiveKey='home' activeKey={activeTab} onSelect={tabSelect} >
      <div className={isDarkMode ? 'NavTabs DarkSection' : 'NavTabs'} id='navDiv'>
        <Nav variant="pills" defaultActiveKey='home' className={isDarkMode ? 'custom-tabsDark' : 'custom-tabs'}>
          <Nav.Item>
            <Nav.Link eventKey='home' className={isDarkMode ? 'DarkTxt' :'txt'}>Home</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey='receitas' className={isDarkMode ? 'DarkTxt' :'txt'}>Receitas</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey='Dicas' className={isDarkMode ? 'DarkTxt text-secondary disabled' :'txt disabled'}>Dicas</Nav.Link>
            </Nav.Item>
          </Nav>            
        </div>
        

        <Tab.Content>
          <Tab.Pane eventKey='home'>
            <Inicio/>            
          </Tab.Pane>
        </Tab.Content>

        <Tab.Content>
          <Tab.Pane eventKey="receitas">
            <ReceitaTab/>
          </Tab.Pane>
        </Tab.Content>

          <Tab.Content>
        <Tab.Pane eventKey="Dicas">
            <Dicas/>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>              
      
    </section>
  )
}

export default Home