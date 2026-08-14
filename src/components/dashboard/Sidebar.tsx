import { LayoutDashboard, TrendingUp, BarChart3, Settings, HelpCircle, X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

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
        "hidden md:flex flex-col border-r bg-white dark:bg-slate-900 dark:border-slate-800 transition-all duration-300 ease-in-out z-30",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shrink-0">
            P
          </div>
          {isOpen && (
            <span className="text-lg font-bold tracking-tight text-foreground truncate">
              Personalizze
            </span>
          )}
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {items.map((item) => (
          <button
            key={item.name}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800",
              item.active ? "bg-primary/10 text-primary hover:bg-primary/15" : "text-muted-foreground",
              !isOpen && "justify-center px-2"
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {isOpen && <span>{item.name}</span>}
          </button>
        ))}
      </nav>

      <div className="border-t p-4">
        <button 
          onClick={onToggle}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {isOpen ? (
            <>
              <X className="h-5 w-5" />
              <span>Recolher</span>
            </>
          ) : (
            <div className="flex w-full justify-center">
              <Menu className="h-5 w-5" />
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
