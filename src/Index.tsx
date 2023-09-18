import React from 'react'
import { IndexUtils } from './utils/index';

import HatLoadingComponent from "./pages/components/hatLoadingComponent";
import BannerComponent from './pages/components/BannerComponent';

function Index() {

    const { isLoading } = IndexUtils();

  return (
    <>
    {isLoading? ( 
        <section className='loading-logo-align animate__animated animate__fadeIn'>                
        <HatLoadingComponent />
      </section>
    ) : (
      <section className='p-3'>
      <nav>
        <BannerComponent/>
      </nav>

      </section>
    )}
    </>
  )
}

export default Index
