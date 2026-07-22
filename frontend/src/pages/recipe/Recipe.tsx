import { useCallback, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ChefHat, Clock, Pencil, ShoppingBasket, UtensilsCrossed } from "lucide-react"
import { recipeService } from "@/lib/api/recipe.service"
import type { Recipe } from "@/lib/api/types"
import { getErrorMessage } from "@/lib/api/errors"
import { useAuth } from "@/lib/auth/AuthContext"
import { difficultyLabel, formatDurationMinutes } from "@/lib/recipe-meta"
import { RecipeDetailSkeleton } from "@/components/ContentSkeletons"
import { ErrorState } from "@/components/ErrorState"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

function authorInitials(name?: string) {
  if (!name) return "?"
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export default function RecipePage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    if (!id) return
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await recipeService.findOne(id!)
        if (!cancelled) setRecipe(data)
      } catch (err) {
        if (!cancelled) {
          setRecipe(null)
          setError(getErrorMessage(err, "Receita não encontrada"))
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [id, retryKey])

  const retry = useCallback(() => setRetryKey((k) => k + 1), [])

  if (loading) {
    return <RecipeDetailSkeleton />
  }

  if (error || !recipe) {
    return (
      <ErrorState
        title="Não foi possível abrir a receita"
        description={error ?? "Receita inexistente"}
        onRetry={retry}
        secondaryAction={{ label: "Ver receitas", href: "/recipes" }}
      />
    )
  }

  const duration = formatDurationMinutes(recipe.durationMinutes)
  const difficulty = difficultyLabel(recipe.difficulty)
  const tools = recipe.tools?.filter(Boolean) ?? []
  const isOwner = Boolean(user && recipe.author?.id === user.id)

  return (
    <article className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-3">
          {isOwner ? (
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              Sua receita
            </Badge>
          ) : null}
          <h1 className="text-3xl font-semibold md:text-4xl">{recipe.title}</h1>
          <p className="text-muted-foreground max-w-3xl">{recipe.description}</p>
          {duration || difficulty ? (
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              {duration ? (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4 text-primary" aria-hidden />
                  {duration}
                </span>
              ) : null}
              {duration && difficulty ? (
                <span className="text-border" aria-hidden>
                  ·
                </span>
              ) : null}
              {difficulty ? <Badge variant="secondary">{difficulty}</Badge> : null}
            </div>
          ) : null}
          {recipe.author ? (
            <div className="flex items-center gap-2">
              <Avatar size="sm">
                {recipe.author.avatar_url ? (
                  <AvatarImage
                    src={recipe.author.avatar_url}
                    alt={recipe.author.name}
                  />
                ) : null}
                <AvatarFallback>
                  {authorInitials(recipe.author.name)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                {isOwner ? "Você" : recipe.author.name}
              </span>
            </div>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {isOwner ? (
            <Button asChild>
              <Link to={`/recipe/edit/${recipe.id}`}>
                <Pencil className="size-4" />
                Editar receita
              </Link>
            </Button>
          ) : null}
          <Button asChild variant="outline">
            <Link to="/recipes">Voltar</Link>
          </Button>
        </div>
      </div>

      {recipe.image_url ? (
        <img
          src={recipe.image_url}
          alt=""
          className="max-h-96 w-full rounded-[var(--cmr-radius)] object-cover"
        />
      ) : null}

      <Accordion
        type="multiple"
        defaultValue={
          tools.length > 0
            ? ["tools", "ingredients", "instructions"]
            : ["ingredients", "instructions"]
        }
        className="rounded-[var(--cmr-radius)] border border-border/70 bg-card px-4"
      >
        {tools.length > 0 ? (
          <AccordionItem value="tools">
            <AccordionTrigger className="text-base">
              <span className="flex items-center gap-2">
                <UtensilsCrossed className="size-4 shrink-0 text-primary" aria-hidden />
                Você vai precisar
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc space-y-2 pl-5">
                {tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ) : null}
        <AccordionItem value="ingredients">
          <AccordionTrigger className="text-base">
            <span className="flex items-center gap-2">
              <ShoppingBasket className="size-4 shrink-0 text-primary" aria-hidden />
              Ingredientes
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc space-y-2 pl-5">
              {recipe.ingredients?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="instructions">
          <AccordionTrigger className="text-base">
            <span className="flex items-center gap-2">
              <ChefHat className="size-4 shrink-0 text-primary" aria-hidden />
              Modo de preparo
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal space-y-3 pl-5">
              {recipe.instructions?.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {recipe.categories && recipe.categories.length > 0 ? (
        <>
          <Separator />
          <div className="flex flex-wrap gap-2 text-sm">
            {recipe.categories.map((category) => (
              <Link
                key={category.id}
                to={`/recipes?category=${category.slug}`}
                className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground hover:bg-accent"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </article>
  )
}
