import { useState, type FormEvent, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { ImageDropzone } from "@/components/ImageDropzone"
import { CategoryTagsInput } from "@/components/forms/CategoryTagsInput"
import { SmartList } from "@/components/forms/SmartList"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { getErrorMessage } from "@/lib/api/errors"
import { UPLOAD_PRESETS, type RecipeDifficulty } from "@/lib/api/types"
import { cn } from "@/lib/utils"

export const NONE_DIFFICULTY = "none"

export type RecipeFormValues = {
  title: string
  description: string
  imageUrl: string
  difficulty: RecipeDifficulty | typeof NONE_DIFFICULTY
  durationMinutes: string
  tools: string[]
  ingredients: string[]
  instructions: string[]
  categories: string[]
}

export type RecipeFormSubmitValues = {
  title: string
  description: string
  imageUrl: string
  difficulty: RecipeDifficulty | null
  durationMinutes: number | null
  tools: string[]
  ingredients: string[]
  instructions: string[]
  categories: string[]
}

const emptyValues: RecipeFormValues = {
  title: "",
  description: "",
  imageUrl: "",
  difficulty: NONE_DIFFICULTY,
  durationMinutes: "",
  tools: [""],
  ingredients: [""],
  instructions: [""],
  categories: [],
}

type RecipeFormProps = {
  pageTitle: string
  pageSubtitle: string
  submitLabel: string
  backTo: string
  publicId: string
  initialValues?: Partial<RecipeFormValues>
  booting?: boolean
  onSubmit: (values: RecipeFormSubmitValues) => Promise<void>
}

function Section({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children: ReactNode
}) {
  return (
    <section className="space-y-3 border-t border-border/70 pt-8 first:border-t-0 first:pt-0">
      <div>
        <h2 className="text-lg font-medium tracking-tight">{title}</h2>
        {hint ? (
          <p className="text-muted-foreground mt-1 text-sm">{hint}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

export function RecipeForm({
  pageTitle,
  pageSubtitle,
  submitLabel,
  backTo,
  publicId,
  initialValues,
  booting = false,
  onSubmit,
}: RecipeFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? emptyValues.title)
  const [description, setDescription] = useState(
    initialValues?.description ?? emptyValues.description,
  )
  const [imageUrl, setImageUrl] = useState(
    initialValues?.imageUrl ?? emptyValues.imageUrl,
  )
  const [difficulty, setDifficulty] = useState(
    initialValues?.difficulty ?? emptyValues.difficulty,
  )
  const [durationMinutes, setDurationMinutes] = useState(
    initialValues?.durationMinutes ?? emptyValues.durationMinutes,
  )
  const [tools, setTools] = useState(initialValues?.tools ?? emptyValues.tools)
  const [ingredients, setIngredients] = useState(
    initialValues?.ingredients ?? emptyValues.ingredients,
  )
  const [instructions, setInstructions] = useState(
    initialValues?.instructions ?? emptyValues.instructions,
  )
  const [categories, setCategories] = useState(
    initialValues?.categories ?? emptyValues.categories,
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const cleanIngredients = ingredients.map((item) => item.trim()).filter(Boolean)
    const cleanInstructions = instructions
      .map((item) => item.trim())
      .filter(Boolean)
    const cleanTools = tools.map((item) => item.trim()).filter(Boolean)
    const parsedDuration = durationMinutes.trim()
      ? Number.parseInt(durationMinutes, 10)
      : null

    if (
      !title.trim() ||
      !description.trim() ||
      cleanIngredients.length === 0 ||
      cleanInstructions.length === 0
    ) {
      setError("Preencha título, descrição, ingredientes e modo de preparo")
      return
    }
    if (
      parsedDuration !== null &&
      (!Number.isFinite(parsedDuration) || parsedDuration < 1)
    ) {
      setError("Duração deve ser um número inteiro maior que zero")
      return
    }

    setLoading(true)
    setError(null)
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        imageUrl,
        difficulty: difficulty === NONE_DIFFICULTY ? null : difficulty,
        durationMinutes: parsedDuration,
        tools: cleanTools,
        ingredients: cleanIngredients,
        instructions: cleanInstructions,
        categories,
      })
    } catch (err) {
      setError(getErrorMessage(err, "Não foi possível salvar a receita"))
    } finally {
      setLoading(false)
    }
  }

  if (booting) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl pb-28">
      <div className="mb-6">
        <h1 className="font-display text-4xl text-primary md:text-5xl">
          {pageTitle}
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">{pageSubtitle}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          className={cn(
            "overflow-hidden rounded-2xl bg-card text-card-foreground shadow-sm",
            "ring-1 ring-border/60",
          )}
        >
          <div className="bg-muted/30 px-0 pt-0">
            <ImageDropzone
              value={imageUrl}
              onUploaded={setImageUrl}
              onClear={() => setImageUrl("")}
              uploadPreset={UPLOAD_PRESETS.assets}
              publicId={publicId}
              displayName={title || "Receita"}
              disabled={loading}
              className="gap-3 px-0 [&>[role=button]]:min-h-52 [&>[role=button]]:rounded-none [&>[role=button]]:border-x-0 [&>[role=button]]:border-t-0 [&>button]:mx-5 [&>button]:mb-4 sm:[&>button]:mx-8"
            />
          </div>

          <div className="space-y-0 px-5 py-8 sm:px-8">
            {error ? (
              <Alert variant="destructive" className="mb-8">
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            <Section title="Básicos" hint="O essencial da receita">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="recipe-title">Título</Label>
                  <Input
                    id="recipe-title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Ex: Brownie de chocolate"
                    disabled={loading}
                    className="h-11 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipe-description">Descrição</Label>
                  <textarea
                    id="recipe-description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    disabled={loading}
                    placeholder="Conte a história ou o resultado esperado"
                    rows={4}
                    className="border-input bg-card placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-[6px] border px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-3 disabled:opacity-50"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="recipe-difficulty">Dificuldade</Label>
                    <Select
                      value={difficulty}
                      onValueChange={(value) =>
                        setDifficulty(
                          value as RecipeDifficulty | typeof NONE_DIFFICULTY,
                        )
                      }
                      disabled={loading}
                    >
                      <SelectTrigger id="recipe-difficulty" className="w-full">
                        <SelectValue placeholder="Não informado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={NONE_DIFFICULTY}>
                          Não informado
                        </SelectItem>
                        <SelectItem value="easy">Fácil</SelectItem>
                        <SelectItem value="medium">Médio</SelectItem>
                        <SelectItem value="hard">Difícil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipe-duration">Duração (minutos)</Label>
                    <Input
                      id="recipe-duration"
                      type="number"
                      min={1}
                      inputMode="numeric"
                      value={durationMinutes}
                      onChange={(event) =>
                        setDurationMinutes(event.target.value)
                      }
                      placeholder="Ex: 45"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            </Section>

            <Section
              title="Categorias"
              hint="Busque existentes ou crie uma nova"
            >
              <CategoryTagsInput
                value={categories}
                onChange={setCategories}
                disabled={loading}
              />
            </Section>

            <Section
              title="Ferramentas"
              hint="Enter adiciona, arraste para reordenar"
            >
              <SmartList
                items={tools}
                onChange={setTools}
                variant="bullet"
                placeholder="Ex: fouet, forma..."
                addLabel="Adicionar ferramenta"
                disabled={loading}
              />
            </Section>

            <Section
              title="Ingredientes"
              hint="Uma linha por item — Enter para o próximo"
            >
              <SmartList
                items={ingredients}
                onChange={setIngredients}
                variant="bullet"
                placeholder="Ingrediente {n}"
                addLabel="Adicionar ingrediente"
                disabled={loading}
              />
            </Section>

            <Section
              title="Modo de preparo"
              hint="Passos numerados, na ordem certa"
            >
              <SmartList
                items={instructions}
                onChange={setInstructions}
                variant="numbered"
                placeholder="Passo {n}"
                addLabel="Adicionar passo"
                disabled={loading}
              />
            </Section>
          </div>
        </div>

        <div className="border-border/80 bg-background/90 fixed inset-x-0 bottom-0 z-30 border-t backdrop-blur-md">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
            <Button asChild type="button" variant="ghost">
              <Link to={backTo}>Voltar</Link>
            </Button>
            <Button type="submit" size="lg" disabled={loading}>
              {loading ? "Salvando..." : submitLabel}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
