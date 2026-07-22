import { api } from "@/lib/api/client"
import type {
  CreateRecipeDto,
  Paginated,
  Recipe,
  UpdateRecipeDto,
} from "@/lib/api/types"

export type RecipeListParams = {
  category?: string
  search?: string
  author?: string
  limit?: number
  page?: number
}

export const recipeService = {
  async findAll(params: RecipeListParams = {}): Promise<Paginated<Recipe>> {
    const { data } = await api.get<Paginated<Recipe>>("/recipes", { params })
    return data
  },

  async findMine(params: RecipeListParams = {}): Promise<Paginated<Recipe>> {
    const { data } = await api.get<Paginated<Recipe>>("/auth/recipes", {
      params,
    })
    return data
  },

  async findOne(id: string): Promise<Recipe> {
    const { data } = await api.get<Recipe>(`/recipes/${id}`)
    return data
  },

  async create(dto: CreateRecipeDto): Promise<Recipe> {
    const { data } = await api.post<Recipe>("/auth/recipes/create", dto)
    return data
  },

  async update(id: string, dto: UpdateRecipeDto): Promise<Recipe> {
    const { data } = await api.patch<Recipe>(`/auth/recipes/update/${id}`, dto)
    return data
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/auth/recipes/delete/${id}`)
  },
}
