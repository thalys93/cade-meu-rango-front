import React from 'react'
import { Link } from 'react-router-dom'

// Icons
import { BsDoorOpen } from 'react-icons/bs'

// CSS
import './voltar.css'

function Voltar() {
  return (
    <div id='buttonDiv'>
        <Link to='/'>
            <button id='buttonExit'>
                <BsDoorOpen id='IconStyle'/>
            </button>
        </Link>
    </div>
  )
}

export default Voltar