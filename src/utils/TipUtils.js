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
    const [modoDeEdicao, setModoDeEdicao] = useState(false);

    const [dadosEditados, setDadosEditados] = useState({
      titulo: cardTips.titulo,
      descricao: cardTips.descricao,
    });

    const editarDicas = () => {setModoDeEdicao(true);};
        
    const [carregou, setCarregou] = useState(false);    
    const [falha, setfalha] = useState(false);    
    const [contador, setContador] = useState(0);


    // Atualizar
    const atualizarDica = async (dadosEditados) => {
        if (confirma) {
        try {
            await putTips(dadosEditados);
            const data = await getTips();
            // setCardTips(data);                        
            setTimeOut(() => {window.location.reload();}
            , 100);            
        } catch (error) {
            setfalha(true);
            console.log('falha ao atualizar a dica')
        }
        }
    }   


    // Apagar
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
        modoDeEdicao,
        setModoDeEdicao,
        dadosEditados,
        setDadosEditados,
        editarDicas,            
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