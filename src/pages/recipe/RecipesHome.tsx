import React, { useContext } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { RecipeUtils } from '../../utils/recipe/recipeUtils'
import { Image } from 'react-bootstrap';
import { DarkModeContext } from '../../utils/context/DarkModeContext'
import NavegationFilter from '../components/navegationFilter';
// import { AuthContext } from './../../utils/context/AuthModeContext';


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
  // const authContext = useContext(AuthContext);


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
          {/* Coluna da Barra de Navegação (filtragem) */}
          <Col sm>
            <NavegationFilter/>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          {/* Coluna das receitas */}
          <Col sm>
            {RecipeCard()}            
          </Col>
          {/* Coluna dos componentes (navegação e usuarios) */}
          <Col sm>

          </Col>
        </Row>
      </Container>
    </section>
  )

  function RecipeCard() {
    return (
      <Card style={{ width: '18rem' }} className={isDarkMode? 'shadow-sm m-3 shadow-slate-900 bg-slate-800 text-light' : 'shadow-md m-3 text-slate-900 shadow-slate-400'}>
        <Card.Img src='https://receitasgalo.com.br/images/receitas/81/galo-imagem-receitas-lasanha-de-frango-share.jpg' />
        <Card.Body>
          <Card.Title> Receita Exemplo 1 </Card.Title>
          <Card.Text>
            Receita placeholder
            <div className='flex gap-2 mb-2 mt-2 '>
              <Image src={'https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'} roundedCircle
                className='hover:scale-105 UserIMGLite' />
              <span className={isDarkMode ? 'text-sm text-slate-400' : 'text-sm text-slate-700'}>
                Usuário de Exemplo
              </span>
            </div>
          </Card.Text>

          <div className='flex flex-row  justify-start content-start items-start gap-3'>
            <button className='bg-orange_primary p-2 hover:bg-orange_secondary text-white rounded'> Saiba Mais </button>
            <button className='border-orange_primary border-1 p-2 text-orange_primary hover:bg-orange_secondary hover:text-white rounded'> Compartilhar </button>
          </div>
        </Card.Body>
      </Card>
    )
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