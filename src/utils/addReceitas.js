import { useEffect, useState } from "react"
import { postRecipes } from "./api/services/api";
import axios from "axios";

export function addReceitasUtils() {

  const [image, setImage] = useState('https://via.placeholder.com/350x150')
  const [preparoList , setPreparoList] = useState([1])
  const [ingredientList , setIngredientList] = useState([1])

  const addIngredient = () => {
    setIngredientList([...ingredientList, ingredientList.length + 1 ])
  }

  const addPreparo = () => {
    setPreparoList([...preparoList, preparoList.length + 1 ])
  }  
    
  const handleImageChange = (e) => {
      const file = e.target.files[0];      

      if (file) {
        try {
        const reader = new FileReader();
        reader.append('file' , file)        
        reader.append('upload_preset', 'cade_meu_rango')

        const response = await axios.post(
            // Terminar de concluir a lógica!
        )


        reader.onload = () => setImage(reader.result);
        reader.readAsDataURL(file);
        }
      }
    }     

    const PostReceita = async (receita) => {
        receita.preventDefault()

        try{
            const form = receita.target;
            const data = new FormData(form);

            const receitaData = {
             titulo : data.get('titulo'),
             descricao : data.get('descricao'),
             ingredientes : ingredientList.map((index) => ({
                quantidade: data.get(`quantidade${index}`),
                nome: data.get(`nome${index}`),
             })),
              modoDePreparo : preparoList.map((index) => ({
                descricao: data.get(`descricao${index}`),
                })),
                imageUrl: data.get('imageUrl'),
            };

            const response = await postRecipes(receitaData);

            if(response.status === 201){
                alert('Receita cadastrada com sucesso!');
            } else {
                alert('Erro ao cadastrar receita');
            }
            } catch (error) {
            console.error('Falha ao Cadastrar Receita', error);
            }

            }            

    return {
    image,
    setImage,
    preparoList,
    setPreparoList,
    ingredientList,
    setIngredientList,
    addIngredient,
    addPreparo,
    handleImageChange,
    PostReceita            
    };

}