# Implementation Tasks: Text Selection Ask AI

**Branch**: `001-text-selection-ai`
**Created**: 2025-12-02
**Status**: Ready for Implementation
**Testing**: No automated tests (hackathon MVP - manual testing only)

## Overview

This task breakdown implements the Text Selection Ask AI feature in priority order, organized by user stories. Each user story phase is independently testable and deliverable.

**MVP Scope**: User Story 1 (P1) - Text Selection and Ask AI Trigger

## Task Execution Order

### Dependency Graph

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational: Backend) ──┐
    ↓                              ↓
Phase 3 (US1: Selection & Button) → Phase 4 (US2: Question & Answer)
                                      ↓
                                  Phase 5 (US3: Error Handling)
                                      ↓
                                  Phase 6 (Polish)
```

### Independent Deliverables

- **After US1 (P1)**: Users can select text and see "ASK AI" button (MVP ready for demo)
- **After US2 (P2)**: Full Q&A functionality with AI responses
- **After US3 (P3)**: Production-ready error handling

---

## Phase 1: Project Setup

**Goal**: Initialize project structure and verify dependencies

- [ ] T001 Create directory structure for new components in textbook/src/
- [ ] T002 Verify TypeScript configuration in textbook/tsconfig.json supports new imports
- [ ] T003 Verify React and Lucide icons are available in textbook/package.json
- [ ] T004 Create hooks directory: textbook/src/hooks/
- [ ] T005 Create services directory: textbook/src/services/

---

## Phase 2: Foundational - Backend API

**Goal**: Implement backend endpoint before frontend (blocking prerequisite)

**Why Foundational**: Frontend needs API endpoint to function. Complete this phase before starting any user story.

### Backend Models

- [ ] T006 Add AskSelectionRequest model to utils/models.py (selected_text, question, chapter_slug fields with validation)
- [ ] T007 Add AskSelectionResponse model to utils/models.py (answer, selected_text, contexts, metadata fields)

### Backend Logic

- [ ] T008 Add build_selection_prompt() function to utils/helpers.py (takes selected_text, question; returns formatted prompt)
- [ ] T009 Implement POST /api/ask-selection endpoint in api/index.py (input validation, call OpenAI Agents SDK, return response)
- [ ] T010 Add POST /ask-selection route (duplicate for local dev) in api/index.py

---

## Phase 3: User Story 1 (P1) - Text Selection and Ask AI Trigger

**Story Goal**: Users can select text and see "ASK AI" button appear near selection

**Independent Test Criteria**:
✓ Select any text in textbook → "ASK AI" button appears within 1 second
✓ Click elsewhere → button disappears
✓ Change selection → button moves to new position
✓ No selection → no button visible

**Acceptance**: FR-001, FR-002, FR-011 complete

### Frontend - Selection Detection

- [ ] T011 [US1] Create useTextSelection hook in textbook/src/hooks/useTextSelection.ts (detect selection, get selected text, calculate position, cleanup)
- [ ] T012 [P] [US1] Add TypeScript interfaces for selection state in textbook/src/hooks/useTextSelection.ts (SelectionState, SelectionPosition types)

### Frontend - Button Component

- [ ] T013 [US1] Create TextSelectionButton component in textbook/src/components/TextSelectionButton.tsx (display button at position, handle click, manage visibility)
- [ ] T014 [P] [US1] Add button styling to TextSelectionButton.tsx (use existing ChatBot.tsx green theme, position absolute, z-index handling)
- [ ] T015 [P] [US1] Add Lucide icons import in TextSelectionButton.tsx (MessageCircle or Sparkles icon)

### Frontend - Integration

- [ ] T016 [US1] Create or swizzle Root component in textbook/src/theme/Root.tsx (wrap app with selection detection)
- [ ] T017 [US1] Integrate useTextSelection hook in Root.tsx (attach to document, pass state to TextSelectionButton)
- [ ] T018 [US1] Render TextSelectionButton in Root.tsx (conditionally show based on selection state)

**US1 Manual Test Checklist**:
- [ ] Open textbook page in browser
- [ ] Select any paragraph → verify button appears near selection
- [ ] Click elsewhere → verify button disappears
- [ ] Select different text → verify button moves
- [ ] Button appears within 1 second of selection (SC-001)

---

## Phase 4: User Story 2 (P2) - Ask Question About Selection

**Story Goal**: Users can ask questions about selected text and receive AI-generated answers

**Independent Test Criteria**:
✓ Click "ASK AI" button → modal opens showing selected text
✓ Type question and submit → AI generates answer considering selected text
✓ Answer displays with loading indicator during generation
✓ Complete flow takes under 30 seconds (SC-004)

**Acceptance**: FR-003, FR-004, FR-005, FR-006, FR-007, FR-008, FR-009 complete

**Dependencies**: Requires US1 complete (button must exist to click)

### Frontend - API Client

- [ ] T019 [P] [US2] Create askSelectionApi service in textbook/src/services/askSelectionApi.ts (API client for /api/ask-selection endpoint)
- [ ] T020 [P] [US2] Add TypeScript interfaces in askSelectionApi.ts (AskSelectionRequest, AskSelectionResponse types)
- [ ] T021 [P] [US2] Implement environment-aware URL detection in askSelectionApi.ts (localhost vs production)

### Frontend - Modal Component

- [ ] T022 [US2] Create AskAIModal component in textbook/src/components/AskAIModal.tsx (modal structure with backdrop, close button)
- [ ] T023 [US2] Add selected text display section to AskAIModal.tsx (show context to user)
- [ ] T024 [US2] Add question input field to AskAIModal.tsx (textarea, character counter, validation)
- [ ] T025 [US2] Add submit button and loading state to AskAIModal.tsx (disable during API call, show spinner)
- [ ] T026 [US2] Add answer display section to AskAIModal.tsx (formatted response, markdown support if needed)
- [ ] T027 [P] [US2] Add modal styling to AskAIModal.tsx (use ChatBot.tsx theme, responsive layout, backdrop blur)
- [ ] T028 [P] [US2] Implement keyboard shortcuts in AskAIModal.tsx (Escape to close, Enter to submit)

### Frontend - Integration

- [ ] T029 [US2] Add modal state management to TextSelectionButton.tsx (open/close modal, pass selected text)
- [ ] T030 [US2] Wire up API call in AskAIModal.tsx (call askSelectionApi on submit, handle response)
- [ ] T031 [US2] Connect modal to Root.tsx (render AskAIModal, manage global state)

**US2 Manual Test Checklist**:
- [ ] Select text → click "ASK AI" → verify modal opens
- [ ] Verify selected text is shown in modal
- [ ] Type question → verify character counter updates
- [ ] Submit question → verify loading indicator shows
- [ ] Verify AI response appears in modal
- [ ] Verify answer is relevant to selected text
- [ ] Response received within 10 seconds (SC-002)
- [ ] Complete flow under 30 seconds (SC-004)

---

## Phase 5: User Story 3 (P3) - Error Handling and Edge Cases

**Story Goal**: System handles errors gracefully with user-friendly messages

**Independent Test Criteria**:
✓ Simulate API failure → error message appears with retry option
✓ Select too-short text (<5 chars) → validation prevents submission
✓ Submit empty question → validation prevents submission
✓ Error messages appear within 3 seconds (SC-006)

**Acceptance**: FR-010, FR-012 complete

**Dependencies**: Requires US2 complete (need full flow to test errors)

### Frontend - Validation

- [ ] T032 [US3] Add selection length validation to useTextSelection.ts (min 5, max 5000 characters)
- [ ] T033 [US3] Add question length validation to AskAIModal.tsx (min 1, max 500 characters)
- [ ] T034 [US3] Display validation errors in AskAIModal.tsx (inline error messages, disable submit)

### Frontend - Error Handling

- [ ] T035 [US3] Add error state to AskAIModal.tsx (capture API errors, display error message)
- [ ] T036 [US3] Add retry functionality to AskAIModal.tsx (retry button, clear error on retry)
- [ ] T037 [P] [US3] Add error styling to AskAIModal.tsx (error message box, red accent colors)

### Frontend - Edge Cases

- [ ] T038 [P] [US3] Handle selection deselection in useTextSelection.ts (close modal if selection lost)
- [ ] T039 [P] [US3] Handle concurrent questions in AskAIModal.tsx (disable new submissions while processing)

**US3 Manual Test Checklist**:
- [ ] Stop backend API → try submitting question → verify error message
- [ ] Verify error message has retry button
- [ ] Select 3 characters → verify validation message
- [ ] Submit empty question → verify validation message
- [ ] Deselect text with modal open → verify graceful handling
- [ ] Start question → submit another → verify only one processes

---

## Phase 6: Polish & Cross-Cutting Concerns

**Goal**: Final improvements and deployment readiness

### Documentation

- [ ] T040 Update README.md with text selection feature description
- [ ] T041 [P] Add inline code comments to complex logic in useTextSelection.ts

### Optimization

- [ ] T042 [P] Add debouncing to selection detection in useTextSelection.ts (avoid too many position calculations)
- [ ] T043 [P] Optimize modal animations in AskAIModal.tsx (smooth open/close transitions)

### Deployment Verification

- [ ] T044 Deploy to Vercel and verify /api/ask-selection endpoint works
- [ ] T045 Test full feature on production deployment (select, ask, receive answer)
- [ ] T046 Verify performance metrics on production (button appearance < 1s, response < 10s)

---

## Parallel Execution Opportunities

### Within User Story 1:
- T012 (TypeScript types) can run parallel with T011 (hook implementation)
- T014 (styling) and T015 (icons) can run parallel with T013 (component structure)

### Within User Story 2:
- T019-T021 (API client) can run fully parallel with T022-T028 (Modal component)
- T027 (modal styling) and T028 (keyboard shortcuts) can run parallel with T022-T026

### Within User Story 3:
- T037 (error styling) can run parallel with T035-T036 (error logic)
- T038-T039 (edge cases) can run parallel with T032-T034 (validation)

### Phase 6:
- T041 (comments) and T042-T043 (optimizations) can all run in parallel

---

## Implementation Strategy

### MVP First (Recommended for Hackathon)

**Day 1**: Complete Phase 1 + Phase 2 + Phase 3 (US1)
- **Deliverable**: Text selection with "ASK AI" button appearing
- **Demo-able**: Can show selection detection and button positioning
- **Effort**: ~4-6 hours

**Day 2**: Complete Phase 4 (US2)
- **Deliverable**: Full Q&A functionality with AI responses
- **Demo-able**: Complete user flow with real AI answers
- **Effort**: ~4-6 hours

**Day 3 (Optional)**: Complete Phase 5 (US3) + Phase 6
- **Deliverable**: Production-ready with error handling
- **Demo-able**: Robust feature ready for users
- **Effort**: ~2-4 hours

### Incremental Delivery

Each phase completion represents a working feature increment:
1. After Phase 3: MVP ready for demo (selection + button)
2. After Phase 4: Full feature working (selection + button + Q&A)
3. After Phase 5: Production-ready (full feature + error handling)
4. After Phase 6: Polished and optimized

---

## Task Summary

**Total Tasks**: 46

**Task Count by Phase**:
- Phase 1 (Setup): 5 tasks
- Phase 2 (Foundational): 5 tasks
- Phase 3 (US1): 8 tasks
- Phase 4 (US2): 13 tasks
- Phase 5 (US3): 8 tasks
- Phase 6 (Polish): 7 tasks

**Parallel Opportunities**: 15 tasks marked [P] can run in parallel

**Critical Path**: Setup → Backend → US1 Frontend → US2 Integration → US3 Error Handling

**Estimated Timeline**:
- MVP (US1): 1 day
- Full Feature (US1+US2): 2 days
- Production-ready (US1+US2+US3+Polish): 3 days

---

## Format Validation

✅ All tasks follow checklist format: `- [ ] TXXX [P?] [Story?] Description with file path`
✅ Task IDs sequential (T001-T046)
✅ Story labels present for all user story phase tasks ([US1], [US2], [US3])
✅ Parallel markers [P] on independent tasks
✅ File paths specified for all implementation tasks
✅ Dependencies documented in phase descriptions
