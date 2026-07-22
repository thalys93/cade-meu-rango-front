export type LoginDto = {
  email: string
  password: string
}

export type RegisterDto = {
  name: string
  email: string
  password: string
}

export type AuthUserData = {
  id: string
  email: string
  name: string
  roles: string[]
}

export type AuthResponse = {
  token: string
  userData: AuthUserData
}

export type User = {
  id: string
  name: string
  email: string
  avatar_url?: string | null
  settings?: Record<string, unknown>
  createdAt?: string
  updatedAt?: string
}

export type Category = {
  id: string
  name: string
  slug: string
  createdAt?: string
  updatedAt?: string
}

export type RecipeAuthor = {
  id: string
  name: string
  avatar_url?: string | null
}

export type RecipeDifficulty = "easy" | "medium" | "hard"

export type Recipe = {
  id: string
  title: string
  description: string
  image_url?: string | null
  difficulty?: RecipeDifficulty | null
  durationMinutes?: number | null
  tools?: string[]
  ingredients: string[]
  instructions: string[]
  author?: RecipeAuthor
  categories?: Category[]
  createdAt?: string
  updatedAt?: string
}

export type Tip = {
  id: string
  title: string
  description: string
  author?: RecipeAuthor
  createdAt?: string
  updatedAt?: string
}

export type PaginationMeta = {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export type Paginated<T> = {
  items: T[]
  meta: PaginationMeta
}

export type UpdateUserDto = {
  name?: string
  email?: string
  password?: string
  avatar_url?: string
  settings?: Record<string, unknown>
}

export type CreateRecipeDto = {
  title: string
  description: string
  image_url?: string
  difficulty?: RecipeDifficulty | null
  durationMinutes?: number | null
  tools?: string[]
  ingredients: string[]
  instructions: string[]
  categories?: string[]
}

export type UpdateRecipeDto = Partial<CreateRecipeDto>

export type CreateTipDto = {
  title: string
  description: string
}

export type UpdateTipDto = Partial<CreateTipDto>

export type UploadPreset = "cademeurango_avatars" | "cademeurango_assets"

export type CloudinarySignature = {
  timestamp: number
  signature: string
  public_id: string
  api_key: string
  cloud_name: string
  upload_preset: UploadPreset
  display_name?: string
}

export const UPLOAD_PRESETS = {
  avatars: "cademeurango_avatars" as const,
  assets: "cademeurango_assets" as const,
}

