import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './utils/routes'

import './assets/css/global/styles.css'
import { DarkModeProvider } from './utils/context/DarkModeContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DarkModeProvider>
      <Routes />
    </DarkModeProvider>
  </React.StrictMode>,
)
