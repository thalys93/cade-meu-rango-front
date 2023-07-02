import { useState, useEffect } from "react";
import { getRecipes } from "./api/services/api";

export function TabUtils() {
  // Estados

  // Estado de Timeout
  const TIMEOUT_LIMIT = 1500;
  const [timeOut, setTimeOut] = useState(true);

  // Estado do Card
  const [cardReceitas, setCardReceitas] = useState([]);
  const [statusCode, setStatusCode] = useState('');
  const [blankCard] = useState([1, 2, 3, 4]);

  // Estado do Carregamento
  const [carregou, setCarregou] = useState(true);

  // Estado da Falha
  const [falha, setfalha] = useState(false);

  // Estado do Contador
  const [contador, setContador] = useState(0);

  // Obter Dados Da API
  useEffect(() => {
    setTimeOut(false);
    const timer = setTimeout(() => {
      setTimeOut(true);
    }, TIMEOUT_LIMIT);

    const fetchData = async () => {
      try {        
        const data = getRecipes();
        clearTimeout(timer);
        setCardReceitas(data);
        setCarregou(true);        
        setStatusCode(data.status);
      } catch (error) {
        setfalha(true);
      }
    };
    fetchData();
  }, []);

  // Animação de Carregamento
  useEffect(() => {
    if (carregou) {
      const timer = setInterval(() => {
        setContador((contador) => contador + 1);
      }, 210);

      return () => {
        clearInterval(timer);
      };
    }
  }, [carregou]);

  // ProgressBar
  const [progressBar] = useState(100);


  return { 
        cardReceitas,
        falha,
        carregou,
        timeOut,
        contador,
        progressBar,
        blankCard,
        statusCode
  }
}
