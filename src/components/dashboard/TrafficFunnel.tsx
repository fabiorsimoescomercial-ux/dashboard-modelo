import { cn } from "@/lib/utils";
import funnelAsset from "@/assets/funnel.png.asset.json";

interface FunnelDataPointProps {
  label: string;
  value: string;
  percentage: string;
  top: string;
}

function FunnelDataPoint({ label, value, percentage, top }: FunnelDataPointProps) {
  return (
    <div 
      className="absolute right-0 flex items-center group pointer-events-none"
      style={{ top }}
    >
      <div className="mr-4 text-right">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter leading-none">{label}</p>
        <p className="text-sm font-black text-foreground tabular-nums leading-none mt-1">{value}</p>
        <p className="text-[9px] font-medium text-blue-400/80 leading-none mt-0.5">{percentage}</p>
      </div>
      <div className="w-12 h-px bg-border group-hover:bg-blue-500 transition-colors" />
    </div>
  );
}

export function TrafficFunnel() {
  const data = [
    { label: "Impressões", value: "24,4 mil", percentage: "100%", top: "12%" },
    { label: "Alcance", value: "20,7 mil", percentage: "84.8%", top: "38%" },
    { label: "Cliques", value: "421", percentage: "2.0%", top: "62%" },
    { label: "Leads WhatsApp", value: "90", percentage: "21.3%", top: "85%" },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-lg shadow-black/5 h-full transition-all duration-500 ease-in-out flex flex-col">
      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6 text-center">Funil de Tráfego</h3>
      
      <div className="relative flex-1 min-h-[250px] sm:min-h-[300px] w-full max-w-[340px] mx-auto">
        {/* Funnel Image Container */}
        <div className="absolute inset-0 flex items-center justify-start pr-20 sm:pr-24">
          <img 
            src={funnelAsset.url} 
            alt="Funil de Tráfego" 
            className="h-full w-auto object-contain drop-shadow-[0_10px_20px_rgba(59,130,246,0.2)]"
          />
        </div>

        {/* Data Points Layer */}
        <div className="absolute inset-0 pr-4">
          {data.map((point) => (
            <FunnelDataPoint key={point.label} {...point} />
          ))}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-border flex justify-between items-center px-2">
        <div className="text-center">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">CTR Geral</p>
          <p className="text-sm font-bold text-[#38BDF8]">1.72%</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Taxa Conv.</p>
          <p className="text-sm font-bold text-[#38BDF8]">21.37%</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Freq.</p>
          <p className="text-sm font-bold text-[#38BDF8]">1.18</p>
        </div>
      </div>
    </div>
  );
}
