import { useNavigate } from "react-router-dom"
import { tipService } from "@/lib/api/tip.service"
import { TipForm, type TipFormValues } from "@/components/forms/TipForm"
import { RequireAuth } from "@/components/auth/RequireAuth"
import { toast } from "sonner"

function TipCreateForm() {
  const navigate = useNavigate()

  async function handleSubmit(values: TipFormValues) {
    const tip = await tipService.create(values)
    toast.success("Dica criada")
    navigate(`/tip/${tip.id}`)
  }

  return (
    <TipForm
      pageTitle="Nova dica"
      pageSubtitle="Compartilhe um truque rápido"
      submitLabel="Publicar dica"
      backTo="/me/tips"
      onSubmit={handleSubmit}
    />
  )
}

export default function NewTipPage() {
  return (
    <RequireAuth>
      <TipCreateForm />
    </RequireAuth>
  )
}
