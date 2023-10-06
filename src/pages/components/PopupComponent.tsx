import React, { useContext } from 'react'
import { ProgressBar, Toast } from 'react-bootstrap'
import { DarkModeContext } from '../../utils/context/DarkModeContext'

function PopupComponent(props: {title?: string , statusCode?: number, error?: boolean,  } ) { 
    const {isDarkMode} = useContext(DarkModeContext)

  return (
    <>
    {props.statusCode === 200 && props.error === false && (
    <Toast>
        <Toast.Header>
            Aviso
        </Toast.Header>
        <Toast.Body>
            <ProgressBar animated now={45} />
        </Toast.Body>
    </Toast>
    )}:{(
    <Toast>
        <Toast.Header>
            Aviso
        </Toast.Header>
        <Toast.Body>
            <ProgressBar animated now={45} />
        </Toast.Body>
    </Toast>    
    )}    
     </>
  )
}

export default PopupComponent