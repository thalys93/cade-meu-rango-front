import { Link } from "react-router-dom"

export function SiteFooter() {
  return (
    <footer className="mt-auto px-4 pb-6">
      <div className="bg-card mx-auto flex max-w-6xl flex-col gap-4 rounded-[1.75rem] border border-border/80 px-6 py-8 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-2xl text-primary">Cadê Meu Rango</p>
          <p className="text-muted-foreground text-sm">Seu site de receitas favorito</p>
        </div>
        <nav className="flex flex-wrap gap-5 text-sm font-medium text-muted-foreground">
          <Link to="/recipes" className="transition-colors hover:text-primary">
            Receitas
          </Link>
          <Link to="/tips" className="transition-colors hover:text-primary">
            Dicas
          </Link>
          <Link to="/termos" className="transition-colors hover:text-primary">
            Termos de uso
          </Link>
          <Link to="/privacidade" className="transition-colors hover:text-primary">
            Privacidade
          </Link>
          <Link to="/auth/login" className="transition-colors hover:text-primary">
            Entrar
          </Link>
        </nav>
      </div>
    </footer>
  )
}
