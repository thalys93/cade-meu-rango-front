// Libs
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

// Utils
import { DarkModeContext } from './utils/context/DarkModeContext'
import { DeveLoperContext } from './utils/context/DevContext'


// Componentes
import Footer from './interface/footer-component/Footer'
import TestingDev from './interface/test/TestingDev'
import Banner from './interface/banner/Banner'


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
      <header>
        <Banner/>
      </header>

      {/* Rotas */}
      <Outlet />      

      {/* Importação do Footer */}
      <Footer />
    </main>
  )
}

export default App
