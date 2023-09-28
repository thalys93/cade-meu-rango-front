import React, { useContext } from 'react'
import { DarkModeContext } from '../../utils/context/DarkModeContext'
import DarkModeComponent from './DarkModeComponent';

function BannerComponent() {

  const {isDarkMode} = useContext(DarkModeContext)

  return (
    <section >                
        <article className={isDarkMode? 'pb-44 imgBGDARK rounded-t-xl' : 'pb-44 imgBG rounded-t-xl'}>
            <div className='titleBanner'>
                <DarkModeComponent/>
                <h1 className='text-orange_primary font-title-sy text-6xl inset-0'> Cadê Meu Rango </h1>
                <h3 className='text-white font-title-sy text-2xl mediaText'> Seu Site de Receitas Favorito </h3>
            </div>
        </article>        
    </section>    
  )
}

export default BannerComponent