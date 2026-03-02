<!--
  Sync Impact Report
  ==================
  Version change: N/A → 1.0.0 (initial adoption)
  Modified principles: none (first version)
  Added sections:
    - Core Principles (4 principles: Code Quality, Testing Standards,
      UX Consistency, Performance Requirements)
    - Technology Stack & Constraints
    - Development Workflow & Quality Gates
    - Governance
  Removed sections: none
  Templates requiring updates:
    - .specify/templates/plan-template.md        ✅ compatible (uses generic gates)
    - .specify/templates/spec-template.md         ✅ compatible (no principle refs)
    - .specify/templates/tasks-template.md        ✅ compatible (no principle refs)
    - .specify/templates/commands/ (dir absent)   ✅ N/A
    - README.md                                   ✅ no constitution refs to update
  Follow-up TODOs: none
-->

# Portfolio Constitution

## Core Principles

### I. Code Quality

- Every component, page, and API route MUST follow a consistent
  structure: imports → constants → component/function → export.
- ESLint (`eslint-config-next`) MUST pass with zero warnings before
  any code is merged. Disabling rules inline is permitted only with a
  comment explaining why.
- Tailwind utility classes MUST be the primary styling mechanism.
  Custom CSS in `styles/globals.css` is allowed only for resets or
  animations that cannot be expressed with utilities.
- Dead code, unused imports, and commented-out blocks MUST be removed
  before merge.
- Environment-dependent values (API keys, email addresses, feature
  flags) MUST be read from environment variables or `.env.local`;
  hard-coded secrets are forbidden.

**Rationale**: A solo-developer portfolio still benefits from strict
hygiene — it prevents "quick hacks" from accumulating into a codebase
that is painful to revisit after weeks away.

### II. Testing Standards

- Every API route under `pages/api/` MUST have at least one happy-path
  and one error-path test exercised before deployment.
- Tests MUST be runnable with a single command (`npm test` or
  equivalent) and MUST exit with a non-zero code on failure.
- External services (SendGrid, analytics) MUST be mocked or stubbed in
  tests; no test may depend on a live third-party API.
- When a bug is fixed, a regression test covering the exact failure
  SHOULD be added alongside the fix.

**Rationale**: The SendGrid integration has already caused a
hard-to-diagnose delivery issue. Automated tests for API routes catch
regressions early and give confidence when updating dependencies.

### III. User Experience Consistency

- All interactive elements MUST be keyboard-accessible and have visible
  focus indicators.
- The site MUST remain usable at viewport widths from 320 px to
  2560 px. Tailwind responsive breakpoints (`sm`, `md`, `lg`, `xl`)
  MUST be used; arbitrary media queries are not allowed.
- Cumulative Layout Shift (CLS) MUST stay below 0.1 on every page.
  Images MUST specify explicit `width` and `height` or use Next.js
  `<Image>` with a defined aspect ratio.
- Color contrast MUST meet WCAG 2.1 AA (4.5:1 for body text, 3:1 for
  large text). Any palette change MUST be verified against this ratio.
- Navigation, footer, and contact-form patterns MUST be visually and
  structurally identical across all pages.

**Rationale**: A portfolio is judged on its presentation. Consistent,
accessible, responsive design directly reflects the developer's skill.

### IV. Performance Requirements

- Lighthouse Performance score MUST be ≥ 90 on both mobile and desktop
  for every publicly reachable page.
- JavaScript bundle size MUST NOT exceed 200 KB gzipped for the initial
  page load. Any dependency that pushes the total above this limit MUST
  be justified and approved.
- Images MUST be served in modern formats (WebP/AVIF) via the Next.js
  image pipeline. Raw JPEG/PNG files in `public/` are acceptable only
  as source assets; they MUST NOT be referenced directly by components.
- Third-party scripts (analytics, embeds) MUST be loaded with
  `next/script` strategy `afterInteractive` or `lazyOnload`.
  Synchronous third-party `<script>` tags are forbidden.
- API routes MUST respond within 3 000 ms under normal conditions.
  Timeout handling MUST be implemented for any outbound network call.

**Rationale**: Visitors and potential employers expect a fast-loading
site. Performance is also an SEO factor for Vercel-hosted Next.js
deployments.

## Technology Stack & Constraints

- **Framework**: Next.js 13 (Pages Router). Migration to the App Router
  MUST NOT be undertaken without a dedicated spec and plan.
- **UI**: React 18 with Tailwind CSS 3. Adding a component library
  (e.g., shadcn/ui, Radix) MUST be justified in a spec.
- **Deployment**: Vercel. All environment variables MUST be configured
  in the Vercel dashboard for production and preview environments.
- **Email**: SendGrid (`@sendgrid/mail`). The sender address MUST be a
  verified Sender Identity or domain-authenticated address.
- **Node version**: The version specified in `.nvmrc` or `engines` in
  `package.json` is authoritative. Contributors MUST use that version.
- **Dependencies**: New runtime dependencies MUST be reviewed for
  bundle-size impact (see Principle IV). Dev dependencies are
  unrestricted.

## Development Workflow & Quality Gates

1. **Branch per change**: Every non-trivial change MUST be developed on
   a feature branch named `###-short-description`.
   - Before creating or naming a branch, invoke the helper script
     `.specify/scripts/powershell/create-new-feature.ps1`; it inspects
     existing remote/local branches and `specs/` directories and will
     select the next available numeric prefix. Never hardcode a number
     manually in the branch or spec path; if a conflict arises, restart
     the feature creation process and allow the script to choose a new
     number.
2. **Spec before code**: Features touching more than one file SHOULD
   have a spec in `specs/` before implementation begins.
3. **Pre-merge checklist**:
   - `npm run lint` passes with zero warnings.
   - `npm run build` succeeds.
   - Manual smoke test on `localhost:3000` confirms no visual
     regression on affected pages.
   - If API routes changed: at least one successful request/response
     verified locally.
4. **Commit messages**: Follow Conventional Commits
   (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`).
5. **Deployment**: Merging to `main` triggers automatic Vercel
   deployment. Breaking changes MUST be flagged with `BREAKING CHANGE:`
   in the commit body.

## Governance

- This constitution supersedes ad-hoc practices. When a principle
  conflicts with expediency, the principle wins unless an amendment is
  ratified first.
- **Amendments**: Any change to this document MUST include:
  1. A description of the change and its rationale.
  2. An updated version number following SemVer (MAJOR for removals or
     incompatible redefinitions, MINOR for additions or material
     expansions, PATCH for clarifications and typo fixes).
  3. A propagation check against all templates in
     `.specify/templates/` to verify no references are invalidated.
- **Compliance review**: Before every deployment the pre-merge
  checklist (above) MUST be completed. Violations discovered
  post-deploy SHOULD be tracked as `fix:` issues and resolved within
  one working session.
- **Guidance file**: Runtime development guidance lives in
  `.specify/memory/` and supporting specs in `specs/`. These documents
  are subordinate to this constitution.

**Version**: 1.0.0 | **Ratified**: 2026-03-01 | **Last Amended**: 2026-03-01
