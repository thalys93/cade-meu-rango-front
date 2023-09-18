import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

import { Col, Row } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { RecipeUtils } from '../../utils/recipe/recipeUtils'
import { Image } from 'react-bootstrap';

/* TODO: 
  - add galeries in recipe home page (improves responsivity)
  - add list of recipes 3 per row (improves layout)
  - add pagination
  - add search
  - add filter (improves back-end attributes)
  - add sort
  - add recipe card
  - add recipe card details  
*/


function RecipesHome() {

  const { recipe, loading, accountant } = RecipeUtils();


  return (
    <section className='bg-light_primary font-body-rb rounded-b-xl'>
      <article> 
        {RecipesCarousel()}
      </article>
      <article className='text-center pt-5'> 
        <Row>
          <Col>
            <RecipesList title='Salgados'/>
          </Col>

          <Col>
            <RecipesList title='Doces'/>
          </Col>

          <Col>
            <RecipesList title="Outros"/>
          </Col>
        </Row>
      </article>
    </section>
  )


  function RecipesList(props: { title?: string }) {
    return (
    <ListGroup as="ul">
      <h2 className='mb-2 text-xl bg-orange_primary text-light_primary'>{props.title}</h2> 
      {recipe.map((r, i) => (
        <ListGroup.Item as="li" key={i} className='flex justify-between'>
          <div className='flex'>            
            <Image src={r.imageLink ? r.imageLink : "https://via.placeholder.com/1080x1080"} height={150} width={80} />            
          </div>
          
    

          <div className='flex-col'>
            <h1>{r.title}</h1>
            <p className='text-sm'>{r.description}</p>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>)
  }

  function RecipesCarousel() {
    return(
      <Carousel slide fade>
        {
        recipe.map((r, i) => (
        <Carousel.Item key={i}>          
            <Image src={r.imageLink ? r.imageLink :  "https://via.placeholder.com/1080x1080"} className='GalleryIMG'/>                  
          <Carousel.Caption className='bg-orange_primary'>
            <h3 className='text-3xl font-title-sy'>{r.title}</h3>
            <p className="text-xl font-title-sy">{r.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
        ))
      }
      </Carousel>

    )
  }
}



export default RecipesHome