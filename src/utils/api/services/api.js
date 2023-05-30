// Axios
import axios from "axios"

// Variáveis de Ambiente
const receitaAPI = "http://26.113.157.114:8080/receitas/";
const tipsAPI = "http://26.113.157.114:8080/dicas/";
const BooksAPI = "http://26.113.157.114:8080/livros";

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
        return response.data        
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

// Exportações Dicas
// Dicas (GET)
export const getTips = async () => {
    try {
        const response = await axios.get(tipsAPI)
        return response.data
        // ,console.log(response.data);
    } catch (error) {
        console.error('Falha ao Se Comunicar com o Servidor', error);
    }
}
// Dicas (GET) por ID
export const getTipsById = async (id) => {
    try {
        const response = await axios.get(tipsAPI + id);
        return response.data        
    } catch (error) {
        console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}
// Dicas (POST)
export const postTips = async (data) => {
    try {
        const response = await axios.post(tipsAPI, data);
        return response.data;
        // ,console.log(response.data);
    } catch (error) {
        console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}
// Dicas (PUT)
export const putTips = async (data) => {
    try {
        const response = await axios.put(tipsAPI, data);
        return response.data;
        // ,console.log(response.data);
    } catch (error) {
        console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}
// Dicas (DELETE)
export const deleteTips = async (id) => {
    try {
        const response = await axios.delete(tipsAPI + id);
        return response.data;
    } catch (error) { 
        console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}

// Exportações Livros
// Livros (GET)
export const getBooks = async () => {
    try {
        const response = await axios.get(BooksAPI)
        return response.data
        // ,console.log(response.data);
    } catch (error) {
        console.error('Falha ao Se Comunicar com o Servidor', error);
    }
}
// Livros (GET) por ID
export const getBooksById = async (id) => {
    try {
        const response = await axios.get(BooksAPI + id);
        return response.data        
    } catch (error) {
        console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}
// Livros (POST)
export const postBooks = async (data) => {
    try {
        const response = await axios.post(BooksAPI, data);
        return response.data;
        // ,console.log(response.data);
    } catch (error) {
        console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}
// Livros (PUT)
export const putBooks = async (data) => {
    try {
        const response = await axios.put(BooksAPI, data);
        return response.data;
        // ,console.log(response.data);
    } catch (error) {
        console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}
// Livros (DELETE)
export const deleteBooks = async (id) => {
    try {
        const response = await axios.delete(BooksAPI + id);
        return response.data;
        // ,console.log(response.data);
    } catch (error) { 
        console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}
