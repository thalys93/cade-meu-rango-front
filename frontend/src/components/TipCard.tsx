import { Link } from "react-router-dom"
import type { Tip } from "@/lib/api/types"
import { useAuth } from "@/lib/auth/AuthContext"
import { tipIcon } from "@/lib/tip-icon"
import { slugify } from "@/lib/slugify"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function authorInitials(name?: string) {
  if (!name) return "?"
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function TipCard({
  tip,
  className,
}: {
  tip: Tip
  className?: string
}) {
  const { user } = useAuth()
  const Icon = tipIcon(tip)
  const isOwner = Boolean(user && tip.author?.id === user.id)

  return (
    <Link
      to={`/tip/${tip.id}/${slugify(tip.title)}`}
      className={cn("block h-full", className)}
    >
      <Card className="h-full hover:border-primary/40">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="bg-accent text-accent-foreground relative flex size-12 shrink-0 items-center justify-center rounded-2xl">
              <Icon className="size-5" aria-hidden />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              {isOwner ? (
                <Badge
                  variant="secondary"
                  className="bg-accent text-accent-foreground mb-1"
                >
                  Sua dica
                </Badge>
              ) : null}
              <CardTitle className="line-clamp-1 text-lg">{tip.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {tip.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        {tip.author ? (
          <CardFooter className="mt-auto gap-2 border-t-0 bg-transparent">
            <Avatar size="sm">
              {tip.author.avatar_url ? (
                <AvatarImage src={tip.author.avatar_url} alt={tip.author.name} />
              ) : null}
              <AvatarFallback>{authorInitials(tip.author.name)}</AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground truncate text-sm">
              {isOwner ? "Você" : tip.author.name}
            </span>
          </CardFooter>
        ) : null}
      </Card>
    </Link>
  )
}
