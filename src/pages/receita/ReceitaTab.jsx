import React , {useEffect} from 'react'
import ReceitaCard from './ReceitaCard'
import { DarkModeContext } from '../../utils/api/context/darkModeContext/DarkModeContext'
import { getRecipes } from '../../utils/api/services/api';

import '../home/home.css'

function ReceitaTab() {

  const [cardReceitas, setCardReceitas] = React.useState([]);

  const [carregou , setCarregou] = React.useState(false);
  const [contador, setContador] = React.useState(0);

  useEffect(() => {  
      const fetchData = async () => {
        try {
          const data = await getRecipes();
          setCardReceitas(data);
          setCarregou(true);
        } catch (error) {
          console.log('Falha Ao Obter Dados Da API' , error);          
        }
      };
      fetchData();
  }, []);


  useEffect(() => {
    if (carregou) {
      const timer = setInterval(() => {
        setContador((contador) => contador + 1);
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }
  }, [carregou]);


  // Contexto do Modo Escuro
  const { isDarkMode } = React.useContext(DarkModeContext)

  return (
    <section className={isDarkMode ? 'DarkSection p-3 mb-5 container-fluid' : 'bg-body p-3 mb-5 container-fluid'} id='receitaBorder'>
        <h3 className={isDarkMode ? 'DarkSubtitle text-center' : 'subtitle text-center'} id='Title'> Veja as receitas que preparamos para você hoje! </h3>
        <div className="overflow-y-auto overflow-x-hidden" id='listOverflow'>
            <ol className='list-group list-group-horizontal gap-4 container break-line-list'>
              {cardReceitas.map((card, index) => (    
                contador > index ? (            
                <li key={index} className="animate__animated animate__fadeIn">
                  <ReceitaCard 
                  key={card}
                  title={card.titulo}
                  imgLink={card.imagem}/>
                </li>) : null
              ))}     
            </ol>
        </div>
    </section>
  )
}

export default ReceitaTab