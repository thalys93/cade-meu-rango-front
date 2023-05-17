import React from 'react'
import { Link } from 'react-router-dom'
import { DarkModeContext } from '../../../utils/api/context/darkModeContext/DarkModeContext'

// CSS
import './voltar.css'

function Voltar() {
  // Dark Mode Context
  const { isDarkMode } = React.useContext(DarkModeContext)


  return (
        <Link className={isDarkMode ? 'text-light ms-4' : 'text-dark ms-4'} id="linkArrow" to='/'>                    
          <i class="bi bi-arrow-left"/>
        </Link>
  )
}

export default Voltar