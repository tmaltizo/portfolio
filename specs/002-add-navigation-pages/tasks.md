---
description: "Task list for navigation bar and new pages feature"
---

# Tasks: Navigation bar and pages

**Input**: Design documents from `/specs/002-add-navigation-pages/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Ensure you are on branch `002-add-navigation-pages` and up to date with origin (no file path)
- [x] T002 [P] Install project dependencies (`npm install` in workspace root)
- [x] T003 [P] Create `components/navLinks.js` exporting the initial link array

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T004 Create `components/NavBar.js` component that imports `navLinks.js` and renders links in a `<nav>` element
- [x] T005 Modify `pages/_app.js` to wrap `<Component {...pageProps} />` with the new `NavBar` (shared layout)
- [x] T006 [P] Add Tailwind classes and focus styles to `NavBar.js` for basic horizontal layout and accessibility
- [x] T007 Add unit test file `components/__tests__/NavBar.test.js` with a placeholder render test (install jest if needed)

---

## Phase 3: User Story 1 - Site navigation bar (Priority: P1) 🎯 MVP

**Goal**: Provide a persistent, accessible navigation bar across all pages

**Independent Test**: On dev server confirm links appear and navigation works

### Implementation for User Story 1

- [x] T008 [P] Update `components/NavBar.js` to mark the active link using `useRouter()`
- [x] T009 [US1] Add focus and hover states via Tailwind in `NavBar.js` for accessibility
- [x] T010 [US1] Write integration test `components/__tests__/NavBar.integration.test.js` verifying link rendering and active state

**Checkpoint**: Navigation bar should be fully functional and testable independently

---

## Phase 4: User Story 2 - Create initial content pages (Priority: P2)

**Goal**: Add `/about`, `/writing`, `/projects` pages with placeholder content

**Independent Test**: Visiting each route shows correct heading and default text

- [x] T011 [P] Create `pages/about.js` with `<h1>About</h1>` and descriptive paragraph
- [x] T012 [P] Create `pages/writing.js` with `<h1>Writing</h1>` and explanatory paragraph
- [x] T013 [P] Create `pages/projects.js` with `<h1>Projects</h1>` and placeholder area
- [x] T014 [US2] Add simple tests in `pages/__tests__/about.test.js`, `writing.test.js`, `projects.test.js` to assert heading presence
- [x] T015 [US2] Manually verify nav links navigate to new pages and active state updates

**Checkpoint**: Routes `/about`, `/writing`, `/projects` live and styled

---

## Phase 5: User Story 3 - Ease of future extension (Priority: P3)

**Goal**: Ensure adding new links/pages requires only data changes

**Independent Test**: Adding a new entry to `navLinks.js` and a page file makes the link appear automatically

- [x] T016 [US3] Refactor `navLinks.js` data to export default array and ensure `NavBar.js` iterates over it
- [x] T017 [US3] Document extension procedure in `quickstart.md` (add entry + create page)
- [x] T018 [US3] Add test `components/__tests__/NavBar.data.test.js` confirming that modifying the exported array affects rendering (mock import)

**Checkpoint**: Developer can add pages by editing data only

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T019 [P] Update README or site README with navigation usage instructions
- [ ] T020 [P] Run Lighthouse audit on home page and fix any performance or accessibility warnings related to nav
- [ ] T021 [P] Cleanup unused imports and format code with Prettier/eslint
- [ ] T022 [P] Ensure new components have JSDoc comments if using TypeScript
- [ ] T023 [P] Merge and rebase onto latest `main` to prepare for pull request

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Components before pages
- Features before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# not needed, example only
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
