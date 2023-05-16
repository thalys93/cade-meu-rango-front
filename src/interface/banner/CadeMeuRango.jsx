import React from 'react'
import { DarkModeContext } from '../../utils/api/context/darkModeContext/DarkModeContext'

import './CadeMeuRango.css'
function CadeMeuRango() {
  const { isDarkMode } = React.useContext(DarkModeContext)

    let culinary = '/assets/chapeuzinho.svg'

  return (
    <div className='container-culinary'>
        <img src={culinary} alt='chapeu-culinario'/>  
            <h1 className={isDarkMode ? 'DarkTitle' : 'title'}>Cadê Meu Rango</h1>
            <h2 className={isDarkMode ? 'DarkTitleSubtitle' : 'TitleSubtitle'}>Seu livro de receitas favoritos</h2>     
    </div>
  )
}

export default CadeMeuRango