import { cn } from "@/lib/utils";

interface FunnelStepProps {
  label: string;
  value: string;
  percentage: string;
  width: string;
  color: string;
  isLast?: boolean;
}

function FunnelStep({ label, value, percentage, width, color, isLast }: FunnelStepProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <div 
        className={cn(
          "h-12 flex items-center justify-between px-4 rounded-lg mb-1 transition-all duration-500 shadow-lg",
          color
        )}
        style={{ width }}
      >
        <span className="text-[10px] font-bold text-white uppercase tracking-tighter truncate max-w-[60%]">{label}</span>
        <span className="text-xs font-bold text-white">{value}</span>
      </div>
      {!isLast && (
        <div className="flex flex-col items-center my-1 opacity-50">
          <div className="w-0.5 h-3 bg-white/20" />
          <span className="text-[9px] font-bold text-white/40">{percentage}</span>
          <div className="w-0.5 h-3 bg-white/20" />
        </div>
      )}
    </div>
  );
}

export function TrafficFunnel() {
  const steps = [
    { label: "Impressões", value: "313.332", percentage: "100%", width: "100%", color: "bg-blue-600/40 border border-blue-500/30" },
    { label: "Alcance", value: "115.656", percentage: "36.9%", width: "85%", color: "bg-blue-600/60 border border-blue-500/40" },
    { label: "Cliques no link", value: "7.776", percentage: "6.7%", width: "70%", color: "bg-blue-600/80 border border-blue-500/50" },
    { label: "Leads WhatsApp", value: "667", percentage: "8.5%", width: "55%", color: "bg-blue-600 border border-blue-400/50 shadow-blue-500/20" },
  ];

  return (
    <div className="rounded-xl border border-white/5 bg-[#1a222d] p-6 shadow-lg shadow-black/20 h-full">
      <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-8 text-center">Funil de Tráfego</h3>
      <div className="flex flex-col items-center space-y-0 max-w-md mx-auto">
        {steps.map((step, index) => (
          <FunnelStep 
            key={step.label}
            {...step}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center px-2">
        <div className="text-center">
          <p className="text-[10px] text-white/30 uppercase font-bold tracking-tighter">CTR Geral</p>
          <p className="text-sm font-bold text-blue-400">2.48%</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-white/30 uppercase font-bold tracking-tighter">Taxa Conv.</p>
          <p className="text-sm font-bold text-blue-400">8.57%</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-white/30 uppercase font-bold tracking-tighter">Freq.</p>
          <p className="text-sm font-bold text-blue-400">2.71</p>
        </div>
      </div>
    </div>
  );
}
