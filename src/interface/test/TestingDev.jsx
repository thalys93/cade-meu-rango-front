// Libs
import React from 'react'
import { Badge } from 'react-bootstrap'

// Utils
import { DarkModeContext } from '../../utils/context/DarkModeContext'

// CSS
import './badge.css'

function TestingDev() {
  const { isDarkMode } = React.useContext(DarkModeContext)    

  return (
      <Badge bg={isDarkMode? 'success' :'success'} className='user-select-none' id='badgeDev'>
        <h2 className='DarkTxt'> Admin </h2>
      </Badge>
  )
}

export default TestingDev