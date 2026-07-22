import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "@/lib/auth/AuthContext"
import { recipeService } from "@/lib/api/recipe.service"
import { getErrorMessage } from "@/lib/api/errors"
import {
  NONE_DIFFICULTY,
  RecipeForm,
  type RecipeFormSubmitValues,
  type RecipeFormValues,
} from "@/components/forms/RecipeForm"
import { RequireAuth } from "@/components/auth/RequireAuth"
import { ErrorState } from "@/components/ErrorState"
import { toast } from "sonner"

function RecipeEditForm() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [initialValues, setInitialValues] = useState<RecipeFormValues | null>(
    null,
  )
  const [booting, setBooting] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    if (!id) return
    let cancelled = false

    async function load() {
      setBooting(true)
      setLoadError(null)
      try {
        const recipe = await recipeService.findOne(id!)
        if (cancelled) return
        setInitialValues({
          title: recipe.title,
          description: recipe.description,
          imageUrl: recipe.image_url ?? "",
          difficulty: recipe.difficulty ?? NONE_DIFFICULTY,
          durationMinutes:
            recipe.durationMinutes != null
              ? String(recipe.durationMinutes)
              : "",
          tools: recipe.tools?.length ? recipe.tools : [""],
          ingredients: recipe.ingredients?.length
            ? recipe.ingredients
            : [""],
          instructions: recipe.instructions?.length
            ? recipe.instructions
            : [""],
          categories: recipe.categories?.map((category) => category.name) ?? [],
        })
      } catch (err) {
        if (!cancelled) {
          setInitialValues(null)
          setLoadError(getErrorMessage(err, "Receita não encontrada"))
        }
      } finally {
        if (!cancelled) setBooting(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [id, retryKey])

  const retry = useCallback(() => setRetryKey((k) => k + 1), [])

  if (!user) return null

  if (loadError) {
    return (
      <div className="mx-auto max-w-2xl">
        <ErrorState
          title="Não foi possível carregar a receita"
          description={loadError}
          onRetry={retry}
          secondaryAction={{ label: "Minhas receitas", href: "/me/recipes" }}
        />
      </div>
    )
  }

  async function handleSubmit(values: RecipeFormSubmitValues) {
    if (!id) return
    await recipeService.update(id, {
      title: values.title,
      description: values.description,
      image_url: values.imageUrl || undefined,
      difficulty: values.difficulty,
      durationMinutes: values.durationMinutes,
      tools: values.tools,
      ingredients: values.ingredients,
      instructions: values.instructions,
      categories: values.categories,
    })
    toast.success("Receita atualizada")
    navigate(`/recipe/${id}`)
  }

  if (booting || !initialValues) {
    return (
      <RecipeForm
        pageTitle="Editar receita"
        pageSubtitle="Atualize os detalhes da sua receita"
        submitLabel="Salvar receita"
        backTo="/me/recipes"
        publicId={`recipe_${user.id}_${id}`}
        booting
        onSubmit={handleSubmit}
      />
    )
  }

  return (
    <RecipeForm
      pageTitle="Editar receita"
      pageSubtitle="Atualize os detalhes da sua receita"
      submitLabel="Salvar receita"
      backTo="/me/recipes"
      publicId={`recipe_${user.id}_${id}`}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    />
  )
}

export default function RecipeEditPage() {
  return (
    <RequireAuth>
      <RecipeEditForm />
    </RequireAuth>
  )
}
