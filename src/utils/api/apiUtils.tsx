import axios from "axios";
import { ApiUserModel } from '../interfaces/Users.ts'
import { TipModel } from "../interfaces/Tips.ts";
import { newRecipeModel } from "../interfaces/Recipes.ts";

const localAddress = "http://localhost:3030/api/"
const recipeRoute = "recipe"
const userRoute = "users"
const tipsRoute = "tip"


export const getUsers = async () => {
    try {
        const res = await axios.get(localAddress + userRoute)
        return res.data;
    } catch (error) {
        return error
    }
}

export const getUsersByID = async (uuid: string) => {
    try {
        const res = await axios.get(localAddress + userRoute + "/" + uuid)
        return res.data;
    } catch (error) {
        return error
    }
}
export const postUser = async (user: ApiUserModel) => {
    try {
        const res = await axios.post(localAddress + userRoute, user)
        return res.data;
    } catch (error) {
        return error
    }
}

export const updateUser = async (uuid: string ,user: ApiUserModel) => {    
    try {
        const res = await axios.put(localAddress + userRoute + '/' + uuid , user)
        return res.data;
    } catch (error) {
        return error
    }
}

export const deleteUser = async (uuid: string) => {
    try {
        const res = await axios.delete(localAddress + userRoute + "/" + uuid)
        return res.data;
    } catch (error) {
        return error
    }
}

// Receitas

export const getRecipes = async () => {
    try {
        const res = await axios.get(localAddress + recipeRoute)
        return res.data;
    } catch (error) {
        return error
    }
}

export const getRecipesByID = async (uuid: string) => {
    try {
        const res = await axios.get(localAddress + recipeRoute + "/" + uuid)
        return res.data;
    } catch (error) {
        return error
    }
}

export const postRecipe = async (recipe: newRecipeModel) => {
    try {
        const res = await axios.post(localAddress + recipeRoute, recipe)
        return res.data;
    } catch (error) {
        return error
    }
}

export const updateRecipe = async (uuid: string, recipe: newRecipeModel) => {
    try {
        const res = await axios.put(localAddress + recipeRoute + '/' + uuid, recipe)
        return res.data;
    } catch (error) {
        return error
    }
}

export const deleteRecipe = async (uuid: string) => {
    try {
        const res = await axios.delete(localAddress + recipeRoute + "/" + uuid)
        return res.data;
    } catch (error) {
        return error
    }
}


// Dicas

export const getTips = async () => {
    try {
        const res = await axios.get(localAddress + tipsRoute)
        return res.data;
    } catch (error) {
        return error
    }
}

export const getTipsByID = async (uuid: string) => {
    try {
        const res = await axios.get(localAddress + tipsRoute + "/" + uuid)
        return res.data;
    } catch (error) {
        return error
    }
}

export const postTips = async (tips: TipModel) => {
    try {
        const res = await axios.post(localAddress + tipsRoute, tips)
        return res.data;
    } catch (error) {
        return error
    }
}

export const updateTips = async (uuid: string , tips: TipModel) => {
    try {
        const res = await axios.put(localAddress + tipsRoute + '/' + uuid, tips)
        return res.data;
    } catch (error) {
        return error
    }
}

export const deleteTips = async (uuid: string) => {
    try {
        const res = await axios.delete(localAddress + tipsRoute + "/" + uuid)
        return res.data;
    } catch (error) {
        return error
    }
}
