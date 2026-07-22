import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getErrorMessage } from "@/lib/api/errors"
import { cn } from "@/lib/utils"

export type TipFormValues = {
  title: string
  description: string
}

type TipFormProps = {
  pageTitle: string
  pageSubtitle: string
  submitLabel: string
  backTo: string
  initialValues?: Partial<TipFormValues>
  booting?: boolean
  onSubmit: (values: TipFormValues) => Promise<void>
}

export function TipForm({
  pageTitle,
  pageSubtitle,
  submitLabel,
  backTo,
  initialValues,
  booting = false,
  onSubmit,
}: TipFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "")
  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!title.trim() || !description.trim()) {
      setError("Título e descrição são obrigatórios")
      return
    }

    setLoading(true)
    setError(null)
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
      })
    } catch (err) {
      setError(getErrorMessage(err, "Não foi possível salvar a dica"))
    } finally {
      setLoading(false)
    }
  }

  if (booting) {
    return (
      <div className="mx-auto max-w-lg space-y-4">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-8 flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl text-primary md:text-5xl">
            {pageTitle}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">{pageSubtitle}</p>
        </div>
        <Button asChild variant="ghost">
          <Link to={backTo}>Voltar</Link>
        </Button>
      </div>

      <form
        onSubmit={handleSubmit}
        className={cn(
          "rounded-2xl bg-card px-6 py-8 shadow-sm ring-1 ring-border/60 sm:px-8",
        )}
      >
        {error ? (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        <div className="space-y-6">
          <div>
            <label htmlFor="tip-title" className="sr-only">
              Título
            </label>
            <input
              id="tip-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={loading}
              placeholder="Título da dica"
              className="placeholder:text-muted-foreground/70 w-full border-0 bg-transparent text-2xl font-medium tracking-tight outline-none disabled:opacity-50"
            />
          </div>

          <div className="border-border/70 border-t" />

          <div>
            <label htmlFor="tip-description" className="sr-only">
              Descrição
            </label>
            <textarea
              id="tip-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              disabled={loading}
              placeholder="Escreva o truque com calma…"
              rows={8}
              className="placeholder:text-muted-foreground/70 w-full resize-y border-0 bg-transparent text-base leading-relaxed outline-none disabled:opacity-50"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? "Salvando..." : submitLabel}
          </Button>
        </div>
      </form>
    </div>
  )
}
