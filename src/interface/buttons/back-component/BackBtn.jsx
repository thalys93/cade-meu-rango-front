// Libs
import React from 'react'
import { Link } from 'react-router-dom'

// Utils
import { DarkModeContext } from '../../../utils/context/DarkModeContext'

// CSS
import './voltar.css'

function Voltar() {  
  const { isDarkMode } = React.useContext(DarkModeContext)
  
  return (
        <Link className={isDarkMode ? 'text-light ms-4' : 'text-dark ms-4'} id="linkArrow" to='/'>                    
          <i className="bi bi-arrow-left"/>
        </Link>
  )
}

export default Voltar