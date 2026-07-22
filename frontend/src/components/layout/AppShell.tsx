import { useLocation, useOutlet } from "react-router-dom"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { CookieConsent } from "@/components/CookieConsent"
import { Toaster } from "@/components/ui/sonner"
import { useAuth } from "@/lib/auth/AuthContext"
import { Skeleton } from "@/components/ui/skeleton"

export function AppShell() {
  const { isLoading } = useAuth()
  const location = useLocation()
  const outlet = useOutlet()
  const reduceMotion = useReducedMotion()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="flex w-full max-w-sm flex-col items-center gap-4">
          <img src="/assets/svg/chapeuzinho.svg" alt="" className="h-20 w-20 animate-pulse" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
      <SiteFooter />
      <CookieConsent />
      <Toaster richColors position="top-right" />
    </div>
  )
}
