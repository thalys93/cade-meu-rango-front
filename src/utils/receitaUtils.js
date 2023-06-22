import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getRecipesById, putRecipes } from './api/services/api';

export function ReceitaUtils() {

    const { id } = useParams();

    // Estados do React
    const [receita, setReceita] = useState([])
    const [falha, setFalha] = useState(false)
    const [isLoading, setIsloading] = useState(false) 
    const [status, setStatus] = useState('');    



    // Lógica para Buscar Dados Na Api
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRecipesById(id);
                setReceita(data);
                setFalha(false);   
                setStatus(data.status);
            } catch (error) {                
                setFalha(false);
                setStatus(error.code);                                                                   
            } finally {
                setTimeout(() => {
                    setIsloading(false);
                }, 1000);                
            }
        };
        fetchData();
    }, [id]);

    // Lógica para Atualizar Dados Na Api
    const updateData = async (data) => {
      try {
        const ingredientes = receita.ingredientes.map((ing, i) => {
          const quantidadeE = document.getElementById(
            `ingredienteQuantidade_${i}`
          ).innerText;
          const nomeE = document.getElementById(
            `ingredienteNome_${i}`
          ).innerText;
          return {
            quantidade: quantidadeE,
            nome: nomeE,
          };
        });

        const modoPreparo = receita.modoPreparo.map((mode, i) => {
          const descricaoE = document.getElementById(
            `preparoDescricao_${i}`
          ).innerText;
          return {
            descricao: descricaoE,
          };
        });

        const data = {
          id: id,
          titulo: document.getElementById("receitaTitulo").innerText,
          descricao: document.getElementById("receitaDescricao").innerText,
          ingredientes: ingredientes,
          modoPreparo: modoPreparo,
        };

        const response = await putRecipes(id, data);
        window.location.reload();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };    

    return { 
        receita,
        falha, 
        isLoading,    
        status,
        updateData  
    };
}
