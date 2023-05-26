import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { getRecipesById } from './api/services/api'

export function ReceitaUtils() {

    const { id } = useParams();

    // Estados do React
    const [receita, setReceita] = useState([])
    const [ingredientes, setIngredientes] = useState([])
    const [modoDePreparo, setModoDePreparo] = useState([])


    const [falha, setFalha] = useState(false)
    const [isLoading, setIsloading] = useState(false) 



    // Lógica para Buscar Dados Na Api
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRecipesById(id);
                setReceita(data);
                setIngredientes(data.ingredientes);
                setModoDePreparo(data.modoDePreparo);
                // console.log('Dados da Api', data)
                setFalha(false);                            
            } catch (error) {
                console.log('Erro Na Api', error)
                setFalha(true);
            } finally {
                setTimeout(() => {
                    setIsloading(false);
                }, 1000);                
            }
        };
        fetchData();
    }, [id]);    

    return { 
        receita,
        ingredientes,
        modoDePreparo,
        falha, 
        isLoading        
    };
}
