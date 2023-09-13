const hatSVG = '/assets/svg/chapeuzinho.svg'

// TODO: 
// 1. Criar componente de loading e adicionar um spinner do material UI


function HatLoadingComponent() {
  return (    
    <>
      <img src={hatSVG} alt="Chapeuzinho" width={200} height={200} />
    </>
  )
}

export default HatLoadingComponent