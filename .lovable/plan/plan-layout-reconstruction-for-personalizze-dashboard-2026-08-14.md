# Plan - Layout Reconstruction for Personalizze Dashboard

Reconstruct the dashboard layout to match the provided Meta Ads Dashboard reference image, focusing on high visual fidelity, responsiveness, and a professional dark-themed aesthetic.

## Proposed Changes

### Assets & Styling
- Register the provided Meta logo (extracted or generic equivalent) as an asset.
- Update global CSS variables to match the dark blue/navy palette of the reference image.
- Configure deep navy backgrounds, subtle border highlights, and high-contrast text styles.

### Components
- **Sidebar**: Adjust to match the slim dark sidebar with specific icons (Overview, Mobile, etc.).
- **Header**: Implement the Meta logo, breadcrumb style ("Dashboard Meta Ads | Personalizze"), and date range picker.
- **Stat Cards**: Redesign to match the "Investimento", "CPM", "CPC", and "Custo por Lead" cards with sparklines and percentage indicators.
- **Funnel Component**: Create a custom "Funil de Tráfego" visualization with the specific levels (Impressões, Alcance, Cliques, Leads).
- **Chart Area**: Implement a multi-series line chart (Investimento vs. Lead WhatsApp) using a charting library (likely `recharts` which is standard in shadcn).
- **Creative Performance List**: Add the "Criativo" list on the right with thumbnails and metrics.
- **Detailed Data Table**: Create the bottom table with columns for Campanha, Conjuntos, Anúncios, Investimento, Impressões, and Custo p/ lead.

### Layout & Responsiveness
- Ensure a grid-based layout that matches the reference image's positioning.
- Implement responsive breakpoints for mobile viewing, collapsing sections appropriately.

## Technical Details
- **Theme**: Force or default to a dark theme specifically tuned to the reference's hex codes (approx #0a0e14 background, #1a222d cards).
- **Icons**: Use `lucide-react` for standard icons; fetch specific brand icons where needed.
- **Charts**: Use `recharts` for the line chart and sparklines.
- **Components**: Utilize shadcn/ui components (Table, Card, Button) customized for the new theme.
