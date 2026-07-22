import { useEffect, useState, type FormEvent } from "react"
import { useAuth } from "@/lib/auth/AuthContext"
import { userService } from "@/lib/api/user.service"
import { getErrorMessage } from "@/lib/api/errors"
import { UPLOAD_PRESETS } from "@/lib/api/types"
import { ImageDropzone } from "@/components/ImageDropzone"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/

export default function MePage() {
  const { user, refreshUser } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    setName(user.name)
    setEmail(user.email)
    setAvatarUrl(user.avatar_url ?? "")
  }, [user])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!name.trim() || !email.includes("@")) {
      setError("Nome e e-mail válidos são obrigatórios")
      return
    }
    if (password && !PASSWORD_RULE.test(password)) {
      setError(
        "Senha: mín. 8 caracteres, com maiúscula, minúscula, número e especial",
      )
      return
    }

    setLoading(true)
    setError(null)
    try {
      await userService.updateMe({
        name: name.trim(),
        email: email.trim(),
        avatar_url: avatarUrl || undefined,
        ...(password ? { password } : {}),
      })
      await refreshUser()
      setPassword("")
      toast.success("Perfil atualizado")
    } catch (err) {
      setError(getErrorMessage(err, "Não foi possível salvar o perfil"))
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="mx-auto w-full max-w-lg space-y-6">
      <div>
        <h2 className="text-lg font-semibold sm:text-xl">Meu perfil</h2>
        <p className="text-sm text-muted-foreground">
          Atualize seus dados e avatar
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {error ? (
          <Alert variant="destructive">
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        <div className="space-y-2">
          <Label>Avatar</Label>
          <ImageDropzone
            variant="avatar"
            value={avatarUrl}
            onUploaded={setAvatarUrl}
            onClear={() => setAvatarUrl("")}
            uploadPreset={UPLOAD_PRESETS.avatars}
            publicId={`avatar_${user.id}`}
            displayName={name || user.name}
            disabled={loading}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="password">Nova senha (opcional)</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="Deixe em branco para manter"
            />
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading ? "Salvando..." : "Salvar alterações"}
        </Button>
      </form>
    </div>
  )
}
