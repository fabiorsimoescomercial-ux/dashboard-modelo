import { Menu, Search, Moon, Sun, Bell, User, LogOut, Settings2, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white dark:bg-slate-900 dark:border-slate-800 px-4 md:px-8 shrink-0 z-20 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button 
          className="md:hidden" 
          onClick={onToggleMobileMenu}
        >
          <Menu className="h-6 w-6 text-muted-foreground" />
        </button>
        <div className="relative hidden md:block w-64 lg:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Buscar no sistema..." 
            className="pl-10 bg-slate-50 dark:bg-slate-800 border-none ring-offset-background focus-visible:ring-1"
            onChange={(e) => {
              const sanitized = e.target.value.replace(/[<>]/g, "");
              if (sanitized !== e.target.value) e.target.value = sanitized;
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={onToggleTheme}
          className="rounded-full p-2 text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={theme === "light" ? "Mudar para tema escuro" : "Mudar para tema claro"}
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>

        <button className="relative rounded-full p-2 text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-full outline-none hover:opacity-80 transition-opacity">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold leading-none text-foreground">Olá, Visitante</p>
                <p className="text-xs text-muted-foreground mt-1">Admin</p>
              </div>
              <div className="h-9 w-9 overflow-hidden rounded-full bg-slate-200 border border-slate-300 dark:border-slate-700">
                <User className="h-full w-full p-1.5 text-slate-500" />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings2 className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
