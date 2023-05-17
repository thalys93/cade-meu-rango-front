import React from 'react'
import { DarkModeContext } from '../../utils/api/context/darkModeContext/DarkModeContext'
import { Badge } from 'react-bootstrap'

import './badge.css'

function TestingDev() {
  const { isDarkMode } = React.useContext(DarkModeContext)
  return (
      <Badge bg={isDarkMode? 'warning' :'danger'} className='user-select-none' id='badgeDev'>
        <h2 className={isDarkMode? 'DarkTxt' : 'txt'}> Dev </h2>
      </Badge>
  )
}

export default TestingDev