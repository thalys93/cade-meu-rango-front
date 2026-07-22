import { NavLink, Outlet } from "react-router-dom"
import { BookOpen, Lightbulb, UserRound } from "lucide-react"
import { RequireAuth } from "@/components/auth/RequireAuth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth/AuthContext"
import { cn } from "@/lib/utils"

const navItems = [
  { to: "/me", label: "Perfil", shortLabel: "Perfil", icon: UserRound, end: true },
  { to: "/me/recipes", label: "Minhas receitas", shortLabel: "Receitas", icon: BookOpen, end: false },
  { to: "/me/tips", label: "Minhas dicas", shortLabel: "Dicas", icon: Lightbulb, end: false },
]

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return cn(
    "inline-flex flex-1 flex-col items-center justify-center gap-1 px-2 py-3 text-xs font-medium transition-colors sm:flex-row sm:gap-2 sm:px-3 sm:text-sm md:flex-none md:justify-start md:rounded-lg md:px-3 md:py-2.5",
    isActive
      ? "bg-primary/10 text-primary md:bg-primary/10"
      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
    isActive && "border-b-2 border-primary md:border-b-0",
  )
}

function MeDashboard() {
  const { user } = useAuth()
  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <div className="overflow-hidden rounded-[var(--cmr-radius)] border border-border/70 bg-card text-card-foreground shadow-sm">
      <header className="flex items-center gap-3 border-b border-border/70 px-4 py-4 sm:px-6">
        <Avatar size="lg" className="size-12 sm:size-14">
          {user?.avatar_url ? <AvatarImage src={user.avatar_url} alt="" /> : null}
          <AvatarFallback>{initials || "?"}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold leading-tight sm:text-lg">
            {user?.name}
          </p>
          <p className="truncate text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </header>

      <div className="flex flex-col md:min-h-[32rem] md:flex-row">
        <aside className="shrink-0 border-b border-border/70 md:w-56 md:border-b-0 md:border-r lg:w-60">
          <nav
            aria-label="Área do usuário"
            className="flex md:flex-col md:gap-1 md:p-3"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={navLinkClassName}
              >
                <item.icon className="size-4 shrink-0" />
                <span className="md:hidden">{item.shortLabel}</span>
                <span className="hidden md:inline">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default function MeLayout() {
  return (
    <RequireAuth>
      <MeDashboard />
    </RequireAuth>
  )
}
