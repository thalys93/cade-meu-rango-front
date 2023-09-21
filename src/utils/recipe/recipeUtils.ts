/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
//import { apiCall } from '../api/apiUtils'
import localAPI from './recipes.json'

export function RecipeUtils() {
    const [loading, setLoading] = useState(true);
    const [accountant, setAccountant] = useState(0);

    const [recipe, setRecipe] = useState<Recipe[]>([]);

    const localaddress = 'http://localhost:5173/recipe/';


    interface Recipe {
        id: number;
        title: string;
        type: string;
        description: string;
        imageLink: string;
        ingredients: Array<string>;
        instructions: Array<string>;
        author: string;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setRecipe(localAPI as Recipe[]);
                setTimeout(()=>{
                    setLoading(true);
                }, 1500);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if(loading) {
            const interval = setInterval(() => {
                setAccountant(accountant => accountant + 1);
            }, 120);

            return() => {
                clearInterval(interval);
            }
        }
    }, [loading]);

    return { recipe, loading, accountant, localaddress }
}