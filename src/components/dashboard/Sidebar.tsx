import { cn } from "@/lib/utils";
import { TrendingUp, Smartphone, ChevronLeft } from "lucide-react";

export interface NavItem {
  name: string;
  icon: any;
  active: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  items: NavItem[];
}

export function Sidebar({ isOpen, onToggle, items }: SidebarProps) {
  return (
    <aside 
      className={cn(
        "hidden md:flex flex-col border-r border-border bg-[#0F1218] transition-all duration-500 ease-in-out z-30",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex h-16 items-center border-b border-border px-6">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shrink-0 shadow-lg shadow-blue-500/20">
            <TrendingUp className="h-5 w-5" />
          </div>
          {isOpen && (
            <span className="text-sm font-semibold tracking-wide text-foreground uppercase truncate">
              Visão Geral
            </span>
          )}
        </div>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {items.map((item) => (
          <button
            key={item.name}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium transition-all duration-200 group",
              item.active 
                ? "bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20 shadow-inner" 
                : "text-muted-foreground hover:text-foreground hover:bg-accent",
              !isOpen && "justify-center px-2"
            )}
          >
            <item.icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-110", item.active ? "text-[#38BDF8]" : "text-muted-foreground")} />
            {isOpen && <span>{item.name}</span>}
          </button>
        ))}
      </nav>

      <div className="border-t border-slate-700 p-4">
        <button 
          onClick={onToggle}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-bold text-slate-500 hover:text-[#38BDF8] transition-colors group uppercase tracking-widest"
        >
          {isOpen ? (
            <>
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Recolher</span>
            </>
          ) : (
            <div className="flex w-full justify-center">
              <ChevronLeft className="h-4 w-4 rotate-180" />
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
