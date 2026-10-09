import spunLogo from "@/assets/spun-logo-horizontal.png.asset.json";
import { Search, Moon, Sun, Bell, User, LogOut, Settings2, Calendar, ChevronDown } from "lucide-react";
import { logoutUser } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onToggleMobileMenu: () => void;
}

export function Header({ theme, onToggleTheme, onToggleMobileMenu }: HeaderProps) {
  let userEmail = "Visitante";
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const raw = localStorage.getItem("spun_secure_session");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.email) userEmail = parsed.email;
      }
    } catch {}
  }
  const userInitial = userEmail.charAt(0).toUpperCase();

  const handleLogout = () => {
    logoutUser();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-[#0a0e14] px-4 md:px-8 shrink-0 z-20 transition-all duration-500 ease-in-out">
      <div className="flex items-center gap-2 md:gap-6 overflow-hidden">
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src={spunLogo.url} 
              alt="SPUN Logo" 
              className="h-8 md:h-10 w-auto object-contain"
            />
          </a>
        </div>
        
        <nav className="hidden lg:flex items-center gap-4">
          <a href="/" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Dashboard</a>
          <a href="/calculator" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors border-l border-slate-700 pl-4">Calculadora Google Ads</a>
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden md:flex lg:flex items-center gap-2 md:gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 bg-[#23272F] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white hover:bg-white/5 transition-colors outline-none">
                <span>Campanhas</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card border-border text-foreground/90">
              <DropdownMenuItem className="cursor-pointer focus:bg-accent focus:text-accent-foreground">Todas as Campanhas</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:bg-accent focus:text-accent-foreground">[Evolution][Conversoes]</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 bg-[#23272F] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white hover:bg-white/5 transition-colors outline-none">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span className="truncate max-w-[120px] lg:max-w-none">1 de ago. de 2026 - 13 de ago. de 2026</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-1" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card border-border text-foreground/90">
              <DropdownMenuItem className="cursor-pointer focus:bg-accent focus:text-accent-foreground">Hoje</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:bg-accent focus:text-accent-foreground">Ontem</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:bg-accent focus:text-accent-foreground">Últimos 7 dias</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:bg-accent focus:text-accent-foreground">Últimos 30 dias</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:bg-accent focus:text-accent-foreground">Este mês</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:bg-accent focus:text-accent-foreground">Personalizado</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button 
          onClick={onToggleTheme}
          className="rounded-full p-2 text-muted-foreground hover:bg-accent transition-colors duration-300"
          title="Alternar tema"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>

        <button className="relative rounded-full p-2 text-muted-foreground hover:bg-accent transition-colors duration-300">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-full outline-none hover:opacity-80 transition-opacity pl-1">
              <div className="text-right hidden md:block">
                <p className="text-xs font-semibold leading-none text-foreground/90 truncate max-w-[150px]">{userEmail}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Admin SPUN</p>
              </div>
              <div className="h-8 w-8 overflow-hidden rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-xs text-primary">
                {userInitial}
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card border-border text-foreground/90">
            <DropdownMenuLabel className="truncate">{userEmail}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="cursor-pointer focus:bg-accent focus:text-accent-foreground">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer focus:bg-accent focus:text-accent-foreground">
              <Settings2 className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="text-red-400 focus:text-red-400 focus:bg-red-400/10 cursor-pointer font-bold"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Botão Visível de Sair (Logout) */}
        <button
          onClick={handleLogout}
          type="button"
          title="Encerrar sessão corporativa"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-all duration-200 cursor-pointer"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
    </header>
  );
}
