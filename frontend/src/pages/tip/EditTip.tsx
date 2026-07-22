import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { tipService } from "@/lib/api/tip.service"
import { getErrorMessage } from "@/lib/api/errors"
import { TipForm, type TipFormValues } from "@/components/forms/TipForm"
import { RequireAuth } from "@/components/auth/RequireAuth"
import { ErrorState } from "@/components/ErrorState"
import { toast } from "sonner"

function TipEditForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [initialValues, setInitialValues] = useState<TipFormValues | null>(null)
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
        const tip = await tipService.findOne(id!)
        if (cancelled) return
        setInitialValues({
          title: tip.title,
          description: tip.description,
        })
      } catch (err) {
        if (!cancelled) {
          setInitialValues(null)
          setLoadError(getErrorMessage(err, "Dica não encontrada"))
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

  async function handleSubmit(values: TipFormValues) {
    if (!id) return
    await tipService.update(id, values)
    toast.success("Dica atualizada")
    navigate(`/tip/${id}`)
  }

  if (loadError) {
    return (
      <div className="mx-auto max-w-lg">
        <ErrorState
          title="Não foi possível carregar a dica"
          description={loadError}
          onRetry={retry}
          secondaryAction={{ label: "Minhas dicas", href: "/me/tips" }}
        />
      </div>
    )
  }

  if (booting || !initialValues) {
    return (
      <TipForm
        pageTitle="Editar dica"
        pageSubtitle="Atualize o conteúdo"
        submitLabel="Salvar alterações"
        backTo="/me/tips"
        booting
        onSubmit={handleSubmit}
      />
    )
  }

  return (
    <TipForm
      pageTitle="Editar dica"
      pageSubtitle="Atualize o conteúdo"
      submitLabel="Salvar alterações"
      backTo="/me/tips"
      initialValues={initialValues}
      onSubmit={handleSubmit}
    />
  )
}

export default function EditTipPage() {
  return (
    <RequireAuth>
      <TipEditForm />
    </RequireAuth>
  )
}
