import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon?: any;
  color?: string;
  sparklineColor?: string;
}

export function StatCard({ label, value, change, sparklineColor = "#3b82f6" }: StatCardProps) {
  const isPositive = !change.startsWith('-');
  const isNegative = change.startsWith('-');
  
  // Para métricas de custo (CPA, CPC, Custo), redução (-) é positiva
  const isCostMetric = label.toLowerCase().includes("cpa") || 
                       label.toLowerCase().includes("custo") || 
                       label.toLowerCase().includes("cpc");
                       
  const isGood = isCostMetric ? isNegative : isPositive;
  const statusColorClass = isGood ? "text-emerald-500 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10";
  const Icon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-lg shadow-black/5 transition-all duration-500 ease-in-out hover:border-primary/50 group">
      <div className="flex flex-col mb-3 sm:mb-4">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5 sm:mb-1">{label}</p>
        <h3 className="text-xl font-bold text-foreground tracking-tight transition-colors duration-500">{value}</h3>
      </div>
      
      <div className="flex items-center justify-between mt-auto">
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded",
          statusColorClass
        )}>
          <Icon className="h-3 w-3" />
          {change}
        </div>
        
        <div className="h-8 w-24 relative opacity-50 group-hover:opacity-100 transition-opacity">
          <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path
              d={isNegative ? "M0 10 Q 25 35, 50 15 T 100 30" : "M0 30 Q 25 25, 50 35 T 100 10"}
              fill="none"
              stroke={isGood ? "#10b981" : "#f43f5e"}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
