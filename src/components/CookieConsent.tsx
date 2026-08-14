import { useState, useEffect } from "react";
import { X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-in fade-in slide-in-from-bottom-10 duration-500">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 shadow-2xl">
          <div className="absolute top-0 right-0 p-2">
            <button 
              onClick={() => setIsVisible(false)}
              className="rounded-full p-1 text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            
            <div className="flex-1 space-y-1">
              <h4 className="text-lg font-semibold text-foreground">Sua privacidade importa</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência, analisar o desempenho do site e personalizar conteúdos de acordo com a LGPD. Ao continuar navegando, você concorda com nossa política de privacidade.
              </p>
            </div>
            
            <div className="flex w-full md:w-auto flex-col sm:flex-row gap-3 pt-2 md:pt-0">
              <Button 
                variant="outline" 
                onClick={handleDecline}
                className="w-full sm:w-auto border-slate-200 dark:border-slate-800"
              >
                Recusar
              </Button>
              <Button 
                onClick={handleAccept}
                className="w-full sm:w-auto shadow-lg shadow-primary/20"
              >
                Aceitar tudo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
