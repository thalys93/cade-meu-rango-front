import type { LucideIcon } from "lucide-react"
import { CookingPot } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type EmptyStateProps = {
  title: string
  description: string
  icon?: LucideIcon
  action?: {
    label: string
    onClick?: () => void
    href?: string
  }
  className?: string
}

export function EmptyState({
  title,
  description,
  icon: Icon = CookingPot,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card/60 px-6 py-12 text-center",
        className,
      )}
    >
      <div className="bg-accent text-accent-foreground mb-4 flex size-14 items-center justify-center rounded-2xl">
        <Icon className="size-6" aria-hidden />
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed">
        {description}
      </p>
      {action ? (
        action.href ? (
          <Button asChild className="mt-6">
            <Link to={action.href}>{action.label}</Link>
          </Button>
        ) : (
          <Button className="mt-6" onClick={action.onClick}>
            {action.label}
          </Button>
        )
      ) : null}
    </div>
  )
}
