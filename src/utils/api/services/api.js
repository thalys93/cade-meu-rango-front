// Axios
import axios from "axios"

// Variáveis de Ambiente
const local = 'http://localhost:3000/api';
const receitaAPI = "/receitas/";
const tipsAPI = "/dicas/";
const BooksAPI = "/livros";

// Exportações Receitas
// Receitas (GET)
export const getRecipes = async () => {
    try {
        const response = await axios.get(local + receitaAPI)
        return response        
        // ,console.log(response.data);
    } catch (error) {
        // console.error('Falha ao Se Comunicar com o Servidor', error);
    }
}
// Receitas (GET) por ID
export const getRecipesById = async (id) => {
    try {
        const response = await axios.get(local + receitaAPI + id);
        return response.data        
    } catch (error) {
        // console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}
// Receitas (POST)
export const postRecipes = async (data) => {
    try {
        const response = await axios.post(local +  receitaAPI + data);
        return response.data;
        // ,console.log(response.data);
    } catch (error) {
        // console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}
// Receitas (PUT)
export const putRecipes = async (id, data) => {
    try {
        const response = await axios.put(local + `/receitas/${id}` , data);
        return response.data;
        // ,console.log(response.data);
    } catch (error) {
        // console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}
// Receitas (DELETE)
export const deleteRecipes = async (id) => {
    try {
        const response = await axios.delete(local + receitaAPI + id);
        return response.data;
        // ,console.log(response.data);
    } catch (error) { 
        // console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}

// Exportações Dicas
// Dicas (GET)
export const getTips = async () => {
    try {
        const response = await axios.get(local + tipsAPI)
        return response.data
        // ,console.log(response.data);
    } catch (error) {
        // console.error('Falha ao Se Comunicar com o Servidor', error);
    }
}
// Dicas (GET) por ID
export const getTipsById = async (id) => {
    try {
        const response = await axios.get(local + tipsAPI + id);
        return response.data        
    } catch (error) {
        // console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}
// Dicas (POST)
export const postTips = async (data) => {
    try {
        const response = await axios.post(local + tipsAPI, data);
        return response.data;
        // ,console.log(response.data);
    } catch (error) {
        // console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}
// Dicas (PUT)
export const putTips = async (id, data) => {
    try {
        const response = await axios.put(local + `/dicas/${id}`, data);
        return response.data;
        // ,console.log(response.data);
    } catch (error) {
        // console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}
// Dicas (DELETE)
export const deleteTips = async (id) => {
    try {
        const response = await axios.delete(local + tipsAPI + id);
        return response.data;
    } catch (error) { 
        // console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}

// Exportações Livros
// Livros (GET)
export const getBooks = async () => {
    try {
        const response = await axios.get(local + BooksAPI);
        return response.data
        // ,console.log(response.data);
    } catch (error) {
        // console.error('Falha ao Se Comunicar com o Servidor', error);
    }
}
// Livros (GET) por ID
export const getBooksById = async (id) => {
    try {
        const response = await axios.get(local + BooksAPI + id);
        return response.data        
    } catch (error) {
        // console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}
// Livros (POST)
export const postBooks = async (data) => {
    try {
        const response = await axios.post(local + BooksAPI, data);
        return response.data;
        // ,console.log(response.data);
    } catch (error) {
        // console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}
// Livros (PUT)
export const putBooks = async (id, data) => {
    try {
        const response = await axios.put(local + `/livros/${id}`, data);
        return response.data;
        // ,console.log(response.data);
    } catch (error) {
        // console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}
// Livros (DELETE)
export const deleteBooks = async (id) => {
    try {
        const response = await axios.delete(local + BooksAPI + id);
        return response.data;
        // ,console.log(response.data);
    } catch (error) { 
        // console.error('Falha ao Se Comunicar com o Servidor', error);
        throw error;
    }
}
