import { useCallback, useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { CookingPot, SearchX } from "lucide-react"
import { recipeService } from "@/lib/api/recipe.service"
import type { PaginationMeta, Recipe } from "@/lib/api/types"
import { getErrorMessage } from "@/lib/api/errors"
import {
  ContentFilters,
  type ContentFilterValues,
} from "@/components/ContentFilters"
import { RecipeGridSkeleton } from "@/components/ContentSkeletons"
import { EmptyState } from "@/components/EmptyState"
import { ErrorState } from "@/components/ErrorState"
import { ListPagination } from "@/components/ListPagination"
import { RecipeCard } from "@/components/RecipeCard"
import { Button } from "@/components/ui/button"

const PAGE_SIZE = 10

function readPage(searchParams: URLSearchParams) {
  const value = Number(searchParams.get("page") ?? "1")
  return Number.isFinite(value) && value > 0 ? value : 1
}

function readFilters(searchParams: URLSearchParams): ContentFilterValues {
  return {
    search: searchParams.get("search") ?? "",
    author: searchParams.get("author") ?? "",
    category: searchParams.get("category") ?? "",
  }
}

export default function RecipesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = readFilters(searchParams)
  const page = readPage(searchParams)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [meta, setMeta] = useState<PaginationMeta | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await recipeService.findAll({
          limit: PAGE_SIZE,
          page,
          search: filters.search || undefined,
          author: filters.author || undefined,
          category: filters.category || undefined,
        })
        if (cancelled) return
        setRecipes(res.items ?? [])
        setMeta(res.meta ?? null)
      } catch (err) {
        if (!cancelled) {
          setRecipes([])
          setMeta(null)
          setError(getErrorMessage(err, "Falha ao listar receitas"))
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [page, filters.search, filters.author, filters.category, retryKey])

  const retry = useCallback(() => setRetryKey((k) => k + 1), [])

  function writeParams(next: ContentFilterValues, nextPage: number) {
    const params = new URLSearchParams()
    if (next.search) params.set("search", next.search)
    if (next.author) params.set("author", next.author)
    if (next.category) params.set("category", next.category)
    if (nextPage > 1) params.set("page", String(nextPage))
    setSearchParams(params)
  }

  function applyFilters(next: ContentFilterValues) {
    writeParams(next, 1)
  }

  function changePage(nextPage: number) {
    writeParams(filters, nextPage)
  }

  const hasFilters = Boolean(filters.search || filters.author || filters.category)
  const totalPages = meta?.totalPages ?? 1

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold">Receitas</h1>
          <p className="text-muted-foreground text-sm">
            {hasFilters ? "Resultados filtrados" : "Todas as receitas públicas"}
          </p>
        </div>
        <Button asChild>
          <Link to="/recipe/new">Nova receita</Link>
        </Button>
      </div>

      <ContentFilters values={filters} onApply={applyFilters} showCategory />

      {loading ? (
        <RecipeGridSkeleton />
      ) : error ? (
        <ErrorState
          title="Não foi possível carregar as receitas"
          description={error}
          onRetry={retry}
        />
      ) : recipes.length === 0 ? (
        <EmptyState
          icon={hasFilters ? SearchX : CookingPot}
          title={
            hasFilters
              ? "Nenhuma receita encontrada"
              : "Ainda não há receitas por aqui"
          }
          description={
            hasFilters
              ? "Tente outros filtros ou limpe a busca para ver mais resultados."
              : "Seja a primeira pessoa a compartilhar um prato com a comunidade."
          }
          action={
            hasFilters
              ? undefined
              : { label: "Criar receita", href: "/recipe/new" }
          }
        />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <ListPagination
            page={page}
            totalPages={totalPages}
            onPageChange={changePage}
          />
        </>
      )}
    </div>
  )
}
