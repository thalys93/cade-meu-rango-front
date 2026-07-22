import { api } from "@/lib/api/client"
import type { UpdateUserDto, User } from "@/lib/api/types"

export const userService = {
  async updateMe(dto: UpdateUserDto): Promise<User> {
    const { data } = await api.patch<User>("/auth/users/update/me", dto)
    return data
  },
}
