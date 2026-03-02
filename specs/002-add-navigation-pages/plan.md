# Implementation Plan: Navigation bar and pages

**Branch**: `002-add-navigation-pages` | **Date**: 2026-03-01 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/002-add-navigation-pages/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

This feature introduces a persistent, accessible navigation bar and three
initial content pages (`/about`, `/writing`, `/projects`). See
`research.md` for analysis that led to the chosen approach.

The nav bar will be implemented as a shared layout component in
`pages/_app.js`, generating its links from a simple data array so that new
sections can be added in the future without editing markup. The placeholder
pages will include semantic headings and short descriptive text. Tailwind CSS
utilities will provide responsive styling and focus indicators.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: JavaScript/TypeScript (ES2023), running under Node 18+ via Next.js 13
**Primary Dependencies**: Next.js, React 18, Tailwind CSS, `react-icons` (existing dependency)
**Storage**: N/A – static pages only
**Testing**: Jest with React Testing Library for component and page tests; existing configuration already handles API route tests.
**Target Platform**: Web (desktop and mobile browsers) hosted on Vercel
**Project Type**: Web application built with Next.js (Pages Router)
**Performance Goals**: Maintain Lighthouse performance ≥ 90; keep nav component bundle impact minimal (<< 50 KB).
**Constraints**: Must integrate with existing styling and layout; adhere to constitution's accessibility and responsiveness requirements.
**Scale/Scope**: Small portfolio site; this feature adds 4 pages and one shared component.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Branch name `002-add-navigation-pages` follows `###-` pattern ✅
- Specification exists and contains no `[NEEDS CLARIFICATION]` markers ✅
- Requirements and success criteria are measurable and tech-agnostic ✅
- Research has resolved all technical questions ✅

No constitution violations detected; feature is cleared for Phase 0 research.

*Post-Design Re-check:* Documentation (data-model, quickstart, contracts)
completed as required; no new constitution concerns surfaced. Plan may now be
used to drive implementation.

## Project Structure

### Documentation (this feature)
```text
specs/002-add-navigation-pages/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
```text
pages/            # Next.js page files (home, about, writing, projects, api)
components/       # React components (will include NavBar.js)
styles/           # global CSS and Tailwind config
.specify/         # specification tooling (not part of production)
public/           # static assets

# No new directories required for this feature - uses existing pages/components
```

**Structure Decision**: A single Next.js web application (Option 1 above).
All new code will live under `pages/` or `components/` based on the
existing project layout.
```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
