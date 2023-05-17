import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../utils/api/context/darkModeContext/DarkModeContext';
import { Placeholder} from 'react-bootstrap';
import { DeveLoperContext } from '../../utils/api/context/devContext/DevContext';
import { AiFillDelete } from 'react-icons/ai';
import Card from 'react-bootstrap/Card';

import '../container/receita/receita.css'

function ReceitaCard({id, title, imgLink}) {
   
 const { isDarkMode } = React.useContext(DarkModeContext)
 const [carregou , setCarregou] = React.useState(false);
 const { isDev } = React.useContext(DeveLoperContext)

  useEffect(() => {
    setCarregou(true);
  }, []);
  
  return (
    <main>      
      { carregou ? ( 
      <Card className={isDarkMode ? 'bg-dark' :'bg-body'}>
        {isDev && 
          <button className='btn btn-danger animate__animated animate__fadeIn' id='deleteBtn'>
            <AiFillDelete/>
          </button>}
        <Card.Img variant="top" src={imgLink} height={130}/>        
          <Card.Body>                      
              <Card.Title>
                <h5 className={isDarkMode ? 'DarkTxt text-light text-center' : 'txt text-dark text-center'}>{title}</h5>
              </Card.Title>
              <div className='mb-1'>
                <span className={isDarkMode ? 'text-light-emphasis text-center container-fluid' : 'text-secondary-emphasis text-center container-fluid '}> Nome do Usuario </span>
              </div>
              <Link to={'receita' + '/' + id + '/' + title} className={isDarkMode ? 'btn btn-outline-light container-fluid text-center' : 'btn btn-primary container-fluid text-center'}>
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

                      