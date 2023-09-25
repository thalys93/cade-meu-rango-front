/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
//import { apiCall } from '../api/apiUtils'
import localAPI from './recipes.json'

export interface RecipeModel {
    id: number;
    title: string;
    type: string;
    description: string;
    imageLink: string;
    ingredients: Array<string>;
    instructions: Array<string>;
    author: string;
}

export function RecipeUtils() {
    const [loading, setLoading] = useState(true);
    const [accountant, setAccountant] = useState(0);

    const [recipe, setRecipe] = useState<RecipeModel[]>([]);

    const localaddress = 'http://localhost:5173/recipe/';


    useEffect(() => {
        const fetchData = async () => {
            try {
                setRecipe(localAPI as RecipeModel[]);
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
                setAccountant((accountant) => accountant + 1);
            }, 210);

            return() => {
                clearInterval(interval);
            }
        }
    }, [loading]);

    return { recipe, loading, accountant, localaddress }
}