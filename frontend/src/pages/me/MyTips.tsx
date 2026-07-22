import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Lightbulb, Pencil, Plus, Trash2 } from "lucide-react"
import { tipService } from "@/lib/api/tip.service"
import type { Tip } from "@/lib/api/types"
import { getErrorMessage } from "@/lib/api/errors"
import { slugify } from "@/lib/slugify"
import { ManageListSkeleton } from "@/components/ContentSkeletons"
import { EmptyState } from "@/components/EmptyState"
import { ErrorState } from "@/components/ErrorState"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function MyTipsPage() {
  const [tips, setTips] = useState<Tip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await tipService.findMine({ limit: 50, page: 1 })
      setTips(res.items ?? [])
    } catch (err) {
      setTips([])
      setError(getErrorMessage(err, "Falha ao carregar suas dicas"))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Excluir a dica "${title}"?`)) return
    try {
      await tipService.remove(id)
      setTips((prev) => prev.filter((t) => t.id !== id))
      toast.success("Dica excluída")
    } catch (err) {
      toast.error(getErrorMessage(err, "Não foi possível excluir"))
    }
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold sm:text-xl">Minhas dicas</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie suas dicas culinárias
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link to="/tip/new">
            <Plus className="size-4" />
            Nova dica
          </Link>
        </Button>
      </div>

      {loading ? (
        <ManageListSkeleton />
      ) : error ? (
        <ErrorState
          title="Não foi possível carregar suas dicas"
          description={error}
          onRetry={() => void load()}
        />
      ) : tips.length === 0 ? (
        <EmptyState
          icon={Lightbulb}
          title="Você ainda não tem dicas"
          description="Crie a primeira e ela aparece aqui para editar ou compartilhar."
          action={{ label: "Nova dica", href: "/tip/new" }}
        />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {tips.map((tip) => (
            <li
              key={tip.id}
              className="rounded-xl border border-border/80 bg-background/40 p-3 sm:p-4"
            >
              <div className="space-y-3">
                <div>
                  <h3 className="line-clamp-1 text-base font-semibold">
                    <Link
                      to={`/tip/${tip.id}/${slugify(tip.title)}`}
                      className="hover:text-primary"
                    >
                      {tip.title}
                    </Link>
                  </h3>
                  <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">
                    {tip.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm" className="flex-1 sm:flex-none">
                    <Link to={`/tip/edit/${tip.id}`}>
                      <Pencil className="size-3.5" />
                      Editar
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1 sm:flex-none"
                    onClick={() => void handleDelete(tip.id, tip.title)}
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
