import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { DarkModeContext } from '../../utils/context/DarkModeContext'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

function BackComponent(props: { href?: string }) {
  const {isDarkMode} = useContext(DarkModeContext)
  const navigate = useNavigate();
  const goBack = () => {
    navigate(`${props.href}`)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderTooltip = (props: any) => (
    <Tooltip {...props}>
      Voltar para a página anterior?
    </Tooltip>
  );

  
  return (
    <OverlayTrigger overlay={renderTooltip} placement='right'>
    <button className={isDarkMode? 'text-4xl text-light' : 'text-4xl text-slate-900'} onClick={goBack}>
          <BiArrowBack/>              
    </button>
    </OverlayTrigger>
  )
}

export default BackComponent