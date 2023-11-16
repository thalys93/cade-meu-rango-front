import React, { useContext } from 'react'
import Carousel from 'react-bootstrap/Carousel'

import { Col, Container, Row } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { RecipeUtils } from '../../utils/recipe/recipeUtils'
import { Image } from 'react-bootstrap';
import { DarkModeContext } from '../../utils/context/DarkModeContext'
import { AiOutlineEye } from 'react-icons/ai'
import { CiCirclePlus } from "react-icons/ci";
import { AuthContext } from './../../utils/context/AuthModeContext';


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
  const { recipe } = RecipeUtils();  
  const { isDarkMode } = useContext(DarkModeContext)  
  const authContext = useContext(AuthContext);


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
          <Col sm>
            <RecipesCard title='Cadê Meu Rango LTDA' type='main' />
          </Col>
        </Row>
      </Container>
    </section>
  )


  function RecipesCard(props: { title?: string, type?: string }) {
    return (
      <ListGroup as="ul">
        <h1 className='mb-2 text-xl bg-orange_primary text-white text-center'>{props.title}</h1>
        {
          recipe.recipes.length > 0 ? (
            recipe.recipes.filter(r => r.type === props.type).map((r, i) => (              
                <ListGroup.Item as="li" key={i} className={isDarkMode ? 'flex animate__animated animate__fadein bg-slate-800 border-none text-light animate__animated animate__fadeIn' : 'flex animate__animated animate__fadeIn animate__animated animate__fadeIn'}>

                  <aside className='ListIMG'>
                    <Image src={r.imageLink} className='RecipeIMG' />
                  </aside>

                  <Row>
                    <Col sm={10} className='text-start'>
                      <h1 className='pl-2 text-sm'>{r.title}</h1>
                      <p className={isDarkMode ? 'text-sm pl-2 text-slate-400' : 'text-sm pl-2 text-slate-700'}>
                        {r.description.length > 50 ? (`${r.description.slice(0, 50)}...`) : (r.description)}
                      </p>
                      <hr className='m-2' />
                      <div className='flex gap-2'>
                        <Image src={r.author?.imgLink ? r.author.imgLink : 'https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'} roundedCircle
                          className='hover:scale-105 ml-2 UserIMGLite' />
                        <span className={isDarkMode ? 'text-sm text-slate-400' : 'text-sm text-slate-700'}>
                          {r.author.name}
                        </span>
                      </div>
                    </Col>

                    <Col sm>
                      <div className='flex justify-end content-end align-baseline p-1'>
                        <a href={'recipe/' + r.UUID + '/' + r.title}>                      
                          <button className='bg-orange_primary rounded text-light_primary hover:scale-90 transition-all p-2'>
                            <AiOutlineEye />
                          </button>                      
                        </a>
                      </div>
                    </Col>
                  </Row>

                </ListGroup.Item>              
            ))
          ) : 
          <section hidden={authContext as never && !authContext?.user || null } className='flex justify-center content-center align-middle items-center pb-2'>
            <article className='rounded-full p-2 bg-orange_primary hover:bg-orange_secondary hover:scale-90'>
              <a href='/recipe/new' >
                <CiCirclePlus className='text-2xl'/>
              </a>
            </article>
          </section>
          }
      </ListGroup>)
  }

  function RecipesCarousel() {
    return (
      <Carousel fade slide className={isDarkMode ? 'shadow-md shadow-slate-900' : 'shadow-md shadow-slate-400'}>
        {
          recipe.recipes.slice(0, 4).map((r, i) => (
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