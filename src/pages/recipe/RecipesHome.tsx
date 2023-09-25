import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

import { Col, Row } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { RecipeUtils } from '../../utils/recipe/recipeUtils'
import { Image } from 'react-bootstrap';

/* TODO: 
  - add list of recipes 3 per row (improves layout)
  

  - add pagination
  - add search
  - add filter (improves back-end attributes)
  - add sort
  - add recipe card
  - add recipe card details
*/


function RecipesHome() {

  const { recipe, localaddress, accountant } = RecipeUtils();


  return (
    <section className='bg-light_primary font-body-rb rounded-b-xl'>

        <div className='flex justify-center p-2'>
          <h1 className='text-xl font-body-rb underline underline-offset-4 select-none'> Confira as Nossas Principais Receitas </h1>
        </div>

      <article className='flex justify-center'>
        <div className='carouselAbsolute animate__animated animate__fadeIn'> 
          {RecipesCarousel()}
        </div>
      </article>
      <article className='pt-5'> 
        <Row>
          <Col>
            {RecipesList({title: 'Salgados', type: 'Salgados'})}
          </Col>

          <Col>
            {RecipesList({title:'Doces', type:"Doces"})}
          </Col>

          <Col>
            {RecipesList ({title:"Outros", type:"Outros"})}
          </Col>
        </Row>
      </article>
    </section>
  )


  function RecipesList(props: { title?: string , type?: string}) {
    return (
    <ListGroup as="ul" className='flex'>
      <h1 className='mb-2 text-xl bg-orange_primary text-light_primary text-center'>{props.title}</h1> 
      { 
      recipe.length > 0 ? (
      recipe.filter(r => r.type === props.type).map((r, i) => (
        accountant > i ? (
        <ListGroup.Item as="li" key={i} className='flex animate__animated animate__fadeIn'>
          <div className='ListIMG container'>
            <img src={r.imageLink ? r.imageLink : "https://via.placeholder.com/1080x1080"}/>
              
          <div className='flex flex-col text-start'>
            <h1 className='ml-2'>- {r.title}</h1>
            <p className='text-sm ml-2 text-slate-700'>
              {r.description.length > 50 ? (
                `${r.description.slice(0, 50)}...`
              ) : (
                r.description
              )}
            </p>
          </div>
          </div>
          <a
            href={localaddress + r.id + '/' + r.title}
            className='bg-orange_primary rounded text-light_primary p-1 mt-2 m-2 text-center hover:scale-90 transition-all'>
          Ver Receita
          </a>
        </ListGroup.Item>
        ) : null
      ))
      ) : null}              
    </ListGroup>)
  }

  function RecipesCarousel() {
    return(
      <Carousel fade slide className='shadow-md shadow-slate-400'>
        {        
        recipe.slice(0,4).map((r, i) => (          
        <Carousel.Item key={i}>          
            <Image src={r.imageLink} className='GalleryIMG'/>
          <Carousel.Caption className='bg-orange_primary'>
            <h3 className='text-3xl font-title-sy select-none'>{r.title}</h3>
            <p className="text-xl font-title-sy select-none">
              {r.description.length > 50 ? (
                `${r.description.slice(0, 30)}...`
                ) : (
                  r.description
              )}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        ))
      }
      </Carousel>

    )
  }
}



export default RecipesHome 