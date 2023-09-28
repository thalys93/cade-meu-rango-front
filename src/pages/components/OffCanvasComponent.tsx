import React from 'react'
import { ListGroup, ListGroupItem, Offcanvas, OverlayTrigger, Tooltip } from 'react-bootstrap';
import {RxHamburgerMenu} from 'react-icons/rx'
import { DarkModeContext } from '../../utils/context/DarkModeContext';
import { BiUserCircle } from 'react-icons/bi';
import { FaWrench } from 'react-icons/fa';
import { BsDoorOpen } from 'react-icons/bs';

function OffCanvasComponent() {


    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { isDarkMode } = React.useContext(DarkModeContext)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderTooltip = (props: any) => (
        <Tooltip {...props}>
          Abrir Menu
        </Tooltip>
      );


  return (
    <>
    <OverlayTrigger overlay={renderTooltip} placement='bottom'>
        <button className='absolute p-2 right-2 top-16 mt-2 bg-orange_primary rounded-full' onClick={handleShow}>
            <RxHamburgerMenu className='text-2xl transition-all text-white'/>
        </button>
    </OverlayTrigger>

    <Offcanvas show={show} onHide={handleClose} placement='end' className={isDarkMode? 'bg-slate-700 text-white' : 'bg-white text-slate-900'}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title> Menu de Ações </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <ListGroup as="ol" variant='flush' className='gap-2 text-center rounded-md'>
                <ListGroupItem as="a" href='auth/login' className={isDarkMode? 'hover:bg-orange_primary hover:text-slate-900 select-none cursor-pointer flex content-center align-middle text-lg' : 'select-none cursor-pointer flex content-center align-middle text-lg hover:bg-orange_primary hover:text-white'}>
                    <BiUserCircle className='mt-1 mr-2'/> Login
                </ListGroupItem>
                <ListGroupItem as="a" href='config' className={isDarkMode? 'hover:bg-orange_primary hover:text-slate-900 select-none cursor-pointer flex content-center align-middle text-lg' : 'select-none cursor-pointer flex content-center align-middle text-lg hover:bg-orange_primary hover:text-white'}>
                    <FaWrench className='mt-1 mr-2'/> Configurações
                </ListGroupItem>
                <ListGroupItem as="a" className={isDarkMode? 'hover:bg-orange_primary hover:text-slate-900 select-none cursor-pointer flex content-center align-middle text-lg' : 'select-none cursor-pointer flex content-center align-middle text-lg hover:bg-orange_primary hover:text-white'}>
                    <BsDoorOpen className='mt-1 mr-2'/>Sair
                </ListGroupItem>
            </ListGroup>        
        </Offcanvas.Body>
    </Offcanvas>

    </>
  )
}

export default OffCanvasComponent