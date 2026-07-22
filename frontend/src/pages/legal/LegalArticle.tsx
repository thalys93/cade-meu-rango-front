import type { ReactNode } from "react"

type LegalArticleProps = {
  title: string
  updatedAt: string
  children: ReactNode
}

export function LegalArticle({ title, updatedAt, children }: LegalArticleProps) {
  return (
    <article className="mx-auto max-w-3xl">
      <header className="mb-10 border-b border-border/80 pb-8">
        <p className="font-display text-3xl text-primary">Cadê Meu Rango</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">Última atualização: {updatedAt}</p>
      </header>
      <div className="legal-prose space-y-8 text-[15px] leading-7 text-foreground/90 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_p]:text-muted-foreground [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </article>
  )
}
