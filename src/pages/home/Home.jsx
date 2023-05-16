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


function Home() {
  document.title = 'Cadê Meu Rango - Inicio '
  document.head.querySelector('link[rel="icon"]').href = 'https://res.cloudinary.com/dh39ahmpj/image/upload/v1683412274/favicons.dev/cade_meu_rango_nyjbxs.png'

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
            <Nav.Link eventKey='Dicas' className={isDarkMode ? 'DarkTxt text-secondary disabled' :'txt'}>Dicas</Nav.Link>
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