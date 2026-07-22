import { useRef, useState, type KeyboardEvent } from "react"
import { Reorder, useDragControls } from "framer-motion"
import { GripVertical, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Row = {
  id: string
  value: string
}

type SmartListProps = {
  items: string[]
  onChange: (items: string[]) => void
  variant: "bullet" | "numbered"
  placeholder?: string
  addLabel?: string
  disabled?: boolean
  className?: string
}

function createRow(value = ""): Row {
  return { id: crypto.randomUUID(), value }
}

function toRows(items: string[]): Row[] {
  if (items.length === 0) return [createRow()]
  return items.map((value) => createRow(value))
}

function SmartListRow({
  row,
  index,
  variant,
  placeholder,
  disabled,
  canRemove,
  onValueChange,
  onKeyDown,
  onRemove,
  registerInput,
}: {
  row: Row
  index: number
  variant: "bullet" | "numbered"
  placeholder?: string
  disabled?: boolean
  canRemove: boolean
  onValueChange: (value: string) => void
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
  onRemove: () => void
  registerInput: (el: HTMLInputElement | null) => void
}) {
  const controls = useDragControls()

  return (
    <Reorder.Item
      value={row}
      dragListener={false}
      dragControls={controls}
      className="flex items-center gap-2 rounded-lg bg-card"
    >
      <button
        type="button"
        className="text-muted-foreground hover:text-foreground touch-none shrink-0 cursor-grab active:cursor-grabbing"
        aria-label="Reordenar"
        disabled={disabled}
        onPointerDown={(event) => {
          if (disabled) return
          controls.start(event)
        }}
      >
        <GripVertical className="size-4" />
      </button>
      <span
        className={cn(
          "text-muted-foreground w-5 shrink-0 text-center text-sm tabular-nums",
          variant === "bullet" && "text-lg leading-none",
        )}
        aria-hidden
      >
        {variant === "numbered" ? `${index + 1}.` : "•"}
      </span>
      <Input
        ref={registerInput}
        value={row.value}
        disabled={disabled}
        placeholder={
          placeholder
            ? placeholder.replace("{n}", String(index + 1))
            : undefined
        }
        onChange={(event) => onValueChange(event.target.value)}
        onKeyDown={onKeyDown}
        className="border-0 bg-transparent shadow-none focus-visible:ring-0"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onRemove}
        disabled={disabled || !canRemove}
        aria-label="Remover item"
      >
        <Trash2 className="size-4" />
      </Button>
    </Reorder.Item>
  )
}

export function SmartList({
  items,
  onChange,
  variant,
  placeholder,
  addLabel = "Adicionar",
  disabled = false,
  className,
}: SmartListProps) {
  const [rows, setRows] = useState(() => toRows(items))
  const inputRefs = useRef(new Map<string, HTMLInputElement>())

  function emit(next: Row[]) {
    setRows(next)
    onChange(next.map((row) => row.value))
  }

  function focusRow(id: string) {
    requestAnimationFrame(() => {
      inputRefs.current.get(id)?.focus()
    })
  }

  function handleReorder(next: Row[]) {
    emit(next)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key === "Enter") {
      event.preventDefault()
      if (!rows[index].value.trim()) return
      const next = [...rows]
      const newRow = createRow()
      next.splice(index + 1, 0, newRow)
      emit(next)
      focusRow(newRow.id)
      return
    }

    if (
      event.key === "Backspace" &&
      rows[index].value === "" &&
      rows.length > 1
    ) {
      event.preventDefault()
      const next = rows.filter((_, i) => i !== index)
      const focusId = next[Math.max(0, index - 1)].id
      emit(next)
      focusRow(focusId)
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Reorder.Group
        axis="y"
        values={rows}
        onReorder={handleReorder}
        className="space-y-1"
      >
        {rows.map((row, index) => (
          <SmartListRow
            key={row.id}
            row={row}
            index={index}
            variant={variant}
            placeholder={placeholder}
            disabled={disabled}
            canRemove={rows.length > 1}
            onValueChange={(value) => {
              emit(
                rows.map((item) =>
                  item.id === row.id ? { ...item, value } : item,
                ),
              )
            }}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onRemove={() => {
              if (rows.length <= 1) return
              emit(rows.filter((item) => item.id !== row.id))
            }}
            registerInput={(el) => {
              if (el) inputRefs.current.set(row.id, el)
              else inputRefs.current.delete(row.id)
            }}
          />
        ))}
      </Reorder.Group>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={disabled}
        onClick={() => {
          const newRow = createRow()
          emit([...rows, newRow])
          focusRow(newRow.id)
        }}
      >
        <Plus className="size-4" />
        {addLabel}
      </Button>
    </div>
  )
}
