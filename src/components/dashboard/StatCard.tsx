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
  const isPositive = change.startsWith('+');

  return (
    <div className="rounded-xl border border-white/5 bg-[#1a222d] p-5 shadow-lg shadow-black/20 transition-all duration-300 hover:border-white/10 group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-1">{label}</p>
          <h3 className="text-xl font-bold text-white tracking-tight">{value}</h3>
        </div>
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded",
          isPositive ? "text-red-500 bg-red-500/10" : "text-green-500 bg-green-500/10"
        )}>
          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {change}
        </div>
      </div>
      
      <div className="h-10 w-full mt-2 relative opacity-50 group-hover:opacity-100 transition-opacity">
        <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
          <path
            d={isPositive ? "M0 30 Q 25 25, 50 35 T 100 10" : "M0 10 Q 25 35, 50 15 T 100 30"}
            fill="none"
            stroke={isPositive ? "#ef4444" : "#22c55e"}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
