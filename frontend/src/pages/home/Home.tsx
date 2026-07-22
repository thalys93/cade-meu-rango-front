import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  Bookmark,
  Lightbulb,
  Search,
  Share2,
} from "lucide-react"
import { recipeService } from "@/lib/api/recipe.service"
import { tipService } from "@/lib/api/tip.service"
import { categoryService } from "@/lib/api/category.service"
import type { Category, Recipe, Tip } from "@/lib/api/types"
import { getErrorMessage } from "@/lib/api/errors"
import { RecipeCard } from "@/components/RecipeCard"
import { TipCard } from "@/components/TipCard"
import { MarqueeSkeleton } from "@/components/ContentSkeletons"
import { EmptyState } from "@/components/EmptyState"
import { ErrorState } from "@/components/ErrorState"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const HERO_IMAGE_FRONT =
  "https://res.cloudinary.com/dh39ahmpj/image/upload/v1684280950/Cad%C3%AA%20Meu%20Rango/thumb_do_site_knjbzn.png"
const HERO_IMAGE_BACK =
  "https://res.cloudinary.com/dh39ahmpj/image/upload/c_thumb,w_2844,h_718,g_auto/v1695040147/Cad%C3%AA%20Meu%20Rango/banner_utjdxx.png"
const CATEGORIES_IMAGE = HERO_IMAGE_BACK

const BENEFITS = [
  {
    icon: Share2,
    title: "Compartilhe",
    description: "Publique suas receitas e inspire outras pessoas na cozinha.",
  },
  {
    icon: Search,
    title: "Descubra",
    description: "Explore pratos novos da comunidade a qualquer hora.",
  },
  {
    icon: Bookmark,
    title: "Guarde",
    description: "Organize o que você ama cozinhar em um só lugar.",
  },
  {
    icon: Lightbulb,
    title: "Aprenda",
    description: "Dicas práticas para o dia a dia sem complicação.",
  },
] as const

const heroGridStyle = {
  backgroundImage:
    "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(to right, var(--border) 1px, transparent 1px)",
  backgroundSize: "3rem 3rem",
}

const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14 },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
}

const heroCards = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" as const, staggerChildren: 0.2 },
  },
}

const heroCard = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0 },
}

