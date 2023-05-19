import React from 'react'
import { BiUserCircle } from 'react-icons/bi'
import {BsMoonStars} from 'react-icons/bs'
import {AiOutlineTool} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { DarkModeContext } from '../../utils/api/context/darkModeContext/DarkModeContext'
import { DeveLoperContext } from '../../utils/api/context/devContext/DevContext'

import CadeMeuRango from '../../interface/banner/CadeMeuRango'

function Banner () {
  const { isDarkMode, toggleDarkMode } = React.useContext(DarkModeContext)
  const { toggleDevMode } = React.useContext(DeveLoperContext)

  return (    
    <div className={isDarkMode ? 'DarkBanner' : 'banner'}>
        <div className='ButtonDiv mb-2'>          
            <Link to='/login'  className={isDarkMode ? 'btn btn-dark btnLoginDark disabled' : 'btnLogin btn btn-danger disabled '}>            
                <BiUserCircle/>            
            </Link>          
          <div>
            <button className={ isDarkMode ? 'btnLoginDark mt-2' : 'btnLogin mt-2'} onClick={toggleDarkMode}>              
              <BsMoonStars/>
            </button>            
          </div>

          <div >
            <button className={ isDarkMode ? 'btnLoginDark mt-2' : 'btnLogin mt-2'} onClick={toggleDevMode}>
              <AiOutlineTool/>
            </button>
          </div>    

        </div>
            <CadeMeuRango/>            
        <h1 className='line'/>
    </div>              
    
  )
}

export default Banner
