import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './utils/routes'

import './assets/css/global/styles.css'
import { DarkModeProvider } from './utils/context/DarkModeContext'
import { AuthProvider } from './utils/context/AuthModeContext'

ReactDOM.createRoot(document.getElementById('root')!).render(  
    <AuthProvider>
      <DarkModeProvider>
        <Routes />
      </DarkModeProvider>
    </AuthProvider>  
)
