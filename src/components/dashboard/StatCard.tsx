import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}

export function StatCard({ label, value, change, icon: Icon, color }: StatCardProps) {
  return (
    <div className="rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-6 shadow-sm transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("rounded-lg bg-slate-100 dark:bg-slate-800 p-2", color)}>
          <Icon className="h-5 w-5" />
        </div>
        <span className={cn(
          "text-xs font-semibold",
          change.startsWith('+') ? "text-green-600" : "text-destructive"
        )}>
          {change}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <h3 className="text-2xl font-bold text-foreground mt-1">{value}</h3>
      </div>
    </div>
  );
}
