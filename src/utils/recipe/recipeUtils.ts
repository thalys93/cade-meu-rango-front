import { useState, useEffect } from "react";
import { getRecipes, getUsersByID } from "../api/apiUtils";

export interface RecipeModel {
    UUID: string;
    title: string;
    type: string;
    description: string;
    imageLink: string;
    ingredients: Array<string>;
    instructions: Array<string>;
    authorUUID: string;
}

interface RecipeAPIModel {
    UUID: string;
    title: string;
    type: string;
    description: string;
    imageLink: string;
    ingredients: Array<string>;
    instructions: Array<string>;
    author: {
        name: string,
        imgLink: string
    }
}

export function RecipeUtils() {
    const [loading, setLoading] = useState(true);
    const [accountant, setAccountant] = useState(0);

    const [recipe, setRecipe] = useState<RecipeAPIModel[]>([]);    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const recipes = await getRecipes();
                const authorUUIDs = recipes.map((recipe: { authorUUID: string; }) => recipe.authorUUID);

                const userDataPromises = authorUUIDs.map((authorUUID: string) => getUsersByID(authorUUID));
                const userDataArray = await Promise.all(userDataPromises);
                
                const mappedRecipe = recipes.map((recipe: RecipeAPIModel, index: number) => {    
                    const userData = userDataArray[index]                
                    return {
                        ...recipe, 
                        author: {
                            name: userData.name,
                            imgLink: userData.imageLink                        
                        }
                    }
                    
                })

                setRecipe(mappedRecipe);

                setTimeout(() => {
                    setLoading(false);
                }, 1500);

                // console.log(mappedRecipe);
                // console.log(userData);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setAccountant((accountant) => accountant + 1);
            }, 210);

            return () => {
                clearInterval(interval);
            }
        }
    }, [loading]);

    return { recipe, loading, accountant }
}