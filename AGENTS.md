# AGENTS.md — Repository Guide for AI Coding Agents

Project: **Fab.Dev Portfolio Web App**  
Developer: **Muhammad Fabian Rizky** (`Fab.Dev`)  
Stack: **Vite + React 18 + Scalar OpenAPI 3.0 + CSS Variables Design Tokens**

---

## 1. Project Core & Persona

- **Persona**: Backend Software Engineer & Systems Architect specializing in Node.js / TypeScript microservices, real-time WebSockets, PostgreSQL database tuning, and Scalar OpenAPI 3.0 specs.
- **Source of Truth**:
  - `CONTEXT.md` — Core decisions, architecture topology, and domain glossary.
  - `docs/brand-guidelines.md` — Official brand identity, color palette, and typography rules.
  - `assets/design-tokens.json` & `assets/design-tokens.css` — 3-Layer Design Token System (`Primitive → Semantic → Component`).
  - `src/data/portfolioData.js` — Single source of truth for developer bio, skill matrix, backend sample projects, experience, and terminal commands.

---

## 2. Design System & Aesthetics (ui-ux-pro-max)

- **Theme**: Light Monochromatic Base (`#FAFAFA` body, `#FFFFFF` cards) with Jet Black Contrast Anchors (`#09090B` terminal/headers/buttons).
- **Accents**: Emerald Green `#10B981` (Operational status lights, 200 OK outputs), Royal Blue `#2563EB` (Interactive links & Scalar badges).
- **Typography**: `Space Grotesk` (Headings), `JetBrains Mono` (Terminal/Code/Metrics), `Inter` (Body).
- **Rules**:
  - Use CSS variables (`var(--color-bg-page)`, `var(--terminal-bg)`). Do not hardcode raw hex values in components.
  - Avoid generic AI placeholder layouts or low-contrast text. Maintain 4.5:1 WCAG contrast ratio.

---

## 3. Core Component Architecture

- `src/components/Navbar.jsx`: Floating glassmorphism navbar with live system latency indicator.
- `src/components/Hero.jsx`: 2-column hero with developer intro bio and `Terminal.jsx` CLI widget.
- `src/components/Terminal.jsx`: Interactive zsh CLI terminal supporting commands `help`, `cat bio.json`, `skills`, `projects`, `contact`, `clear`, and Easter eggs (`sudo`, `ping`, `matrix`).
- `src/components/AboutSkills.jsx`: Categorized backend skill matrix with interactive skill filtering.
- `src/components/Projects.jsx`: Project showcase grid with metrics, category pills, and modal trigger.
- `src/components/ScalarHub.jsx`: On-page Scalar OpenAPI 3.0 documentation hub powered by `@scalar/api-reference-react`.
- `src/components/ProjectModal.jsx` & `ScalarReference.jsx`: 4-tab interactive project detail popup featuring live multi-language client code generators (cURL, JS, Go, Python).
- `src/components/Experience.jsx`: Tabbed experience & education timeline.
- `src/components/Contact.jsx`: Dual contact form with Web3Forms dispatch + 1-click email copy & `curl` snippet.

---

## 4. Development & Build Commands

- `npm run dev` — Start Vite local development server on port 3000.
- `npm run build` — Build production bundle to `dist/`.
- `npm run preview` — Local preview of production build.

---

## 5. Agent Workflow Pointers

- **Refactoring & Code Quality**: Consult `/improve-codebase-architecture` before altering component interfaces.
- **Bug Diagnosis**: Drive `/diagnosing-bugs` using a tight feedback loop before modifying existing logic.
- **Brand Consistency**: Check `docs/brand-guidelines.md` before adding new UI components or visual assets.
