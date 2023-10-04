import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Index from "../Index";
import Home from '../pages/home/Home'

import Recipe from '../pages/recipe/Recipe'
import NewRecipe from '../pages/recipe/RecipeNew'
import EditRecipe from '../pages/recipe/RecipeEdit'

import Tip from '../pages/tip/Tip'
import NewTip from '../pages/tip/NewTip'
import EditTip from '../pages/tip/EditTip'

import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import UserTerms from "../pages/auth/UserTerms";

import Config from '../pages/config/Config'

import React from "react";
import PrivacyTerms from "../pages/auth/PrivacyTerms";



const router = createBrowserRouter([
    {
        path: '/',
        element: <Index />,
        children: [
            {
                path: "/",
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
            },
            {
                path: 'termos',
                element: <UserTerms/>
            },
            {
                path: 'privacy-policy',
                element: <PrivacyTerms/>
            }
        ]
    },
    {
        path: '/config',
        element: <Config/>
    }

])


function Routes() {
    return (
        <RouterProvider router={router} />
    )
}

export default Routes