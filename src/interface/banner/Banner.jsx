// Libs
import React from 'react'
import {BsMoonStars} from 'react-icons/bs'

// Utils
import { DarkModeContext } from '../../utils/context/DarkModeContext'

// Componente
import CadeMeuRango from '../../interface/banner/CadeMeuRango'
import BannerUtils from './offCanvas/bannerUtils'

function Banner () {
  const { isDarkMode, toggleDarkMode } = React.useContext(DarkModeContext)  

  return (
    <div className={isDarkMode ? "DarkBanner" : "banner"}>
      <div className="ButtonDiv mb-2">
          <BannerUtils />
        <div>
          <button
            className={isDarkMode ? "btnLoginDark mt-2" : "btnLogin mt-2"}
            onClick={toggleDarkMode}
          >
            <BsMoonStars />
          </button>
        </div>        

      </div>
      <CadeMeuRango />
      <h1 className="line" />
    </div>
  );
}

export default Banner
