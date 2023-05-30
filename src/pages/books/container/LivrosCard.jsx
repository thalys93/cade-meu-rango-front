// Libs
import React , {useParams} from 'react'
import { Card, Image, Overlay, OverlayTrigger, Popover } from 'react-bootstrap'
import { BsTrashFill } from 'react-icons/bs'
import { BsPencilFill } from 'react-icons/bs';

// Services
import { DarkModeContext } from '../../../utils/context/DarkModeContext'
import { LivrosUtils } from '../../../utils/LivrosUtils';

// CSS

function LivrosCard(props) {
  const { isDarkMode } = React.useContext(DarkModeContext);

  const {
    aviso,            
    setAviso,
    setConfirma,
    deletarLivro,
  } = LivrosUtils();

// Apagar
  const PopoverConfirmação = <Popover show={!aviso} className={isDarkMode ? 'bg-dark txt mb-2' : 'txt mb-2'} placement='none'>
    <Popover.Header className='text-center' as="h3">Tem Certeza?</Popover.Header>
    <Popover.Body>
      <div className='text-center'>
        <button
          className={isDarkMode ? 'btn btn-outline-success me-2' : 'btn btn-success me-2'}
          onClick={() => deletarLivro(props.id)} 
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
// Botões de Edição
    const EditBtns = <div className='text-end'>
        {PopoverConfirmação}
        <button
            className={props.isDarkMode ? 'me-3 btn btn-outline-danger' : 'me-3 btn btn-danger'}
            onClick={() => setAviso(!aviso)}
            hidden={!props.cardSelecionado || !props.isDev}
            disabled={aviso}
        > <BsTrashFill /> Apagar </button>
        <button
            className={props.isDarkMode ? 'me-3 btn btn-outline-success' : 'me-3 btn btn-success'}
            hidden={!props.cardSelecionado || !props.isDev}
            disabled
        > <BsPencilFill /> Editar </button>
    </div>

  return (
    <>      
    <Card key={props.id} className={isDarkMode? 'bg-dark animate__animated animate__fadeIn user-select-none' : 'bg-light user-select-none'} id="CardShadow" style={{ width: '17rem'}}>
      <Card.Header className='text-center' >
        {EditBtns}
        <Image src={props.image} height={200}/>
        <br/>        
        <span className='text-secondary txt'>autor : {props.autor} </span>        
      </Card.Header>
      <Card.Body className='text-center'>
        <Card.Title className={isDarkMode? 'DarkTxt' : 'txt'}>                        
          {props.titulo}
          </Card.Title>
        <Card.Text className='text-center TipCard'>
            <p className={isDarkMode? 'DarkTxt': 'txt'}> {props.descricao}</p>            
        </Card.Text>                
            <button className={isDarkMode? 'btn btn-outline-primary' : 'btn btn-primary'}> <a href={props.linkPdf} target='_blank' className={isDarkMode? 'text-primary' : 'text-light'}>Acesse o Pdf Aqui</a></button>
      </Card.Body>
    </Card>    
    </>        
  )
}

export default LivrosCard
