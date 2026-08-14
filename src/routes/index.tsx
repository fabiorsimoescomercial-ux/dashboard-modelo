import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  Menu, 
  X, 
  User, 
  Bell, 
  Search, 
  ChevronRight, 
  TrendingUp, 
  Users, 
  DollarSign, 
  LogOut,
  Settings2,
  Facebook,
  Moon,
  Sun
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, active: true },
    { name: "Visão Geral", icon: TrendingUp, active: false },
    { name: "Relatórios", icon: BarChart3, active: false },
    { name: "Configurações", icon: Settings, active: false },
    { name: "Ajuda", icon: HelpCircle, active: false },
  ];

  const stats = [
    { label: "Usuários Ativos", value: "2,543", change: "+12.5%", icon: Users, color: "text-blue-600" },
    { label: "Receita Total", value: "R$ 45.231", change: "+8.2%", icon: DollarSign, color: "text-green-600" },
    { label: "Novos Leads", value: "148", change: "+24.3%", icon: TrendingUp, color: "text-purple-600" },
    { label: "Taxa de Conversão", value: "3.2%", change: "-1.4%", icon: BarChart3, color: "text-orange-600" },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar - Desktop */}
      <aside 
        className={cn(
          "hidden md:flex flex-col border-r bg-white dark:bg-slate-900 dark:border-slate-800 transition-all duration-300 ease-in-out z-30",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shrink-0">
              P
            </div>
            {isSidebarOpen && (
              <span className="text-lg font-bold tracking-tight text-foreground truncate">
                Personalizze
              </span>
            )}
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100",
                item.active ? "bg-primary/10 text-primary hover:bg-primary/15" : "text-muted-foreground",
                !isSidebarOpen && "justify-center px-2"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {isSidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="border-t p-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-slate-100 transition-colors"
          >
            {isSidebarOpen ? (
              <>
                <X className="h-5 w-5" />
                <span>Recolher</span>
              </>
            ) : (
              <div className="flex w-full justify-center">
                <Menu className="h-5 w-5" />
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header Global */}
        <header className="flex h-16 items-center justify-between border-b bg-white dark:bg-slate-900 dark:border-slate-800 px-4 md:px-8 shrink-0 z-20 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6 text-muted-foreground" />
            </button>
            <div className="relative hidden md:block w-64 lg:w-96">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Buscar no sistema..." 
                className="pl-10 bg-slate-50 dark:bg-slate-800 border-none ring-offset-background focus-visible:ring-1"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={toggleTheme}
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
                  <div className="h-9 w-9 overflow-hidden rounded-full bg-slate-200 border border-slate-300">
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

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Breadcrumbs */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-foreground">Visão Geral</span>
          </nav>

          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Visão Geral do Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Bem-vindo ao Personalizze. Acompanhe aqui os seus principais indicadores.
            </p>
            <div className="mt-4">
              <Button asChild className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white gap-2">
                <a href="/api/public/facebook-login">
                  <Facebook className="h-4 w-4 fill-current" />
                  Conectar com Facebook
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 shadow-sm transition-colors duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("rounded-lg bg-slate-100 dark:bg-slate-800 p-2", stat.color)}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <span className={cn(
                    "text-xs font-semibold",
                    stat.change.startsWith('+') ? "text-green-600" : "text-destructive"
                  )}>
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-foreground mt-1">{stat.value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Main Layout Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Chart Placeholder */}
            <div className="lg:col-span-2 rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 shadow-sm min-h-[400px] flex flex-col transition-colors duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Desempenho Semanal</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">PDF</Button>
                  <Button variant="outline" size="sm">Excel</Button>
                </div>
              </div>
              <div className="flex-1 rounded-lg border-2 border-dashed border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Área reservada para gráficos</p>
                </div>
              </div>
            </div>

            {/* List/Table Placeholder */}
            <div className="rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 shadow-sm flex flex-col transition-colors duration-300">
              <h3 className="text-lg font-semibold text-foreground mb-6">Atividades Recentes</h3>
              <div className="space-y-6 flex-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-slate-100 shrink-0 border border-slate-200" />
                    <div className="flex-1 min-w-0">
                      <div className="h-3 w-3/4 bg-slate-100 rounded mb-2" />
                      <div className="h-2 w-1/2 bg-slate-50 rounded" />
                    </div>
                    <div className="h-2 w-12 bg-slate-50 rounded shrink-0" />
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-4 text-primary p-0 h-auto justify-start font-semibold">
                Ver todas as atividades
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="h-full w-64 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-16 items-center justify-between border-b px-6">
              <span className="text-lg font-bold text-foreground">Personalizze</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6 text-muted-foreground" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                    item.active ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}