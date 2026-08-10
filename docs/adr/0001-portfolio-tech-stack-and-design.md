# ADR 0001: Backend Developer Portfolio Tech Stack & Light Monochromatic Design System

- **Status**: Accepted
- **Date**: 2026-08-10

## Context
The goal is to build a high-impact, professional web portfolio for a Backend Developer targeting HR/Tech recruiters, freelance clients, and internship opportunities. Per user directive, the design uses a **Bright Light Monochromatic Aesthetic with Sleek Dark/Black Contrast Accents** and **Scalar API Reference (`@scalar/api-reference-react`)** for modern interactive OpenAPI documentation.

## Decision
1. **Framework & Tooling**: Vite + React for fast rendering, component modularity, and clean builds.
2. **API Documentation Platform**: **Scalar API Reference** integrated into project modals to showcase real OpenAPI 3.0 / Swagger specs with live cURL, Node, Go, and Python client code generators.
3. **Design & Aesthetics (ui-ux-pro-max)**:
   - **Base Palette**: Clean Light `#FAFAFA` / Pure White `#FFFFFF` with `#E4E4E7` borders.
   - **Contrast Elements**: Jet Black `#09090B` container for the Interactive CLI Terminal, dark contrast headers, and dark primary action buttons.
   - **Accents**: Emerald Green `#10B981` (API Status Operational, Terminal output), Royal Blue `#2563EB` (Interactive highlights).
   - **Typography**: `JetBrains Mono` / `Space Grotesk` (Headings & Terminal) + `Inter` (Body).
4. **Core Features**:
   - Two-column Hero with Interactive CLI Terminal supporting `help`, `cat`, `skills`, `projects`, `contact`, `sudo`, `ping`, `theme`, and `matrix` Easter eggs.
   - Sample Backend Projects: High-Throughput Payment Settlement API, Real-time Distributed Chat & Webhook Gateway, Log Aggregation & Analytics Pipeline Engine.
   - Project Detail Modal with 4 tabs (Overview, System Architecture Diagram, Metrics/Benchmark, **Scalar API Reference & Curl Playground**).
   - Live API Status Badge in floating navbar ("ALL SYSTEMS OPERATIONAL" + latency ping).
   - Real Contact Form dispatch + 1-Click Quick Copy for email/contacts and `curl` contact command.
   - Interactive Skill Filtering.
   - Data stored cleanly in `portfolioData.js`.

## Consequences
- Elevates the backend developer persona with industry-standard Scalar OpenAPI documentation.
- Modern, interactive, and high-impact visual hierarchy.
