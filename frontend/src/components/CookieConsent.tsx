import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const STORAGE_KEY = "cmr_cookie_consent"

function hasConsent() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "accepted"
  } catch {
    return true
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(() => !hasConsent())

  if (!visible) return null

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted")
    } catch {}
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-border/80 bg-card px-5 py-4 shadow-lg sm:flex-row sm:items-center sm:gap-6 sm:px-6">
        <div className="min-w-0 flex-1">
          <p id="cookie-consent-title" className="text-sm font-semibold text-foreground">
            Usamos cookies
          </p>
          <p id="cookie-consent-desc" className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Coletamos cookies para melhorar sua experiência, lembrar preferências e manter a
            segurança do site, em linha com a LGPD. Saiba mais na{" "}
            <Link to="/privacidade" className="font-medium text-primary hover:underline">
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
        <Button type="button" size="lg" className="shrink-0" onClick={accept}>
          Aceitar
        </Button>
      </div>
    </div>
  )
}
