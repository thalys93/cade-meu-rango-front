import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"

import HatLoadingComponent from "./pages/components/hatLoadingComponent.tsx";

function Index() {

  /* TODO: 
    - Terminar a lógica da index
    - Criar um Arquivo TS para dividir a Lógica
    - Deixar a Função apenas para renderizar o componente
  */

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(true);      
    }, 1500)

    return () => {
      clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      navigate('/home');
    }
  }, [isLoading, navigate]);

  return (
    <>
    {isLoading? ( 
      <article>
        <div>          
            <HatLoadingComponent />          
        </div>
      </article>
    ) : (
      <>
        <Outlet/>
      </>
    )}
    </>
  )
}

export default Index
