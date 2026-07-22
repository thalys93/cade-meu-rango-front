import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/lib/auth/AuthContext"
import { recipeService } from "@/lib/api/recipe.service"
import {
  RecipeForm,
  type RecipeFormSubmitValues,
} from "@/components/forms/RecipeForm"
import { RequireAuth } from "@/components/auth/RequireAuth"
import { toast } from "sonner"

function RecipeCreateForm() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [publicId] = useState(
    () => `recipe_${user?.id ?? "anon"}_${Date.now()}`,
  )

  if (!user) return null

  async function handleSubmit(values: RecipeFormSubmitValues) {
    const recipe = await recipeService.create({
      title: values.title,
      description: values.description,
      image_url: values.imageUrl || undefined,
      difficulty: values.difficulty ?? undefined,
      durationMinutes: values.durationMinutes ?? undefined,
      tools: values.tools,
      ingredients: values.ingredients,
      instructions: values.instructions,
      categories: values.categories,
    })
    toast.success("Receita criada")
    navigate(`/recipe/${recipe.id}`)
  }

  return (
    <RecipeForm
      pageTitle="Nova receita"
      pageSubtitle="Compartilhe sua criação com a comunidade"
      submitLabel="Salvar receita"
      backTo="/me/recipes"
      publicId={publicId}
      onSubmit={handleSubmit}
    />
  )
}

export default function RecipeNewPage() {
  return (
    <RequireAuth>
      <RecipeCreateForm />
    </RequireAuth>
  )
}
