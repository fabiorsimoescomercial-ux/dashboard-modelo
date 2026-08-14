# Plano de Refinamento do Dashboard Meta Ads

Refinar o layout do dashboard para atender rigorosamente às especificações visuais e de dados solicitadas, garantindo fidelidade ao design "Dark Mode" e aos componentes detalhados.

## 1. Ajustes de Estilo Global (Design System)
- Atualizar `src/styles.css` para definir as cores exatas:
    - Fundo Geral: `#1A1D24`
    - Fundo Sidebar: `#0F1218`
    - Fundo Cards: `#23272F`
    - Acentos: `#38BDF8` (Azul claro vibrante)
- Garantir que as bordas e arredondamentos sigam as classes solicitadas (`border-slate-700`, `rounded-xl`).

## 2. Refatoração da Sidebar
- Ajustar cores para fundo `#0F1218`.
- Item Ativo: Fundo azul escuro translúcido, bordas arredondadas, ícone/texto em azul claro.
- Adicionar botão de colapsar com ícone `<` no rodapé.
- Garantir itens: "Visão Geral" (Ícone linha) e "Mobile" (Ícone smartphone).

## 3. Refatoração do Header
- Lado Esquerdo: 
    - Logotipo Meta (infinito) em azul vibrante + "Meta" em negrito.
    - Subtítulo: "Dashboard Meta Ads | **Personalizze**" (negrito/itálico).
- Lado Direito:
    - Adicionar dropdown de "Campanhas".
    - Estilizar o datepicker para fundo escuro e borda fina.

## 4. Atualização dos Cards de KPI
- Atualizar os 4 cartões com os dados e status específicos:
    - **Investimento**: R$ 621,50 | -79.3% (Vermelho)
    - **CPM**: R$ 25,51 | -16.2% (Verde)
    - **CPC**: R$ 1,48 | 22.0% (Vermelho)
    - **Custo por Lead WhatsApp**: R$ 6,91 | -23.6% (Verde)
- Ajustar os sparklines para refletir as cores de status.

## 5. Implementação dos Blocos Intermediários
- **Funil de Tráfego**: Refinar visual com 4 camadas (Impressões, Alcance, Cliques, Leads) e dados exatos.
- **Gráfico de Linha**: Configurar Recharts para eixo duplo (Leads vs Investimento) com as escalas e picos solicitados (pico em 5 de ago).
- **Tabela de Criativos**: Adicionar thumbnails, dados específicos ("[V 06]..."), e paginação no rodapé.

## 6. Tabela de Dados Principal
- Implementar cabeçalhos: Campanha, Conjuntos, Anúncios, Investimento (com ordenação), Impressões, Custo p/ lead, Lead.
- Adicionar efeito de "barra de progresso" no fundo das células de métricas.
- Incluir linha de "Total geral" com os valores somados.
- Adicionar paginação.

## 7. Rodapé e Finalização
- Adicionar texto de atualização de dados e link de privacidade no rodapé.
- Revisar responsividade e acessibilidade.

## Detalhes Técnicos
- Utilizar `recharts` para gráficos de linha e barras.
- `lucide-react` para ícones.
- `shadcn/ui` (ou Tailwind puro para customizações específicas) para dropdowns e tabelas.
- Manter lógica de tema (dark mode) consistente.
