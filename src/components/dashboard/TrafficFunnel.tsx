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
    { label: "Impressões", value: "24,4 mil", percentage: "100%", width: "100%", color: "bg-blue-600/20 border border-blue-500/10" },
    { label: "Alcance", value: "20,7 mil", percentage: "84.8%", width: "85%", color: "bg-blue-600/40 border border-blue-500/20" },
    { label: "Cliques", value: "421", percentage: "2.0%", width: "70%", color: "bg-blue-600/60 border border-blue-500/30" },
    { label: "Leads WhatsApp", value: "90", percentage: "21.3%", width: "55%", color: "bg-blue-600 border border-blue-400/50 shadow-blue-500/20" },
  ];

  return (
    <div className="rounded-xl border border-slate-700 bg-[#23272F] p-6 shadow-lg shadow-black/20 h-full">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 text-center">Funil de Tráfego</h3>
      <div className="flex flex-col items-center space-y-0 max-w-md mx-auto">
        {steps.map((step, index) => (
          <FunnelStep 
            key={step.label}
            {...step}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-slate-700 flex justify-between items-center px-2">
        <div className="text-center">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">CTR Geral</p>
          <p className="text-sm font-bold text-[#38BDF8]">1.72%</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Taxa Conv.</p>
          <p className="text-sm font-bold text-[#38BDF8]">21.37%</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Freq.</p>
          <p className="text-sm font-bold text-[#38BDF8]">1.18</p>
        </div>
      </div>
    </div>
  );
}
