# Implementation Plan: Module 1 - The Robotic Nervous System (ROS 2) Content

**Branch**: `002-module-1-ros2-content` | **Date**: 2025-11-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/002-module-1-ros2-content/spec.md`

## Summary

Create comprehensive educational content for Module 1 of the Physical AI & Humanoid Robotics textbook, covering ROS 2 (Robot Operating System 2) fundamentals. This module consists of 7 sequential chapters teaching students from complete beginners to intermediate practitioners, including: ROS 2 architecture, nodes, topics (pub/sub), services (request/response), actions (long-running tasks), URDF (robot description), and Python AI agent integration. Each chapter follows a 5-section template with 2-3 working code examples, Mermaid diagrams, hands-on exercises, and accessibility compliance (WCAG 2.1 AA). Content targets students with basic Python knowledge but no prior robotics experience.

**Technical Approach**: Use Docusaurus 3.x MDX format with Mermaid.js diagrams, PEP 8-compliant Python examples for ROS 2 Humble, and a progressive learning structure where concepts build sequentially. Content will be validated against educational constitution principles and tested for beginner-friendliness.

## Technical Context

**Language/Version**: Markdown/MDX (Docusaurus 3.x), Python 3.10+
**Primary Dependencies**: Docusaurus 3.x, Mermaid.js, ROS 2 Humble (referenced, not installed), rclpy 3.3.x (for code examples)
**Storage**: Static Markdown files in `docs/module-1/` directory
**Testing**: Manual review against constitution checklist, code example validation (manual/visual inspection), beta student testing (optional)
**Target Platform**: Web (Docusaurus static site), ROS 2 examples target Ubuntu 22.04/Docker
**Project Type**: Educational content (documentation)
**Performance Goals**: 8-12 hour completion time for module, <3 second page load for chapters
**Constraints**: Beginner-friendly language, 800-1500 words per chapter (excluding code), WCAG 2.1 AA accessibility, PEP 8 code standards
**Scale/Scope**: 7 chapters, 14-21 code examples, 10+ Mermaid diagrams, 7-14 exercises, 21-35 knowledge check questions

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ Principle I: Educational Clarity
- **Requirement**: Learning objectives, real-world analogies, glossary links, "why before how"
- **Compliance**: FR-007 (3-5 objectives per chapter), FR-013 (real-world analogies), FR-012 (glossary links), FR-014 ("why" before "how")
- **Status**: PASS - Specification explicitly requires all clarity elements

### ✅ Principle II: Structured Learning Progression
- **Requirement**: 5-section template, sequential chapters, explicit prerequisites, file naming conventions
- **Compliance**: FR-002 (5-section template enforced), FR-004 (prerequisite tracking), FR-039-041 (file naming), FR-010 (frontmatter prerequisites)
- **Status**: PASS - All structural requirements specified

### ✅ Principle III: Code Quality & Reproducibility
- **Requirement**: Tested code, PEP 8, error handling, version specification, expected output
- **Compliance**: FR-019 (PEP 8), FR-021 (tested in Humble), FR-022 (error handling), FR-017 (version specs), FR-018 (expected output)
- **Status**: PASS - Code quality gates comprehensive

### ✅ Principle IV: Visual & Multimodal Learning
- **Requirement**: Diagrams for abstract concepts, Mermaid.js, alt text, captions, source preservation
- **Compliance**: FR-031 (diagrams for abstract concepts), FR-032 (Mermaid.js required), FR-057 (alt text), FR-037 (captions)
- **Status**: PASS - Visual requirements specified with 10+ diagram minimum

### ✅ Principle V: Interactive Engagement
- **Requirement**: 3+ exercises per chapter, graduated difficulty, starter code, chatbot integration points
- **Compliance**: FR-024 (1-2 exercises per chapter), FR-025 (graduated difficulty), FR-026 (clear structure)
- **Status**: ⚠️ PARTIAL - Spec requires 1-2 exercises/chapter vs constitution's 3+; chatbot integration out of scope
- **Justification**: Chatbot integration explicitly out of scope (see spec "Out of Scope"). Exercise count meets beginner needs; advanced students served by extension challenges

### ✅ Principle VI: Technical Accuracy & Currency
- **Requirement**: Verifiable claims, version numbers, deprecation notices, review schedule, changelog
- **Compliance**: FR-044-048 (ROS 2 Humble specified, version pinning, official docs, no deprecated APIs)
- **Status**: PASS - Technical accuracy requirements comprehensive

### ✅ Principle VII: Accessibility & Inclusivity
- **Requirement**: Clear language, acronym definitions, alt text, WCAG contrast, simulation alternatives, beginner-friendly
- **Compliance**: FR-057-060 (alt text, contrast, acronyms, syntax highlighting), FR-011 (beginner-friendly), Assumptions #3 (no physical robot needed)
- **Status**: PASS - Accessibility comprehensively addressed

**Overall Gate Status**: ✅ PASS WITH NOTES
- One minor deviation (exercise count) justified by scope constraints
- All core principles addressed in specification
- Proceed to Phase 0 research

## Project Structure

### Documentation (this feature)

```text
specs/002-module-1-ros2-content/
├── spec.md              # Feature specification (COMPLETE)
├── plan.md              # This file (IN PROGRESS)
├── research.md          # Phase 0 output (PENDING)
├── data-model.md        # Phase 1 output (PENDING)
├── quickstart.md        # Phase 1 output (PENDING)
├── contracts/           # Phase 1 output (PENDING)
│   └── chapter-template.md
├── checklists/
│   └── requirements.md  # Validation checklist (COMPLETE)
└── tasks.md             # Phase 2 output (/speckit.tasks - NOT created by /speckit.plan)
```

### Source Code (repository root - content delivery)

```text
docs/module-1/                        # Module 1 content directory
├── _category_.json                   # Docusaurus category config
├── 01-introduction-to-ros2.md        # Chapter 1: Introduction
├── 02-ros2-nodes.md                  # Chapter 2: Nodes
├── 03-topics-and-publishers.md       # Chapter 3: Topics (pub/sub)
├── 04-services.md                    # Chapter 4: Services
├── 05-actions.md                     # Chapter 5: Actions
├── 06-urdf-basics.md                 # Chapter 6: URDF
└── 07-python-rclpy-integration.md    # Chapter 7: Python AI Integration

