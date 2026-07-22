import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

type DarkModeContextValue = {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const DarkModeContext = createContext<DarkModeContextValue | null>(null)

function applyDarkClass(enabled: boolean) {
  document.documentElement.classList.toggle("dark", enabled)
}

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkmode")
    return stored ? JSON.parse(stored) === true : false
  })

  useEffect(() => {
    applyDarkClass(isDarkMode)
    localStorage.setItem("darkmode", JSON.stringify(isDarkMode))
  }, [isDarkMode])

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev: boolean) => !prev)
  }, [])

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (!context) {
    throw new Error("useDarkMode must be used within DarkModeProvider")
  }
  return context
}

export { DarkModeContext }
