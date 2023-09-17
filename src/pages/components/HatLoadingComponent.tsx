import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const hatSVG = '/assets/svg/chapeuzinho.svg'

// TODO: 
// 1. Criar componente de loading e adicionar um spinner do material UI


function HatLoadingComponent() {

  const [loadingStrings] = useState<string[]>([
    'Carregando...',
    'Aguarde...',
    'Estamos quase lá...',    
  ]);
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex === loadingStrings.length -1 ? 0 : prevIndex + 1);
    }, 2500);

    return () => clearInterval(intervalID);
  }, [loadingStrings]);    


  return (    
    <section className='container pt-52 select-none'>
    <article className='flex w-60 p-5 flex-col bg-orange_primary rounded-full logo-circle '>
        <div className='pl-3 animate-pulse'>
          <img src={hatSVG} alt="Chapeuzinho" width={120} height={120} />
        </div>        
      <span className='text-1xl text-center font-title-sy text-light_primary select-none animate-pulse '>{loadingStrings[currentIndex]}</span>                    
    </article>
    </section>
  )
}

export default HatLoadingComponent