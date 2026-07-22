import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type ComingSoonProps = {
  title: string
  description: string
  ctaHref?: string
  ctaLabel?: string
}

export function ComingSoon({
  title,
  description,
  ctaHref = "/",
  ctaLabel = "Voltar ao início",
}: ComingSoonProps) {
  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link to={ctaHref}>{ctaLabel}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
