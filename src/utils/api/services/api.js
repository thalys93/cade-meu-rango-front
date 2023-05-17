// Axios
import axios from "axios";

// Variáveis de Ambiente

// Receitas
const receitaAPI = 'http://26.153.141.161:8080/receitas/';

// Exportações Receitas

// Receitas (GET)
export const getRecipes = async () => {
    try {
        const response = await axios.get(receitaAPI)
        return response.data
        // ,console.log(response.data);
    } catch (error) {
        console.error('Falha ao Se Comunicar com o Servidor', error);
    }
}

// Receitas (GET) por ID
export const getRecipesById = async (id) => {
    try {
        const response = await axios.get(receitaAPI + id);
        return response.data;
        // ,console.log(response.data);
    } catch (error) {
        console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}

// Receitas (POST)
export const postRecipes = async (data) => {
    try {
        const response = await axios.post(receitaAPI, data);
        return response.data;
        // ,console.log(response.data);
    } catch (error) {
        console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}

// Receitas (PUT)
export const putRecipes = async (data) => {
    try {
        const response = await axios.put(receitaAPI, data);
        return response.data;
        // ,console.log(response.data);
    } catch (error) {
        console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}

// Receitas (DELETE)
export const deleteRecipes = async (id) => {
    try {
        const response = await axios.delete(receitaAPI + id);
        return response.data;
        // ,console.log(response.data);
    } catch (error) { 
        console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}

// Exportações Usuarios

// Variável de Ambiente
const userAPI = "http://26.153.141.161:8080/usuarios";

export const getUsers = async () => {
    try {
            const response = await axios.get(userAPI)
            return response.data
            // ,console.log(response.data);
        } catch (error) {
            console.error('Falha ao Se Comunicar com o Servidor', error);
            throw error;
        }
    }    

// Exportações Dicas

// Varível de Ambiente
const tipsAPI = "http://26.153.141.161:8080/dicas";