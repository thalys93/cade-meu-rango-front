import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { categoryService } from "@/lib/api/category.service"
import type { Category } from "@/lib/api/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const ALL_CATEGORIES = "all"

export type ContentFilterValues = {
  search: string
  author: string
  category: string
}

type ContentFiltersProps = {
  values: ContentFilterValues
  onApply: (values: ContentFilterValues) => void
  showCategory?: boolean
  className?: string
}

const emptyFilters: ContentFilterValues = {
  search: "",
  author: "",
  category: "",
}

const DEBOUNCE_MS = 400

function normalizeFilters(filters: ContentFilterValues): ContentFilterValues {
  return {
    search: filters.search.trim(),
    author: filters.author.trim(),
    category: filters.category,
  }
}

function filtersEqual(a: ContentFilterValues, b: ContentFilterValues) {
  return (
    a.search === b.search &&
    a.author === b.author &&
    a.category === b.category
  )
}

export function ContentFilters({
  values,
  onApply,
  showCategory = false,
  className,
}: ContentFiltersProps) {
  const [draft, setDraft] = useState(values)
  const [categories, setCategories] = useState<Category[]>([])
  const onApplyRef = useRef(onApply)
  onApplyRef.current = onApply

  useEffect(() => {
    setDraft(values)
  }, [values])

  useEffect(() => {
    if (!showCategory) return
    let cancelled = false

    async function loadCategories() {
      try {
        const list = await categoryService.findAll()
        if (!cancelled) setCategories(list)
      } catch {
        if (!cancelled) setCategories([])
      }
    }

    void loadCategories()
    return () => {
      cancelled = true
    }
  }, [showCategory])

  useEffect(() => {
    const next = normalizeFilters(draft)
    if (filtersEqual(next, values)) return

    const timer = window.setTimeout(() => {
      onApplyRef.current(next)
    }, DEBOUNCE_MS)

    return () => window.clearTimeout(timer)
  }, [draft, values])

  const hasActiveFilters = Boolean(
    values.search || values.author || values.category,
  )

  function handleClear() {
    setDraft(emptyFilters)
    onApply(emptyFilters)
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-background/80 p-4 shadow-sm backdrop-blur-sm",
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-sm font-medium">Filtros</p>
        {hasActiveFilters ? (
          <Button type="button" variant="ghost" size="xs" onClick={handleClear}>
            <X data-icon="inline-start" />
            Limpar
          </Button>
        ) : null}
      </div>

      <div
        className={cn(
          "grid gap-3",
          showCategory ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2",
        )}
      >
        <div className="space-y-1.5">
          <Label htmlFor="filter-search">Nome</Label>
          <Input
            id="filter-search"
            value={draft.search}
            onChange={(e) => setDraft((prev) => ({ ...prev, search: e.target.value }))}
            placeholder="Buscar por nome"
          />
        </div>

        {showCategory ? (
          <div className="space-y-1.5">
            <Label htmlFor="filter-category">Categoria</Label>
            <Select
              value={draft.category || ALL_CATEGORIES}
              onValueChange={(value) =>
                setDraft((prev) => ({
                  ...prev,
                  category: value === ALL_CATEGORIES ? "" : value,
                }))
              }
            >
              <SelectTrigger id="filter-category" className="w-full">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent position="popper" align="start">
                <SelectItem value={ALL_CATEGORIES}>Todas</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null}

        <div className="space-y-1.5">
          <Label htmlFor="filter-author">Autor</Label>
          <Input
            id="filter-author"
            value={draft.author}
            onChange={(e) => setDraft((prev) => ({ ...prev, author: e.target.value }))}
            placeholder="Nome do autor"
          />
        </div>
      </div>
    </div>
  )
}
