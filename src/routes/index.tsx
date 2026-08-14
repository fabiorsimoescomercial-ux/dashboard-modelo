import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  TrendingUp, 
  BarChart3, 
  Settings, 
  HelpCircle,
  Users,
  DollarSign,
  ChevronRight,
  Facebook,
  X,
  Smartphone,
  Eye,
  MousePointer2,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { CookieConsent } from "@/components/CookieConsent";
import { Sidebar, type NavItem } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { TrafficFunnel } from "@/components/dashboard/TrafficFunnel";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig 
} from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { cn } from "@/lib/utils";

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

  const navItems: NavItem[] = [
    { name: "Visão Geral", icon: LayoutDashboard, active: true },
    { name: "Mobile", icon: Smartphone, active: false },
    { name: "Relatórios", icon: BarChart3, active: false },
    { name: "Configurações", icon: Settings, active: false },
  ];

  const stats = [
    { label: "Investimento", value: "R$ 6.307,85", change: "+4.1%", sparklineColor: "#ef4444" },
    { label: "CPM", value: "R$ 20,13", change: "-0.8%", sparklineColor: "#22c55e" },
    { label: "CPC", value: "R$ 0,81", change: "-1.2%", sparklineColor: "#22c55e" },
    { label: "Custo por Lead", value: "R$ 9,46", change: "-15.4%", sparklineColor: "#22c55e" },
  ];

  const chartData = [
    { date: "01/08", investment: 450, leads: 42 },
    { date: "02/08", investment: 520, leads: 48 },
    { date: "03/08", investment: 480, leads: 45 },
    { date: "04/08", investment: 610, leads: 58 },
    { date: "05/08", investment: 580, leads: 52 },
    { date: "06/08", investment: 490, leads: 44 },
    { date: "07/08", investment: 550, leads: 50 },
    { date: "08/08", investment: 620, leads: 62 },
    { date: "09/08", investment: 590, leads: 55 },
    { date: "10/08", investment: 470, leads: 40 },
    { date: "11/08", investment: 530, leads: 49 },
    { date: "12/08", investment: 640, leads: 65 },
    { date: "13/08", investment: 610, leads: 59 },
  ];

  const chartConfig = {
    investment: {
      label: "Investimento (R$)",
      color: "#ef4444",
    },
    leads: {
      label: "Lead WhatsApp",
      color: "#3b82f6",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex h-screen w-full bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        items={navItems} 
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header 
          theme={theme} 
          onToggleTheme={toggleTheme} 
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
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

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
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

            <div className="rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 shadow-sm flex flex-col transition-colors duration-300">
              <h3 className="text-lg font-semibold text-foreground mb-6">Atividades Recentes</h3>
              <div className="space-y-6 flex-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700" />
                    <div className="flex-1 min-w-0">
                      <div className="h-3 w-3/4 bg-slate-100 dark:bg-slate-800 rounded mb-2" />
                      <div className="h-2 w-1/2 bg-slate-50 dark:bg-slate-900 rounded" />
                    </div>
                    <div className="h-2 w-12 bg-slate-50 dark:bg-slate-900 rounded shrink-0" />
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

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="h-full w-64 bg-white dark:bg-slate-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-16 items-center justify-between border-b dark:border-slate-800 px-6">
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
      <CookieConsent />
    </div>
  );
}
