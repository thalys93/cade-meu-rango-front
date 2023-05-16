import React from 'react'


import './CadeMeuRango.css'
function CadeMeuRangoVar() {

    let culinary = '/assets/chapeuzinho.svg'

  return (
    <div className='container-culinary'>
        <img src={culinary} alt='chapeu-culinario'/>        
            <h1 className='title'>Cadê Meu Rango</h1>            
    </div>
  )
}

export default CadeMeuRangoVar