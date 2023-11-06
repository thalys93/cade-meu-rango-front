/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { getRecipes, getUsersByID } from "../api/apiUtils";

// import localAPI from './recipes.json'

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
        name: string
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

                const updatedRecipes = await Promise.all(recipes.map(async (recipe) => {
                    const userData = await getUsersByID(recipe.authorUUID);

                    const formattedUserData = userData.userName
                    .replace(/([a-z])([A-Z])/g, '$1 $2')
                    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
                    .trim();

                    return {
                        ...recipe,
                        author: {
                            name: formattedUserData,
                        },
                    };
                }));

                setRecipe(updatedRecipes);

                setTimeout(() => {
                    setLoading(false);
                }, 1500);

                console.log(updatedRecipes);
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