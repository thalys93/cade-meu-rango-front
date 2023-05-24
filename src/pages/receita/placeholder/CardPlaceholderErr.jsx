// Libs
import React from 'react'
import { Card , Placeholder } from 'react-bootstrap'
import { DarkModeContext } from '../../../utils/context/DarkModeContext';

// CSS
import '../css/Receita.css'


function CardPlaceholderError() {   
const { isDarkMode } = React.useContext(DarkModeContext)
    
  return (
        <div className='flex-column'>
        <Card className={isDarkMode ? 'cardHover bg-dark errorBorder' : 'cardHover errorBorder'}>
          <Placeholder as='h1'>
            <Placeholder xs={5} className={isDarkMode ? 'bg-body' : ''} style={{width: 150 , height: 100, marginTop: 10}}/>            
          </Placeholder>
          <Card.Body>
            <Placeholder as='p'  xs={10} animation="glow">
              <Placeholder xs={5} style={{width: 150 , height: 5}} className={isDarkMode ? 'bg-body text-center' : 'text-center'}/>
            </Placeholder>            
            <Placeholder as='h4' xs={5} animation="glow" >
              <Placeholder xs={10} className={isDarkMode ? 'bg-body text-center' : 'text-center'} style={{ width: 100, marginLeft: 25 }}/>
            </Placeholder>
          </Card.Body>
        </Card>
      </div>      
  )
}

export default CardPlaceholderError