// Libs
import React from 'react'
import { Card, OverlayTrigger, Popover } from 'react-bootstrap'
import { IoIosQuote } from 'react-icons/io'
import { BsTrashFill } from 'react-icons/bs'
import { BsPencilFill } from 'react-icons/bs';

// Services
import { DarkModeContext } from '../../../utils/context/DarkModeContext'
import { TipUtils } from '../../../utils/TipUtils';

// Componentes

// CSS
import '../tips.css'

function DicasCard({id, title, descricao, cardData, onUpdateCard, cardSelecionado, deletarDica, atualizarDica}) {
  const { isDarkMode } = React.useContext(DarkModeContext)  
  const {
    aviso,
    confirma,
    setAviso,
    setConfirma
  } = TipUtils();

  return (
    <>
    <Card key={id} className={isDarkMode? 'bg-dark animate__animated animate__fadeIn user-select-none' : 'bg-light user-select-none'} id="CardShadow" style={{ width: '17rem'}}>
      <Card.Header>
        <div className='text-end'>

        {MotrarAvisoDeletar()}

        <button 
        className={isDarkMode? 'me-3 btn btn-outline-danger' : 'me-3 btn btn-danger'} 
        hidden={!cardSelecionado} onClick={() => setAviso(true)}> <BsTrashFill/> Apagar </button>

        <button 
        className={isDarkMode? 'me-3 btn btn-outline-success' : 'me-3 btn btn-success'} 
        hidden={!cardSelecionado}> <BsPencilFill/> Editar </button>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title className={isDarkMode? 'DarkTxt' : 'txt'}>
            Dica De Hoje <small className='text-light-empashis'>{cardData}</small> <br/>
            <small className={isDarkMode? 'DarkTxt text-secondary' : 'txt text-secondary'}>{title}</small>
          </Card.Title>
        <Card.Text className='text-center TipCard'>                  
            <IoIosQuote className={isDarkMode? 'Icon enfatize': 'Icon enfatize'}/> 
            <p className={isDarkMode? 'DarkTxt': 'txt'}> {descricao}</p>
        </Card.Text>
      </Card.Body>
    </Card>
    </>
  )
}

export default DicasCard


function MotrarAvisoDeletar() {  
  const deletar = (
      <Popover>
        <Popover.Header className='text-center'>
          <span>Deseja Deletar a Dica?</span>
        </Popover.Header>
        <Popover.Body className='text-center'>
          <button className="btn btn-outline-danger me-2">Sim</button>
          <button className="btn btn-outline-primary">Não</button>
        </Popover.Body>
      </Popover>
    )

  return( 
    <OverlayTrigger trigger='click' placement='top' overlay={deletar}>
    </OverlayTrigger>
  )
}
