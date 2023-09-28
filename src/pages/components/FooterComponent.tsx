import React, { useContext } from 'react'
import { AiFillLinkedin, AiFillGithub, AiOutlineMail } from 'react-icons/ai';
import { DarkModeContext } from '../../utils/context/DarkModeContext';

function FooterComponent() {
    const {isDarkMode} = useContext(DarkModeContext)

  return (
    <section className={isDarkMode? 'w-full text-center bg-slate-800 p-2' : 'w-full text-center bg-orange_secondary p-2'}>
        <article className='flex justify-between'>
            <div className='flex justify-start pt-3 self-start'>
                <h2 className='font-body-rb text-slate-100 select-none'>© 2023 Cadê Meu Rango. Todos os direitos reservados.</h2>
            </div>
            <div className='text-slate-100'>
                <ul className='flex'>
                    <li className='hover:scale-105 transition-all'>
                        <a href='https://www.linkedin.com/in/luis-rodrigues202/' target='_blank'>
                            <AiFillLinkedin className='iconW'/>
                            <span className='text-sm' id='tx1'>Linkedin</span>
                        </a>
                    </li>

                    <li className='hover:scale-105 transition-all'>                
                        <a href='https://github.com/Little-Tooth-Tecnologies/cade-meu-rango-front/tree/refactor' target='_blank'>
                                <AiFillGithub className='iconW'/>
                                <span className='text-sm' id='tx2'>Github</span>
                        </a>
                    </li>

                    <li className='hover:scale-105 transition-all'>
                        <a href='' target='_blank'>
                                <AiOutlineMail className='iconW'/>
                                <span id='tx3'>Contate-nos</span>
                        </a>
                    </li>
                </ul>
            </div>
        </article>
    </section>
  )
}

export default FooterComponent