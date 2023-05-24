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

// CSS
  import './offCanvas.css';

function BannerUtils() {
  const { open, toggle, adminUser } = OffCanvasUtils()
  const { isDarkMode, toggleDarkMode } = React.useContext(DarkModeContext);
  const { toggleDevMode } = React.useContext(DeveLoperContext);    

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
              Olá {adminUser.usuario}
            </h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ol className="list-group gap-3 text-center">
            <Link
              to="/login"
              className={isDarkMode? "btn btn-outline-primary": "btn btn-outline-primary"}
            >
              <BiUserCircle />
              <span> Login </span>
            </Link>

            <Link to='/config' className={ isDarkMode ? "btn btn-outline-light" : "btn btn-outline-secondary"}>
              <BiCog /> <span> Configurações </span>
            </Link>

            <button
              className={isDarkMode? "btn btn-outline-warning": "btn btn-outline-warning"}
              onClick={toggleDevMode}
            >
              <AiOutlineTool /> <span> Ativar DevMode </span>
            </button>

            <button
              className={
                isDarkMode ? "btn btn-outline-danger" : "btn btn-outline-danger"
              }
            >
              <BiExit /> <span> Logout </span>
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