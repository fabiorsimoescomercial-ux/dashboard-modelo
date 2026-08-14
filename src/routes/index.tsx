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
  ];

  const stats = [
    { label: "Investimento", value: "R$ 621,50", change: "-79.3%" },
    { label: "CPM", value: "R$ 25,51", change: "-16.2%" },
    { label: "CPC", value: "R$ 1,48", change: "22.0%" },
    { label: "Custo por Lead WhatsApp", value: "R$ 6,91", change: "-23.6%" },
  ];

  const chartData = [
    { date: "04/08", investment: 120, leads: 40 },
    { date: "05/08", investment: 180, leads: 480 },
    { date: "06/08", investment: 150, leads: 120 },
    { date: "07/08", investment: 220, leads: 90 },
    { date: "08/08", investment: 200, leads: 70 },
    { date: "09/08", investment: 170, leads: 110 },
    { date: "10/08", investment: 240, leads: 85 },
    { date: "11/08", investment: 210, leads: 95 },
    { date: "12/08", investment: 260, leads: 105 },
    { date: "13/08", investment: 230, leads: 90 },
  ];

  const chartConfig = {
    investment: {
      label: "Investimento (R$)",
      color: "#3b82f6",
    },
    leads: {
      label: "Lead WhatsApp",
      color: "#38BDF8",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex h-screen w-full bg-background transition-colors duration-500 ease-in-out">
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

        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-8 space-y-8 transition-colors duration-500 ease-in-out">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <nav className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <span>Dashboard</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground">Visão Geral</span>
              </nav>
              <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl transition-colors duration-500">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TrafficFunnel />
                
                <div className="rounded-xl border border-border bg-card p-6 shadow-lg shadow-black/5 flex flex-col min-h-[450px] transition-all duration-500 ease-in-out">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex flex-col">
                      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Leads vs Investimento</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">Leads</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">Invest.</span>
                      </div>
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
                        <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} />
                        <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line yAxisId="left" type="monotone" dataKey="leads" stroke="var(--color-leads)" strokeWidth={3} dot={false} activeDot={{ r: 4 }} />
                        <Line yAxisId="right" type="monotone" dataKey="investment" stroke="var(--color-investment)" strokeWidth={3} dot={false} activeDot={{ r: 4 }} />
                      </LineChart>
                    </ChartContainer>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card shadow-lg shadow-black/5 overflow-hidden transition-all duration-500 ease-in-out">
                <div className="p-6 border-b border-border">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Performance por Criativo</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-700">
                        <th className="px-6 py-4">Criativo</th>
                        <th className="px-6 py-4 text-right">Impressions</th>
                        <th className="px-6 py-4 text-right">Lead</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {[
                        { id: 1, name: "[V 06] [CTA POLO][Copy Atualizada]", impressions: "8.988", leads: 40 },
                        { id: 2, name: "[V 02] [Copy V01][Direto]", impressions: "5.421", leads: 28 },
                        { id: 3, name: "[I 01] [Estático][Fixo]", impressions: "3.210", leads: 15 },
                      ].map((creative) => (
                        <tr key={creative.id} className="text-xs text-muted-foreground hover:bg-accent transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded bg-slate-800 border border-slate-700 shrink-0" />
                              <span className="font-medium text-foreground truncate max-w-[200px]">{creative.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right font-mono">{creative.impressions}</td>
                          <td className="px-6 py-4 text-right font-mono text-blue-400">{creative.leads}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-6 py-3 border-t border-slate-700 flex justify-end items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <span>1 - 15 / 15</span>
                    <div className="flex gap-2">
                      <button className="hover:text-white"><ChevronRight className="h-3 w-3 rotate-180" /></button>
                      <button className="hover:text-white"><ChevronRight className="h-3 w-3" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card shadow-lg shadow-black/5 overflow-hidden lg:col-span-3 transition-all duration-500 ease-in-out">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Tabela de Campanhas</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-700">
                        <th className="px-6 py-4 font-bold">Campanha</th>
                        <th className="px-6 py-4 font-bold text-right">Investimento</th>
                        <th className="px-6 py-4 font-bold text-right">Impressões</th>
                        <th className="px-6 py-4 font-bold text-right">Custo p/ lead</th>
                        <th className="px-6 py-4 font-bold text-right">Lead</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {[
                        { name: "[Evolution][Conversoes][BR][Fixo]", invest: "R$ 247,78", impressions: "8.480", cost: "R$ 9,18", leads: 27, fill: 40 },
                        { name: "[Aspirant][Mensagem][SP]", invest: "R$ 185,20", impressions: "6.120", cost: "R$ 10,29", leads: 18, fill: 30 },
                        { name: "[Test][Traffic][RJ]", invest: "R$ 120,45", impressions: "4.560", cost: "R$ 8,03", leads: 15, fill: 20 },
                      ].map((row, i) => (
                        <tr key={i} className="text-xs text-muted-foreground hover:bg-accent transition-colors relative">
                          <td className="px-6 py-4 font-medium text-foreground">{row.name}</td>
                          <td className="px-6 py-4 text-right font-mono relative overflow-hidden">
                            <div className="absolute inset-y-0 right-0 bg-blue-600/10" style={{ width: `${row.fill}%` }} />
                            <span className="relative z-10">{row.invest}</span>
                          </td>
                          <td className="px-6 py-4 text-right font-mono relative overflow-hidden">
                            <div className="absolute inset-y-0 right-0 bg-blue-600/10" style={{ width: `${row.fill-5}%` }} />
                            <span className="relative z-10">{row.impressions}</span>
                          </td>
                          <td className="px-6 py-4 text-right font-mono text-green-400">{row.cost}</td>
                          <td className="px-6 py-4 text-right font-mono text-blue-400">{row.leads}</td>
                        </tr>
                      ))}
                      <tr className="text-xs font-bold text-foreground bg-accent border-t border-border">
                        <td className="px-6 py-4">Total geral</td>
                        <td className="px-6 py-4 text-right font-mono">R$ 621,5</td>
                        <td className="px-6 py-4 text-right font-mono">24.363</td>
                        <td className="px-6 py-4 text-right font-mono text-green-400">R$ 6,91</td>
                        <td className="px-6 py-4 text-right font-mono text-blue-400">90</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="px-6 py-3 border-t border-slate-700 flex justify-end items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <span>1 - 15 / 15</span>
                    <div className="flex gap-2">
                      <button className="hover:text-white"><ChevronRight className="h-3 w-3 rotate-180" /></button>
                      <button className="hover:text-white"><ChevronRight className="h-3 w-3" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="bg-card px-8 py-4 border-t border-border transition-colors duration-500 ease-in-out">
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
            Dados atualizados pela última vez: 14/08/2026 09:06:09 (alguns itens na página não foram atualizados) | 
            <a href="#" className="underline ml-1 hover:text-white transition-colors">Política de Privacidade</a>
          </p>
        </footer>

      </div>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="h-full w-64 bg-card shadow-2xl transition-colors duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-16 items-center justify-between border-b border-border px-6">
              <span className="text-lg font-bold text-foreground italic uppercase tracking-tighter italic">Personalizze</span>
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
                    item.active ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground"
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
