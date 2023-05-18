import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../utils/api/context/darkModeContext/DarkModeContext';
import { DeveLoperContext } from '../../utils/api/context/devContext/DevContext';
import { AiFillDelete } from 'react-icons/ai';
import Card from 'react-bootstrap/Card';

import CardPlaceholder from './CardPlaceholder';
import '../container/receita/receita.css'

function ReceitaCard({id, title, imgLink}) {
   
  // Contexto do Modo Escuro
 const { isDarkMode } = React.useContext(DarkModeContext)

//  Estado do Carregamento
 const [carregou , setCarregou] = React.useState(false);

//  Contexto do Modo Desenvolvedor
 const { isDev } = React.useContext(DeveLoperContext)

//  Animação de Carregamento
  useEffect(() => {
    setTimeout(() => {
      setCarregou(true);
    }, 200);
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
                                                          
              <Link 
              to={'receita' + '/' + id + '/' + title} className={isDarkMode ? 'btn btn-outline-light container-fluid text-center' : 'btn btn-primary container-fluid text-center'}>
                  Saiba Mais
              </Link>                                          
          </Card.Body>
      </Card>          
    ) : (
      <CardPlaceholder/>
    )}        
    </main>                         
  )     
}

export default ReceitaCard

                      