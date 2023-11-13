import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RecipeAPIModel } from "../interfaces/Recipes";


interface recipeState {
    recipes: RecipeAPIModel[],
}

const initialState: recipeState = {
    recipes: [],
}

const recipeSlice = createSlice({
    name: "recipe",
    initialState,
    reducers: {
        setRecipe: (state, action: PayloadAction<RecipeAPIModel[]>) => {
            state.recipes = action.payload;
        },
    },
});

export const { setRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;