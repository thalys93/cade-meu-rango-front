import { useState } from "react"
import { Link } from "react-router-dom"
import { Clock, ImageOff } from "lucide-react"
import type { Recipe } from "@/lib/api/types"
import { useAuth } from "@/lib/auth/AuthContext"
import { difficultyLabel, formatDurationMinutes } from "@/lib/recipe-meta"
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

function RecipeImagePlaceholder() {
  return (
    <div className="bg-muted text-muted-foreground flex aspect-4/3 w-full flex-col items-center justify-center gap-2 text-sm">
      <ImageOff className="size-6 opacity-60" aria-hidden />
      Sem imagem
    </div>
  )
}

export function RecipeCard({
  recipe,
  className,
}: {
  recipe: Recipe
  className?: string
}) {
  const { user } = useAuth()
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = Boolean(recipe.image_url) && !imageFailed
  const duration = formatDurationMinutes(recipe.durationMinutes)
  const difficulty = difficultyLabel(recipe.difficulty)
  const isOwner = Boolean(user && recipe.author?.id === user.id)

  return (
    <Link
      to={`/recipe/${recipe.id}/${slugify(recipe.title)}`}
      className={cn("block h-full", className)}
    >
      <Card className="h-full hover:border-primary/40">
        <div className="relative">
          {showImage ? (
            <img
              src={recipe.image_url!}
              alt=""
              className="aspect-4/3 w-full object-cover"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <RecipeImagePlaceholder />
          )}
          {isOwner ? (
            <Badge
              variant="secondary"
              className="bg-accent text-accent-foreground absolute top-2 left-2 shadow-sm"
            >
              Sua receita
            </Badge>
          ) : null}
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-1 text-lg">{recipe.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {recipe.description}
          </CardDescription>
          {duration || difficulty ? (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-muted-foreground">
              {duration ? (
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3.5" aria-hidden />
                  {duration}
                </span>
              ) : null}
              {difficulty ? (
                <Badge variant="secondary" className="h-5">
                  {difficulty}
                </Badge>
              ) : null}
            </div>
          ) : null}
        </CardHeader>
        {recipe.author ? (
          <CardFooter className="mt-auto gap-2 border-t-0 bg-transparent">
            <Avatar size="sm">
              {recipe.author.avatar_url ? (
                <AvatarImage
                  src={recipe.author.avatar_url}
                  alt={recipe.author.name}
                />
              ) : null}
              <AvatarFallback>
                {authorInitials(recipe.author.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground truncate text-sm">
              {isOwner ? "Você" : recipe.author.name}
            </span>
          </CardFooter>
        ) : null}
      </Card>
    </Link>
  )
}