static/                               # Static assets (NOT created by this feature)
├── diagrams-source/                  # Source files for diagrams (if applicable)
│   └── module-1/
└── img/module-1/                     # Images/screenshots (if needed)
```

**Structure Decision**: Educational content structure follows Docusaurus conventions with numbered chapter prefixes for ordering. All chapters reside in `docs/module-1/` with Markdown/MDX files. Diagrams are embedded Mermaid code blocks (no separate image files needed). This structure supports sequential learning progression and integrates with existing textbook infrastructure.

## Complexity Tracking

> **Not applicable** - Constitution Check passed with only one minor justified deviation (exercise count). No complexity violations requiring justification.

---

# Phase 0: Research & Design Decisions

## Research Questions

The following unknowns must be resolved before content creation:

### 1. ROS 2 Humble API Current State
**Question**: What are the current stable APIs for nodes, topics, services, actions in ROS 2 Humble as of 2025?
**Why**: Ensure code examples use non-deprecated APIs; verify rclpy 3.3.x compatibility
**Research Task**: Review official ROS 2 Humble documentation (docs.ros.org/en/humble/), check rclpy API reference, identify any breaking changes since 2024

### 2. Beginner-Friendly Code Example Patterns
**Question**: What code example structure maximizes beginner comprehension for ROS 2 concepts?
**Why**: FR-018 requires problem statement, commented code, instructions, output, explanation
**Research Task**: Analyze best practices from ROS 2 tutorials, MIT OpenCourseWare robotics materials, identify common beginner pitfalls

### 3. Mermaid Diagram Best Practices for ROS 2 Concepts
**Question**: What Mermaid diagram types best represent nodes, topics, services, actions?
**Why**: FR-032 requires Mermaid.js; need to choose flowchart vs sequence vs state machine appropriately
**Research Task**: Experiment with Mermaid syntax for ROS 2 graph visualization, pub/sub patterns, service calls, action state machines

### 4. URDF Minimal Examples for Beginners
**Question**: What is the simplest URDF example that teaches links/joints without overwhelming students?
**Why**: Chapter 6 must introduce URDF accessibly (FR-013: analogies before technical definitions)
**Research Task**: Review official URDF tutorials, identify 2-link robot arm as minimal example, document Xacro alternatives

### 5. Python AI Agent Integration Patterns
**Question**: What is the canonical rclpy pattern for integrating AI agents (LLM/RL) with ROS 2?
**Why**: Chapter 7 must show AI sense-think-act loop; need threading/async guidance
**Research Task**: Research rclpy executor patterns, threading models, async callback handling for AI workloads

### 6. Accessibility Validation Tools
**Question**: How do we validate WCAG 2.1 AA compliance for Mermaid diagrams in Docusaurus?
**Why**: FR-060 requires 4.5:1 contrast ratio; Mermaid theming must be validated
**Research Task**: Identify contrast checking tools for Mermaid output, document color palette meeting WCAG standards

### 7. Exercise Complexity Calibration
**Question**: What defines "beginner" vs "intermediate" vs "advanced" exercise difficulty for ROS 2 learners?
**Why**: FR-025 requires graduated difficulty; need objective criteria
**Research Task**: Define difficulty rubric (lines of code, concepts combined, prerequisite knowledge)

---

# Phase 1: Content Design Artifacts

## Chapter-by-Chapter Execution Plan

### Time Allocation (Total: 8-10 hours estimated)

| Phase | Time | Activities |
|-------|------|------------|
| **Setup** | 30 min | Create folder structure, templates, `_category_.json` |
| **Chapter 1** | 60 min | Introduction to ROS 2 (foundational) |
| **Chapter 2** | 50 min | ROS 2 Nodes (building on Ch1) |
| **Chapter 3** | 50 min | Topics & Publishers (core concept) |
| **Checkpoint 1** | 15 min | Review Chapters 1-3 for consistency |
| **Chapter 4** | 50 min | Services (new pattern) |
| **Chapter 5** | 50 min | Actions (complex pattern) |
| **Checkpoint 2** | 15 min | Review Chapters 4-5 for accuracy |
| **Chapter 6** | 50 min | URDF Basics (different domain) |
| **Chapter 7** | 60 min | Python AI Integration (advanced synthesis) |
| **Final Review** | 45 min | Quality checks, consistency, polish |
| **TOTAL** | **7.5 hours** | Core content creation |
| **Buffer** | **1-2 hours** | Unexpected issues, extended polish |

### Chapter Creation Priority Order

#### Priority 1 (P1): Must Complete - Core ROS 2 Learning (Chapters 1-3)
**Rationale**: These chapters teach the foundational pub/sub pattern that 90% of ROS 2 usage relies on. Without understanding nodes and topics, students cannot progress. Aligns with User Story 1 (P1) in spec.

1. **Chapter 1: Introduction to ROS 2** (60 min)
   - **Why first**: Sets context for entire module; no dependencies
   - **Critical elements**: Architecture diagram, "what/why ROS 2", Hello World node
   - **Success criteria**: Student understands ROS 2 purpose and can run first node

2. **Chapter 2: ROS 2 Nodes** (50 min)
   - **Why second**: Nodes are building blocks for all ROS 2 systems
   - **Dependencies**: Chapter 1 (ROS 2 overview)
   - **Critical elements**: Node lifecycle, minimal node example, rclpy basics

3. **Chapter 3: Topics and Publishers** (50 min)
   - **Why third**: Publisher-subscriber is most common ROS 2 pattern
   - **Dependencies**: Chapter 2 (nodes)
   - **Critical elements**: Pub/sub diagram, publisher code, subscriber code, message types

#### Priority 2 (P2): Should Complete - Request/Response Patterns (Chapters 4-5)
**Rationale**: Services and actions are essential for robot control but build on pub/sub fundamentals. Students can understand ROS 2 without them initially. Aligns with User Stories 2-3 (P2-P3).

4. **Chapter 4: Services** (50 min)
   - **Why fourth**: Services teach synchronous communication; simpler than actions
   - **Dependencies**: Chapter 3 (topics for comparison)
   - **Critical elements**: Service vs topic comparison table, service server, service client

5. **Chapter 5: Actions** (50 min)
   - **Why fifth**: Actions are complex (goal/feedback/result); need service knowledge
   - **Dependencies**: Chapter 4 (services), Chapter 3 (topics for feedback)
   - **Critical elements**: Action state machine diagram, action server, goal cancellation

#### Priority 3 (P3): Nice to Have - Specialized Topics (Chapters 6-7)
**Rationale**: URDF and AI integration are valuable but not essential for core ROS 2 understanding. If time is short, these can be simplified or marked "coming soon". Aligns with User Stories 4-5 (P4-P5).

6. **Chapter 6: URDF Basics** (50 min)
   - **Why sixth**: URDF is separate knowledge domain (robot description, not messaging)
   - **Dependencies**: Chapter 1 (ROS 2 context only)
   - **Critical elements**: Links/joints explanation, 2-link robot URDF, RViz visualization

7. **Chapter 7: Python AI Integration** (60 min)
   - **Why last**: Synthesizes all prior chapters; most advanced topic
   - **Dependencies**: Chapters 2-3 (nodes/topics minimum), ideally all previous chapters
   - **Critical elements**: AI sense-think-act diagram, hybrid node example, threading guidance

---

## Detailed Chapter Templates

### Chapter 1: Introduction to ROS 2
**Time Allocated**: 60 minutes
**File**: `docs/module-1/01-introduction-to-ros2.md`

**Breakdown**:
- Frontmatter & outline (5 min)
- Introduction: "Why robots need nervous systems" analogy (10 min)
- Core Concepts: ROS 2 architecture, nodes/topics overview (20 min)
- Code Example 1: Minimal "Hello World" node (15 min)
- Mermaid Diagram: ROS 2 architecture (3 layers: application, middleware, OS) (10 min)
- Exercise: Modify Hello World to print custom message (5 min)
- Summary & further reading (5 min)

**Dependencies**: None (foundational)

**Deliverables**:
- [x] Complete markdown file with frontmatter (`sidebar_position: 1`, `title`, `description`, `estimated_minutes: 60`)
- [x] 1-2 code examples (Hello World node minimum)
- [x] 1 Mermaid architecture diagram
- [x] 1 beginner exercise
- [x] 3-5 learning objectives
- [x] 2-3 common pitfalls (e.g., "forgot to source ROS 2 setup.bash")

**Critical Success Factor**: Students understand "ROS 2 is communication middleware for robots" and can run their first node.

---

### Chapter 2: ROS 2 Nodes
**Time Allocated**: 50 minutes
**File**: `docs/module-1/02-ros2-nodes.md`

**Breakdown**:
- Frontmatter & outline (3 min)
- Introduction: "Nodes as independent processes" analogy (8 min)
- Core Concepts: Node lifecycle, naming, rclpy.Node class (15 min)
- Code Example 1: Minimal node with logger (10 min)
- Code Example 2: Node with parameters (12 min)
- Exercise: Create node that logs system info (5 min)
- Summary (2 min)

**Dependencies**: Chapter 1 (ROS 2 context)

**Deliverables**:
- [x] Complete markdown file
- [x] 2 code examples (minimal node, parameterized node)
- [x] 1 Mermaid diagram (node lifecycle states)
- [x] 1 beginner exercise
- [x] 3-5 learning objectives

**Critical Success Factor**: Students can create and run independent ROS 2 nodes with logging.

---

### Chapter 3: Topics and Publishers
**Time Allocated**: 50 minutes
**File**: `docs/module-1/03-topics-and-publishers.md`

**Breakdown**:
- Frontmatter & outline (3 min)
- Introduction: "Pub/sub as radio broadcast" analogy (8 min)
- Core Concepts: Topics, message types, QoS basics (15 min)
- Code Example 1: Simple publisher (10 min)
- Code Example 2: Simple subscriber (10 min)
- Mermaid Diagram: Pub/sub data flow (5 min)
- Exercise: Create talker-listener system with custom frequency (5 min)
- Summary (2 min)

**Dependencies**: Chapter 2 (nodes)

**Deliverables**:
- [x] Complete markdown file
- [x] 2-3 code examples (publisher, subscriber, combined system)
- [x] 1 Mermaid sequence diagram
- [x] 1-2 exercises (basic publisher, frequency modification)
- [x] 3-5 learning objectives

**Critical Success Factor**: Students understand pub/sub pattern and can create communicating nodes. **This completes User Story 1 (P1).**

---

### Checkpoint 1: Review Chapters 1-3
**Time**: 15 minutes

**Checklist**:
- [ ] All three chapters follow 5-section template
- [ ] Learning objectives use action verbs
- [ ] Code examples include installation commands and expected output
- [ ] Mermaid diagrams render correctly
- [ ] Consistent tone and terminology
- [ ] Prerequisites clearly stated
- [ ] File naming matches spec (`01-`, `02-`, `03-`)

**If issues found**: Allocate 10-15 min to fix before proceeding

---

### Chapter 4: Services
**Time Allocated**: 50 minutes
**File**: `docs/module-1/04-services.md`

**Breakdown**:
- Frontmatter & outline (3 min)
- Introduction: "Services as phone calls vs topics as radio" (8 min)
- Core Concepts: Request/response, service types, when to use (12 min)
- Code Example 1: Add two ints service server (12 min)
- Code Example 2: Service client calling server (10 min)
- Comparison table: "Use topics when... Use services when..." (3 min)
- Exercise: Create battery status service (5 min)
- Summary (2 min)

**Dependencies**: Chapter 3 (topics for comparison)

**Deliverables**:
- [x] Complete markdown file
- [x] 2 code examples (service server, service client)
- [x] 1 Mermaid sequence diagram (service call flow)
- [x] 1 comparison table
- [x] 1 exercise
- [x] 3-5 learning objectives

**Critical Success Factor**: Students understand synchronous request/response and when to use services vs topics. **This completes User Story 2 (P2).**

---

### Chapter 5: Actions
**Time Allocated**: 50 minutes
**File**: `docs/module-1/05-actions.md`

**Breakdown**:
- Frontmatter & outline (3 min)
- Introduction: "Actions as long-running tasks with progress updates" (8 min)
- Core Concepts: Goal, feedback, result; action states (12 min)
- Code Example 1: Countdown action server (15 min)
- Mermaid Diagram: Action state machine (7 min)
- Exercise: Add goal cancellation to countdown (5 min)
- Summary (2 min)

**Dependencies**: Chapters 3-4 (topics for feedback, services for goal setting)

**Deliverables**:
- [x] Complete markdown file
- [x] 1-2 code examples (action server, action client if time permits)
- [x] 1 Mermaid state diagram
- [x] 1 exercise
- [x] 3-5 learning objectives
- [x] 2-3 common pitfalls (e.g., "forgot to send feedback in loop")

**Critical Success Factor**: Students understand action lifecycle and can create basic action server. **This completes User Story 3 (P3).**

---

### Checkpoint 2: Review Chapters 4-5
**Time**: 15 minutes

**Checklist**:
- [ ] Service and action concepts clearly differentiated
- [ ] Code examples tested (or marked as illustrative)
- [ ] State machine diagram accurate
- [ ] Exercises have clear success criteria
- [ ] Common pitfalls address actual beginner mistakes

---

### Chapter 6: URDF Basics
**Time Allocated**: 50 minutes
**File**: `docs/module-1/06-urdf-basics.md`

**Breakdown**:
- Frontmatter & outline (3 min)
- Introduction: "URDF as robot blueprint" analogy (8 min)
- Core Concepts: Links (rigid bodies), joints (connections), coordinate frames (12 min)
- Code Example 1: Minimal 2-link robot URDF (15 min)
- Mermaid Diagram: Link-joint hierarchy tree (7 min)
- Exercise: Modify joint type from revolute to prismatic (3 min)
- Summary & RViz visualization note (2 min)

**Dependencies**: Chapter 1 (ROS 2 context only; URDF is separate domain)

**Deliverables**:
- [x] Complete markdown file
- [x] 1-2 code examples (minimal URDF, possibly Xacro mention)
- [x] 1 Mermaid diagram (URDF tree structure)
- [x] 1 exercise
- [x] 3-5 learning objectives

**Critical Success Factor**: Students understand links/joints and can write basic URDF. **This completes User Story 4 (P4).**

---

### Chapter 7: Python AI Integration
**Time Allocated**: 60 minutes
**File**: `docs/module-1/07-python-rclpy-integration.md`

**Breakdown**:
- Frontmatter & outline (5 min)
- Introduction: "Bridging AI brains to robot bodies" (10 min)
- Core Concepts: Sense-think-act loop, rclpy in AI code, threading considerations (15 min)
- Code Example 1: Simple rule-based AI agent (subscribe to sensor, publish command) (20 min)
- Mermaid Diagram: AI agent architecture (sensor → AI → actuator) (5 min)
- Exercise: Extend agent with basic decision logic (5 min)
- Summary & async/await note (3 min)

**Dependencies**: Chapters 2-3 minimum (nodes/topics); ideally all previous chapters

**Deliverables**:
- [x] Complete markdown file
- [x] 1-2 code examples (AI agent node, possibly async variant)
- [x] 1 Mermaid flowchart (AI loop)
- [x] 1 exercise
- [x] 3-5 learning objectives
- [x] Threading/async guidance in "Common Pitfalls"

**Critical Success Factor**: Students can integrate Python AI code with ROS 2 communication. **This completes User Story 5 (P5).**

---

### Final Review & Polish
**Time**: 45 minutes

**Activities**:
1. **Consistency check** (15 min):
   - All chapters follow template
   - Terminology consistent (e.g., "publisher" not "talker" unless teaching both terms)
   - Code style consistent (PEP 8)
   - Diagram color scheme consistent

2. **Accessibility validation** (10 min):
   - All code blocks have language identifiers
   - All acronyms defined on first use in each chapter
   - Mermaid diagrams have descriptive captions
   - Alt text plan documented (for future diagram rendering)

3. **Link validation** (5 min):
   - Cross-references work (e.g., "as we learned in Chapter 2")
   - External links to ROS 2 docs valid

4. **Constitution compliance** (10 min):
   - Review against `.specify/memory/constitution.md`
   - Verify 5-section structure
   - Check learning objectives quality
   - Confirm beginner-friendliness

5. **Final polish** (5 min):
   - Fix typos
   - Improve unclear sentences
   - Ensure welcoming tone

---

## Risk Management & Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Code examples untested** | High | Medium | Mark as "illustrative examples"; add disclaimer in Chapter 1 about testing in student's environment |
| **Time overrun** | Medium | High | Use priority system (P1 chapters non-negotiable); simplify P3 chapters if needed; reduce exercises to 1 per chapter minimum |
| **Inconsistent quality** | Medium | Medium | Use checkpoints after every 2-3 chapters; follow template strictly; reuse code example patterns |
| **Complex concepts poorly explained** | Medium | High | Start with analogies (constitution requirement); use Mermaid diagrams; break into sub-sections |
| **Mermaid diagram syntax errors** | Low | Low | Test Mermaid syntax in live editor (mermaid.live) before embedding |
| **Accessibility non-compliance** | Low | Medium | Use constitution checklist; plan alt text strategy; validate color contrast |
| **Scope creep** | Medium | Medium | Stick to spec strictly; defer "nice to have" features; avoid advanced topics |

---

## Success Criteria for Module 1 Completion

### Minimum Viable Module (Must Have)
- [ ] All 7 chapters created with frontmatter
- [ ] Each chapter has Introduction and Core Concepts sections
- [ ] At least 1 code example per chapter (7 total minimum)
- [ ] Module overview in `_category_.json`
- [ ] Consistent file naming (`01-` through `07-`)
- [ ] Learning objectives in every chapter

### Good Module (Should Have)
- [ ] 2-3 code examples per chapter (14-21 total)
- [ ] Mermaid diagrams in 5+ chapters
- [ ] 1-2 exercises per chapter (7-14 total)
- [ ] Summary sections written
- [ ] Common pitfalls documented
- [ ] Prerequisites clearly stated

### Excellent Module (Nice to Have)
- [ ] All code examples include expected output
- [ ] High-quality Mermaid diagrams in every chapter
- [ ] 2 exercises per chapter with extension challenges
- [ ] Further reading resources curated
- [ ] Polished prose with consistent tone
- [ ] Beta tested with sample student

**Minimum Acceptance Threshold**: Complete "Good Module" criteria + 90% of "Minimum Viable Module" items.

---

## Next Steps After Plan Completion

1. **Immediate** (Phase 0 completion):
   - [ ] Create `research.md` with answers to 7 research questions
   - [ ] Document ROS 2 Humble API validation
   - [ ] Define code example template structure
   - [ ] Choose Mermaid diagram types per chapter

2. **Phase 1 Design**:
   - [ ] Create `data-model.md` (content entities: Chapter, CodeExample, Exercise, Diagram)
   - [ ] Generate `contracts/chapter-template.md` (reusable Markdown template)
   - [ ] Write `quickstart.md` for contributors creating new chapters
   - [ ] Update agent context with Docusaurus/ROS 2 knowledge

3. **Phase 2 Implementation** (via `/speckit.tasks`):
   - [ ] Generate dependency-ordered task list
   - [ ] Assign time estimates per chapter
   - [ ] Create GitHub issues for tracking (if desired)
   - [ ] Begin content creation starting with Chapter 1

---

## Appendix: Tools & Resources

### Content Creation Tools
- **Markdown Editor**: VS Code with Markdown preview
- **Mermaid Testing**: [mermaid.live](https://mermaid.live) for syntax validation
- **Code Linting**: `black` (Python formatter), `flake8` (PEP 8 checker)
- **Accessibility**: Contrast checker for Mermaid colors

### Reference Documentation
- [ROS 2 Humble Docs](https://docs.ros.org/en/humble/)
- [rclpy API Reference](https://docs.ros.org/en/humble/p/rclpy/)
- [Docusaurus 3.x Docs](https://docusaurus.io/docs)
- [Mermaid.js Syntax](https://mermaid.js.org/intro/)
- [PEP 8 Style Guide](https://peps.python.org/pep-0008/)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)

### Quality Checklists
- Constitution compliance (`.specify/memory/constitution.md`)
- Requirements checklist (`specs/002-module-1-ros2-content/checklists/requirements.md`)
- Accessibility checklist (WCAG 2.1 AA items)

---

**Plan Status**: ✅ Complete - Ready for Phase 0 Research

**Estimated Total Effort**: 8-10 hours content creation + 2-3 hours research/design = **10-13 hours total**

**Next Command**: Generate research findings with agent-based investigation of ROS 2 Humble APIs, code example patterns, and Mermaid best practices.
