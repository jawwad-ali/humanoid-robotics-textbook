# Implementation Plan: Text Selection Ask AI

**Branch**: `001-text-selection-ai` | **Date**: 2025-12-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-text-selection-ai/spec.md`

## Summary

Implement a text selection feature that displays an "ASK AI" button when users highlight textbook content, allowing them to ask contextual questions about the selected text. The AI responses will be generated using the existing OpenAI Agents SDK integration. This is an MVP for a hackathon, focusing on core functionality with desktop browser support.

**Technical Approach**: Add browser Selection API-based text selection detection to the Docusaurus textbook, display a positioned "ASK AI" button on selection, create a modal/popover UI for question input, extend the existing FastAPI backend with a new `/api/ask-selection` endpoint that accepts both selected text context and user question, and leverage the existing OpenAI Agents SDK setup for response generation.

## Technical Context

**Language/Version**:
- Frontend: TypeScript ~5.6.2 with React 18.2.0
- Backend: Python 3.x with FastAPI

**Primary Dependencies**:
- Frontend: Next.js 13.4.4, Docusaurus 3.9.2, React 18.2.0, Lucide React (icons)
- Backend: FastAPI, OpenAI Agents SDK (openai-agents>=0.2.0), Google Generative AI

**Storage**:
- Existing Qdrant vector database for context retrieval
- No additional storage required for MVP

**Testing**:
- NEEDS CLARIFICATION - Existing testing framework not identified in codebase review

**Target Platform**:
- Desktop browsers (Chrome, Firefox) - primary for MVP
- Deployed on Vercel (Next.js) + Vercel Serverless Functions (Python/FastAPI)

**Project Type**: Web application (Next.js frontend + FastAPI backend + Docusaurus textbook)

**Performance Goals**:
- Button appears within 200ms of text selection
- AI response within 10 seconds under normal conditions
- UI remains responsive during processing

**Constraints**:
- Desktop-first (mobile optimization out of scope for MVP)
- Hackathon timeline (minimal features, rapid delivery)
- Must integrate with existing OpenAI Agents SDK setup
- Selection length: 5-5000 characters

**Scale/Scope**:
- Single feature add-on to existing textbook
- Expected concurrent users: small (hackathon demo scale)
- No persistent storage of Q&A history for MVP

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: No project constitution file exists (template only). Assuming standard web development best practices apply for hackathon MVP:

✅ **Component Modularity**: Text selection logic will be encapsulated in reusable hooks/components
✅ **API Integration**: New endpoint follows existing pattern (`/api/chat` → `/api/ask-selection`)
✅ **Error Handling**: Graceful degradation with user-friendly messages
✅ **Security**: Input validation, HTTPS, rate limiting (inherited from existing API)
✅ **Testing**: Integration tests recommended (to be clarified in Phase 0)

**No Constitution Violations**: Standard MVP development approach with existing architecture patterns.

## Project Structure

### Documentation (this feature)

```text
specs/001-text-selection-ai/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (API contracts)
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
# Frontend (Next.js + Docusaurus)
textbook/
├── src/
│   ├── components/
│   │   ├── ChatBot.tsx              # Existing chatbot component
│   │   ├── TextSelectionButton.tsx  # NEW: "ASK AI" button component
│   │   ├── AskAIModal.tsx           # NEW: Question input modal
│   │   └── HomepageFeatures/
│   ├── theme/
│   │   └── DocItem/                 # NEW: Swizzled Docusaurus component
│   ├── hooks/
│   │   └── useTextSelection.ts      # NEW: Text selection detection hook
│   └── services/
│       └── askSelectionApi.ts       # NEW: API client for ask-selection endpoint
└── package.json

# Main App (Next.js - for integration if needed)
app/
├── components/
│   └── chatbot.tsx                  # Existing chatbot
lib/
└── chatApi.ts                       # Existing API client

# Backend (FastAPI)
api/
├── index.py                         # Main FastAPI app - ADD new endpoint
└── ...

utils/
├── models.py                        # ADD: AskSelectionRequest/Response models
├── helpers.py                       # Reuse existing helpers
└── config.py

