import {
  Apple,
  ChefHat,
  Clock,
  CookingPot,
  Droplets,
  Egg,
  Flame,
  Lightbulb,
  Package,
  Refrigerator,
  Salad,
  Scissors,
  Snowflake,
  Soup,
  Sparkles,
  Thermometer,
  Timer,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react"
import type { Tip } from "@/lib/api/types"

const FALLBACK_ICONS: LucideIcon[] = [
  Lightbulb,
  ChefHat,
  CookingPot,
  UtensilsCrossed,
  Soup,
  Salad,
  Timer,
  Sparkles,
]

const KEYWORD_ICONS: [RegExp, LucideIcon][] = [
  [/forno|assar|grelh|frit/i, Flame],
  [/gelo|congel|fria|freezer/i, Snowflake],
  [/água|lavar|molh|umid/i, Droplets],
  [/tempo|minuto|hora|rápid/i, Clock],
  [/cort|faca|pic|descasc/i, Scissors],
  [/limp|brilho|manch/i, Sparkles],
  [/guard|armazen|pote|conserv/i, Package],
  [/geladeir|refriger/i, Refrigerator],
  [/temperat|quente|esquent/i, Thermometer],
  [/ovo|omelete/i, Egg],
  [/fruta|maçã|banana|legume|verdura/i, Apple],
  [/salada|folha|alface/i, Salad],
  [/sopa|caldo|molho/i, Soup],
  [/cozinh|panela|ferv/i, CookingPot],
]

export function tipIcon(tip: Pick<Tip, "id" | "title" | "description">): LucideIcon {
  const text = `${tip.title} ${tip.description}`
  for (const [pattern, Icon] of KEYWORD_ICONS) {
    if (pattern.test(text)) return Icon
  }
  let hash = 0
  for (let i = 0; i < tip.id.length; i++) {
    hash = (hash + tip.id.charCodeAt(i) * (i + 1)) % FALLBACK_ICONS.length
  }
  return FALLBACK_ICONS[hash] ?? Lightbulb
}
