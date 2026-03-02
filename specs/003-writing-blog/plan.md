# Implementation Plan: Writing Blog Section

**Branch**: `003-writing-blog` | **Date**: 2026-03-02 | **Spec**: [specs/003-writing-blog/spec.md](specs/003-writing-blog/spec.md)
**Input**: Feature specification from `/specs/003-writing-blog/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

The website will gain a new "Writing" section served at `/writing` that automatically discovers Markdown/MDX files from a `posts/` directory. Each file provides frontmatter (`title`, `date`, `description`, `tags`) and the body may include images or embedded video/animations. The page renders a responsive grid of cards grouped by publication year, with built‑in tag filtering. Individual posts are accessible via slug‑based dynamic routes. Adding a new post requires only dropping a file into `posts/`—no component changes.

## Technical Context

**Language/Version**: JavaScript/TypeScript on Node.js 18 (Next.js default)  
**Primary Dependencies**: Next.js 13 (Pages router), React 18, Tailwind CSS, `gray-matter` for frontmatter parsing, `next-mdx-remote` or `@next/mdx` for MDX rendering.  
**Storage**: Filesystem – Markdown/MDX files under `posts/` plus static assets in `public/`.  
**Testing**: Jest with React Testing Library for component tests; existing `npm test` setup.  
**Target Platform**: Web browsers (responsive design from 320px up).  
**Project Type**: Frontend web application (a single Next.js project).  
**Performance Goals**: Keep Lighthouse score ≥90; grid rendering should not degrade with 50+ posts; bundle size stays within existing constraints (<200KB gzipped initial).  
**Constraints**: New runtime dependencies must not push bundle size above limits; media embeds should be lightweight and use external URLs or `public/`.  
**Scale/Scope**: Anticipated modest growth (dozens of posts initially, maybe 100+ over time); system is single-user authoring.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Specification quality checklist completed with all items passed (see `specs/003-writing-blog/checklists/requirements.md`).
- No [NEEDS CLARIFICATION] markers remain in spec.
- Feature branch naming and spec location conform to workflow.
- No violations of core constitutional principles obvious at this stage; the planned changes are purely frontend.

Status: ✅ passed (both before Phase 0 and after Phase 1 design).

## Project Structure

### Documentation (this feature)

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

```text
pages/
├── writing.js                 # landing page grid of posts (existing)
├── writing/[slug].js          # dynamic route for individual posts (will add)
posts/                         # new directory to store markdown/mdx files
public/                        # static assets used by posts (images, etc.)
components/                    # may add new UI components (PostCard, TagFilter)
styles/                        # global styles remain; Tailwind handles most
```

**Structure Decision**: The site is a single Next.js project using the existing `pages/` directory for routing. The new feature introduces a `posts/` directory at the repo root, and new React components under `components/`. No backend or additional packages are introduced beyond the existing framework.

---

### Phase 0 status
Research completed; no outstanding unknowns remain. See `research.md` for rationale and alternatives.

### Phase 1 deliverables
- `data-model.md`: summarizes entities and relationships.
- `contracts/`: defines frontmatter schema and component props.
- `quickstart.md`: instructions for authors.

After these files exist (they are now created), the constitution check should be run again, then planning will transition to Phase 2 task breakdown.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
