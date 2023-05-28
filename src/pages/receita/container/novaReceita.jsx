// Libs
import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Form, Image } from 'react-bootstrap'
import { AiOutlinePlusCircle } from 'react-icons/ai'

// Utils
import { DarkModeContext } from '../../../utils/context/DarkModeContext'
import { addReceitasUtils } from '../../../utils/addReceitas'

// Componentes
import Voltar from '../../../interface/buttons/back-component/BackBtn'

// CSS
import '../css/Receita.css'
import { CloudinaryContext } from 'cloudinary-react'

function NovaReceita() {

  // Dark Mode Context
  const { isDarkMode } = useContext(DarkModeContext) 
  
  const {
    image, 
    preparoList, 
    ingredientList, 
    addIngredient, 
    addPreparo, 
    handleImageChange, 
    PostReceita} = addReceitasUtils()
    
  return (
    <main className='RecipeMain'>
      <Helmet>
        <title> CMR - Nova Receita </title>
        <link rel="icon" href="https://res.cloudinary.com/dh39ahmpj/image/upload/v1683412274/favicons.dev/cade_meu_rango_nyjbxs.png"/>
      </Helmet>      
      <Voltar/>    
      <Form className=''>
      <section className={isDarkMode ? 'DarkSection receitaSection ' : 'bg-body receitaSection '}>
        <article className='container-fluid'>
          <div id='TitleDiv'>
            <Form.Group controlId='RecipeName'>
              <Form.Label className={isDarkMode ? 'DarkTxt TitleLines' : 'txt' }> Título </Form.Label>
              <Form.Control className={isDarkMode ? 'txt border-0' : 'txt'} type='text' placeholder='Nome da Receita' required />
            </Form.Group>
            
            <Form.Group controlId='RecipeDescription' className='mt-2'>
              <Form.Label className={isDarkMode ? 'DarkTxt':'txt'}> Descrição </Form.Label>        
              <Form.Control className={isDarkMode ? 'txt border-0' : 'txt'} as='textarea' rows={3} placeholder='Descrição da Receita' required />
            </Form.Group>
          </div>          
          <div id='TitleDiv'>
            <Form.Group controlId='RecipeIngredients'>
            <Form.Label className={isDarkMode? 'TitleLines DarkSubtitle' : 'TitleLines subtitle'}>
              Ingredientes
            </Form.Label>
            <ol className='container-fluid list-group'>
              {ingredientList.map((index) => {
                return(
                <li key={index} className='listItem mt-3 container-fluid' >
                  <h4 className='enfatize modeNumber mt-1'>{index}</h4>
                    <Form.Control type='text' className='ingredient txt' placeholder='Qnt / Md' required/>
                      <span className={isDarkMode? 'DarkTxt user-select-none' : 'txt user-select-none'}> | </span> 
                    <Form.Control className='ingredient txt' placeholder='Ingrediente' required/>
                    <button type='button' onClick={addIngredient} className={isDarkMode ? 'btn btn-outline-primary' : 'btn btn-primary'}>
                      <AiOutlinePlusCircle className='addIcon'/>
                    </button>                    
                </li>  
                )      
              })}          
            </ol>
            </Form.Group>
          </div>
        </article>

        <article className='container-fluid'>

          <Form.Group controlId='RecipeImg' className='mt-3'>
            <CloudinaryContext cloudName='dh39ahmpj'>
              {image && <Image src={image} alt='Imagem da Receita' className='img-fluid rounded-2 mb-2 animate__animated animate__fadeIn'/>}
            </CloudinaryContext>
            <Form.Control type='file' onChange={handleImageChange} name='RecipeImg' accept="image/png " className={isDarkMode? 'btn btn-outline-light' : 'btn btn-outline-primary'} required/>
          </Form.Group>


          <div id='TitleDiv'>
          <Form.Group controlId='RecipePreparo' className='mt-2'>
          <Form.Label className={isDarkMode? 'TitleLines DarkSubtitle' : 'TitleLines subtitle'}>
            Modo de Preparo                      
          </Form.Label>
          <ol className='container-fluid list-group'>                      
          {preparoList.map((index) => {
            return(
            <li key={index} className='listItem mt-3 container'>                 
              <h4 className='enfatize modeNumber mt-1'>{index}</h4>
              <Form.Control type='text' className={isDarkMode ? 'ingredient txt' : 'ingredient txt '} placeholder='Modo de Preparo' required/> 
                <button type='button' onClick={addPreparo} className={isDarkMode ? 'btn btn-outline-primary' : 'btn btn-primary'}>
                  <AiOutlinePlusCircle className='addIcon'/>
                </button>
            </li>        
            )
          })}           
          </ol>
            </Form.Group>
            <div className='text-center'>
            <Form.Group controlId='submit' className='mt-2'>
              <button type='submit' className={isDarkMode ? 'btn btn-outline-success' : 'btn btn-success'}> Enviar </button>
            </Form.Group>
            </div>

          </div>
        </article>
    </section>
    </Form>
  </main>
  )
}

export default NovaReceita