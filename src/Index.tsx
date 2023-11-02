import React, { useContext } from 'react'
import { IndexUtils } from './utils/index';

import HatLoadingComponent from "./pages/components/HatLoadingComponent";
import BannerComponent from './pages/components/BannerComponent';
import NavegationComponent from './pages/components/NavegationComponent';
import FooterComponent from './pages/components/FooterComponent';
import { AuthContext } from './utils/context/AuthModeContext';
import ProfileBadge from './pages/components/ProfileBadge';

function Index() {

  const { isLoading } = IndexUtils();
  const authContext = useContext(AuthContext);
  
  return (
    <>
      {isLoading ? (
        <section className='loading-logo-align animate__animated animate__fadeIn'>
          <HatLoadingComponent />
        </section>
      ) : (
        <section>
          <article className='p-3'>
            <nav>
              <BannerComponent />
              {authContext && authContext.user && <ProfileBadge />}
              <NavegationComponent />
            </nav>
          </article>
          <FooterComponent />
        </section>
      )}
    </>
  )
}

export default Index
