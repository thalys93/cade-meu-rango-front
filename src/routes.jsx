// Import do React e do Router
import React, { useContext } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// App
import App from './App'

// Página Inicial
import Index from './pages'

// Página de Error
import Error from './interface/error/Error'

// Receita
import Receita from './pages/receita/container/Receita'
import NovaReceita from './pages/receita/container/novaReceita'

// Login
import Login from './pages/Login/Login'
// Cadastro
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
                element: <Index/>                
            },
                // Receita
            {
                path: 'receita/',
                element: <Receita/>,
                children: [
                {                    
                    path: ':id/:nome',            
                    element: <Receita/>,
                },
                ]
            },
            {
                    path: 'Receita/Adicionar_Receita',                    
                    element: <NovaReceita/>,
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