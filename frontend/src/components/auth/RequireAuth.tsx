import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/lib/auth/AuthContext"
import type { ReactNode } from "react"

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return null

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />
  }

  return children
}
