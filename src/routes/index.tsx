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

        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <nav className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
                <span>Dashboard</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white/60">Visão Geral</span>
              </nav>
              <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                Visão Geral
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white text-xs font-bold px-6 py-2 rounded-lg h-auto shadow-lg shadow-blue-500/20">
                <a href="/api/public/facebook-login">
                  <Facebook className="h-4 w-4 fill-current mr-2" />
                  Conectar Facebook
                </a>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-xl border border-white/5 bg-[#1a222d] p-6 shadow-lg shadow-black/20 flex flex-col min-h-[450px]">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Investimento</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Lead WhatsApp</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">Diário</div>
                  </div>
                </div>
                
                <div className="flex-1 min-h-[300px] w-full">
                  <ChartContainer config={chartConfig} className="w-full h-full aspect-auto">
                    <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 'bold' }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 'bold' }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="investment" 
                        stroke="var(--color-investment)" 
                        strokeWidth={3} 
                        dot={false}
                        activeDot={{ r: 4, fill: '#ef4444', stroke: '#1a222d', strokeWidth: 2 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="leads" 
                        stroke="var(--color-leads)" 
                        strokeWidth={3} 
                        dot={false}
                        activeDot={{ r: 4, fill: '#3b82f6', stroke: '#1a222d', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-[#1a222d] shadow-lg shadow-black/20 overflow-hidden">
                <div className="p-6 border-b border-white/5">
                  <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest">Performance por Criativo</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-bold text-white/20 uppercase tracking-widest border-b border-white/5">
                        <th className="px-6 py-4 font-bold">Criativo</th>
                        <th className="px-6 py-4 font-bold text-right">Cliques</th>
                        <th className="px-6 py-4 font-bold text-right">Leads</th>
                        <th className="px-6 py-4 font-bold text-right">Custo/Lead</th>
                        <th className="px-6 py-4 font-bold text-right">CTR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { id: 1, name: "Video_Promo_Agosto", clicks: 1243, leads: 98, cost: "R$ 8,42", ctr: "2.84%" },
                        { id: 2, name: "Image_Carousel_Main", clicks: 856, leads: 64, cost: "R$ 9,15", ctr: "1.92%" },
                        { id: 3, name: "User_Testimonial_01", clicks: 542, leads: 42, cost: "R$ 7,88", ctr: "3.15%" },
                      ].map((creative) => (
                        <tr key={creative.id} className="text-xs text-white/70 hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded bg-white/5 border border-white/10 shrink-0" />
                              <span className="font-medium text-white/90">{creative.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right font-mono">{creative.clicks}</td>
                          <td className="px-6 py-4 text-right font-mono">{creative.leads}</td>
                          <td className="px-6 py-4 text-right font-mono text-green-400">{creative.cost}</td>
                          <td className="px-6 py-4 text-right font-mono text-blue-400">{creative.ctr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <TrafficFunnel />
              
              <div className="rounded-xl border border-white/5 bg-[#1a222d] p-6 shadow-lg shadow-black/20">
                <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-6">Próximos Passos</h3>
                <div className="space-y-4">
                  {[
                    { label: "Otimizar CBO", desc: "Campanha 'Vendas_Direct' acima do CPA ideal", priority: "Alta" },
                    { label: "Atualizar Criativos", desc: "Fadiga detectada no criativo 'Video_02'", priority: "Média" },
                  ].map((step, i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">{step.label}</span>
                        <span className={cn(
                          "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter",
                          step.priority === "Alta" ? "bg-red-500/10 text-red-500" : "bg-orange-500/10 text-orange-500"
                        )}>{step.priority}</span>
                      </div>
                      <p className="text-[10px] text-white/40 leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="mt-6 text-[10px] font-bold text-blue-400 uppercase tracking-widest p-0 h-auto flex items-center gap-1 group">
                  Ver Análise Completa <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
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
