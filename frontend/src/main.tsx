import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import AppRoutes from "@/utils/routes"
import { AuthProvider } from "@/lib/auth/AuthContext"
import { DarkModeProvider } from "@/lib/theme/DarkModeContext"
import "@/index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </DarkModeProvider>
  </StrictMode>,
)
