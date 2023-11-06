import React, { useContext } from 'react'
import Carousel from 'react-bootstrap/Carousel'

import { Col, Container, Row } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { RecipeUtils } from '../../utils/recipe/recipeUtils'
import { Image } from 'react-bootstrap';
import { DarkModeContext } from '../../utils/context/DarkModeContext'

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

  const { recipe, accountant } = RecipeUtils();

  const { isDarkMode } = useContext(DarkModeContext)



  return (
    <section className={isDarkMode ? 'bg-slate-700 text-white font-body-rb rounded-b-xl' : 'bg-white font-body-rb rounded-b-xl'}>

      <div className='flex justify-center p-2'>
        <h1 className='text-xl font-body-rb underline underline-offset-4 select-none'> Confira as Nossas Principais Receitas </h1>
      </div>

      <article className='flex justify-center'>
        <div className='carouselAbsolute animate__animated animate__fadeIn'>
          {RecipesCarousel()}
        </div>
      </article>
      <Container fluid className='pt-5'>
        <Row>
          <Col>
            {RecipesList({ title: 'Internacional', type: 'Internacional' })}
            {RecipesList({ title: 'Vegetarianos', type: "Vegetarianos" })}
          </Col>

          <Col>
            {RecipesList({ title: "Sobremesas", type: "Sobremesas" })}
            {RecipesList({ title: "Geral", type: "Geral" })}
          </Col>

          <Col>
            {RecipesList({ title: "Saudáveis", type: "Saudáveis" })}
            {RecipesList({ title: "Bebidas", type: "Bebidas" })}
          </Col>
        </Row>
      </Container>
    </section>
  )


  function RecipesList(props: { title?: string, type?: string }) {
    return (
      <ListGroup as="ul">
        <h1 className='mb-2 text-xl bg-orange_primary text-white text-center'>{props.title}</h1>
        {
          recipe.length > 0 ? (
            recipe.filter(r => r.type === props.type).map((r, i) => (
              accountant > i ? (
                <ListGroup.Item as="li" key={i} className={isDarkMode ? 'flex animate__animated animate__fadein bg-slate-800 border-none text-light animate__animated animate__fadeIn' : 'flex animate__animated animate__fadeIn animate__animated animate__fadeIn'}>
                  <div className='ListIMG container'>
                    <img src={r.imageLink} />
                    <div className='flex flex-col text-start'>
                      <h1 className='ml-2 text-sm'>{r.title}</h1>
                      <p className={isDarkMode ? 'text-sm ml-2 text-slate-400' : 'text-sm ml-2 text-slate-700'}>
                        {r.description.length > 50 ? (`${r.description.slice(0, 50)}...`) : (r.description)}
                      </p>
                        <hr className='m-2'/>
                      <div className='flex gap-2'>
                        <Image src='https://avatars.githubusercontent.com/u/102838847?s=400&u=eb9cfafe4f03007af3e70307d1779d683794c04b&v=4' roundedCircle
                          width='20' height='20' className='hover:scale-105 ml-2' />
                        <span className={isDarkMode ? 'text-sm text-slate-400' : 'text-sm text-slate-700'}>
                          {r.author.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={'recipe/' + r.UUID + '/' + r.title}
                    className='bg-orange_primary rounded text-light_primary p-1 mt-2 m-2 text-center text-light hover:scale-90 transition-all'>
                    Ver Receita
                  </a>
                </ListGroup.Item>
              ) : null
            ))
          ) : null}
      </ListGroup>)
  }

  function RecipesCarousel() {
    return (
      <Carousel fade slide className={isDarkMode ? 'shadow-md shadow-slate-900' : 'shadow-md shadow-slate-400'}>
        {
          recipe.slice(0, 4).map((r, i) => (
            <Carousel.Item key={i}>
              <Image src={r.imageLink} className='GalleryIMG' />
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