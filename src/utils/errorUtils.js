import { useEffect, useState } from "react";
import { getBooks, getRecipes, getTips } from "./api/services/api";

export function errorUtils() {
    
    const [recipesErrorID, SetRecipesErrorID] = useState("");
    const [tipsErrorID, SetTipsErrorID] = useState("");
    const [booksErrorID, SetBooksErrorID] = useState("");

    useEffect (() => {
        const fetchRecipesData = async () => {
            try {
                response = await getRecipes();

            } catch (error) {
                SetRecipesErrorID(error.code);
            }
        }
        fetchRecipesData();
    })

    useEffect(() => {
        const fetchTipsData = async () => {
            try {
                response = await getTips();
                SetTipsErrorID(response);
            } catch (error) {
                SetTipsErrorID(error.code);
            }
    };
    fetchTipsData();
    });        

    useEffect (() => {
        const fetchBooksData = async () => {
            try {
                response = await getBooks();

            } catch (error) {   
                SetBooksErrorID(error.code);                                             
            }
        }
        fetchBooksData();
    })    

    return {
        recipesErrorID,
        tipsErrorID,
        booksErrorID        
    }
}