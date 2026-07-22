import { Link, NavLink } from "react-router-dom"
import {
  BookOpen,
  Lightbulb,
  LogOut,
  Menu,
  Moon,
  Sun,
  UserRound,
} from "lucide-react"
import { useAuth } from "@/lib/auth/AuthContext"
import { useDarkMode } from "@/lib/theme/DarkModeContext"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

const navItems = [
  { to: "/", label: "Início" },
  { to: "/recipes", label: "Receitas" },
  { to: "/tips", label: "Dicas" },
]

function navClassName({ isActive }: { isActive: boolean }) {
  return [
    "text-sm font-medium transition-colors",
    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
  ].join(" ")
}

export function SiteHeader() {
  const { user, isAuthenticated, logout } = useAuth()
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const [open, setOpen] = useState(false)
  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/svg/chapeuzinho.svg" alt="" className="h-9 w-9" />
          <span className="font-display text-2xl text-primary">Cadê Meu Rango</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClassName} end={item.to === "/"}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? "Ativar modo claro" : "Ativar modo escuro"}
          >
            {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          {isAuthenticated && user ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="ghost" className="gap-2 px-2">
                  <Avatar size="sm">
                    {user.avatar_url ? (
                      <AvatarImage src={user.avatar_url} alt={user.name} />
                    ) : null}
                    <AvatarFallback>
                      {initials || <UserRound className="size-3.5" />}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden max-w-28 truncate sm:inline">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-[100] min-w-48">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/me">
                    <UserRound className="size-4" />
                    Meu perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/me/recipes">
                    <BookOpen className="size-4" />
                    Minhas receitas
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/me/tips">
                    <Lightbulb className="size-4" />
                    Minhas dicas
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="size-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="hidden sm:inline-flex">
              <Link to="/auth/login">Entrar</Link>
            </Button>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="font-display text-2xl text-primary">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={navClassName}
                    end={item.to === "/"}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Separator />
                {isAuthenticated ? (
                  <>
                    <Link to="/me" onClick={() => setOpen(false)} className="text-sm font-medium">
                      Meu perfil
                    </Link>
                    <Link
                      to="/me/recipes"
                      onClick={() => setOpen(false)}
                      className="text-sm font-medium"
                    >
                      Minhas receitas
                    </Link>
                    <Link to="/me/tips" onClick={() => setOpen(false)} className="text-sm font-medium">
                      Minhas dicas
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => {
                        logout()
                        setOpen(false)
                      }}
                    >
                      Sair
                    </Button>
                  </>
                ) : (
                  <Button asChild onClick={() => setOpen(false)}>
                    <Link to="/auth/login">Entrar</Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
