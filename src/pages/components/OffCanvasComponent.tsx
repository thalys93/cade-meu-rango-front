import React, { useContext } from 'react'
import { ListGroup, ListGroupItem, Offcanvas, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { RxHamburgerMenu } from 'react-icons/rx'
import { DarkModeContext } from '../../utils/context/DarkModeContext';
import { BiSupport, BiUserCircle } from 'react-icons/bi';
import { LuPanelRightClose } from 'react-icons/lu';
import { FaWrench } from 'react-icons/fa';
import { BsDoorOpen, BsPersonAdd } from 'react-icons/bs';
import { LoginUtils } from '../../utils/auth/login/loginUtils';
import { AuthContext } from '../../utils/context/AuthModeContext';
import PopupComponent from './PopupComponent';

function OffCanvasComponent() {


    const [showCanvas, setShowCanvas] = React.useState(false);
    const handleClose = () => setShowCanvas(false);
    const handleShow = () => setShowCanvas(true);

    const { isDarkMode } = React.useContext(DarkModeContext)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderTooltip = (props: any) => (
        <Tooltip {...props}>
            Abrir Menu
        </Tooltip>
    );

    const { doLogout, show, infoMSG, resStatus, error, loading } = LoginUtils();
    const authContext = useContext(AuthContext);


    return (
        <>
            <OverlayTrigger overlay={renderTooltip} placement='bottom'>
                <button className='absolute p-2 right-2 top-16 mt-2 bg-orange_primary rounded-full hover:scale-95' onClick={handleShow}>
                    <RxHamburgerMenu className='text-2xl transition-all text-white' />
                </button>
            </OverlayTrigger>

            <div hidden={!show}>
                {PopupComponent({ title: infoMSG, statusCode: resStatus, error: error })}
            </div>

            <Offcanvas show={showCanvas} onHide={handleClose} placement='end' className={isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-slate-900'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title> Menu de Ações </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    <ListGroup as="ol" variant='flush' className='gap-2 text-center rounded-md'>
                        {/* Guest Routes */}
                        {!authContext || !authContext.user && (
                            <>
                                <ListGroupItem as="a" href='auth/login' className={isDarkMode ? 'hover:bg-orange_primary hover:text-slate-900 select-none cursor-pointer flex content-center align-middle text-lg' : 'select-none cursor-pointer flex content-center align-middle text-lg hover:bg-orange_primary hover:text-white'}>
                                    <BiUserCircle className='mt-1 mr-2' /> Login
                                </ListGroupItem>

                                <ListGroupItem as="a" href='auth/register' className={isDarkMode ? 'hover:bg-orange_primary hover:text-slate-900 select-none cursor-pointer flex content-center align-middle text-lg' : 'select-none cursor-pointer flex content-center align-middle text-lg hover:bg-orange_primary hover:text-white'}>
                                    <BsPersonAdd className='mt-1 mr-2' /> Registrar
                                </ListGroupItem>
                            </>
                        )}
                        {/* UserProtected Routes */}
                        {authContext && authContext.user && (
                            <>
                                <ListGroupItem as="a" href={"/protected/user/" + authContext?.user?.uid} className={isDarkMode ? 'hover:bg-orange_primary hover:text-slate-900 select-none cursor-pointer flex content-center align-middle text-lg' : 'select-none cursor-pointer flex content-center align-middle text-lg hover:bg-orange_primary hover:text-white'}>
                                    <BiUserCircle className='mt-1 mr-2' /> Meu Perfil
                                </ListGroupItem>

                                {loading? (
                                <ListGroupItem as="a" disabled className={isDarkMode ? 'hover:bg-orange_primary hover:text-slate-900 select-none cursor-pointer flex content-center align-middle text-lg animate-pulse' : 'select-none cursor-pointer flex content-center align-middle text-lg hover:bg-orange_primary hover:text-white animate-pulse'}>
                                    <BsDoorOpen className='mt-1 mr-2' />Encerrando Sessão
                                </ListGroupItem>
                                ) : (
                                <ListGroupItem as="a" onClick={doLogout} className={isDarkMode ? 'hover:bg-orange_primary hover:text-slate-900 select-none cursor-pointer flex content-center align-middle text-lg' : 'select-none cursor-pointer flex content-center align-middle text-lg hover:bg-orange_primary hover:text-white'}>
                                    <BsDoorOpen className='mt-1 mr-2' />Encerrar Sessão
                                </ListGroupItem>
                                )}

                                <ListGroupItem as="a" href='config' className={isDarkMode ? 'hover:bg-orange_primary hover:text-slate-900 select-none cursor-pointer flex content-center align-middle text-lg' : 'select-none cursor-pointer flex content-center align-middle text-lg hover:bg-orange_primary hover:text-white'}>
                                    <FaWrench className='mt-1 mr-2' /> Configurações
                                </ListGroupItem>
                            </>
                        )}
                        <ListGroupItem as="a" href='/support/help' className={isDarkMode ? 'hover:bg-orange_primary hover:text-slate-900 select-none cursor-pointer flex content-center align-middle text-lg' : 'select-none cursor-pointer flex content-center align-middle text-lg hover:bg-orange_primary hover:text-white'}>
                            <BiSupport className='mt-1 mr-2' /> Suporte Técnico
                        </ListGroupItem>
                        <ListGroupItem as="a" onClick={handleClose} className={isDarkMode ? 'hover:bg-orange_primary hover:text-slate-900 select-none cursor-pointer flex content-center align-middle text-lg' : 'select-none cursor-pointer flex content-center align-middle text-lg hover:bg-orange_primary hover:text-white'}>
                            <LuPanelRightClose className='mt-1 mr-2' /> Fechar
                        </ListGroupItem>
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>

        </>
    )
}

export default OffCanvasComponent