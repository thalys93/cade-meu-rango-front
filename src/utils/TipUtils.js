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
      const TIMEOUT_LIMIT = 1500;
      const [timeOut, setTimeOut] = useState(true);

    //   Dados
    const [cardTips, setCardTips] = useState([]);
    // Data formatada
    const [cardTipDate, setCardTipDate] = useState([]);
    // Dados Nulos
    const [blankCard] = useState([1, 2, 3, 4]);

    // Dados Selecionados
    const [selectedCard, setSelectedCard] = useState(null);

    // Estado de Confirmação
    const [confirma , setConfirma] = useState(false);

    // Estado de Aviso
    const [aviso, setAviso] = useState(false);

    // Estado de Edição
    const [modoDeEdicao, setModoDeEdicao] = useState(false);    
        
    // Estados de Carregamentos | Falhas | Contadores
    const [carregou, setCarregou] = useState(false);    
    const [falha, setfalha] = useState(false);    
    const [contador, setContador] = useState(0);

    // Apagar (funcional)
    const deletarDica = async (id) => {        
        if (confirma) {
        try {
            await deleteTips(id);            
            // fetchData();
            setTimeOut(() => {
                window.location.reload();
            }, 100);
        } catch (error) {
            setfalha(true);
            console.log('falha ao deletar a dica')}        
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
        const dataFormatada = cardTips?.map((tip) => moment(tip.data).format('DD/MM/YY'));
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
        
    
        // Retorno dos Estados e Funções
    return{
        cardTips,
        cardTipDate,
        blankCard,
        selectedCard,
        confirma,                   
        aviso,
        carregou,
        falha,
        contador,        
        timeOut,
        setConfirma,
        setAviso,             
        setSelectedCard,
        deletarDica  
    }
}