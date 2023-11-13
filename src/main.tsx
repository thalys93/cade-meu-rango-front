import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './utils/routes'

import './assets/css/global/styles.css'
import { DarkModeProvider } from './utils/context/DarkModeContext'
import { AuthProvider } from './utils/context/AuthModeContext'
import { Provider } from 'react-redux'
import store from './utils/redux/store'

ReactDOM.createRoot(document.getElementById('root')!).render(  
  <Provider store={store}>
    <AuthProvider>
      <DarkModeProvider>
        <Routes />
      </DarkModeProvider>
    </AuthProvider>  
    </Provider>
)
