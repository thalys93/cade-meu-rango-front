import React, { useContext } from 'react'
import { Card } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { TipUtils } from '../../utils/tip/tipUtils'
import { DarkModeContext } from '../../utils/context/DarkModeContext';

/* TODO: 
  - add galeries in tips home page 
  - add list of tips 3 per row
  - add pagination
  - add search
  - add filter
  - add sort
  - add tips card
  - add tips card details and author name
*/

function TipsHome() {

  const {tip , accountant} = TipUtils();
  const {isDarkMode} = useContext(DarkModeContext)

  return (
    <section className={isDarkMode? 'bg-slate-700 font-body-rb rounded-b-xl' : 'bg-white font-body-rb rounded-b-xl'}>
      <div className='flex flex-wrap justify-center p-2'>
        <h1 className={isDarkMode? 'text-xl font-body-rb underline underline-offset-4 select-none text-white' : 'text-xl font-body-rb underline underline-offset-4 select-none'}> 
          Confira nossas Principais Dicas 
        </h1>
      </div>
      <article className='flex flex-row justify-center animate__animated animate__fadeIn'>
            {TipList()}            
      </article>
    </section>
  )


  function TipList() {
    return <ListGroup as="ul" className='flex flex-wrap justify-center content-center' horizontal>
      {
      tip.length > 0 ? (
      tip.map((t , i ) => (
        accountant > i ? (
      <ListGroup.Item as="li" key={i} className='bg-transparent border-transparent'>
      <Card className={isDarkMode? 'w-96 h-40 max-h40 hover:scale-105 transition-all rounded-b-xl bg-slate-800' : 'w-96 h-40 max-h40 hover:scale-105 transition-all rounded-b-xl'}>
        <Card.Body>
          <Card.Title className='underline text-orange_primary font-bold underline-offset-4'>{t.title}</Card.Title>
          <Card.Text className={isDarkMode? 'text-light' : 'text-slate-900'}>{t.description} <br/> <span className='text-orange_primary font-bold'>{t.publishDate}</span></Card.Text>
        </Card.Body>        
      </Card>
      </ListGroup.Item>
      ) : null
      ))
      ) : null
      }    
    </ListGroup>;
  }
}

export default TipsHome