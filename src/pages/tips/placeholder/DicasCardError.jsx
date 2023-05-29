//Libs
import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';
import { IoIosQuote } from 'react-icons/io'

//Utils
import { DarkModeContext } from '../../../utils/context/DarkModeContext';

//Components

//CSS

function DicasCardPlaceholderError() {
    const { isDarkMode } = React.useContext(DarkModeContext);

    return (
    <Card className={isDarkMode? 'bg-dark animate__animated animate__fadeIn errorBorder' : 'bg-light errorBorder'} style={{ width: '17rem' }}>      
      <Card.Body>
        <Card.Title className={isDarkMode? 'DarkTxt' : 'txt'}>
            <Placeholder>
                <Placeholder xs={5} className={isDarkMode ? 'bg-body' : ''} style={{width: 150 , height: 5}}/>
            </Placeholder>            
             <br/>
            <Placeholder as='small'  xs={10} animation="glow">
                <Placeholder xs={5} style={{width: 125 , height: 5}} className={isDarkMode ? 'bg-body text-center' : 'text-center'}/>
            </Placeholder>
          </Card.Title>
        <Card.Text className='text-center TipCard'>                  
            <IoIosQuote className={isDarkMode? 'Icon enfatize': 'Icon enfatize'}/> 
            <Placeholder>
                <Placeholder xs={5} className={isDarkMode ? 'bg-body' : ''} style={{width: 150 , height: 50}}/>
            </Placeholder>
        </Card.Text>
      </Card.Body>
    </Card>
    )
}
export default DicasCardPlaceholderError;