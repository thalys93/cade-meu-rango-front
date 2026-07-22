import { useState, type FormEvent } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/lib/auth/AuthContext"
import { getErrorMessage } from "@/lib/api/errors"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? "/"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState({ email: false, password: false })

  const emailInvalid = touched.email && !email.includes("@")
  const passwordInvalid = touched.password && password.length < 6

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setTouched({ email: true, password: true })
    if (!email.includes("@") || password.length < 6) return

    setLoading(true)
    setError(null)
    try {
      await login({ email, password })
      navigate(from, { replace: true })
    } catch (err) {
      setError(getErrorMessage(err, "Credenciais inválidas"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto grid max-w-md gap-8">
      <div className="text-center">
        <h1 className="font-display text-5xl text-primary">Cadê Meu Rango</h1>
        <p className="mt-2 text-muted-foreground">Entre para continuar cozinhando com a gente</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Use o e-mail e a senha da sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            {error ? (
              <Alert variant="destructive">
                <AlertTitle>Não foi possível entrar</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="voce@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                aria-invalid={emailInvalid}
              />
              {emailInvalid ? (
                <p className="text-destructive text-sm">Informe um e-mail válido</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                aria-invalid={passwordInvalid}
              />
              {passwordInvalid ? (
                <p className="text-destructive text-sm">A senha precisa ter ao menos 6 caracteres</p>
              ) : null}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Ainda não tem conta?{" "}
            <Link to="/auth/register" className="text-primary font-medium hover:underline">
              Criar conta
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
