import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/lib/auth/AuthContext"
import { getErrorMessage } from "@/lib/api/errors"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  })

  const nameInvalid = touched.name && name.trim().length < 1
  const emailInvalid = touched.email && !email.includes("@")
  const passwordInvalid = touched.password && !PASSWORD_RULE.test(password)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setTouched({ name: true, email: true, password: true })
    if (name.trim().length < 1 || !email.includes("@") || !PASSWORD_RULE.test(password)) {
      return
    }

    setLoading(true)
    setError(null)
    try {
      await register({ name: name.trim(), email, password })
      navigate("/", { replace: true })
    } catch (err) {
      setError(getErrorMessage(err, "Não foi possível criar a conta"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto grid max-w-md gap-8">
      <div className="text-center">
        <h1 className="font-display text-5xl text-primary">Cadê Meu Rango</h1>
        <p className="mt-2 text-muted-foreground">Crie sua conta e comece a compartilhar receitas</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>Preencha seus dados para se cadastrar</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            {error ? (
              <Alert variant="destructive">
                <AlertTitle>Cadastro não concluído</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                autoComplete="name"
                placeholder="Maria Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                aria-invalid={nameInvalid}
              />
              {nameInvalid ? (
                <p className="text-destructive text-sm">Informe seu nome</p>
              ) : null}
            </div>

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
                autoComplete="new-password"
                placeholder="MinhaSenh@123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                aria-invalid={passwordInvalid}
              />
              {passwordInvalid ? (
                <p className="text-destructive text-sm">
                  Mín. 8 caracteres, com maiúscula, minúscula, número e especial
                </p>
              ) : null}
            </div>

            <p className="text-muted-foreground text-center text-xs leading-relaxed">
              Ao criar a conta, você concorda com os{" "}
              <Link to="/termos" className="text-primary font-medium hover:underline">
                Termos de Uso
              </Link>{" "}
              e a{" "}
              <Link to="/privacidade" className="text-primary font-medium hover:underline">
                Política de Privacidade
              </Link>
              .
            </p>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <Link to="/auth/login" className="text-primary font-medium hover:underline">
              Entrar
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
