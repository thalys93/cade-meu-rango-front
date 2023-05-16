import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../utils/api/context/darkModeContext/DarkModeContext';
import Card from 'react-bootstrap/Card';
import { Placeholder} from 'react-bootstrap';

import '../container/receita/receita.css'

function ReceitaCard({title, imgLink}) {
   
 const { isDarkMode } = React.useContext(DarkModeContext)
 const [carregou , setCarregou] = React.useState(false);

  useEffect(() => {
    setCarregou(true);
  }, []);
  
  return (
    <main>      
      { carregou ? ( 
      <Card className={isDarkMode ? 'cardHover bg-dark' :'cardHover'}>
        <Card.Img variant="top" src={imgLink} height={130}/>        
          <Card.Body>                      
              <Card.Title>
                <h5 className={isDarkMode ? 'DarkTxt text-light text-center' : 'txt text-dark text-center'}>{title}</h5>
              </Card.Title>
              <div className='mb-1'>
                <span className={isDarkMode ? 'text-light-emphasis text-center container-fluid' : 'text-secondary-emphasis text-center container-fluid '}> Nome do Usuario </span>
              </div>
              <Link to={'receita' + '/' + title} className={isDarkMode ? 'btn btn-outline-light disabled container-fluid text-center' : 'btn btn-primary disabled container-fluid text-center'}>
                  Saiba Mais
              </Link>                                          
          </Card.Body>
      </Card>          
    ) : (
      <div className='flex-column'>
        <Card className={isDarkMode ? 'cardHover bg-dark' : 'cardHover'}>
          <Placeholder as='h1' animation="glow">
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
    )}        
    </main>                         
  )     
}

export default ReceitaCard

                      