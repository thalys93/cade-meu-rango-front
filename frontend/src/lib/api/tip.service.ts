import { api } from "@/lib/api/client"
import type { CreateTipDto, Paginated, Tip, UpdateTipDto } from "@/lib/api/types"

export type TipListParams = {
  search?: string
  author?: string
  limit?: number
  page?: number
}

export const tipService = {
  async findAll(params: TipListParams = {}): Promise<Paginated<Tip>> {
    const { data } = await api.get<Paginated<Tip>>("/tips", { params })
    return data
  },

  async findMine(params: TipListParams = {}): Promise<Paginated<Tip>> {
    const { data } = await api.get<Paginated<Tip>>("/auth/tips", { params })
    return data
  },

  async findOne(id: string): Promise<Tip> {
    const { data } = await api.get<Tip>(`/tips/${id}`)
    return data
  },

  async create(dto: CreateTipDto): Promise<Tip> {
    const { data } = await api.post<Tip>("/auth/tips/create", dto)
    return data
  },

  async update(id: string, dto: UpdateTipDto): Promise<Tip> {
    const { data } = await api.patch<Tip>(`/auth/tips/update/${id}`, dto)
    return data
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/auth/tips/delete/${id}`)
  },
}
