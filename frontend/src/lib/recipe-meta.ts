import type { RecipeDifficulty } from "@/lib/api/types"

const DIFFICULTY_LABELS: Record<RecipeDifficulty, string> = {
  easy: "Fácil",
  medium: "Médio",
  hard: "Difícil",
}

export function difficultyLabel(difficulty?: RecipeDifficulty | null) {
  if (!difficulty) return null
  return DIFFICULTY_LABELS[difficulty]
}

export function formatDurationMinutes(minutes?: number | null) {
  if (!minutes || minutes < 1) return null
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  if (hours === 0) return `${rest} min`
  if (rest === 0) return `${hours}h`
  return `${hours}h ${rest}min`
}
