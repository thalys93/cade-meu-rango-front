import axios from "axios"

export function getErrorMessage(error: unknown, fallback = "Algo deu errado"): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data
    if (typeof data === "string" && data.trim()) return data
    if (data && typeof data === "object") {
      const message = (data as { message?: string | string[] }).message
      if (Array.isArray(message)) return message.join(", ")
      if (typeof message === "string") return message
    }
    if (error.message) return error.message
  }
  if (error instanceof Error) return error.message
  return fallback
}
