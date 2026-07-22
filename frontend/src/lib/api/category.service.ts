import { api } from "@/lib/api/client"
import type { Category } from "@/lib/api/types"

export const categoryService = {
  async findAll(): Promise<Category[]> {
    const { data } = await api.get<Category[]>("/categories")
    return data
  },
}
