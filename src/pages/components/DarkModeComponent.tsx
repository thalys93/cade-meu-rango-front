import React from 'react'
import { GiMoon } from 'react-icons/gi'
import { BsSun } from 'react-icons/bs'

function DarkModeComponent() {

    const [isDarkMode, setIsDarkMode] = React.useState(false)

    const handleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
        const html = document.querySelector('html')
        if (html) {
            html.classList.toggle('dark')
        }else{
            console.log('erro')
        }      
    }

  return (
    <button className='absolute p-2 right-8 mt-2 bg-orange_primary rounded-full' onClick={handleDarkMode}>
        {isDarkMode ? <GiMoon className='text-2xl transition-all text-white'/> : <BsSun className='text-2xl transition-all text-white' />}
    </button>
  )
}

export default DarkModeComponent