import metaAsset from "@/assets/meta-ads-reference.jpeg.asset.json";
import { Search, Moon, Sun, Bell, User, LogOut, Settings2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <header className="flex h-16 items-center justify-between border-b border-white/5 bg-[#1A1D24] px-4 md:px-8 shrink-0 z-20 transition-colors duration-300">
      <div className="flex items-center gap-6">
        <button 
          className="md:hidden" 
          onClick={onToggleMobileMenu}
        >
          <Search className="h-6 w-6 text-slate-400" />
        </button>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#38BDF8] fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
              <path d="M16.5 10.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm-9 0c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zM12 14c-1.381 0-2.5 1.119-2.5 2.5S10.619 19 12 19s2.5-1.119 2.5-2.5S13.381 14 12 14z"/>
            </svg>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white uppercase tracking-tighter leading-tight">Meta</span>
              <span className="text-[10px] font-medium text-slate-400 tracking-tight leading-tight">Dashboard Meta Ads | <span className="italic font-bold text-white">Personalizze</span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/70">
          <Calendar className="h-3.5 w-3.5" />
          <span>1 de ago. de 2026 - 13 de ago. de 2026</span>
        </div>

        <button 
          onClick={onToggleTheme}
          className="rounded-full p-2 text-white/40 hover:bg-white/5 transition-colors"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>

        <button className="relative rounded-full p-2 text-white/40 hover:bg-white/5 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-full outline-none hover:opacity-80 transition-opacity pl-2">
              <div className="text-right hidden md:block">
                <p className="text-xs font-semibold leading-none text-white/90">Olá, Visitante</p>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Admin</p>
              </div>
              <div className="h-8 w-8 overflow-hidden rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <User className="h-4 w-4 text-blue-400" />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#1a222d] border-white/5 text-white/90">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem className="cursor-pointer focus:bg-white/5 focus:text-white">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer focus:bg-white/5 focus:text-white">
              <Settings2 className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem className="text-red-400 focus:text-red-400 focus:bg-red-400/5 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
