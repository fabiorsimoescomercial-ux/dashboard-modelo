import { useState, useEffect, useMemo } from "react";
import { 
  LayoutDashboard, 
  TrendingUp, 
  BarChart3, 
  Settings, 
  HelpCircle,
  Users,
  DollarSign,
  ChevronRight,
  X,
  Smartphone,
  Eye,
  MousePointer2,
  MessageSquare,
  ArrowRight,
  Play,
  Image as ImageIcon,
  Search,
  ShoppingBag,
  Database,
  RefreshCw
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

export interface AdPerformanceRecord {
  id?: string | number;
  campaign_name?: string;
  campaign?: string;
  nome_campanha?: string;
  name?: string;
  platform?: string;
  plataforma?: string;
  spend?: number | string;
  investment?: number | string;
  investimento?: number | string;
  cost?: number | string;
  revenue?: number | string;
  receita?: number | string;
  purchases?: number | string;
  compras?: number | string;
  conversions?: number | string;
  roas?: number | string;
  cpa?: number | string;
  ctr?: number | string;
  clicks?: number | string;
  impressions?: number | string;
  date?: string;
  created_at?: string;
}
import { CookieConsent } from "@/components/CookieConsent";
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

type Platform = 'all' | 'Google Ads' | 'Meta Ads' | 'TikTok Ads';

function normalizePlatform(val?: string): 'meta' | 'google' | 'tiktok' {
  const p = (val || '').toLowerCase();
  if (p.includes('google')) return 'google';
  if (p.includes('tiktok')) return 'tiktok';
  return 'meta';
}

function PlatformBadge({ platform }: { platform?: string }) {
  const normalized = normalizePlatform(platform);
  if (normalized === 'meta') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 whitespace-nowrap">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
        Meta Ads
      </span>
    );
  }
  if (normalized === 'google') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 whitespace-nowrap">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        Google Ads
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/20 whitespace-nowrap">
      <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
      TikTok Ads
    </span>
  );
}

