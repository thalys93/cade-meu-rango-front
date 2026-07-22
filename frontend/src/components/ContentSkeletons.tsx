import { cn } from "@/lib/utils"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function RecipeCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("h-full overflow-hidden", className)} aria-hidden>
      <Skeleton className="aspect-4/3 w-full rounded-none rounded-t-xl" />
      <CardHeader className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </CardHeader>
      <CardFooter className="mt-auto gap-2 border-t-0 bg-transparent">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </CardFooter>
    </Card>
  )
}

export function TipCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("h-full", className)} aria-hidden>
      <CardHeader>
        <div className="flex items-start gap-4">
          <Skeleton className="size-12 shrink-0 rounded-2xl" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </CardHeader>
      <CardFooter className="mt-auto gap-2 border-t-0 bg-transparent">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </CardFooter>
    </Card>
  )
}

export function RecipeGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-label="Carregando receitas"
    >
      {Array.from({ length: count }).map((_, i) => (
        <RecipeCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function TipGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2"
      aria-busy="true"
      aria-label="Carregando dicas"
    >
      {Array.from({ length: count }).map((_, i) => (
        <TipCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function ManageListSkeleton({
  count = 4,
  withImage = false,
}: {
  count?: number
  withImage?: boolean
}) {
  return (
    <div
      className="grid gap-3 sm:grid-cols-2 sm:gap-4"
      aria-busy="true"
      aria-label="Carregando lista"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-border/80 bg-background/40"
        >
          {withImage ? (
            <Skeleton className="h-28 w-full rounded-none sm:h-32" />
          ) : null}
          <div className="space-y-3 p-3 sm:p-4">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-2">
              <Skeleton className="h-8 flex-1 rounded-lg sm:w-20 sm:flex-none" />
              <Skeleton className="h-8 flex-1 rounded-lg sm:w-20 sm:flex-none" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function RecipeDetailSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Carregando receita">
      <div className="space-y-3">
        <Skeleton className="h-8 w-2/3 max-w-md" />
        <Skeleton className="h-4 w-full max-w-2xl" />
        <Skeleton className="h-4 w-4/5 max-w-xl" />
        <div className="flex items-center gap-2 pt-1">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
      <Skeleton className="h-56 w-full rounded-(--cmr-radius) md:h-72" />
      <div className="space-y-3 rounded-(--cmr-radius) border border-border/70 bg-card p-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

export function TipDetailSkeleton() {
  return (
    <div
      className="mx-auto max-w-2xl space-y-6"
      aria-busy="true"
      aria-label="Carregando dica"
    >
      <div className="space-y-3">
        <Skeleton className="h-8 w-1/2" />
        <div className="flex items-center gap-2">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-5 w-3/4" />
      </div>
    </div>
  )
}

export function MarqueeSkeleton({
  variant = "recipe",
  count = 3,
}: {
  variant?: "recipe" | "tip"
  count?: number
}) {
  return (
    <div className="flex gap-5 overflow-hidden" aria-busy="true">
      {Array.from({ length: count }).map((_, i) =>
        variant === "recipe" ? (
          <RecipeCardSkeleton key={i} className="w-56 shrink-0 sm:w-64" />
        ) : (
          <TipCardSkeleton key={i} className="w-64 shrink-0 sm:w-72" />
        ),
      )}
    </div>
  )
}
