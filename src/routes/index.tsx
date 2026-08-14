import { createFileRoute } from "@tanstack/react-router";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8 text-center">
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
        Integração Looker & Meta Ads
      </h1>
      <p className="max-w-2xl whitespace-pre-wrap text-muted-foreground">
        Execute esta instrucao no projeto: Eu preicso trazer para ca, compartilhando com o github e usando o vercel o dash criado no looker. veja se consegue pegar todo o layout pelo link. Eu ja criei a API do Meta Ads e vou vir em seguida com o codigo para tal{"\n\n"}
        <a 
          href="https://datastudio.google.com/reporting/49a56047-8c44-42bd-85da-1de55cc52d93" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline font-medium"
        >
          https://datastudio.google.com/reporting/49a56047-8c44-42bd-85da-1de55cc52d93
        </a>
      </p>
    </div>
  );
}
