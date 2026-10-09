import { useState } from "react";
import { 
  Moon, 
  Sun, 
  Bell, 
  User, 
  LogOut, 
  Settings2, 
  Calendar, 
  ChevronDown, 
  Layers, 
  Check, 
  FolderKanban 
} from "lucide-react";
import { logoutUser } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type PlatformFilter = 'all' | 'Google Ads' | 'Meta Ads' | 'TikTok Ads';

interface HeaderProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onToggleMobileMenu?: () => void;
  selectedPlatform?: PlatformFilter;
  onSelectPlatform?: (platform: PlatformFilter) => void;
  campaigns?: string[];
  selectedCampaign?: string;
  onSelectCampaign?: (campaign: string) => void;
}

export function Header({ 
  theme, 
  onToggleTheme,
  selectedPlatform = 'all',
  onSelectPlatform,
  campaigns = [],
  selectedCampaign = 'all',
  onSelectCampaign,
}: HeaderProps) {
  const [logoError, setLogoError] = useState(false);

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

  const getPlatformLabel = (platform: PlatformFilter) => {
    switch (platform) {
      case 'Google Ads':
        return 'Google Ads';
      case 'Meta Ads':
        return 'Meta Ads';
      case 'TikTok Ads':
        return 'TikTok Ads';
      default:
        return 'Todas as Plataformas';
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-[#0B0F17] text-white border-b border-slate-800 relative z-50">
      {/* Lado Esquerdo: Logo & Navegação */}
      <div className="flex items-center gap-6">
        <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity shrink-0">
          {!logoError ? (
            <img 
              src="/logo.png" 
              alt="SPUN Logo" 
              onError={() => setLogoError(true)}
              className="h-8 w-auto object-contain"
            />
          ) : (
            <span className="font-bold text-xl tracking-wider text-white">SPUN</span>
          )}
        </a>
        
        <nav className="hidden lg:flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <a href="/" className="hover:text-white transition-colors text-slate-200">
            Dashboard
          </a>
        </nav>
      </div>

      {/* Lado Direito: Filtros Centralizados, Notificações, Tema, Usuário e Sair */}
      <div className="flex items-center gap-3">
        {/* Menus de Filtro (Plataformas, Campanhas & Data) */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* 1. Seletor de Plataforma */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                type="button" 
                className="flex items-center gap-2 bg-[#23272F] border border-slate-700 hover:border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white hover:bg-white/5 transition-colors outline-none cursor-pointer shadow-sm"
              >
                <Layers className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <span className="font-medium whitespace-nowrap">
                  {getPlatformLabel(selectedPlatform)}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 bg-[#161B22] border-slate-800 text-white z-50 shadow-2xl p-1.5">
              <DropdownMenuLabel className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-2 py-1">
                Plataforma de Tráfego
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-800" />
              {[
                { value: 'all', label: 'Todas as Plataformas' },
                { value: 'Google Ads', label: 'Google Ads' },
                { value: 'Meta Ads', label: 'Meta Ads' },
                { value: 'TikTok Ads', label: 'TikTok Ads' },
              ].map((item) => (
                <DropdownMenuItem
                  key={item.value}
                  onClick={() => onSelectPlatform?.(item.value as PlatformFilter)}
                  className="cursor-pointer focus:bg-slate-800 focus:text-white text-xs py-2 px-2.5 rounded-md flex items-center justify-between transition-colors"
                >
                  <span className={selectedPlatform === item.value ? "font-bold text-blue-400" : "text-slate-200"}>
                    {item.label}
                  </span>
                  {selectedPlatform === item.value && (
                    <Check className="h-3.5 w-3.5 text-blue-400" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 2. Seletor de Campanhas/Contas Dinâmicas */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                type="button" 
                className="flex items-center gap-2 bg-[#23272F] border border-slate-700 hover:border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white hover:bg-white/5 transition-colors outline-none cursor-pointer shadow-sm"
              >
                <FolderKanban className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span className="max-w-[130px] truncate font-medium">
                  {selectedCampaign === 'all' || !selectedCampaign ? 'Todas as Campanhas' : selectedCampaign}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 max-h-72 overflow-y-auto bg-[#161B22] border-slate-800 text-white z-50 shadow-2xl p-1.5 scrollbar-thin scrollbar-thumb-slate-700">
              <DropdownMenuLabel className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-2 py-1 flex items-center justify-between">
                <span>Campanhas ({campaigns.length})</span>
                {selectedPlatform !== 'all' && (
                  <span className="text-[9px] text-blue-400 lowercase font-normal">{selectedPlatform}</span>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-800" />
              <DropdownMenuItem
                onClick={() => onSelectCampaign?.('all')}
                className="cursor-pointer focus:bg-slate-800 focus:text-white text-xs py-2 px-2.5 rounded-md flex items-center justify-between transition-colors"
              >
                <span className={selectedCampaign === 'all' || !selectedCampaign ? "font-bold text-emerald-400" : "text-slate-200"}>
                  Todas as Campanhas
                </span>
                {(selectedCampaign === 'all' || !selectedCampaign) && (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                )}
              </DropdownMenuItem>

              {campaigns.map((name) => (
                <DropdownMenuItem
                  key={name}
                  onClick={() => onSelectCampaign?.(name)}
                  className="cursor-pointer focus:bg-slate-800 focus:text-white text-xs py-2 px-2.5 rounded-md flex items-center justify-between transition-colors"
                >
                  <span className={`truncate max-w-[195px] ${selectedCampaign === name ? "font-bold text-emerald-400" : "text-slate-200"}`} title={name}>
                    {name}
                  </span>
                  {selectedCampaign === name && (
                    <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 ml-1.5" />
                  )}
                </DropdownMenuItem>
              ))}

              {campaigns.length === 0 && (
                <div className="py-3 text-center text-xs text-slate-400">
                  Nenhuma campanha encontrada.
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 3. Seletor de Data */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                type="button" 
                className="flex items-center gap-2 bg-[#23272F] border border-slate-700 hover:border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white hover:bg-white/5 transition-colors outline-none cursor-pointer shadow-sm"
              >
                <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="truncate max-w-[120px] lg:max-w-none">1 de ago. de 2026 - 13 de ago. de 2026</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-1 shrink-0" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-[#161B22] border-slate-800 text-white z-50 shadow-xl p-1.5">
              <DropdownMenuItem className="cursor-pointer focus:bg-slate-800 focus:text-white text-xs py-1.5">Hoje</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:bg-slate-800 focus:text-white text-xs py-1.5">Ontem</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:bg-slate-800 focus:text-white text-xs py-1.5">Últimos 7 dias</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:bg-slate-800 focus:text-white text-xs py-1.5">Últimos 30 dias</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:bg-slate-800 focus:text-white text-xs py-1.5">Este mês</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:bg-slate-800 focus:text-white text-xs py-1.5">Personalizado</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Botão de Alternância de Tema */}
        <button 
          onClick={onToggleTheme}
          type="button"
          className="rounded-full p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors duration-200 cursor-pointer"
          title="Alternar tema"
          aria-label="Alternar tema"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>

        {/* Notificações */}
        <button 
          type="button"
          className="relative rounded-full p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors duration-200 cursor-pointer"
          title="Notificações"
          aria-label="Notificações"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
        </button>
        
        {/* Menu do Usuário */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              type="button" 
              className="flex items-center gap-3 rounded-full outline-none hover:opacity-80 transition-opacity pl-1 cursor-pointer"
            >
              <div className="text-right hidden md:block">
                <p className="text-xs font-semibold leading-none text-white max-w-[160px] truncate" title={userEmail}>
                  {userEmail}
                </p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Admin SPUN</p>
              </div>
              <div className="h-8 w-8 overflow-hidden rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-bold text-xs text-blue-400 shrink-0">
                {userInitial}
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#161B22] border-slate-800 text-white z-50 shadow-xl p-1.5">
            <DropdownMenuLabel className="truncate max-w-[200px]">{userEmail}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem className="cursor-pointer focus:bg-slate-800 focus:text-white">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer focus:bg-slate-800 focus:text-white">
              <Settings2 className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="text-red-400 focus:text-red-400 focus:bg-red-500/10 cursor-pointer font-bold"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Botão de Sair (Logout) */}
        <button
          onClick={handleLogout}
          type="button"
          title="Encerrar sessão corporativa"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-all duration-200 cursor-pointer shrink-0"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
    </header>
  );
}
