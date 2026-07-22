import { useCallback, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Pencil } from "lucide-react"
import { tipService } from "@/lib/api/tip.service"
import type { Tip } from "@/lib/api/types"
import { getErrorMessage } from "@/lib/api/errors"
import { useAuth } from "@/lib/auth/AuthContext"
import { TipDetailSkeleton } from "@/components/ContentSkeletons"
import { ErrorState } from "@/components/ErrorState"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

function authorInitials(name?: string) {
  if (!name) return "?"
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export default function TipPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const [tip, setTip] = useState<Tip | null>(null)
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
        const data = await tipService.findOne(id!)
        if (!cancelled) setTip(data)
      } catch (err) {
        if (!cancelled) {
          setTip(null)
          setError(getErrorMessage(err, "Dica não encontrada"))
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
    return <TipDetailSkeleton />
  }

  if (error || !tip) {
    return (
      <ErrorState
        title="Não foi possível abrir a dica"
        description={error ?? "Dica inexistente"}
        onRetry={retry}
        secondaryAction={{ label: "Ver dicas", href: "/tips" }}
      />
    )
  }

  const isOwner = Boolean(user && tip.author?.id === user.id)

  return (
    <article className="mx-auto max-w-2xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-3">
          {isOwner ? (
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              Sua dica
            </Badge>
          ) : null}
          <h1 className="text-3xl font-semibold">{tip.title}</h1>
          {tip.author ? (
            <div className="flex items-center gap-2">
              <Avatar size="sm">
                {tip.author.avatar_url ? (
                  <AvatarImage src={tip.author.avatar_url} alt={tip.author.name} />
                ) : null}
                <AvatarFallback>{authorInitials(tip.author.name)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                {isOwner ? "Você" : tip.author.name}
              </span>
            </div>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {isOwner ? (
            <Button asChild>
              <Link to={`/tip/edit/${tip.id}`}>
                <Pencil className="size-4" />
                Editar dica
              </Link>
            </Button>
          ) : null}
          <Button asChild variant="outline">
            <Link to="/tips">Voltar</Link>
          </Button>
        </div>
      </div>
      <p className="text-lg leading-relaxed whitespace-pre-wrap">{tip.description}</p>
    </article>
  )
}
