# ADR 0002: Scalar OpenAPI 3.0 Documentation Hub Integration

- **Status**: Accepted
- **Date**: 2026-08-10

## Context
As a Backend Software Engineer & Systems Architect, showcasing interactive, industry-standard API documentation is crucial for technical recruiters, engineering managers, and clients. Traditional Swagger UI lacks modern aesthetic alignment and multi-language code generation features.

## Decision
1. **Adopt Scalar API Reference (`@scalar/api-reference-react`)**: Integrated Scalar across the portfolio for rendering full OpenAPI 3.0 / Swagger specifications.
2. **On-Page Scalar API Hub**: Created `ScalarHub.jsx` as a dedicated section allowing users to interactively test and inspect OpenAPI specs for all backend system projects.
3. **Multi-Language Client Generator**: Configured `ScalarReference.jsx` inside Tab 4 of the Project Modal, supporting instant code snippet generation for cURL, JavaScript, Go, and Python.
4. **Vercel Deployment**: Standardized deployment pipeline via Vercel for zero-config CD/CI connected to the `Fabverse0` GitHub repository.

## Consequences
- Elevates the backend developer persona with state-of-the-art API documentation standards.
- Delivers a 60 FPS responsive user experience without heavy external redirects.
