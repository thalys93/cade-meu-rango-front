import React, { useContext } from 'react'
import { ProgressBar, Toast, ToastContainer } from 'react-bootstrap'
import { DarkModeContext } from '../../utils/context/DarkModeContext'

function PopupComponent(props: { title?: string, statusCode?: number, error?: boolean, }) {

    const { isDarkMode } = useContext(DarkModeContext)

    const getStatusColor = (statusCode) => {
        if (statusCode === 200) {
            return 'success'
        } else if (statusCode === 201) {
            return 'info'
        } else if (statusCode === 400 || props.statusCode === 422) {
            return 'warning'
        } else if (statusCode === 500) {
            return 'danger'
        } else {
            return 'primary'
        }
    }

    return (
        <ToastContainer position="top-center" className='p-3'>            
                <Toast className={isDarkMode ? 'bg-slate-700 animate__animated animate__fadeIn ' : 'bg-white animate__animated animate__fadeIn'}>
                    <Toast.Header>
                        <strong>{props.title}</strong>
                        <small className={`text-${getStatusColor(props.statusCode)} user-select-none animate-bounce pl-4`}>{props.statusCode}</small>
                    </Toast.Header>
                    <Toast.Body>
                        <ProgressBar animated now={45} variant={getStatusColor(props.statusCode)} />
                    </Toast.Body>
                </Toast>            
        </ToastContainer>
    )
}

export default PopupComponent