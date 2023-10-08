import React, { useContext } from 'react'
import { ProgressBar, Toast } from 'react-bootstrap'
import { DarkModeContext } from '../../utils/context/DarkModeContext'

function PopupComponent(props: {title?: string , statusCode?: number, error?: boolean,  } ) { 
    const {isDarkMode} = useContext(DarkModeContext)

  return (
    <>
    <Toast className={isDarkMode? 'bg-slate-700' : 'bg-white'}>
        <Toast.Header>
            {props.title } | {props.statusCode}
        </Toast.Header>
        <Toast.Body>
            <ProgressBar animated now={45}  variant={props.statusCode === 201 ? 'success' : 'warning'}/>
        </Toast.Body>
    </Toast>    
     </>
  )
}

export default PopupComponent