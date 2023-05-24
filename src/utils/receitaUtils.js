import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { getRecipesById } from './api/services/api'

export function ReceitaUtils() {

    const { id } = useParams();

    // Estados do React
    const [receita, setReceita] = useState([])
    const [falha, setFalha] = useState(false)
<<<<<<< Updated upstream
    const [isLoading, setIsloading] = useState(false)    
=======
    const [isLoading, setIsloading] = useState(false)

    const [confirmaIngrediente, setConfirmaIngrediente] = useState('');

    const [modoPreparo, setModoPreparo] = useState([
        { id: 1, descricao: "Misture todos os ingredientes" },
        { id: 2, descricao: "Prepare o Molho" },
        { id: 3, descricao: "Cozinhe a massa" },
        { id: 4, descricao: "Sirva" },
    ]);    
>>>>>>> Stashed changes


    // Lógica para Buscar Dados Na Api
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRecipesById(id);
                setReceita(data);
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

<<<<<<< Updated upstream
    return { 
        receita, 
        falha, 
        isLoading        
=======


    return { 
        receita, 
        falha, 
        isLoading,        
        modoPreparo,
>>>>>>> Stashed changes
    };
}
