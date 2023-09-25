import React from 'react'
import BannerComponent from '../components/BannerComponent'
import { RecipeUtils } from '../../utils/recipe/recipeUtils';
import { useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import BackComponent from '../components/BackComponent';
import { RecipeModel } from './../../utils/recipe/recipeUtils';


/* TODO:
  - Terminar de corrigir a responsividade da página 
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
      <article className='p-4'>
      {recipe.filter(r => r.title === name).map((r) => (
          <div className='font-body-rb text-dark_primary animate__animated animate__fadeIn'>
            <div className='flex flex-row gap-20 items-center'>
              {RecipeDescription(r)}
              {RecipeImage(r)}
            </div>

            <div className='flex flex-row gap-20 items-center mt-5'>
              {Ingredients(r)}
              {instructions(r)}
            </div>              
          </div>      
        ))}
      </article>
    </section>
    </>
  )

  function RecipeImage(r: RecipeModel) {
    return <Image src={r.imageLink} alt={r.title} width={350} height={350} className='shadow-md customBorder shadow-slate-300' />
  }

  function RecipeDescription(r: RecipeModel) {
    return <div className='flex flex-col'>
      <h1 className='text-2xl text-start underline underline-offset-8'>{r.title}</h1>
      <p className='text-start pt-2 w-56'>{r.description}</p>
    </div>;
  }

  function Ingredients(r: RecipeModel) {
    return <div className='flex flex-col'>
      <h1 className='text-2xl text-start underline underline-offset-8'>Ingredientes</h1>
      <ol className='text-start pt-2'>
        {r.ingredients.map((ri, id) => (
          <li key={id}><span className='text-orange_primary font-bold'>{id}</span> - {ri}</li>
        ))}
      </ol>
    </div>;
  }

  function instructions(r: RecipeModel) {
    return<div className='flex flex-col'>
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

