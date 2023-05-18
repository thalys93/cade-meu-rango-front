// React
import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './routes'
import { DarkModeProvider } from './utils/api/context/darkModeContext/DarkModeContext'

// Import do CSS
import './interface/css/global.css'
import './interface/css/respon.css'
import './interface/css/darkmode.css'
import 'animate.css'
import { DeveloperProvider } from './utils/api/context/devContext/DevContext'


ReactDOM.createRoot(document.getElementById('root')).render(  
    <DarkModeProvider>
      <DeveloperProvider>
        <Routes />
      </DeveloperProvider>
    </DarkModeProvider>  
)
