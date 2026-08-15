import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Loader2, Zap, Target, TrendingUp, AlertTriangle, CheckCircle2, History } from "lucide-react";

export function AdvancedCalculator() {
  const [activeTab, setActiveTab] = useState("target");
  const [isLoading, setIsLoading] = useState(false);
  
  // State for metrics
  const [targetCpa, setTargetCpa] = useState(40.00);
  const [metrics, setMetrics] = useState({
    investment: 6200.00,
    ctr: 0.85,
    cvr: 2.10,
    cpm: 12.50
  });

  const runCalculation = () => {
    setIsLoading(true);
    // Simulate math
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="border-border bg-card shadow-lg shadow-black/5 overflow-hidden transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-[#15768f]/20 to-[#4cd47f]/20 p-6 border-b border-border">
        <CardTitle className="text-2xl font-bold tracking-tight">Calculadora de Otimização - Google Ads</CardTitle>
        <CardDescription>Otimização inteligente baseada em metas de CPA e benchmarks</CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2 bg-transparent p-0 mb-8 h-auto">
          <TabsTrigger value="target" className="data-[state=active]:bg-[#15768f] data-[state=active]:text-white">Meta de CPA</TabsTrigger>
          <TabsTrigger value="current" className="data-[state=active]:bg-[#15768f] data-[state=active]:text-white">Métricas</TabsTrigger>
          <TabsTrigger value="connection" className="data-[state=active]:bg-[#15768f] data-[state=active]:text-white">API</TabsTrigger>
          <TabsTrigger value="competitors" className="data-[state=active]:bg-[#15768f] data-[state=active]:text-white">Concorrentes</TabsTrigger>
          <TabsTrigger value="results" className="data-[state=active]:bg-[#15768f] data-[state=active]:text-white">Resultados</TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-[#15768f] data-[state=active]:text-white">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="target" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Informações da Campanha</h3>
              <div className="space-y-2">
                <Label>Nome da Campanha</Label>
                <Input placeholder="Ex: Campanha Display Q4" />
              </div>
              <div className="space-y-2">
                <Label>Meta de CPA (R$)</Label>
                <Input type="number" value={targetCpa} onChange={(e) => setTargetCpa(parseFloat(e.target.value))} />
              </div>
            </div>
            <div className="bg-[#15768f]/10 p-6 rounded-lg border border-[#15768f]/30 flex flex-col justify-center items-center text-center space-y-4">
              <Target className="h-12 w-12 text-[#4cd47f]" />
              <h3 className="text-xl font-bold">CPA é o ponto central</h3>
              <p className="text-sm text-muted-foreground">Todas as recomendações serão baseadas em atingir este CPA desejado.</p>
              <Button className="bg-[#15768f] hover:bg-[#15768f]/90" onClick={() => setActiveTab("current")}>Próximo passo</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="current" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricInput label="Investimento (R$)" value={metrics.investment} onChange={(v) => setMetrics({...metrics, investment: v})} />
            <MetricInput label="CTR (%)" value={metrics.ctr} onChange={(v) => setMetrics({...metrics, ctr: v})} />
            <MetricInput label="CVR (%)" value={metrics.cvr} onChange={(v) => setMetrics({...metrics, cvr: v})} />
            <MetricInput label="CPM (R$)" value={metrics.cpm} onChange={(v) => setMetrics({...metrics, cpm: v})} />
          </div>
          <Button className="w-full bg-[#4cd47f] hover:bg-[#4cd47f]/90 text-white font-bold" onClick={runCalculation} disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Zap className="mr-2" />}
            Otimizar campanha
          </Button>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
                <ResultCard title="CPA Calculado" value="R$ 42,50" icon={<TrendingUp />} />
                <ResultCard title="Otimização Sugerida" value="+15% CTR" icon={<Zap />} />
                <ResultCard title="Conformidade" value="Meta Atingida" icon={<CheckCircle2 className="text-[#4cd47f]" />} />
            </div>
            <Alert className="bg-[#15768f]/10 border-[#15768f]/30">
                <Target className="h-4 w-4 text-[#15768f]" />
                <AlertTitle>Recomendação Estratégica</AlertTitle>
                <AlertDescription>
                    Para atingir sua meta de R$ {targetCpa.toFixed(2)}, foque em melhorar o CTR em 15% através de criativos dinâmicos.
                </AlertDescription>
            </Alert>
        </TabsContent>

        <TabsContent value="history" className="text-center py-20 text-muted-foreground">
            <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum histórico de análise encontrado.</p>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

function MetricInput({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <Input type="number" value={value} onChange={(e) => onChange(parseFloat(e.target.value))} className="bg-[#1a2421]" />
        </div>
    );
}

function ResultCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
    return (
        <Card className="bg-[#1a2421] border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    );
}
