// Libs
import React , {useParams} from 'react'
import { Card, Overlay, OverlayTrigger, Popover } from 'react-bootstrap'
import { IoIosQuote } from 'react-icons/io'
import { BsTrashFill } from 'react-icons/bs'
import { BsPencilFill } from 'react-icons/bs';

// Services
import { DarkModeContext } from '../../../utils/context/DarkModeContext'
import { TipUtils } from '../../../utils/TipUtils';

// Componentes

// CSS
import '../tips.css'

function DicasCard(props) {
  const { isDarkMode } = React.useContext(DarkModeContext);

  const {
    aviso,        
    modoDeEdicao,
    setModoDeEdicao,               
    setAviso,
    setConfirma,    
    deletarDica
  } = TipUtils();

// Apagar
  const PopoverConfirmação = <Popover show={!aviso} className={isDarkMode ? 'bg-dark txt mb-2' : 'txt mb-2'} placement='none'>
    <Popover.Header className='text-center' as="h3">Tem Certeza?</Popover.Header>
    <Popover.Body>
      <div className='text-center'>
        <button
          className={isDarkMode ? 'btn btn-outline-success me-2' : 'btn btn-success me-2'}
          onClick={() => deletarDica(props.id)} 
          onClickCapture={() => setConfirma(true)}
        >
          Sim
        </button>
        <button
          className={isDarkMode ? 'btn btn-outline-danger' : 'btn btn-danger'}
          onClick={() => setConfirma(false)}
          onClickCapture={() => setAviso(false)}
        >
          Não
        </button>
      </div>
    </Popover.Body>
  </Popover>
    
  // Modo de Edição Ativo
    if(modoDeEdicao) {
      return (
        <>
        <Card key={props.id} className={isDarkMode? 'bg-dark animate__animated animate__fadeIn user-select-none' : 'bg-light user-select-none'} id="CardShadow" style={{ width: '17rem'}}>
          <Card.Header>
            <div className='text-end butonDiv'>
              <button
                className={props.isDarkMode? 'me-3 btn btn-outline-success' : 'me-3 btn btn-success'}
                disabled
                hidden={!props.cardSelecionado || !props.isDev}
              >
                <BsPencilFill/> Confirmar
              </button>
              <button
                className={props.isDarkMode? 'me-3 btn btn-outline-danger' : 'me-3 btn btn-danger'}
                onClick={() => setModoDeEdicao(false)}                
                hidden={!props.cardSelecionado || !props.isDev}
              >
                <BsTrashFill/> Cancelar
              </button>
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Title className={isDarkMode? 'DarkTxt' : 'txt'}>
              Dica De Hoje: <small className='text-light-empashis'>{props.cardData}</small> <br/>
              <input
                className='txt'
                type='text'                                
                placeholder='Titulo Da Dica'
              />
            </Card.Title>
            <Card.Text className='text-center TipCard'>
              <IoIosQuote className={isDarkMode? 'Icon enfatize': 'Icon enfatize'}/>
              <textarea
                className='txt'
                type='text'                             
                placeholder='Descrição Da Dica'
              />
            </Card.Text>
          </Card.Body>
        </Card>                                        
        </>
      )
    } else {
  return (
    <>      
    <Card key={props.id} className={isDarkMode? 'bg-dark animate__animated animate__fadeIn user-select-none' : 'bg-light user-select-none'} id="CardShadow" style={{ width: '17rem'}}>
      <Card.Header>
        <div className='text-end'>
          {PopoverConfirmação}
          <button 
          className={props.isDarkMode? 'me-3 btn btn-outline-danger' : 'me-3 btn btn-danger'} 
          onClick={() => setAviso(!aviso,)}
          hidden={!props.cardSelecionado || !props.isDev}
          disabled={aviso}
          > <BsTrashFill/> Apagar </button>
          <button 
          className={props.isDarkMode? 'me-3 btn btn-outline-success' : 'me-3 btn btn-success'}           
          hidden={!props.cardSelecionado || !props.isDev}
          disabled          
          > <BsPencilFill/> Editar </button>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title className={isDarkMode? 'DarkTxt' : 'txt'}>            
            Dica De Hoje: <small className='text-light-empashis'>{props.cardData}</small> <br/>
            <small className={isDarkMode? 'DarkTxt text-secondary' : 'txt text-secondary'}>{props.title}</small>
          </Card.Title>
        <Card.Text className='text-center TipCard'>                  
            <IoIosQuote className={isDarkMode? 'Icon enfatize': 'Icon enfatize'}/> 
            <p className={isDarkMode? 'DarkTxt': 'txt'}> {props.descricao}</p>
        </Card.Text>
      </Card.Body>
    </Card>    
    </>        
  )}
}

export default DicasCard
