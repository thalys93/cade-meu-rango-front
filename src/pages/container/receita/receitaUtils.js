import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { getRecipesById } from '../../../utils/api/services/api'

export function ReceitaUtils() {

    const { id } = useParams();

    // Estados do React
    const [receita, setReceita] = useState([])
    const [falha, setFalha] = useState(false)
    const [isLoading, setIsloading] = useState(false)

    const [ingredientes, setIngredientes] = useState([
        { id: 1, nome: "Ovo", quantidade: 2, unidade: "un" },
        { id: 2, nome: "Farinha de Trigo", quantidade: 2, unidade: "xíc" },
        { id: 3, nome: "Leite", quantidade: 1, unidade: "xíc" },
    ]);

    const [confirmaIngrediente, setConfirmaIngrediente] = useState('');

    const [modoPreparo, setModoPreparo] = useState([
        { id: 1, descricao: "Misture todos os ingredientes" },
        { id: 2, descricao: "Prepare o Molho" },
        { id: 3, descricao: "Cozinhe a massa" },
        { id: 4, descricao: "Sirva" },
    ]);    


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

    function modificarIngredientes (id, novoNome, novaQuantidade, novaUnidade) {
     setIngredientes(ingredientes.map(ingrediente => {
         if (ingrediente.id === id) {
                ingrediente.nome = novoNome;
                ingrediente.quantidade = novaQuantidade;
                ingrediente.unidade = novaUnidade;
            }
            return ingrediente;
        }));
    }



    function modificarModoPreparo (id, novaDescricao) {
        setModoPreparo(modoPreparo.map(modo => {
            if (modo.id === id) {
                modo.descricao = novaDescricao;
            }
            return modo;
        }));        
    }


    return { 
        receita, 
        falha, 
        isLoading,
        ingredientes,
        modoPreparo,
        modificarIngredientes,
        modificarModoPreparo      
    };
}
