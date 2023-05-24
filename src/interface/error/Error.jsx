// Libs
import React from 'react'
import { Link } from 'react-router-dom'

// Utils

// CSS
import './error.css'

const errorMsg = `Ocorreu um erro inesperado 404.`

function Error() {
  return (
    <section>
        <div className='errorCard'>
            <h1> Ocorreu um Erro !</h1>
              <p className='text-center'> {errorMsg} </p>
            <Link to="/" className='btn btn-outline-light'> Voltar?</Link>
        </div>
    </section>
  )
}

export default Error