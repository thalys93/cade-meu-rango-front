// Libs
import React from 'react'
import { Offcanvas } from 'react-bootstrap'
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineTool } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { BiCog } from "react-icons/bi";
import { BiExit } from "react-icons/bi";
import { Link } from 'react-router-dom'

// Utils
import { OffCanvasUtils } from '../../../utils/offCanvas'
import { DarkModeContext } from '../../../utils/context/DarkModeContext'
import { DeveLoperContext } from "../../../utils/context/DevContext";
import { UserAutenticatedContext } from '../../../utils/context/UserContext';

// CSS
  import './offCanvas.css';
import { loginUtils } from '../../../utils/auth/login';

function BannerUtils({salvaUsuario}) {
  const { open, toggle, adminUser } = OffCanvasUtils()
  
  const { salvaDados } = loginUtils();

  const { isDarkMode, toggleDarkMode } = React.useContext(DarkModeContext);
  const { toggleDevMode } = React.useContext(DeveLoperContext);
  const { isLogged, toggleLoggedMode } = React.useContext(UserAutenticatedContext);

  return (
    <>
      <div>
        <button
          className={isDarkMode ? "btnLoginDark mt-2" : "btnLogin mt-2"}
          onClick={toggle}
        >
          <AiOutlineMenu />
        </button>
      </div>

      <Offcanvas show={open} className={isDarkMode ? "bg-dark" : "bg-body"} onHide={toggle} placement="end" scroll={true}>
        <Offcanvas.Header>
          <Offcanvas.Title className='offCanvasTitle'>
            <h3
              className={isDarkMode? "user-select-none text-light": "user-select-none text-black"}
            >
              Olá <span hidden={!isLogged}> Admin </span>!
            </h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ol className="list-group gap-3 text-center">
            <Link to="/login" hidden={isLogged} className={isDarkMode? "btn btn-outline-primary": "btn btn-outline-primary"}
            >
              <BiUserCircle className='icon'/>
              <span> Login </span>
            </Link>

            <Link to='/config' className={ isDarkMode ? "btn btn-outline-light disabled" : "btn btn-outline-secondary disabled"}>
              <BiCog className='icon'/> <span> Configurações </span>
            </Link>

            <button hidden={!isLogged} className={isDarkMode? "btn btn-outline-warning" : "btn btn-outline-warning "} onClick={toggleDevMode} >
              <AiOutlineTool className='icon'/> <span> Ativar Edição </span>
            </button>

            <button
              className={isDarkMode ? "btn btn-outline-danger" : "btn btn-outline-danger "} onClick={toggle} onClickCapture={toggleLoggedMode}>
              <BiExit className='icon'/> <span> Logout </span>
            </button>
          </ol>
          <footer className='text-center footerCanvas user-select-none'>
          <span className={isDarkMode? 'text-light-emphasis' : 'text-dark'}> CMR © Todos os Direitos Reservados</span>
          </footer>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default BannerUtils