```

**Structure Decision**: Web application with separate Next.js frontend and FastAPI backend. Primary implementation will be in the Docusaurus textbook (`textbook/` directory) since that's where the selectable content lives. The feature will:
1. Add React components and hooks to `textbook/src/`
2. Extend the existing `api/index.py` with a new endpoint
3. Reuse existing OpenAI Agents SDK setup from chatbot implementation

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No constitution violations identified. MVP approach follows existing patterns.

---

## Phase 0: Research & Technical Decisions

### Research Tasks

1. **Text Selection Detection in React/Docusaurus**
   - **Decision Needed**: Best approach for detecting text selection in Docusaurus MDX content
   - **Research**: Browser Selection API, React hooks patterns, Docusaurus theme customization
   - **Output**: Recommended implementation pattern

2. **Positioning Strategy for "ASK AI" Button**
   - **Decision Needed**: How to position button near selected text (absolute positioning, Range API, floating UI)
   - **Research**: Selection bounding rect, scroll behavior, viewport considerations
   - **Output**: Positioning algorithm

3. **Modal/Popover UI Library**
   - **Decision Needed**: Build custom or use existing library (Radix UI already in main app, Docusaurus modal patterns)
   - **Research**: Docusaurus theme components, Radix UI integration with Docusaurus, custom React modal
   - **Output**: UI component choice

4. **Backend Endpoint Design**
   - **Decision Needed**: Extend existing `/chat` endpoint or create new `/ask-selection` endpoint
   - **Research**: Existing OpenAI Agents SDK integration patterns, prompt engineering for contextual questions
   - **Output**: API contract design

5. **Testing Strategy**
   - **Decision Needed**: Testing frameworks and approach for React components + API
   - **Research**: Jest + React Testing Library, Playwright/Cypress for E2E, Python pytest patterns
   - **Output**: Testing plan

### Research Output Location

All research findings will be documented in `research.md` with format:
- **Decision**: [Chosen approach]
- **Rationale**: [Why chosen]
- **Alternatives Considered**: [What else was evaluated]
- **Implementation Notes**: [Key considerations]

---

## Phase 1: Design & Contracts

### Data Models

See `data-model.md` for detailed entity definitions including:
- **TextSelection**: Captured selection data (text, position, metadata)
- **AskSelectionRequest**: API request model (selected_text, question, metadata)
- **AskSelectionResponse**: API response model (answer, contexts, generation_metadata)

### API Contracts

See `contracts/` directory for OpenAPI specifications:
- `ask-selection-api.yaml`: New `/api/ask-selection` endpoint contract
- Request/response schemas
- Error responses
- Rate limiting specifications

### Component Architecture

See `quickstart.md` for:
- Component hierarchy and data flow
- State management approach
- Event handling patterns
- Integration points with Docusaurus

### Frontend Components (to be designed in Phase 1)

1. **useTextSelection Hook**
   - Detects text selection events
   - Calculates button position
   - Manages selection state

2. **TextSelectionButton Component**
   - Displays "ASK AI" button near selection
   - Handles click to open modal
   - Manages visibility state

3. **AskAIModal Component**
   - Shows selected text context
   - Input field for question
   - Submit and loading states
   - Displays AI response
   - Error handling UI

### Backend Components (to be designed in Phase 1)

1. **`/api/ask-selection` Endpoint**
   - Accepts POST with selected_text + question
   - Validates input (length, content)
   - Constructs contextual prompt for AI
   - Calls existing OpenAI Agents SDK
   - Returns formatted response

2. **Request/Response Models**
   - AskSelectionRequest (selected_text, question, chapter_slug)
   - AskSelectionResponse (answer, contexts, metadata)

---

## Phase 2: Task Breakdown

*Created by `/speckit.tasks` command - not part of this plan output*

Task generation will break down:
- Frontend component implementation
- Backend endpoint implementation
- Integration and testing
- Documentation updates

---

## Implementation Notes

### Integration Points

1. **Existing Chat API Reuse**
   - Leverage existing `embed_text`, `search_qdrant`, `build_rag_prompt` from `utils/helpers.py`
   - Use existing OpenAI Agents SDK setup (Agent, Runner, RunConfig)
   - Follow existing error handling patterns from `/api/chat` endpoint

2. **Docusaurus Integration**
   - Use Docusaurus swizzling to customize DocItem theme component
   - Inject text selection detection into content area
   - Maintain Docusaurus styling and UX consistency

3. **Shared Components**
   - Consider reusing styling from existing ChatBot.tsx
   - Consistent loading states and error messages
   - Same backend API patterns

### Key Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Selection API browser compatibility | Feature breaks in older browsers | Check browser support, graceful degradation |
| Button positioning on scroll | Poor UX if button doesn't follow selection | Use viewport-aware positioning, re-calculate on scroll |
| Docusaurus theme customization complexity | Difficult integration | Research Docusaurus swizzling best practices first |
| AI response latency | Slow UX | Show loading state, consider timeout handling |
| Modal conflicts with Docusaurus navigation | Navigation breaks modal state | Test carefully, use proper React portal |

### Success Metrics (from Spec)

- SC-001: Button appears within 1 second of selection
- SC-002: Answer received within 10 seconds
- SC-003: 90% success rate for button trigger
- SC-004: Complete flow under 30 seconds
- SC-005: Works on 95% of textbook content
- SC-006: Errors appear within 3 seconds

### Out of Scope Reminders

- No Q&A history/persistence
- No mobile optimization
- No sharing features
- Desktop browsers only (Chrome/Firefox)
- Basic error handling (no retry logic needed for MVP)
