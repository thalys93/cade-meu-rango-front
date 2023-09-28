import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { DarkModeContext } from '../../utils/context/DarkModeContext'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

function BackComponent() {
  const {isDarkMode} = useContext(DarkModeContext)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderTooltip = (props: any) => (
    <Tooltip {...props}>
      Voltar para a página anterior?
    </Tooltip>
  );

  
  return (
    <OverlayTrigger overlay={renderTooltip} placement='right'>
    <Link className={isDarkMode? 'text-4xl text-light' : 'text-4xl text-slate-900'} to='/'>
          <BiArrowBack/>              
    </Link>
    </OverlayTrigger>
  )
}

export default BackComponent