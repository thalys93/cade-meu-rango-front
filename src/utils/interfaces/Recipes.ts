// Modelo de Novas Receita
export interface newRecipeModel {
    UUID: string;
    title: string;
    type: string;
    description: string;
    imageLink: string;
    ingredients: Array<string>;
    instructions: Array<string>;
    authorUUID: string;
}


// Modelo da Receita da API (conversão para o uuid do author ser o nome e o link da imagem de perfil)
export interface RecipeAPIModel {
    UUID: string;
    title: string;
    type: string;
    description: string;
    imageLink: string;
    ingredients: Array<string>;
    instructions: Array<string>;
    authorUUID: string;
    author: {        
        name: string,
        imgLink: string
    }
}