import React, { useContext } from 'react'
import BannerComponent from '../components/BannerComponent'
import { RecipeUtils } from '../../utils/recipe/recipeUtils';
import { useParams } from 'react-router-dom';
import { Col, Container, Figure, Image, Row } from 'react-bootstrap';
import { DarkModeContext } from '../../utils/context/DarkModeContext';
import BackComponent from '../components/BackComponent';
import { RecipeAPIModel } from '../../utils/interfaces/Recipes';

function Recipe() {

  const { recipe } = RecipeUtils();
  const { name } = useParams<{ name: string }>();

  const { isDarkMode } = useContext(DarkModeContext)


  return (
    <>
      <BannerComponent />
      <section className={isDarkMode ? 'bg-slate-700 m-3 rounded' : 'bg-white m-3 rounded'}>
        <div className='absolute p-2'>
          {BackComponent({ href: '/' })}
        </div>
        <article className='p-2 pb-5'>
          {recipe.recipes.filter(r => r.title === name).map((r) => (
            <div className={isDarkMode ? 'font-body-rb text-white animate__animated animate__fadeIn mt-5' : 'font-body-rb text-slate-900 animate__animated animate__fadeIn mt-5'}>
              <Container className='flex justify-center' fluid>
                <Row className='items-center'>
                  <Col sm>
                    {RecipeDescription(r)}
                    <hr />
                    <div className='flex flex-col gap-2 mt-3'>
                      <span className='user-select-none'> Autor : </span>
                      <Figure className='flex items-center gap-2'>
                        <Figure.Image
                          alt={r.author.name}
                          src={r.author.imgLink}
                          className='rounded-full RecipeUserIMG'
                        />
                        <Figure.Caption className='mb-2 user-select-none '>
                          <a href={'/public/user/' + r.authorUUID}>
                            <span className={isDarkMode ? 'text-slate-50 hover:text-orange_primary font-bold' : 'hover:text-orange_primary font-bold'}>{r.author.name}</span>
                          </a>
                        </Figure.Caption>
                      </Figure>
                    </div>
                  </Col>
                  <Col sm>
                    {RecipeImage(r)}
                  </Col>
                </Row>
              </Container>
            </div>
          ))}
        </article>
      </section>
    </>
  )

  function RecipeImage(r: RecipeAPIModel) {
    return <Container className='flex flex-col justify-center content-center p-sm-2'>
      <Image src={r.imageLink} alt={r.title}
        className={isDarkMode ? 'shadow-md customBorder customIMG-size shadow-slate-900' : 'shadow-md customBorder shadow-slate-300 customIMG-size'}
        fluid />
      {instructions(r)}
    </Container>

  }

  function RecipeDescription(r: RecipeAPIModel) {
    return (
      <div className='flex flex-col justify-center m-3'>
        <h1 className='text-2xl text-start underline underline-offset-8'>{r.title}</h1>
        <p className={isDarkMode ? 'text-start pt-2 w-56 text-slate-200' : 'text-start pt-2 w-56'}>{r.description}</p>
        <div>
          {Ingredients(r)}
        </div>
      </div>
    )
  }

  function Ingredients(r: RecipeAPIModel) {
    return <div className='flex flex-col content-center mt-4'>
      <h1 className='text-2xl text-start underline underline-offset-8'>Ingredientes</h1>
      <ol className='text-start pt-2'>
        {r.ingredients.map((ri, id) => (
          <li key={id}>
            <span className='text-orange_primary font-bold'>{id}</span> -  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-900'}>{ri}</span>
          </li>
        ))}
      </ol>
    </div>;
  }

  function instructions(r: RecipeAPIModel) {
    return <div className='flex flex-col flex-wrap content-center m-4'>
      <h1 className='text-2xl text-start underline underline-offset-8'>Modo de preparo</h1>
      <ol className='text-start pt-2'>
        {r.instructions.map((rp: string, id: number) => (
          <li key={id}>
            <span className='text-orange_primary font-bold'>{id} - </span>
            <span className={isDarkMode ? 'text-slate-300' : 'text-slate-900'}>{rp}</span>
          </li>
        ))}
      </ol>
    </div>
  }
}

export default Recipe