function DashboardLayout() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // 1. Busca de Dados via TanStack Query e Supabase (ordenada por date DESC)
  const {
    data: rawAdsData = [],
    isLoading: isLoadingAds,
    isError: isAdsError,
    error: adsError,
    refetch: refetchAds,
  } = useQuery({
    queryKey: ["ads_performance"],
    queryFn: async () => {
      console.log("[Supabase] Executando SELECT * FROM ads_performance ORDER BY date DESC...");
      const { data, error } = await supabase
        .from("ads_performance")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("[Supabase] Erro ao buscar ads_performance:", error);
        throw error;
      }
      return (data || []) as AdPerformanceRecord[];
    },
    staleTime: 1000 * 60 * 2,
  });

  useEffect(() => {
    try {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    } catch (err) {
      console.error('DashboardLayout: Error initializing theme', err);
    }
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

  // Formatador padronizado de moeda BRL (R$)
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  // 2. Filtro por Plataforma ('all', 'Google Ads', 'Meta Ads', 'TikTok Ads')
  const filteredAdsData = useMemo(() => {
    if (!rawAdsData || rawAdsData.length === 0) return [];
    if (selectedPlatform === 'all') return rawAdsData;

    return rawAdsData.filter((row) => {
      const platformStr = String(row.platform || row.plataforma || "").toLowerCase();
      if (selectedPlatform === 'Google Ads') return platformStr.includes("google");
      if (selectedPlatform === 'Meta Ads') return platformStr.includes("meta") || platformStr.includes("facebook");
      if (selectedPlatform === 'TikTok Ads') return platformStr.includes("tiktok");
      return false;
    });
  }, [rawAdsData, selectedPlatform]);

  const hasRealData = rawAdsData.length > 0;

  // 3. Cálculo de KPIs de E-commerce: Spend, Revenue, ROAS, Purchases e CPA
  const kpis = useMemo(() => {
    let spend = 0;
    let revenue = 0;
    let purchases = 0;

    for (const row of filteredAdsData) {
      spend += Number(row.spend ?? row.investment ?? row.investimento ?? row.cost ?? 0);
      revenue += Number(row.revenue ?? row.receita ?? 0);
      purchases += Number(row.purchases ?? row.compras ?? row.conversions ?? 0);
    }

    const roas = spend > 0 ? revenue / spend : 0;
    const cpa = purchases > 0 ? spend / purchases : 0;

    return { spend, revenue, roas, purchases, cpa };
  }, [filteredAdsData]);

  // Métricas mockadas de fallback para e-commerce quando o banco ainda não possui registros
  const ecommerceMetrics = {
    all: {
      spend: { value: "R$ 384.920,00", change: "+14.2%" },
      revenue: { value: "R$ 2.463.488,00", change: "+28.6%" },
      roas: { value: "6.40x", change: "+12.5%" },
      cpa: { value: "R$ 32,80", change: "-8.4%" },
    },
    meta: {
      spend: {
        value: "R$ 185.450,00",
        change: "+11.8%",
      },
      revenue: { value: "R$ 1.149.790,00", change: "+22.4%" },
      roas: { value: "6.20x", change: "+9.5%" },
      cpa: { value: "R$ 34,20", change: "-6.2%" },
    },
    google: {
      spend: { value: "R$ 142.300,00", change: "+16.5%" },
      revenue: { value: "R$ 1.053.020,00", change: "+35.1%" },
      roas: { value: "7.40x", change: "+16.0%" },
      cpa: { value: "R$ 28,90", change: "-12.7%" },
    },
    tiktok: {
      spend: { value: "R$ 57.170,00", change: "+21.0%" },
      revenue: { value: "R$ 260.678,00", change: "+31.8%" },
      roas: { value: "4.56x", change: "+8.9%" },
      cpa: { value: "R$ 39,50", change: "-4.3%" },
    },
  };

  const normalizedKey = normalizePlatform(selectedPlatform === 'all' ? 'all' : selectedPlatform);
  const currentMetrics = selectedPlatform === 'all' 
    ? ecommerceMetrics.all 
    : (ecommerceMetrics[normalizedKey] || ecommerceMetrics.all);

  // 4 Cartões de Estatísticas com dados dinâmicos do Supabase
  const stats = [
    { 
      label: "Investimento Total (Spend)", 
      value: isLoadingAds 
        ? "Carregando..." 
        : hasRealData 
          ? formatCurrency(kpis.spend) 
          : currentMetrics.spend.value, 
      change: hasRealData 
        ? (selectedPlatform === 'all' ? "Blended" : selectedPlatform) 
        : currentMetrics.spend.change 
    },
    { 
      label: "Faturamento (Revenue)", 
      value: isLoadingAds 
        ? "Carregando..." 
        : hasRealData 
          ? formatCurrency(kpis.revenue) 
          : currentMetrics.revenue.value, 
      change: hasRealData 
        ? (kpis.revenue >= kpis.spend ? "+Retorno Positivo" : "-Monitorar") 
        : currentMetrics.revenue.change 
    },
    { 
      label: selectedPlatform === 'all' ? "ROAS Blended" : `ROAS (${selectedPlatform})`, 
      value: isLoadingAds 
        ? "Carregando..." 
        : hasRealData 
          ? `${kpis.roas.toFixed(2)}x` 
          : currentMetrics.roas.value, 
      change: hasRealData 
        ? `${kpis.purchases} conversões` 
        : currentMetrics.roas.change 
    },
    { 
      label: "CPA (Custo por Aquisição)", 
      value: isLoadingAds 
        ? "Carregando..." 
        : hasRealData 
          ? formatCurrency(kpis.cpa) 
          : currentMetrics.cpa.value, 
      change: hasRealData 
        ? (kpis.purchases > 0 ? `${kpis.purchases} compras` : "Sem conversões") 
        : currentMetrics.cpa.value 
    },
  ];

  const defaultMockChartData = [
    { date: "04/08", investment: 12500, faturamento: 78400 },
    { date: "05/08", investment: 14200, faturamento: 92300 },
    { date: "06/08", investment: 13100, faturamento: 81500 },
    { date: "07/08", investment: 15800, faturamento: 102600 },
    { date: "08/08", investment: 14900, faturamento: 95400 },
    { date: "09/08", investment: 13800, faturamento: 88200 },
    { date: "10/08", investment: 16400, faturamento: 108900 },
    { date: "11/08", investment: 15200, faturamento: 97500 },
    { date: "12/08", investment: 17800, faturamento: 118400 },
    { date: "13/08", investment: 16100, faturamento: 105200 },
  ];

  // 4. Gráfico de Tendência (Recharts): Agrupado por data para comparar Investimento vs Faturamento
  const chartData = useMemo(() => {
    if (!hasRealData) {
      return defaultMockChartData;
    }

    const dateMap = new Map<string, { date: string; investment: number; faturamento: number; sortKey: number }>();

    for (const row of filteredAdsData) {
      if (!row.date) continue;
      const rawDate = String(row.date);
      let displayDate = rawDate;
      let timestamp = 0;

      try {
        const parsed = new Date(rawDate);
        if (!isNaN(parsed.getTime())) {
          timestamp = parsed.getTime();
          const day = String(parsed.getDate()).padStart(2, "0");
          const month = String(parsed.getMonth() + 1).padStart(2, "0");
          displayDate = `${day}/${month}`;
        } else if (rawDate.includes("-")) {
          const parts = rawDate.split("T")[0].split("-");
          if (parts.length === 3) {
            displayDate = `${parts[2]}/${parts[1]}`;
            timestamp = new Date(parts.join("-")).getTime();
          }
        }
      } catch {
        displayDate = rawDate;
      }

      const spend = Number(row.spend ?? row.investment ?? row.investimento ?? row.cost ?? 0);
      const revenue = Number(row.revenue ?? row.receita ?? 0);

      if (!dateMap.has(displayDate)) {
        dateMap.set(displayDate, {
          date: displayDate,
          investment: 0,
          faturamento: 0,
          sortKey: timestamp || 0,
        });
      }

      const entry = dateMap.get(displayDate)!;
      entry.investment += spend;
      entry.faturamento += revenue;
      if (timestamp && (!entry.sortKey || timestamp < entry.sortKey)) {
        entry.sortKey = timestamp;
      }
    }

    const aggregated = Array.from(dateMap.values());
    if (aggregated.length === 0) return defaultMockChartData;

    // Ordenação cronológica crescente (antigo -> recente)
    aggregated.sort((a, b) => a.sortKey - b.sortKey);
    return aggregated;
  }, [hasRealData, filteredAdsData]);

  const chartConfig = {
    faturamento: {
      label: "Faturamento (R$)",
      color: "#10b981",
    },
    investment: {
      label: "Investimento (R$)",
      color: "#3b82f6",
    },
  } satisfies ChartConfig;

  // Dados mockados de campanhas multi-plataforma para fallback
  const allCampaigns = [
    { 
      name: "[Search][Fundo de Funil]", 
      platform: "google" as const, 
      invest: 14500, 
      revenue: 104400 
    },
    { 
      name: "[Advantage+][BR] Conversão", 
      platform: "meta" as const, 
      invest: 22800, 
      revenue: 148200 
    },
    { 
      name: "[Conversions][Broad] Top Funil", 
      platform: "tiktok" as const, 
      invest: 9200, 
      revenue: 44160 
    },
    { 
      name: "[PMax][Catalog Sales][Feed]", 
      platform: "google" as const, 
      invest: 18400, 
      revenue: 141680 
    },
    { 
      name: "[Retargeting][DPA][30D]", 
      platform: "meta" as const, 
      invest: 11200, 
      revenue: 95200 
    },
    { 
      name: "[Spark Ads][Creator UGC]", 
      platform: "tiktok" as const, 
      invest: 6800, 
      revenue: 29920 
    },
  ];

  // 5. Linhas da Tabela de Campanhas com cálculo individual de ROAS
  const campaignRows = useMemo(() => {
    if (hasRealData) {
      const map = new Map<string, {
        id: string | number;
        name: string;
        platform: string;
        spend: number;
        revenue: number;
      }>();

      for (const row of filteredAdsData) {
        const name = row.campaign_name || row.campaign || row.name || row.nome_campanha || "Campanha Geral";
        const platform = row.platform || row.plataforma || "meta";
        const spend = Number(row.spend ?? row.investment ?? row.investimento ?? row.cost ?? 0);
        const revenue = Number(row.revenue ?? row.receita ?? 0);

        if (!map.has(name)) {
          map.set(name, {
            id: row.id ?? name,
            name,
            platform,
            spend: 0,
            revenue: 0,
          });
        }

        const curr = map.get(name)!;
        curr.spend += spend;
        curr.revenue += revenue;
      }

      return Array.from(map.values()).map((c) => {
        const roas = c.spend > 0 ? (c.revenue / c.spend).toFixed(1) + "x" : "0.0x";
        return {
          id: c.id,
          name: c.name,
          platform: c.platform,
          spend: c.spend,
          revenue: c.revenue,
          roas,
        };
      });
    }

    const normFilter = normalizePlatform(selectedPlatform === 'all' ? 'all' : selectedPlatform);
    const mockFiltered = selectedPlatform === 'all' 
      ? allCampaigns 
      : allCampaigns.filter((c) => c.platform === normFilter);

    return mockFiltered.map((c, idx) => ({
      id: `mock-${idx}`,
      name: c.name,
      platform: c.platform,
      spend: c.invest,
      revenue: c.revenue,
      roas: `${(c.revenue / c.invest).toFixed(1)}x`,
    }));
  }, [hasRealData, filteredAdsData, selectedPlatform]);

  const totalCampaignSpend = campaignRows.reduce((acc, c) => acc + c.spend, 0);
  const totalCampaignRevenue = campaignRows.reduce((acc, c) => acc + c.revenue, 0);
  const averageCampaignRoas = totalCampaignSpend > 0 
    ? (totalCampaignRevenue / totalCampaignSpend).toFixed(1) + "x" 
    : "0.0x";

  // Dados mockados de criativos multi-plataforma
  const allCreatives = [
    {
      id: 1,
      name: "[Vídeo UGC][Viral TikTok][Review Produto 01]",
      platform: "tiktok" as const,
      format: "Vídeo 9:16",
      type: "video" as const,
      ctr: "3.42%",
      cpa: "R$ 29,40",
      purchases: 312,
    },
    {
      id: 2,
      name: "[Carrossel Feed/Stories][Coleção Verão][CTA Shop]",
      platform: "meta" as const,
      format: "Carrossel 1:1",
      type: "carousel" as const,
      ctr: "2.85%",
      cpa: "R$ 31,80",
      purchases: 489,
    },
    {
      id: 3,
      name: "[RSA Search][Frete Grátis + 10% OFF][Sitelinks]",
      platform: "google" as const,
      format: "Extensão RSA",
      type: "search" as const,
      ctr: "6.15%",
      cpa: "R$ 24,10",
      purchases: 642,
    },
    {
      id: 4,
      name: "[Reels Video][Unboxing Estilo POV][Garantia 30D]",
      platform: "meta" as const,
      format: "Reels 9:16",
      type: "video" as const,
      ctr: "3.10%",
      cpa: "R$ 33,50",
      purchases: 378,
    },
    {
      id: 5,
      name: "[PMax Assets][Feed Shopping + Banner Promocional]",
      platform: "google" as const,
      format: "PMax Shopping",
      type: "shopping" as const,
      ctr: "4.80%",
      cpa: "R$ 27,90",
      purchases: 520,
    },
    {
      id: 6,
      name: "[Trend Vídeo][Hook 3s][Antes & Depois][Áudio Viral]",
      platform: "tiktok" as const,
      format: "Vídeo 9:16",
      type: "video" as const,
      ctr: "3.90%",
      cpa: "R$ 35,20",
      purchases: 245,
    },
  ];

  const filteredCreatives = selectedPlatform === 'all'
    ? allCreatives
    : allCreatives.filter((c) => c.platform === normalizePlatform(selectedPlatform));

  return (
    <div className="flex h-screen w-full bg-background transition-colors duration-500 ease-in-out overflow-x-hidden">
      <div className="flex flex-1 flex-col overflow-hidden w-full max-w-full">
        <Header 
          theme={theme} 
          onToggleTheme={toggleTheme} 
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)} 
        />

        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-background p-3 sm:p-4 md:p-8 space-y-6 sm:space-y-8 transition-colors duration-500 ease-in-out">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <span className="text-muted-foreground">Dashboard</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground">Visão Geral</span>
              </nav>
              <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl transition-colors duration-500">
                Visão Geral
              </h1>

              {/* Tabs para alternar entre plataformas */}
              <Tabs
                value={selectedPlatform}
                onValueChange={(val) => setSelectedPlatform(val as Platform)}
                className="w-full sm:w-auto pt-1"
              >
                <TabsList className="grid grid-cols-2 sm:inline-flex h-auto sm:h-9 w-full sm:w-auto p-1 bg-muted/60 border border-border/50">
                  <TabsTrigger value="all" className="text-xs font-semibold px-3 py-1.5 sm:py-1">
                    Visão Geral (Blended)
                  </TabsTrigger>
                  <TabsTrigger value="Google Ads" className="text-xs font-semibold px-3 py-1.5 sm:py-1">
                    Google Ads
                  </TabsTrigger>
                  <TabsTrigger value="Meta Ads" className="text-xs font-semibold px-3 py-1.5 sm:py-1">
                    Meta Ads
                  </TabsTrigger>
                  <TabsTrigger value="TikTok Ads" className="text-xs font-semibold px-3 py-1.5 sm:py-1">
                    TikTok Ads
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex items-center gap-3 self-start md:self-end">
              {isLoadingAds ? (
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border/60 bg-muted/40 text-xs text-muted-foreground font-medium animate-pulse shadow-sm">
                  <RefreshCw className="h-3.5 w-3.5 text-blue-400 animate-spin" />
                  <span>Carregando dados...</span>
                </div>
              ) : hasRealData ? (
                <button
                  type="button"
                  onClick={() => refetchAds()}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold shadow-sm transition-all duration-200 cursor-pointer"
                  title="Atualizar dados do Supabase"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Supabase: {rawAdsData.length} registros</span>
                  <RefreshCw className="h-3.5 w-3.5 ml-1 opacity-75 hover:opacity-100 transition-opacity" />
                </button>
              ) : isAdsError ? (
                <button
                  type="button"
                  onClick={() => refetchAds()}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold shadow-sm transition-all duration-200 cursor-pointer"
                  title={String(adsError)}
                >
                  <Database className="h-3.5 w-3.5 text-amber-400" />
                  <span>Tentar Reconectar Supabase</span>
                  <RefreshCw className="h-3.5 w-3.5 ml-1 opacity-75 hover:opacity-100 transition-opacity" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => refetchAds()}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border/60 bg-muted/30 hover:bg-muted/50 text-xs text-muted-foreground hover:text-foreground font-medium transition-all duration-200 cursor-pointer"
                  title="Atualizar dados do Supabase"
                >
                  <Database className="h-3.5 w-3.5 text-slate-400" />
                  <span>Atualizar Supabase</span>
                  <RefreshCw className="h-3.5 w-3.5 ml-1 opacity-75 hover:opacity-100 transition-opacity" />
                </button>
              )}
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats?.map((stat) => (
              <StatCard key={stat?.label || Math.random()} {...stat} />
            )) || <p className="text-muted-foreground">Carregando métricas...</p>}
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid gap-6 grid-cols-1 xl:grid-cols-12 items-stretch">
              <div className="xl:col-span-7 space-y-6 overflow-hidden flex flex-col justify-between">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                  <TrafficFunnel />
                  
                  <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-lg shadow-black/5 flex flex-col min-h-[350px] md:min-h-full transition-all duration-500 ease-in-out overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                      <div className="flex flex-col">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Faturamento vs Investimento</h3>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">Faturamento</span>
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
                          <YAxis 
                            yAxisId="left" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} 
                            tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`}
                          />
                          <YAxis 
                            yAxisId="right" 
                            orientation="right" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} 
                            tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line yAxisId="left" type="monotone" dataKey="faturamento" stroke="var(--color-faturamento)" strokeWidth={3} dot={false} activeDot={{ r: 4 }} />
                          <Line yAxisId="right" type="monotone" dataKey="investment" stroke="var(--color-investment)" strokeWidth={3} dot={false} activeDot={{ r: 4 }} />
                        </LineChart>
                      </ChartContainer>
                    </div>
                  </div>
                </div>
              </div>

              <div className="xl:col-span-5 h-full">
                <div className="rounded-xl border border-border bg-card shadow-lg shadow-black/5 overflow-hidden transition-all duration-500 ease-in-out h-full flex flex-col">
                  <div className="p-4 sm:p-6 border-b border-border flex items-center justify-between">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Tabela de Campanhas</h3>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      {campaignRows.length} ativas
                    </span>
                  </div>
                  <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-accent scrollbar-track-transparent flex-1 flex flex-col">
                    <table className="w-full text-left min-w-[440px] border-collapse">
                      <thead>
                        <tr className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">
                          <th className="px-4 py-4 font-bold">Campanha</th>
                          <th className="px-3 py-4 font-bold">Plataforma</th>
                          <th className="px-3 py-4 font-bold text-right">Invest.</th>
                          <th className="px-3 py-4 font-bold text-right">Receita</th>
                          <th className="px-4 py-4 font-bold text-right">ROAS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {isLoadingAds ? (
                          <tr>
                            <td colSpan={5} className="text-center py-8 text-muted-foreground text-xs">
                              <div className="flex flex-col items-center justify-center gap-2">
                                <RefreshCw className="h-5 w-5 animate-spin text-primary" />
                                <span>Buscando campanhas no Supabase...</span>
                              </div>
                            </td>
                          </tr>
                        ) : campaignRows.length > 0 ? (
                          campaignRows.map((row) => (
                            <tr key={row.id} className="text-xs text-muted-foreground hover:bg-accent/50 transition-colors relative">
                              <td className="px-4 py-3.5 font-medium text-foreground truncate max-w-[130px]" title={row.name}>
                                {row.name}
                              </td>
                              <td className="px-3 py-3.5">
                                <PlatformBadge platform={row.platform} />
                              </td>
                              <td className="px-3 py-3.5 text-right font-mono text-[11px] text-foreground">
                                {formatCurrency(row.spend)}
                              </td>
                              <td className="px-3 py-3.5 text-right font-mono text-[11px] text-foreground">
                                {formatCurrency(row.revenue)}
                              </td>
                              <td className="px-4 py-3.5 text-right font-mono text-[11px] font-bold text-emerald-400">
                                {row.roas}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="text-center py-6 text-muted-foreground text-xs">
                              Nenhuma campanha encontrada para esta plataforma.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <div className="px-4 py-3.5 border-t border-border bg-muted/30 mt-auto flex items-center justify-between text-[10px] font-bold text-foreground">
                      <span>Total ({campaignRows.length})</span>
                      <div className="flex items-center gap-3 font-mono">
                        <span className="text-muted-foreground">
                          {formatCurrency(totalCampaignSpend)}
                        </span>
                        <span className="text-emerald-400">
                          ROAS: {averageCampaignRoas}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="rounded-xl border border-border bg-card shadow-lg shadow-black/5 overflow-hidden transition-all duration-500 ease-in-out">
                <div className="p-4 sm:p-6 border-b border-border flex items-center justify-between">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest text-center sm:text-left">
                    Performance por Criativo
                  </h3>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    {filteredCreatives.length} criativos
                  </span>
                </div>
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-accent scrollbar-track-transparent flex-1">
                  <table className="w-full text-left min-w-[620px] sm:min-w-full border-collapse">
                    <thead>
                      <tr className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">
                        <th className="px-4 sm:px-6 py-4">Criativo/Anúncio</th>
                        <th className="px-4 py-4">Plataforma</th>
                        <th className="px-4 py-4 text-right">CTR</th>
                        <th className="px-4 py-4 text-right">CPA</th>
                        <th className="px-4 sm:px-6 py-4 text-right">Compras</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredCreatives.length > 0 ? (
                        filteredCreatives.map((creative) => (
                          <tr key={creative.id} className="text-xs text-muted-foreground hover:bg-accent/50 transition-colors">
                            <td className="px-4 sm:px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className={cn(
                                  "w-9 h-9 rounded border shrink-0 flex items-center justify-center",
                                  creative.platform === "tiktok" && "bg-pink-950/30 border-pink-500/20 text-pink-400",
                                  creative.platform === "meta" && "bg-blue-950/30 border-blue-500/20 text-blue-400",
                                  creative.platform === "google" && "bg-amber-950/30 border-amber-500/20 text-amber-400"
                                )}>
                                  {creative.type === "video" && <Play className="h-4 w-4 fill-current opacity-80" />}
                                  {creative.type === "carousel" && <ImageIcon className="h-4 w-4 opacity-80" />}
                                  {creative.type === "search" && <Search className="h-4 w-4 opacity-80" />}
                                  {creative.type === "shopping" && <ShoppingBag className="h-4 w-4 opacity-80" />}
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <span className="font-medium text-foreground truncate max-w-[200px] sm:max-w-[340px]" title={creative.name}>
                                    {creative.name}
                                  </span>
                                  <span className="text-[10px] text-muted-foreground font-mono">
                                    {creative.format}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <PlatformBadge platform={creative.platform} />
                            </td>
                            <td className="px-4 py-4 text-right font-mono text-foreground font-semibold">
                              {creative.ctr}
                            </td>
                            <td className="px-4 py-4 text-right font-mono text-emerald-400 font-semibold">
                              {creative.cpa}
                            </td>
                            <td className="px-4 sm:px-6 py-4 text-right font-mono text-blue-400 font-bold">
                              {creative.purchases}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center py-6 text-muted-foreground text-xs">
                            Nenhum criativo encontrado para esta plataforma.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div className="px-6 py-3 border-t border-border flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <span>Total: {filteredCreatives.reduce((acc, c) => acc + c.purchases, 0)} Compras</span>
                    <div className="flex items-center gap-4">
                      <span>1 - {filteredCreatives.length} de {filteredCreatives.length}</span>
                      <div className="flex gap-2">
                        <button className="hover:text-white transition-colors" title="Página anterior">
                          <ChevronRight className="h-3 w-3 rotate-180" />
                        </button>
                        <button className="hover:text-white transition-colors" title="Próxima página">
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="bg-card px-4 sm:px-8 py-4 border-t border-border transition-colors duration-500 ease-in-out">
          <p className="text-[8px] sm:text-[9px] text-muted-foreground font-bold uppercase tracking-widest leading-relaxed text-center sm:text-left">
            Dados atualizados pela última vez: 14/08/2026 09:06:09 (alguns itens na página não foram atualizados) | 
            <a href="#" className="underline ml-1 hover:text-white transition-colors">Política de Privacidade</a>
          </p>
        </footer>

      </div>

      <CookieConsent />
    </div>
  );
}
