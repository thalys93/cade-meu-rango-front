import React from 'react'
import { Card } from 'react-bootstrap'
import { DarkModeContext } from '../../utils/api/context/darkModeContext/DarkModeContext'

import '../container/dicas/dicas.css'

function DicasCard() {
  const { isDarkMode } = React.useContext(DarkModeContext)

  return (
    <Card className={isDarkMode ? 'bg-dark container-fluid animate__animated animate__fadeIn' : 'container-fluid animate__animated animate__fadeIn'} id='containerBook'>
        <Card.Header className={isDarkMode? 'border-light' :'border-dark'}>
            <a href='' target='_blank'>
                <Card.Img src='https://online.fliphtml5.com/xhhk/mrbc/files/page/1.jpg' id='bookRecipeImg'/>
            </a>
        </Card.Header>
        <Card.Body>
            <Card.Title className={isDarkMode ? 'DarkTxt text-center' : 'txt text-center'}>Livro de Receitas</Card.Title>        
        </Card.Body>                    
    </Card>
  )
}

export default DicasCard