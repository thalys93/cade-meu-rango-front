// Import do React e do Router
import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// App
import App from './App'

// Página de Error
import Error from './interface/error/Error'

// Receita
import Receita from './pages/container/receita/Receita'
import ReceitaCard from './pages/receita/ReceitaCard'

// Página Inicial
import Home from './pages/home/Home'

// Login
import Login from './pages/Login/Login'

// Criar Conta
import Cadastro from './pages/Login/Cadastro'


const router = createBrowserRouter([
    // Index
    {        
        path: '/',
        element: <App/>,
        errorElement: <Error/>,
        children: [
            // Página Inicial
            {
                path: '/',
                element: <Home/>                
            },
                // Receita
            {
                path: 'receita/',
                element: <Receita/>,
                children: [
                {
                    path: ':id/:nome',
                    element: <ReceitaCard/>,
                },  
                ]        
            },
                // Dicas
            {
                path: 'Tips',
                //element: Livros
                //children: []
            }
        ]
    },
    
    // Login
    {
        path: 'Login',
        element: <Login/>,
    },

    // Criar Conta
    {
        path: 'Cadastro',
        element : <Cadastro/>
    }
])    
    

function Routes() {
  return (
    <RouterProvider router={router}/>
  )
}

export default Routes