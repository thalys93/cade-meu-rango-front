import React, { useContext } from 'react'
import BannerComponent from '../components/BannerComponent'
import { RecipeUtils } from '../../utils/recipe/recipeUtils';
import { useParams } from 'react-router-dom';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { RecipeModel } from './../../utils/recipe/recipeUtils';
import { DarkModeContext } from '../../utils/context/DarkModeContext';
import BackComponent from '../components/BackComponent';

function Recipe() {

  const {recipe} = RecipeUtils();  
  const {name} = useParams<{name : string}>();

  const {isDarkMode} = useContext(DarkModeContext)
  

  return (
    <>    
    <BannerComponent/>
    <section className={isDarkMode? 'bg-slate-700 m-3 rounded' : 'bg-white m-3 rounded'}>   
      <div className='absolute p-2'>
      <BackComponent/>
      </div>
      <article className='p-2 pb-5'>
      {recipe.filter(r => r.title === name).map((r) => (
        <div className={isDarkMode? 'font-body-rb text-white animate__animated animate__fadeIn mt-5' : 'font-body-rb text-slate-900 animate__animated animate__fadeIn mt-5'}>
          <Container className='flex justify-center'>
            <Row className='items-center'>
              <Col>
                {RecipeDescription(r)}                       
              </Col>
              <Col>
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

  function RecipeImage(r: RecipeModel) {  
    return <div className='flex flex-col justify-center content-center'>
    <Image src={r.imageLink} alt={r.title} 
    className={isDarkMode? 'shadow-md customBorder customIMG-size shadow-slate-900' : 'shadow-md customBorder shadow-slate-300 customIMG-size'}
    fluid/>
    {instructions(r)}
    </div>

  }

  function RecipeDescription(r: RecipeModel) {
    return(
    <div className='flex flex-col justify-center'>
      <h1 className='text-2xl text-start underline underline-offset-8'>{r.title}</h1>
      <p className={isDarkMode? 'text-start pt-2 w-56 text-slate-200' : 'text-start pt-2 w-56'}>{r.description}</p>
      <div>
        {Ingredients(r)}
      </div>
    </div>
    )
  }

  function Ingredients(r: RecipeModel) {
    return <div className='flex flex-col content-center mt-4'>
      <h1 className='text-2xl text-start underline underline-offset-8'>Ingredientes</h1>
      <ol className='text-start pt-2'>
        {r.ingredients.map((ri, id) => (
          <li key={id}>
            <span className='text-orange_primary font-bold'>{id}</span> -  <span className={isDarkMode? 'text-slate-300' : 'text-slate-900'}>{ri}</span>
          </li>
        ))}
      </ol>
    </div>;
  }

  function instructions(r: RecipeModel) {
    return<div className='flex flex-col flex-wrap content-center mt-4'>
      <h1 className='text-2xl text-start underline underline-offset-8'>Modo de preparo</h1>
      <ol className='text-start pt-2'>
        {r.instructions.map((rp: string, id: number) => (
          <li key={id}>
            <span className='text-orange_primary font-bold'>{id} - </span>              
            <span className={isDarkMode? 'text-slate-300' : 'text-slate-900'}>{rp}</span>            
          </li>
        ))}
      </ol>
    </div>
  }
}

export default Recipe

