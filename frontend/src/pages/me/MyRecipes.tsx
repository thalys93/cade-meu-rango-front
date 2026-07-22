import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CookingPot, Pencil, Plus, Trash2 } from "lucide-react"
import { recipeService } from "@/lib/api/recipe.service"
import type { Recipe } from "@/lib/api/types"
import { getErrorMessage } from "@/lib/api/errors"
import { slugify } from "@/lib/slugify"
import { ManageListSkeleton } from "@/components/ContentSkeletons"
import { EmptyState } from "@/components/EmptyState"
import { ErrorState } from "@/components/ErrorState"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function MyRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await recipeService.findMine({ limit: 50, page: 1 })
      setRecipes(res.items ?? [])
    } catch (err) {
      setRecipes([])
      setError(getErrorMessage(err, "Falha ao carregar suas receitas"))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Excluir a receita "${title}"?`)) return
    try {
      await recipeService.remove(id)
      setRecipes((prev) => prev.filter((r) => r.id !== id))
      toast.success("Receita excluída")
    } catch (err) {
      toast.error(getErrorMessage(err, "Não foi possível excluir"))
    }
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold sm:text-xl">Minhas receitas</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie o que você compartilhou
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link to="/recipe/new">
            <Plus className="size-4" />
            Nova receita
          </Link>
        </Button>
      </div>

      {loading ? (
        <ManageListSkeleton withImage />
      ) : error ? (
        <ErrorState
          title="Não foi possível carregar suas receitas"
          description={error}
          onRetry={() => void load()}
        />
      ) : recipes.length === 0 ? (
        <EmptyState
          icon={CookingPot}
          title="Você ainda não tem receitas"
          description="Crie a primeira e ela aparece aqui para editar ou compartilhar."
          action={{ label: "Nova receita", href: "/recipe/new" }}
        />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              className="overflow-hidden rounded-xl border border-border/80 bg-background/40"
            >
              {recipe.image_url ? (
                <img
                  src={recipe.image_url}
                  alt=""
                  className="h-28 w-full object-cover sm:h-32"
                />
              ) : (
                <div className="flex h-28 items-center justify-center bg-muted text-sm text-muted-foreground sm:h-32">
                  Sem imagem
                </div>
              )}
              <div className="space-y-3 p-3 sm:p-4">
                <div>
                  <h3 className="line-clamp-1 text-base font-semibold">
                    <Link
                      to={`/recipe/${recipe.id}/${slugify(recipe.title)}`}
                      className="hover:text-primary"
                    >
                      {recipe.title}
                    </Link>
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {recipe.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm" className="flex-1 sm:flex-none">
                    <Link to={`/recipe/edit/${recipe.id}`}>
                      <Pencil className="size-3.5" />
                      Editar
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1 sm:flex-none"
                    onClick={() => void handleDelete(recipe.id, recipe.title)}
                  >
                    <Trash2 className="size-3.5" />
                    Excluir
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
