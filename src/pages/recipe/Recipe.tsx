import React from 'react'
import BannerComponent from '../components/BannerComponent'
import { RecipeUtils } from '../../utils/recipe/recipeUtils';
import { useParams } from 'react-router-dom';

function Recipe() {

  const {recipe} = RecipeUtils();

  const {name} = useParams<{name: name}>();
  

  return (
    <>
    <BannerComponent/>
    <section className='bg-light_primary p-2'>   
      <article className='font-body-rb text-dark_primary'>
        <h1> 
          {name}
        </h1>
        
      </article>

      <article className='font-body-rb text-dark_primary'>

      </article>
    </section>
    </>
  )
}

export default Recipe