import axios from "axios";
import { newUserModel } from "../auth/register/registerUtils";

const localAddress = "http://localhost:3030/api/"
// const recipeRoute = "recipe"
const userRoute = "user"
// const tipsRoute = "tip"


export const getUsers = async () => {}

// export const getUsersByID = async (id: string) => {}

export const postUser = async (userData: newUserModel) => {
    try {
        const res = await axios.post(localAddress + userRoute, userData)
        return res
    } catch (error) {
        return error        
    }
}

// export const updateUser = async (user: any) => {}

// export const deleteUser = async (id: string) => {}


