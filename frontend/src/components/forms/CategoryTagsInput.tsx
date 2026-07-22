import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react"
import { X } from "lucide-react"
import { categoryService } from "@/lib/api/category.service"
import type { Category } from "@/lib/api/types"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const DEBOUNCE_MS = 300

type CategoryTagsInputProps = {
  value: string[]
  onChange: (value: string[]) => void
  disabled?: boolean
  placeholder?: string
  className?: string
}

function normalizeName(name: string) {
  return name.trim().replace(/\s+/g, " ")
}

export function CategoryTagsInput({
  value,
  onChange,
  disabled = false,
  placeholder = "Buscar ou criar categoria",
  className,
}: CategoryTagsInputProps) {
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const list = await categoryService.findAll()
        if (!cancelled) setCategories(list)
      } catch {
        if (!cancelled) setCategories([])
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query)
      setHighlight(0)
    }, DEBOUNCE_MS)
    return () => window.clearTimeout(timer)
  }, [query])

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [])

  const selectedLower = new Set(value.map((name) => name.toLowerCase()))
  const trimmed = normalizeName(debouncedQuery)
  const matches = categories
    .filter(
      (category) =>
        !selectedLower.has(category.name.toLowerCase()) &&
        (trimmed.length === 0 ||
          category.name.toLowerCase().includes(trimmed.toLowerCase())),
    )
    .slice(0, 8)

  const exactTaken =
    trimmed.length > 0 &&
    (selectedLower.has(trimmed.toLowerCase()) ||
      categories.some(
        (category) => category.name.toLowerCase() === trimmed.toLowerCase(),
      ))

  const showCreate = trimmed.length > 0 && !exactTaken
  const options: Array<{ kind: "existing" | "create"; label: string }> = [
    ...matches.map((category) => ({
      kind: "existing" as const,
      label: category.name,
    })),
    ...(showCreate
      ? [{ kind: "create" as const, label: trimmed }]
      : []),
  ]

  function addTag(name: string) {
    const cleaned = normalizeName(name)
    if (!cleaned) return
    if (value.some((item) => item.toLowerCase() === cleaned.toLowerCase())) {
      setQuery("")
      return
    }
    const existing = categories.find(
      (category) => category.name.toLowerCase() === cleaned.toLowerCase(),
    )
    onChange([...value, existing?.name ?? cleaned])
    setQuery("")
    setDebouncedQuery("")
    setOpen(false)
    inputRef.current?.focus()
  }

  function removeTag(name: string) {
    onChange(value.filter((item) => item !== name))
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && query === "" && value.length > 0) {
      event.preventDefault()
      onChange(value.slice(0, -1))
      return
    }

    if (event.key === "ArrowDown" && open && options.length > 0) {
      event.preventDefault()
      setHighlight((current) => (current + 1) % options.length)
      return
    }

    if (event.key === "ArrowUp" && open && options.length > 0) {
      event.preventDefault()
      setHighlight((current) => (current - 1 + options.length) % options.length)
      return
    }

    if (event.key === "Escape") {
      setOpen(false)
      return
    }

    if (event.key === "Enter") {
      event.preventDefault()
      if (open && options[highlight]) {
        addTag(options[highlight].label)
        return
      }
      if (normalizeName(query)) {
        addTag(query)
      }
    }
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <div
        className={cn(
          "border-input bg-card flex min-h-10 flex-wrap items-center gap-1.5 rounded-[6px] border px-2 py-1.5 shadow-xs transition-colors",
          "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
          disabled && "pointer-events-none opacity-50",
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((name) => (
          <Badge key={name} variant="secondary" className="h-7 gap-1 pr-1">
            {name}
            <button
              type="button"
              className="hover:bg-muted rounded-full p-0.5"
              aria-label={`Remover ${name}`}
              disabled={disabled}
              onClick={(event) => {
                event.stopPropagation()
                removeTag(name)
              }}
            >
              <X className="size-3" />
            </button>
          </Badge>
        ))}
        <input
          ref={inputRef}
          value={query}
          disabled={disabled}
          placeholder={value.length === 0 ? placeholder : undefined}
          className="placeholder:text-muted-foreground min-w-32 flex-1 bg-transparent px-1 py-1 text-sm outline-none"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {open && options.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          className="border-border bg-popover absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-lg border py-1 shadow-md"
        >
          {options.map((option, index) => (
            <li key={`${option.kind}-${option.label}`} role="option" aria-selected={index === highlight}>
              <button
                type="button"
                className={cn(
                  "hover:bg-muted w-full px-3 py-2 text-left text-sm",
                  index === highlight && "bg-muted",
                )}
                onMouseEnter={() => setHighlight(index)}
                onClick={() => addTag(option.label)}
              >
                {option.kind === "create"
                  ? `Criar “${option.label}”`
                  : option.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
