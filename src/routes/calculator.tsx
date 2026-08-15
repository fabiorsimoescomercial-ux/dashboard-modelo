import { useState, useEffect } from "react";
import { createFileRoute } from '@tanstack/react-router'
import { AdvancedCalculator } from '@/components/calculator/AdvancedCalculator'
import { Header } from '@/components/dashboard/Header'
import { CookieConsent } from "@/components/CookieConsent";

export const Route = createFileRoute('/calculator')({
  component: CalculatorPage,
})

function CalculatorPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-500 ease-in-out">
      <Header 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        onToggleMobileMenu={() => setIsMobileMenuOpen(true)} 
      />
      <main className="container mx-auto p-4 md:p-8 space-y-8 max-w-7xl">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Calculadora de Otimização Avançada
          </h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
            Google Ads Display | Personalizze Intelligence
          </p>
        </div>
        
        <AdvancedCalculator />
      </main>
      <footer className="mt-12 py-8 border-t border-border bg-card text-center text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
        <p>&copy; 2026 Personalizze Dashboard. Todos os direitos reservados.</p>
      </footer>
      <CookieConsent />
    </div>
  )
}
