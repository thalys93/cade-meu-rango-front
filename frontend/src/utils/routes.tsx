import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppShell } from "@/components/layout/AppShell"
import HomePage from "@/pages/home/Home"
import RecipesPage from "@/pages/recipe/RecipesHome"
import RecipePage from "@/pages/recipe/Recipe"
import RecipeNewPage from "@/pages/recipe/RecipeNew"
import RecipeEditPage from "@/pages/recipe/RecipeEdit"
import TipsPage from "@/pages/tip/TipsHome"
import TipPage from "@/pages/tip/Tip"
import NewTipPage from "@/pages/tip/NewTip"
import EditTipPage from "@/pages/tip/EditTip"
import LoginPage from "@/pages/auth/Login"
import RegisterPage from "@/pages/auth/Register"
import ConfigPage from "@/pages/config/Config"
import MeLayout from "@/pages/me/MeLayout"
import MePage from "@/pages/me/Me"
import MyRecipesPage from "@/pages/me/MyRecipes"
import MyTipsPage from "@/pages/me/MyTips"
import TermsOfUsePage from "@/pages/legal/TermsOfUse"
import PrivacyPolicyPage from "@/pages/legal/PrivacyPolicy"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "recipes", element: <RecipesPage /> },
      { path: "recipe/:id/:name?", element: <RecipePage /> },
      { path: "recipe/new", element: <RecipeNewPage /> },
      { path: "recipe/edit/:id", element: <RecipeEditPage /> },
      { path: "tips", element: <TipsPage /> },
      { path: "tip/:id/:name?", element: <TipPage /> },
      { path: "tip/new", element: <NewTipPage /> },
      { path: "tip/edit/:id", element: <EditTipPage /> },
      { path: "auth/login", element: <LoginPage /> },
      { path: "auth/register", element: <RegisterPage /> },
      {
        path: "me",
        element: <MeLayout />,
        children: [
          { index: true, element: <MePage /> },
          { path: "recipes", element: <MyRecipesPage /> },
          { path: "tips", element: <MyTipsPage /> },
        ],
      },
      { path: "config", element: <ConfigPage /> },
      { path: "termos", element: <TermsOfUsePage /> },
      { path: "privacidade", element: <PrivacyPolicyPage /> },
    ],
  },
])

export default function AppRoutes() {
  return <RouterProvider router={router} />
}
