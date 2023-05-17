// Import do React
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { DarkModeContext } from './utils/api/context/darkModeContext/DarkModeContext'
import { DeveLoperContext } from './utils/api/context/devContext/DevContext'
import TestingDev from './interface/test/TestingDev'

// Import dos Componentes
import Footer from './interface/footer-component/Footer'


function App() {  
  const { isDarkMode } = React.useContext(DarkModeContext)
  const { isDev } = React.useContext(DeveLoperContext)
  

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('Darkbody')
    } else {
      document.body.classList.remove('Darkbody')
    }
  }, [isDarkMode]);

  return (
    <main>      
      {isDev && 
      <div className='animate__animated animate__fadeInUp'>
        <TestingDev/>
      </div>
      }

      {/* Rotas */}
      <Outlet />      

      {/* Importação do Footer */}
      <Footer />
    </main>
  )
}

export default App
