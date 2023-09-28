
import { Tabs, Tab } from 'react-bootstrap'
import React, { useContext } from 'react'
import Home from '../home/Home'
import RecipesHome from './../recipe/RecipesHome';
import TipsHome from '../tip/TipsHome';



import './custom/navPills.css'
import { DarkModeContext } from '../../utils/context/DarkModeContext';

function NavegationComponent() {

  const {isDarkMode} = useContext(DarkModeContext)


  return (
    <Tabs variant='pills' defaultActiveKey="recipes" className={isDarkMode? 'p-2 justify-center bg-slate-800 custom-tabsDark' : 'bg-white  custom-tabs p-2 justify-center'}>
        <Tab eventKey="about" title="Sobre">
            <Home/>
        </Tab>
        
        <Tab eventKey="recipes" title="Receitas">
          <RecipesHome/>
        </Tab>

        <Tab eventKey="tips" title="Dicas">
            <TipsHome/>
        </Tab>
    </Tabs>
  )
}

export default NavegationComponent