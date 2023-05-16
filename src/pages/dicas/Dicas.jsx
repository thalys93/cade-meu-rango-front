import React from 'react'
import DicasCard from './DicasCard'
import { DarkModeContext } from '../../utils/api/context/darkModeContext/DarkModeContext'

import '../container/dicas/dicas.css'

function Dicas() {
    const { isDarkMode } = React.useContext(DarkModeContext)

  return (
    <section  className={isDarkMode ? 'DarkSection p-3 mb-5 container-fluid': 'bg-body p-3 mb-5 container-fluid'}>
        <article className='container-fluid'>
            <h3 className={isDarkMode ? 'DarkSubtitle' : 'subtitle'}>Livros (temporário)</h3>
            <p className={isDarkMode ? 'DarkTxt' : 'txt'}>Será Modificado o layout desta página, para um layout voltado para Dicas de Culinária</p>
        </article>

        <article className='container-fluid'>
            <ul className='list-group list-unstyled gap-3 card-hover' id='container' >
                <li>
                    <DicasCard/>
                </li>

                <li>
                    <DicasCard/>
                </li>

                <li>
                    <DicasCard/>
                </li>
            </ul>
        </article>
    </section>
  )
}

export default Dicas