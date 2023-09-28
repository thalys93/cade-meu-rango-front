
import { Tabs, Tab } from 'react-bootstrap'
import React from 'react'
import Home from '../home/Home'
import RecipesHome from './../recipe/RecipesHome';
import TipsHome from '../tip/TipsHome';


import './custom/navPills.css'

function NavegationComponent() {



  return (
    <Tabs defaultActiveKey="recipes" className='bg-light_primary dark:bg-slate-800 custom-tabs p-2 justify-center'>
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