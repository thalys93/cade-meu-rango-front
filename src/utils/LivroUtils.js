//Libs
import { useState } from "react";
import { useEffect } from "react";
import { deleteBooks, getBooks } from "./api/services/api";

//Api


export function LivroUtils() {  
  // Timeout
  const TIMEOUT_LIMIT = 500;
  const [timeOut, setTimeOut] = useState(true);

  //Dados
  const [BookCard, setBookCard] = useState([]);    
  // Dados Nulos
  const [blankCard] = useState([1, 2, 3, 4]);
  // Dados Selecionados
  const [selectedCard, setSelectedCard] = useState(null);
  // Estado de Confirmação
  const [confirma, setConfirma] = useState(false);

  // Estado de Aviso
  const [aviso, setAviso] = useState(false);  

  // Estados de Carregamentos | Falhas | Contadores
  const [carregou, setCarregou] = useState(false);
  const [falha, setfalha] = useState(false);
  const [contador, setContador] = useState(0);

  // Apagar (funcional)
  const deletarLivro = async (id) => {
    if (confirma) {
      try {
        await deleteBooks(id);        
        setTimeOut(() => {
          window.location.reload();
        }, 100);
      } catch (error) {
        setfalha(true);
        console.log("falha ao deletar a dica");
      }
    }
  };

  // Obter Dados Da API
  useEffect(() => {
    setTimeOut(false);
    const timer = setTimeout(() => {
      setTimeOut(true);
    }, TIMEOUT_LIMIT);

    const fetchData = async () => {
      try {
        const data = await getBooks();
        clearTimeout(timer);        
        setCarregou(true);
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

  // Retorno dos Estados e Funções
  return {
    timeOut,
    BookCard,
    blankCard,
    selectedCard,
    confirma,
    aviso,
    carregou,
    falha,
    contador,
    deletarLivro,
    setBookCard,
    setSelectedCard,
    setConfirma,
    setAviso,    
  };
}
