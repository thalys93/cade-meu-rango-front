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


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeProvider>
      <Routes />
    </DarkModeProvider>
  </React.StrictMode>,
)
