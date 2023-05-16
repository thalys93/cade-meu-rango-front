// Autenticação (esqueleto da autenticação)
import { getUsers } from "../api/services/api"

const AuthService = {

    login :(credenciais) => {
        // Implementar a Lógica de Login
        // Armazenamento das Informações no Local Storage        
    localStorage.setItem('token' , 'token de autenticação')
    },

    logout: () => {
        // Limpar Dados
        // Outras Informações
        localStorage.removeItem('token')
    },

    isLoggedIn: () => {
        // Verificar se o usuário está logado
        return !!localStorage.getItem('token')
    },

    getUserInfo: () => {
        // Obter as Informações do Usuário
        getUsers()
        
        // Exemplo de obtenção de dados
        const token = localStorage.getItem('token');

        return {
            name: 'Nome do Usuário',
            id: 1,
            role: 'admin'
        };
        
    }

}

export default AuthService;