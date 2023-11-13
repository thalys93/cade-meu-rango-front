import { useState, useEffect } from "react";
import { getRecipes, getUsersByID } from "../api/apiUtils";
import { RecipeAPIModel } from "../interfaces/Recipes";


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