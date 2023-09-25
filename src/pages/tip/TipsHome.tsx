import React from 'react'
import { Card, Col, ListGroupItem, Row } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { TipUtils } from '../../utils/tip/tipUtils'

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

  return (
    <section className='bg-light_primary font-body-rb rounded-b-xl'>
      <div className='flex justify-center p-2'>
        <h1 className='text-xl font-body-rb underline underline-offset-4 select-none'> Confira nossas Principais Dicas </h1>
      </div>
      <article className='flex flex-row justify-center animate__animated animate__fadeIn'>         
            {TipList()}            
      </article>
    </section>
  )


  function TipList() {
    return <ListGroup as="ul">
      {
      tip.length > 0 ? (
      tip.map((t , i ) => (
        accountant > i ? (
      <ListGroup.Item as="li" key={i} className='flex'>
      <Card className='container bg-light_primary hover:scale-105 transition-all rounded-b-xl'>
        <Card.Body>
          <Card.Title className='underline underline-offset-4'>{t.title}</Card.Title>
          <Card.Text>{t.description} <br/> {t.publishDate}</Card.Text>
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