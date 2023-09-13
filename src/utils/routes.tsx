import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Index from "../Index.tsx";
import Home from '../pages/home/Home.tsx'

import Recipe from '../pages/recipe/Recipe.tsx'
import NewRecipe from '../pages/recipe/RecipeNew.tsx'
import EditRecipe from '../pages/recipe/RecipeEdit.tsx'

import Tip from '../pages/tip/Tip.tsx'
import NewTip from '../pages/tip/NewTip.tsx'
import EditTip from '../pages/tip/EditTip.tsx'

import Login from '../pages/auth/Login.tsx'
import Register from '../pages/auth/Register.tsx'



const router = createBrowserRouter([
    {
        path: '/',
        element: <Index />,
        children: [
            {
                path: "/home",
                element: <Home/>
            },
        ]
    },

    {
        path: '/recipe',
        children: [
            {
                path: ':id/:name',
                element: <Recipe />,
            },
            {
                path: "new",
                element: <NewRecipe/>
            },
            {
                path: "edit/:id",
                element: <EditRecipe/>
            },
        ]
    },

    {
        path: '/tip',
        children: [
            {
                path: ':id/:name',
                element: <Tip/>
            },
            {
                path: 'new',
                element: <NewTip/>
            },
            {
                path: 'edit/:id',
                element: <EditTip/>
            }
        ]
    },

    {
        path: '/auth',
        children:[
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'register',
                element: <Register/>
            }
        ]
    }

])


function Routes() {
    return (
        <RouterProvider router={router} />
    )
}

export default Routes