import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { loginUser, validateSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  AlertTriangle, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sun, 
  Moon,
  Clock,
  CheckCircle2
} from "lucide-react";
import spunLogo from "@/assets/spun-logo-horizontal.png.asset.json";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDomainInvalid, setIsDomainInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Redireciona se a sessão já for válida
  useEffect(() => {
    if (validateSession()) {
      window.location.href = "/";
    }
  }, []);

  // Inicializa tema
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

  const getRemainingLockSeconds = (): number => {
    if (typeof window === "undefined" || !window.localStorage) return 0;
    try {
      const attemptsData = localStorage.getItem("spun_login_attempts");
      if (attemptsData) {
        const { lockUntil } = JSON.parse(attemptsData);
        if (lockUntil && Date.now() < lockUntil) {
          return Math.ceil((lockUntil - Date.now()) / 1000);
        }
      }
    } catch {}
    return 0;
  };

  // Monitora e atualiza contador de bloqueio de segurança
  useEffect(() => {
    const checkLock = () => {
      const sec = getRemainingLockSeconds();
      setLockoutSeconds(sec);
    };

    checkLock();
    const interval = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          checkLock();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Validação em tempo real do domínio corporativo
  const handleEmailChange = (val: string) => {
    setEmail(val);
    setErrorMessage(null);

    if (val.includes("@")) {
      const domain = val.trim().toLowerCase();
      setIsDomainInvalid(!domain.endsWith("@spun.com.br"));
    } else {
      setIsDomainInvalid(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage("Por favor, informe seu e-mail corporativo.");
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.endsWith("@spun.com.br")) {
      setIsDomainInvalid(true);
      setErrorMessage("Domínio corporativo não autorizado. Utilize apenas e-mails terminados em @spun.com.br.");
      return;
    }

    if (!password) {
      setErrorMessage("Por favor, digite a sua senha de acesso.");
      return;
    }

    setIsLoading(true);

    // Simula micro-delay para feedback tátil de segurança
    setTimeout(() => {
      const result = loginUser(email, password);
      setIsLoading(false);

      if (result.success) {
        window.location.href = "/";
      } else {
        setErrorMessage(result.message || "Falha na autenticação. Verifique os dados.");
        if (result.lockoutMinutes) {
          setLockoutSeconds(result.lockoutMinutes * 60);
        } else {
          setLockoutSeconds(getRemainingLockSeconds());
        }
      }
    }, 400);
  };

  const formatCountdown = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs.toString().padStart(2, "0")}s`;
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center bg-background px-4 py-8 overflow-hidden transition-colors duration-500 ease-in-out font-sans">
      {/* Background Decorativo e Gradiente Sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Botão de Tema no Topo Direito */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={toggleTheme}
          type="button"
          aria-label="Alternar tema claro/escuro"
          className="rounded-full p-2.5 text-muted-foreground hover:bg-muted/80 transition-colors border border-border/40 bg-card/60 backdrop-blur-sm"
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Cabeçalho da Marca */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-card border border-border shadow-md shadow-black/5">
            <img
              src={spunLogo.url}
              alt="SPUN Logo"
              className="h-9 sm:h-11 w-auto object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Acesso ao Dashboard
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Plataforma corporativa de gestão e performance de tráfego
            </p>
          </div>
        </div>

        {/* Card de Autenticação */}
        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-md p-6 sm:p-8 shadow-xl shadow-black/10 space-y-6">
          {/* Alerta de Bloqueio por Força Bruta (Rate Limiting) */}
          {lockoutSeconds > 0 && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 space-y-2 animate-pulse">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                <Clock className="h-4 w-4" />
                <span>Bloqueio de Segurança Ativo</span>
              </div>
              <p className="text-xs text-rose-300">
                5 tentativas consecutivas incorretas detectadas. Por proteção da infraestrutura, novas tentativas estão bloqueadas.
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-rose-500/20 text-xs font-mono font-bold text-rose-400">
                <span>Tempo restante de espera:</span>
                <span>{formatCountdown(lockoutSeconds)}</span>
              </div>
            </div>
          )}

          {/* Alerta de Erro Genérico */}
          {errorMessage && lockoutSeconds === 0 && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 flex items-start gap-3 text-xs text-rose-400 transition-all">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo E-mail Corporativo */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="corporate-email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  E-mail Corporativo
                </Label>
                <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  @spun.com.br
                </span>
              </div>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="corporate-email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu.nome@spun.com.br"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  disabled={lockoutSeconds > 0 || isLoading}
                  className={`pl-10 h-11 text-xs bg-muted/40 border-border font-medium ${
                    isDomainInvalid ? "border-amber-500/60 focus-visible:ring-amber-500" : ""
                  }`}
                  required
                />
              </div>

              {isDomainInvalid && (
                <p className="text-[11px] text-amber-400 flex items-center gap-1 font-medium">
                  <AlertTriangle className="h-3 w-3 shrink-0" />
                  Apenas e-mails com sufixo @spun.com.br são aceitos.
                </p>
              )}
            </div>

            {/* Campo Senha */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Senha
                </Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage(null);
                  }}
                  disabled={lockoutSeconds > 0 || isLoading}
                  className="pl-10 pr-10 h-11 text-xs bg-muted/40 border-border font-medium"
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5"
                  aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Botão de Envio */}
            <Button
              type="submit"
              disabled={lockoutSeconds > 0 || isLoading}
              className="w-full h-11 text-xs font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all cursor-pointer mt-2"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Validando Credenciais...</span>
                </div>
              ) : lockoutSeconds > 0 ? (
                `Acesso Bloqueado (${formatCountdown(lockoutSeconds)})`
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Acessar Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </form>

          {/* Dica Informativa de Autenticação */}
          <div className="pt-2 border-t border-border/50 text-[11px] text-muted-foreground flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>Sessão assinada válida por 8 horas.</span>
          </div>
        </div>

        {/* Rodapé de Segurança e Badges de Conformidade */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
            <span>Tokens Assinados SHA-256</span>
          </div>
          <span className="text-border">•</span>
          <div className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-emerald-400" />
            <span>Rate Limiting (5x max)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
