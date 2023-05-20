// React
import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './routes'

import { DarkModeProvider } from './utils/api/context/darkModeContext/DarkModeContext'
import { DeveloperProvider } from './utils/api/context/devContext/DevContext'
import { UserAutenticatedProvider } from './utils/api/context/userAutenticatedContext/isLogged'

// Import do CSS
import './interface/css/global.css'
import './interface/css/respon.css'
import './interface/css/darkmode.css'
import 'animate.css'


ReactDOM.createRoot(document.getElementById('root')).render(  
    <DarkModeProvider>  {/* Camada do Modo Escuro */}
      <DeveloperProvider> {/* Camada de Desenvolvedor (temporário) */}
        <UserAutenticatedProvider> {/* Camada de Usuário */}
          <Routes />
        </UserAutenticatedProvider>
      </DeveloperProvider>
    </DarkModeProvider> 
)
