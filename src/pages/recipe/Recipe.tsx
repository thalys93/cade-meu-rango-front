import React from 'react'
import BannerComponent from '../components/BannerComponent'
import { RecipeUtils } from '../../utils/recipe/recipeUtils';
import { useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import BackComponent from '../components/BackComponent';

function Recipe() {

  const {recipe} = RecipeUtils();

  const {name} = useParams<{name : string}>();
  

  return (
    <>
    <BannerComponent/>
    <section className='bg-light_primary m-3 rounded'>   
      <div className='absolute p-3'>
      <BackComponent/>
      </div>
      <article className='flex justify-center container'>
      {recipe.filter(r => r.title === name).map((r) => (
          <div className='flex justify-between gap-72 font-body-rb text-dark_primary'>
            <div className='flex flex-col mt-5'>
              <h1 className='text-2xl text-center'>{r.title}</h1>
              <hr/>
                <div className='w-56'>
                  <p className='text-start pt-2'>{r.description}</p>
                </div>          
            </div>
            <div className='mb-5 pt-4'>
              <Image src={r.imageLink} alt={r.title} width={350} height={350} className='mx-auto' thumbnail/>
            </div>
          </div>
      
        ))}
      </article>

      <article className='flex justify-center container pb-5'>
      {recipe.filter(r => r.title === name).map((r) => (
        <div className='flex justify-between gap-10 ml-5 font-body-rb text-dark_primary'>
          <div className='flex flex-col'>
            <h1 className='text-2xl text-center'>Ingredientes</h1>
              <hr/>
            <ol className='text-start pt-2'>
              {r.ingredients.map((ri, id) => (
                <li key={id}><span className='text-orange_primary font-bold text-xl'>{id}</span> - {ri}</li>
              ))}
            </ol>
          </div>

          <div>
            <h1 className='text-2xl text-center'>Modo de preparo</h1>
              <hr/>
            <ol className='text-start'>
              {r.instructions.map((rp, id) => (
                <li key={id}><span className='text-orange_primary font-bold text-xl'>{id}</span> - {rp}</li>
              ))}
            </ol>
          </div>
        </div>        
        ))}

      </article>
    </section>
    </>
  )
}

export default Recipe