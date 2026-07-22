import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { authService } from "@/lib/api/auth.service"
import { setUnauthorizedHandler } from "@/lib/api/client"
import type { AuthUserData, LoginDto, RegisterDto, User } from "@/lib/api/types"
import { clearToken, getToken, setToken } from "@/lib/auth/token"

type AuthContextValue = {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (dto: LoginDto) => Promise<void>
  register: (dto: RegisterDto) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function toUser(userData: AuthUserData): User {
  return {
    id: userData.id,
    email: userData.email,
    name: userData.name,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setTokenState] = useState<string | null>(() => getToken())
  const [isLoading, setIsLoading] = useState(true)

  const logout = useCallback(() => {
    clearToken()
    setTokenState(null)
    setUser(null)
  }, [])

  const refreshUser = useCallback(async () => {
    const current = getToken()
    if (!current) {
      setUser(null)
      setTokenState(null)
      return
    }
    const me = await authService.me()
    setUser(me)
    setTokenState(current)
  }, [])

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setTokenState(null)
      setUser(null)
    })
  }, [])

  useEffect(() => {
    let cancelled = false

    async function bootstrap() {
      const current = getToken()
      if (!current) {
        if (!cancelled) setIsLoading(false)
        return
      }

      try {
        const me = await authService.me()
        if (!cancelled) {
          setUser(me)
          setTokenState(current)
        }
      } catch {
        if (!cancelled) {
          clearToken()
          setUser(null)
          setTokenState(null)
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void bootstrap()
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (dto: LoginDto) => {
    const response = await authService.login(dto)
    setToken(response.token)
    setTokenState(response.token)
    setUser(toUser(response.userData))
    try {
      const me = await authService.me()
      setUser(me)
    } catch {
      // ponytail: userData do login já cobre a sessão se /me falhar
    }
  }, [])

  const register = useCallback(async (dto: RegisterDto) => {
    const response = await authService.register(dto)
    setToken(response.token)
    setTokenState(response.token)
    setUser(toUser(response.userData))
    try {
      const me = await authService.me()
      setUser(me)
    } catch {
      // ponytail: userData do register já cobre a sessão se /me falhar
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isLoading,
      isAuthenticated: Boolean(token && user),
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, token, isLoading, login, register, logout, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
