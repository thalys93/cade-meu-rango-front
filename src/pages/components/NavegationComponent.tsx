
import { Tabs, Tab } from 'react-bootstrap'
import React from 'react'
import Home from '../home/Home'
import RecipeGalleryComponent from './RecipeGalleryComponent';
import TipGalleryComponent from './TipGalleryComponent';

import './custom/navPills.css'

function NavegationComponent() {



  return (
    <Tabs defaultActiveKey="home" className='bg-light_primary custom-tabs p-2'>
        <Tab eventKey="home" title="Home" className='tabLink'>
            <Home/>
        </Tab>
        
        <Tab eventKey="recipes" title="Receitas">
          <RecipeGalleryComponent/>
        </Tab>

        <Tab eventKey="tips" title="Dicas">
            <TipGalleryComponent/>
        </Tab>
    </Tabs>
  )
}

export default NavegationComponent