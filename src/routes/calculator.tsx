import { createFileRoute } from '@tanstack/react-router'
import { AdvancedCalculator } from '@/components/calculator/AdvancedCalculator'
import { Header } from '@/components/dashboard/Header'

export const Route = createFileRoute('/calculator')({
  component: CalculatorPage,
})

function CalculatorPage() {
  return (
    <div className="min-h-screen bg-[#0a0e14] text-white font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <AdvancedCalculator />
      </main>
      <footer className="mt-12 py-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>&copy; 2026 Personalizze Dashboard. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
