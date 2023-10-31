import axios from "axios";
import { newUserModel } from "../auth/register/registerUtils";

const localAddress = "http://localhost:3030/api/"
// const recipeRoute = "recipes"
const userRoute = "users"
// const tipsRoute = "tips"


export const getUsers = async () => {}

// export const getUsersByID = async (id: string) => {}

export const postUser = async (user: newUserModel) => {    
    try {
        const res = await axios.post(localAddress + userRoute , user)
        return res.data;
    } catch (error) {
        return error        
    }
}

// export const updateUser = async (user: any) => {}

// export const deleteUser = async (id: string) => {}


