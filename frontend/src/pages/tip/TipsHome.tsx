import { useCallback, useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Lightbulb, SearchX } from "lucide-react"
import { tipService } from "@/lib/api/tip.service"
import type { PaginationMeta, Tip } from "@/lib/api/types"
import { getErrorMessage } from "@/lib/api/errors"
import {
  ContentFilters,
  type ContentFilterValues,
} from "@/components/ContentFilters"
import { TipGridSkeleton } from "@/components/ContentSkeletons"
import { EmptyState } from "@/components/EmptyState"
import { ErrorState } from "@/components/ErrorState"
import { ListPagination } from "@/components/ListPagination"
import { TipCard } from "@/components/TipCard"
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
    category: "",
  }
}

export default function TipsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = readFilters(searchParams)
  const page = readPage(searchParams)
  const [tips, setTips] = useState<Tip[]>([])
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
        const res = await tipService.findAll({
          limit: PAGE_SIZE,
          page,
          search: filters.search || undefined,
          author: filters.author || undefined,
        })
        if (cancelled) return
        setTips(res.items ?? [])
        setMeta(res.meta ?? null)
      } catch (err) {
        if (!cancelled) {
          setTips([])
          setMeta(null)
          setError(getErrorMessage(err, "Falha ao listar dicas"))
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [page, filters.search, filters.author, retryKey])

  const retry = useCallback(() => setRetryKey((k) => k + 1), [])

  function writeParams(next: ContentFilterValues, nextPage: number) {
    const params = new URLSearchParams()
    if (next.search) params.set("search", next.search)
    if (next.author) params.set("author", next.author)
    if (nextPage > 1) params.set("page", String(nextPage))
    setSearchParams(params)
  }

  function applyFilters(next: ContentFilterValues) {
    writeParams(next, 1)
  }

  function changePage(nextPage: number) {
    writeParams(filters, nextPage)
  }

  const hasFilters = Boolean(filters.search || filters.author)
  const totalPages = meta?.totalPages ?? 1

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold">Dicas</h1>
          <p className="text-muted-foreground text-sm">
            {hasFilters ? "Resultados filtrados" : "Truques rápidos para o dia a dia"}
          </p>
        </div>
        <Button asChild>
          <Link to="/tip/new">Nova dica</Link>
        </Button>
      </div>

      <ContentFilters values={filters} onApply={applyFilters} />

      {loading ? (
        <TipGridSkeleton />
      ) : error ? (
        <ErrorState
          title="Não foi possível carregar as dicas"
          description={error}
          onRetry={retry}
        />
      ) : tips.length === 0 ? (
        <EmptyState
          icon={hasFilters ? SearchX : Lightbulb}
          title={
            hasFilters ? "Nenhuma dica encontrada" : "Ainda não há dicas por aqui"
          }
          description={
            hasFilters
              ? "Tente outros filtros ou limpe a busca para ver mais resultados."
              : "Compartilhe um truque rápido e ajude quem está na cozinha."
          }
          action={
            hasFilters ? undefined : { label: "Criar dica", href: "/tip/new" }
          }
        />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {tips.map((tip) => (
              <TipCard key={tip.id} tip={tip} />
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
