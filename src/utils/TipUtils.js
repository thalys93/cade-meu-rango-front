//Libs
import { useState } from 'react';
import { useEffect } from 'react';
import  moment  from 'moment';

//Utils

//Api
import { deleteTips, getTips } from './api/services/api';
import { putTips } from './api/services/api';


export function TipUtils() {    
    // Estados

    // Timeout
      const TIMEOUT_LIMIT = 500;
      const [timeOut, setTimeOut] = useState(true);

    // Cards
    const [cardTips, setCardTips] = useState([]);
    const [cardTipDate, setCardTipDate] = useState([]);
    const [blankCard] = useState([1, 2, 3, 4]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [confirma , setConfirma] = useState(false);
    const [aviso, setAviso] = useState(false);
    
    // Carregamento
    const [carregou, setCarregou] = useState(false);

    // Falha
    const [falha, setfalha] = useState(false);

    // Contador
    const [contador, setContador] = useState(0);


    const atualizarDica = async (updatedCard) => {
        try {
            await putTips(updatedCard);
            const data = await getTips();
            setCardTips(data);
            setConfirma(true);
            setAviso(false);
        } catch (error) {
            setfalha(true);
            console.log('falha ao atualizar a dica')
        }
                

    }    

    const deletarDica = async (id) => {
        try {
            await deleteTips(id);
            const data = await getTips();
            setCardTips(data);
            setConfirma(true);
            setAviso(false);
        } 
        catch (error) {
            setfalha(true);
            console.log('falha ao deletar a dica')
        }        
    }




    // Obter Dados Da API
    useEffect(() => {
        setTimeOut(false);
        const timer = setTimeout(() => {
            setTimeOut(true);
        }, TIMEOUT_LIMIT);

        const fetchData = async () => {
            try {
                const data = await getTips();
                clearTimeout(timer);                                
                setCardTips(data);                
                setCarregou(true);
            } catch (error) {
                setfalha(true);
            }            
        };
        fetchData();
    }, []);

    // Obter Data Do Card e Formatar 
    useEffect(() => {
        const dataFormatada = cardTips.map((tip) => moment(tip.data).format('DD/MM/YY'));
            setCardTipDate(dataFormatada);                     
    }, [cardTips]);

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
        
    
        
    return{
        cardTips,
        cardTipDate,
        blankCard,
        selectedCard,
        confirma,
        setConfirma,
        aviso,
        setAviso,        
        setSelectedCard,
        atualizarDica,
        deletarDica,    
        carregou,
        falha,
        contador,        
        timeOut
    }
}