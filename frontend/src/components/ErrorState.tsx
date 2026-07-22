import type { LucideIcon } from "lucide-react"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type ErrorStateProps = {
  title?: string
  description: string
  icon?: LucideIcon
  onRetry?: () => void
  retryLabel?: string
  secondaryAction?: {
    label: string
    href: string
  }
  className?: string
}

export function ErrorState({
  title = "Algo deu errado",
  description,
  icon: Icon = AlertCircle,
  onRetry,
  retryLabel = "Tentar de novo",
  secondaryAction,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-12 text-center",
        className,
      )}
    >
      <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <Icon className="size-6" aria-hidden />
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed">
        {description}
      </p>
      {onRetry || secondaryAction ? (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {onRetry ? (
            <Button onClick={onRetry}>
              <RefreshCw className="size-4" aria-hidden />
              {retryLabel}
            </Button>
          ) : null}
          {secondaryAction ? (
            <Button asChild variant="outline">
              <Link to={secondaryAction.href}>{secondaryAction.label}</Link>
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
