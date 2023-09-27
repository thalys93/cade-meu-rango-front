import React from 'react'
import BannerComponent from '../components/BannerComponent'
import { RecipeUtils } from '../../utils/recipe/recipeUtils';
import { useParams } from 'react-router-dom';
import { Col, Container, Image, Row } from 'react-bootstrap';
import BackComponent from '../components/BackComponent';
import { RecipeModel } from './../../utils/recipe/recipeUtils';


/* TODO:
  - Terminar de corrigir a responsividade da página (check)
  - Adicionar um botão de voltar para a página anterior (check)  
  - Adicionar um tamanho especifico para a imagem da receita (usar a da coxinha como base)
*/

function Recipe() {

  const {recipe} = RecipeUtils();  
  const {name} = useParams<{name : string}>();
  

  return (
    <>
    <BannerComponent/>
    <section className='bg-light_primary m-3 rounded'>   
      <div className='absolute p-2'>
      <BackComponent/>
      </div>
      <article className='p-2 pb-5'>
      {recipe.filter(r => r.title === name).map((r) => (
        <div className='font-body-rb text-dark_primary animate__animated animate__fadeIn mt-5'>
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
            
            
            <Container className='flex justify-center mt-4'>
            <Row className='items-center'>
              <Col>
                {Ingredients(r)}
              </Col>
              <Col>
                {instructions(r)}
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
    return <div>
      <Image src={r.imageLink} alt={r.title} width={350} height={350} className='shadow-md customBorder shadow-slate-300' />
    </div>
  }

  function RecipeDescription(r: RecipeModel) {
    return <div className='flex flex-col justify-center'>
      <h1 className='text-2xl text-start underline underline-offset-8'>{r.title}</h1>
      <p className='text-start pt-2 w-56'>{r.description}</p>
    </div>;
  }

  function Ingredients(r: RecipeModel) {
    return <div className='flex flex-col flex-wrap justify-center content-center'>
      <h1 className='text-2xl text-start underline underline-offset-8'>Ingredientes</h1>
      <ol className='text-start pt-2'>
        {r.ingredients.map((ri, id) => (
          <li key={id}><span className='text-orange_primary font-bold'>{id}</span> - {ri}</li>
        ))}
      </ol>
    </div>;
  }

  function instructions(r: RecipeModel) {
    return<div className='flex flex-col flex-wrap justify-center content-center'>
      <h1 className='text-2xl text-start underline underline-offset-8'>Modo de preparo</h1>
      <ol className='text-start pt-2'>
        {r.instructions.map((rp: string, id: number) => (
          <li key={id}>
            <span className='text-orange_primary font-bold'>{id} - </span>              
            <span>{rp}</span>            
          </li>
        ))}
      </ol>
    </div>
  }
}

export default Recipe