function InfiniteMarquee({
  children,
  label,
  durationSec = 40,
}: {
  children: ReactNode
  label: string
  durationSec?: number
}) {
  const reduceMotion = useReducedMotion()
  const items = Children.toArray(children)

  if (reduceMotion) {
    return (
      <div
        className="scrollbar-none flex gap-5 overflow-x-auto pb-1"
        aria-label={label}
      >
        {items}
      </div>
    )
  }

  const clones = items.map((child, index) => {
    if (!isValidElement(child)) return child
    return cloneElement(child as ReactElement<{ key?: string }>, {
      key: `clone-${child.key ?? index}`,
    })
  })

  return (
    <div className="cmr-marquee overflow-hidden" aria-label={label}>
      <div
        className="cmr-marquee-track flex w-max"
        style={
          {
            "--cmr-marquee-duration": `${durationSec}s`,
          } as CSSProperties
        }
      >
        <div className="flex gap-5 pr-5">{items}</div>
        <div className="flex gap-5 pr-5" aria-hidden>
          {clones}
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [tips, setTips] = useState<Tip[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryKey, setRetryKey] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const [recipesRes, tipsRes, categoriesRes] = await Promise.all([
          recipeService.findAll({ limit: 10, page: 1 }),
          tipService.findAll({ limit: 10, page: 1 }),
          categoryService.findAll(),
        ])
        if (cancelled) return
        setRecipes(recipesRes.items ?? [])
        setTips(tipsRes.items ?? [])
        setCategories(categoriesRes ?? [])
      } catch (err) {
        if (!cancelled) {
          setRecipes([])
          setTips([])
          setCategories([])
          setError(getErrorMessage(err, "Não foi possível carregar o conteúdo"))
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [retryKey])

  const retry = useCallback(() => setRetryKey((k) => k + 1), [])

  const popularRecipes = recipes
  const tipCards = tips
  const recipesDuration = Math.max(28, popularRecipes.length * 5)
  const tipsDuration = Math.max(28, tipCards.length * 5)

  return (
    <div className="mt-8 space-y-12 pb-4 md:space-y-16">
      <section className="relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-card text-foreground shadow-sm">
        <div className="absolute inset-0" style={heroGridStyle} />
        <div className="absolute inset-0 bg-gradient-to-b from-card via-card/90 to-card" />

        <motion.div
          className="relative flex flex-col items-center justify-between gap-12 px-6 py-14 lg:flex-row lg:py-16"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={heroContainer}
        >
          <div className="flex flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left">
            <motion.p
              className="font-display text-4xl text-primary md:text-5xl"
              variants={heroItem}
            >
              Cadê Meu Rango
            </motion.p>
            <motion.h1
              className="mt-3 text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl"
              variants={heroItem}
            >
              Receitas que você se apaixona no primeiro garfo
            </motion.h1>
            <motion.p
              className="text-muted-foreground mt-5 max-w-xl text-base leading-relaxed md:text-lg"
              variants={heroItem}
            >
              Seu destino para compartilhar, descobrir e guardar receitas favoritas — com dicas
              práticas para a cozinha do dia a dia.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              variants={heroItem}
            >
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link to="/recipes">
                  Ver receitas
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base">
                <Link to="/auth/register">Criar conta</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="relative flex h-56 w-full items-center justify-center md:h-72 lg:w-1/2"
            variants={heroCards}
          >
            <motion.img
              src={HERO_IMAGE_BACK}
              alt=""
              variants={heroCard}
              whileHover={reduceMotion ? undefined : { y: -10, rotate: -3 }}
              transition={{ duration: 0.3 }}
              className="absolute z-10 h-44 w-[55%] max-w-xs translate-x-16 -rotate-6 rounded-2xl object-cover shadow-2xl md:h-64"
            />
            <motion.img
              src={HERO_IMAGE_FRONT}
              alt=""
              variants={heroCard}
              whileHover={reduceMotion ? undefined : { y: -10, rotate: 3 }}
              transition={{ duration: 0.3 }}
              className="absolute z-20 h-44 w-[55%] max-w-xs -translate-x-12 rotate-6 rounded-2xl object-cover shadow-2xl md:h-64"
            />
          </motion.div>
        </motion.div>
      </section>

      <section className="bg-card rounded-[1.75rem] border border-border/70 px-6 py-8 shadow-sm md:px-8 md:py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="space-y-3">
              <div className="bg-accent text-accent-foreground inline-flex size-11 items-center justify-center rounded-2xl">
                <Icon className="size-5" aria-hidden />
              </div>
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {error ? (
        <ErrorState
          title="Não foi possível carregar o conteúdo"
          description={error}
          onRetry={retry}
        />
      ) : (
        <>
          <section className="bg-card rounded-[1.75rem] border border-border/70 px-6 py-8 shadow-sm md:px-8 md:py-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:items-center">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold md:text-3xl">Receitas populares</h2>
                <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
                  Pratos que a comunidade anda pedindo de novo — comece por aqui.
                </p>
                <Button asChild>
                  <Link to="/recipes">Ver todas as receitas</Link>
                </Button>
              </div>

              <div className="min-w-0">
                {loading ? (
                  <MarqueeSkeleton variant="recipe" />
                ) : popularRecipes.length === 0 ? (
                  <EmptyState
                    className="py-8"
                    title="Nenhuma receita ainda"
                    description="Quando houver receitas na API, elas aparecem aqui."
                    action={{ label: "Criar receita", href: "/recipe/new" }}
                  />
                ) : (
                  <InfiniteMarquee
                    label="receitas populares"
                    durationSec={recipesDuration}
                  >
                    {popularRecipes.map((recipe) => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        className="w-56 shrink-0 sm:w-64"
                      />
                    ))}
                  </InfiniteMarquee>
                )}
              </div>
            </div>
          </section>

          <section className="bg-card rounded-[1.75rem] border border-border/70 px-6 py-8 shadow-sm md:px-8 md:py-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:items-center">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold md:text-3xl">Dicas pra cozinha</h2>
                <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
                  Atalhos práticos que valem o clique.
                </p>
                <Button asChild variant="outline">
                  <Link to="/tips">Ver todas</Link>
                </Button>
              </div>

              <div className="min-w-0">
                {loading ? (
                  <MarqueeSkeleton variant="tip" count={2} />
                ) : tipCards.length === 0 ? (
                  <EmptyState
                    className="py-8"
                    icon={Lightbulb}
                    title="Nenhuma dica ainda"
                    description="As dicas da API vão aparecer nesta seção."
                    action={{ label: "Criar dica", href: "/tip/new" }}
                  />
                ) : (
                  <InfiniteMarquee label="dicas" durationSec={tipsDuration}>
                    {tipCards.map((tip) => (
                      <TipCard
                        key={tip.id}
                        tip={tip}
                        className="w-64 shrink-0 sm:w-72"
                      />
                    ))}
                  </InfiniteMarquee>
                )}
              </div>
            </div>
          </section>

          {categories.length > 0 ? (
            <section className="landing-breakout">
              <div className="bg-card mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] border border-border/70 px-6 py-8 shadow-sm md:px-8 md:py-10">
                <div className="grid items-center gap-10 md:grid-cols-2">
                  <div className="space-y-5">
                    <h2 className="text-2xl font-semibold md:text-3xl">Categorias pra explorar</h2>
                    <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
                      Do café da manhã ao jantar especial — encontre o que combina com o momento.
                    </p>
                    <Button asChild>
                      <Link to="/recipes">Ver receitas</Link>
                    </Button>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {categories.map((category) => (
                        <Badge key={category.id} variant="outline" asChild>
                          <Link to={`/recipes?category=${category.slug}`}>{category.name}</Link>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="landing-organic-alt overflow-hidden">
                    <img
                      src={CATEGORIES_IMAGE}
                      alt=""
                      className="aspect-4/3 w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>
          ) : null}
        </>
      )}
    </div>
  )
}
