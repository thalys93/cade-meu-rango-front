import axios from "axios"
import { clearToken, getToken } from "@/lib/auth/token"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3001/api/v0",
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let onUnauthorized: (() => void) | null = null

export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken()
      onUnauthorized?.()
    }
    return Promise.reject(error)
  },
)
