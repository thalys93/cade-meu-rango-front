import { useEffect } from "react";
import { getRecipes, getUsersByID } from "../api/apiUtils";
import { RecipeAPIModel } from "../interfaces/Recipes";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { setRecipe } from "../redux/recipeSlice";
import { setStates } from "../redux/appSlice";


export function RecipeUtils() {

    const dispatch = useDispatch();
    const commonStates = useSelector((state: RootState) => state.commonState);
    const recipeStates = useSelector((state: RootState) => state.recipeState);


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

                dispatch(setRecipe(mappedRecipe));

                setTimeout(() => {
                    dispatch(setStates({ loading: false }))
                }, 1500);

            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [dispatch]);    

    return {
        recipe: recipeStates,
        loading: commonStates,        
    }
}