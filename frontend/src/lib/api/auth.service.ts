import { api } from "@/lib/api/client"
import type {
  AuthResponse,
  LoginDto,
  RegisterDto,
  User,
} from "@/lib/api/types"

export const authService = {
  async login(dto: LoginDto): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/login", dto)
    return data
  },

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/register", dto)
    return data
  },

  async me(): Promise<User> {
    const { data } = await api.get<User>("/auth/me")
    return data
  },
}
