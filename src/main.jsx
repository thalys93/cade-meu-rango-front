// Libs
import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './routes'

// Utils
import { DarkModeProvider } from './utils/context/DarkModeContext'
import { DeveloperProvider } from './utils/context/DevContext'
import { UserAutenticatedProvider } from './utils/context/UserContext'

// CSS
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
