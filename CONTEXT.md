# Context: Backend Developer Portfolio Web App (Fab.Dev)

## 1. Overview
A high-performance, single-page application (SPA) portfolio website built for **Muhammad Fabian Rizky** (`Fab.Dev`), a **Backend Software Engineer & Systems Architect** targeting Tech Recruiters/HR, Freelance Clients, and Internship opportunities.

## 2. Core Decisions (Settled)
- **Developer Profile**: Muhammad Fabian Rizky (`Fab.Dev`).
- **Target Persona**: Backend Software Engineer (Node.js & TypeScript, Real-time WebSockets, Microservices, PostgreSQL, Redis, Scalar OpenAPI 3.0).
- **Target Audience**: HR/Tech Recruiters, Freelance Clients, Internship Coordinators.
- **Tech Stack**: Vite + React + **Scalar API Reference (`@scalar/api-reference-react`)** + CSS Variables (Vanilla Design System) + Lucide-React Icons + Framer Motion.
- **Deployment Strategy**: **Vercel** connected to GitHub repository `Fabverse0` (Automated CI/CD, SSL, Global Edge CDN).
- **API Documentation**: **Scalar Interactive API Reference** embedded in project detail modals & live OpenAPI viewer playgrounds.
- **Design Theme (ui-ux-pro-max)**: **Bright Light Monochromatic Theme with Sleek Black Accents** (*Not full dark mode*).
  - Primary Background: Bright Snow `#FAFAFA` & Pure White `#FFFFFF`.
  - Contrast Accents: Jet Black / Dark Charcoal (`#09090B` / `#18181B`) for terminal widget, primary buttons, badges, and dark contrast cards.
  - Accent Highlight: Emerald Green `#10B981` (Live API Status, success indicators) & Electric Indigo/Blue `#2563EB` (links/CTAs).
- **Typography**: `JetBrains Mono` / `Space Grotesk` (Code, Headings, Terminal) + `Inter` (Body Text).
- **Layout**: Single Page Application (SPA) with floating glassmorphism navbar, smooth scrolling, and 6 core sections:
  1. **Hero Section**: Two-column layout (Left: Role, Bio, CTAs | Right: Interactive CLI Terminal Widget with `help`, `cat`, `skills`, `projects`, `contact`, `sudo`, `ping`, `matrix` commands).
  2. **About Me & Backend Skill Matrix**: Interactive skill tags (clicking a skill filters matching projects).
  3. **Projects Showcase**: Filterable project cards with tech tags, metrics, and Scalar API Reference triggers.
  4. **Scalar API Hub Section**: Live interactive Scalar OpenAPI 3.0 spec viewer.
  5. **Work Experience & Education Timeline**: Interactive tabbed timeline.
  6. **Interactive Contact Form & Social Links**: Real email dispatch form + Quick 1-click copy email (`mfabian.rizky@gmail.com`) & `curl` contact command.
- **Data Management**: Config-driven architecture via `portfolioData.js` including OpenAPI specifications for Scalar.

## 3. Architecture Decision Records (ADRs)
- [ADR 0001: Backend Developer Portfolio Tech Stack & Design System](file:///c:/Program%20Coding/ALL%20PROJECT/Mini%20Project/Web-Porto/docs/adr/0001-portfolio-tech-stack-and-design.md)
- [ADR 0002: Scalar OpenAPI 3.0 Documentation Hub Integration & Vercel Deployment](file:///c:/Program%20Coding/ALL%20PROJECT/Mini%20Project/Web-Porto/docs/adr/0002-scalar-openapi-documentation-hub.md)
