import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './utils/routes.tsx'

import './assets/css/global/styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
)
