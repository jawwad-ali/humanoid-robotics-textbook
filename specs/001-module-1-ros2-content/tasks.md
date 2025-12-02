# Tasks: Module 1 - The Robotic Nervous System (ROS 2) Content

**Input**: Design documents from `D:\physical-ai-textbook\specs\002-module-1-ros2-content\`
**Prerequisites**: plan.md (complete), spec.md (complete), constitution.md

**Tests**: Not applicable - this is educational content creation, not software development

**Organization**: Tasks are grouped by user story (learning paths) to enable independent chapter creation and validation. Each user story corresponds to a learning milestone that can be tested with students.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different chapters/files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4, US5)
- Include exact file paths in descriptions

## Path Conventions

- **Educational content**: `docs/module-1/` at repository root
- **Skills**: `.claude/skills/` for reusable templates
- **Static assets**: `static/img/module-1/` (if needed)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, directory structure, and foundational templates

- [ ] T001 Create `docs/module-1/` directory structure
- [ ] T002 Create `docs/module-1/_category_.json` with Docusaurus configuration (label: "Module 1: The Robotic Nervous System", position: 1, collapsed: false)
- [ ] T003 [P] Review and internalize `.claude/skills/chapter-format/SKILL.md` for chapter structure standards
- [ ] T004 [P] Review and internalize `.claude/skills/code-example-format/SKILL.md` for code example standards
- [ ] T005 [P] Review and internalize `.claude/skills/exercise-creation-format/SKILL.md` for exercise design standards
- [ ] T006 [P] Review `.specify/memory/constitution.md` for educational content principles

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core templates and validation setup that ALL chapters depend on

**⚠️ CRITICAL**: No chapter writing can begin until this phase is complete

- [ ] T007 Define consistent Mermaid color scheme in plan (blue: publishers, green: subscribers, orange: services, purple: actions)
- [ ] T008 Create ROS 2 code linting setup instructions (black formatter, flake8 configuration for PEP 8)
- [ ] T009 Test Mermaid rendering in Docusaurus (create sample diagram, verify it displays correctly)
- [ ] T010 Validate WCAG 2.1 AA contrast ratios for chosen Mermaid color scheme using contrast checker

**Checkpoint**: Foundation ready - chapter implementation can now begin in parallel

---

## Phase 3: User Story 1 - Complete Beginner Learning ROS 2 Basics (Priority: P1) 🎯 MVP

**Goal**: Students with no robotics experience learn what ROS 2 is, understand nodes and topics, run their first "Hello World" node, and create communicating publisher-subscriber systems

**Independent Test**: Student with zero robotics knowledge completes Chapters 1-3, successfully runs all code examples, and creates a working publisher-subscriber system demonstrating message passing

### Implementation for User Story 1 (Chapters 1-3)

#### Chapter 1: Introduction to ROS 2

- [X] T011 [US1] Create `docs/module-1/01-introduction-to-ros2.md` with frontmatter (sidebar_position: 1, title: "Introduction to ROS 2", description: "Learn what ROS 2 is and why it's essential for modern robotics", estimated_minutes: 60)
- [X] T012 [US1] Write learning objectives for Chapter 1 (3-5 action-verb based objectives covering: explaining ROS 2 purpose, identifying architecture components, creating Hello World node, navigating ROS 2 docs)
- [X] T013 [US1] Write introduction section with "robots need nervous systems" analogy (200-300 words, hook + why it matters + what you'll learn + prerequisites)
- [X] T014 [US1] Write core concepts section covering: What is ROS 2, nodes overview, topics overview, middleware layers (500-800 words with H3 subheadings, analogies before definitions)
- [X] T015 [US1] Create Mermaid architecture diagram showing 3 layers: application (nodes), middleware (DDS), OS (Linux/Windows) - add descriptive caption
- [X] T016 [US1] Write Code Example 1: Minimal "Hello World" ROS 2 node (10-20 lines Python, PEP 8 compliant, comments every 3-5 lines, installation commands, expected output, explanation, key takeaway)
- [X] T017 [US1] Write exercise: Modify Hello World to print custom message with timestamp (beginner difficulty, numbered steps, success criteria, 2-4 hints, extension challenge, 10-15 min estimate)
- [X] T018 [US1] Write common pitfalls section (2-3 pitfalls: forgot to source ROS 2 setup.bash, node name conflicts, ModuleNotFoundError - include what happens, why, how to fix, how to avoid)
- [X] T019 [US1] Write summary section (100-150 words, 3-5 key takeaways as bullet points, preview Chapter 2)
- [X] T020 [US1] Write further reading section (3-5 resources: Official ROS 2 Humble docs, ROS 2 Design Principles, Beginner tutorials, community forum - each with description)
- [X] T021 [US1] Validate Chapter 1 against `.claude/skills/chapter-format/SKILL.md` quality checklist (all 50+ items)

#### Chapter 2: ROS 2 Nodes

- [X] T022 [P] [US1] Create `docs/module-1/02-ros2-nodes.md` with frontmatter (sidebar_position: 2, prerequisites: Chapter 1, estimated_minutes: 50)
- [X] T023 [US1] Write learning objectives for Chapter 2 (3-5 objectives covering: creating nodes, understanding node lifecycle, using rclpy.Node class, logging, parameters)
- [X] T024 [US1] Write introduction with "nodes as independent processes" analogy (200-300 words)
- [X] T025 [US1] Write core concepts: node lifecycle, naming conventions, rclpy.Node class (500-800 words with H3 subheadings)
- [X] T026 [US1] Create Mermaid node lifecycle state diagram (UNCONFIGURED → INACTIVE → ACTIVE → FINALIZED) with caption
- [X] T027 [US1] Write Code Example 1: Minimal node with logger (15-25 lines, follows code-example-format skill)
- [X] T028 [US1] Write Code Example 2: Node with parameters (25-35 lines, demonstrates parameter declaration and retrieval)
- [X] T029 [US1] Write exercise: Create node that logs system info (beginner, 15-20 min)
- [X] T030 [US1] Write common pitfalls (2-3 pitfalls related to node creation and lifecycle)
- [X] T031 [US1] Write summary and further reading sections
- [X] T032 [US1] Validate Chapter 2 against chapter-format quality checklist

#### Chapter 3: Topics and Publishers

- [X] T033 [P] [US1] Create `docs/module-1/03-topics-and-publishers.md` with frontmatter (sidebar_position: 3, prerequisites: Chapter 2, estimated_minutes: 50)
- [X] T034 [US1] Write learning objectives for Chapter 3 (3-5 objectives covering: pub/sub pattern, creating publishers, creating subscribers, message types, QoS basics)
- [X] T035 [US1] Write introduction with "pub/sub as radio broadcast" analogy (200-300 words)
- [X] T036 [US1] Write core concepts: topics, message types, publishers, subscribers, QoS basics (500-800 words with H3 subheadings)
- [X] T037 [US1] Create Mermaid pub/sub sequence diagram showing publisher → topic → subscriber message flow with caption
- [X] T038 [US1] Write Code Example 1: Simple publisher (String messages, timer-based publishing, 20-30 lines)
- [X] T039 [US1] Write Code Example 2: Simple subscriber (subscribing to String messages, callback handling, 20-30 lines)
- [X] T040 [US1] Write exercise: Create talker-listener system with custom frequency (intermediate, 20-25 min, modify publisher to send at 10Hz instead of 1Hz)
- [X] T041 [US1] Write common pitfalls (2-3 pitfalls: topic name typos, QoS mismatch, callback blocking)
- [X] T042 [US1] Write summary and further reading sections
- [X] T043 [US1] Validate Chapter 3 against chapter-format quality checklist

### Quality Checkpoint for User Story 1

- [ ] T044 [US1] Cross-chapter consistency check: terminology, tone, code style across Chapters 1-3
- [ ] T045 [US1] Verify all Chapters 1-3 Mermaid diagrams use consistent color scheme (defined in T007)
- [ ] T046 [US1] Run accessibility validation: all code blocks have language identifiers, all acronyms defined, all diagrams have captions
- [ ] T047 [US1] Validate all external links in Chapters 1-3 point to ROS 2 Humble docs (not Foxy/Galactic)
- [ ] T048 [US1] Test all code examples from Chapters 1-3 in ROS 2 Humble environment (or mark as illustrative)

**Checkpoint**: At this point, User Story 1 (foundational ROS 2 learning) should be fully complete and testable with beginner students. This is the MVP.

---

## Phase 4: User Story 2 - Learning Request/Response Patterns (Priority: P2)

**Goal**: Students who completed pub/sub chapters learn synchronous communication via services, implement service servers/clients, and understand when to use services vs topics

**Independent Test**: Student can create a service server, make requests from a client, handle responses, and explain when to use services vs topics

### Implementation for User Story 2 (Chapter 4)

- [ ] T049 [P] [US2] Create `docs/module-1/04-services.md` with frontmatter (sidebar_position: 4, prerequisites: Chapter 3, estimated_minutes: 50)
- [ ] T050 [US2] Write learning objectives for Chapter 4 (3-5 objectives covering: request/response pattern, creating service servers, creating service clients, service types, choosing services vs topics)
- [ ] T051 [US2] Write introduction with "services as phone calls vs topics as radio" analogy (200-300 words)
- [ ] T052 [US2] Write core concepts: request/response paradigm, service types, when to use services, synchronous vs asynchronous communication (500-800 words with H3 subheadings)
- [ ] T053 [US2] Create comparison table: "Use topics when... / Use services when..." (included in core concepts section)
- [ ] T054 [US2] Create Mermaid service call sequence diagram (client → service server → response) with caption
- [ ] T055 [US2] Write Code Example 1: Add two ints service server (25-35 lines, defines service, handles requests, sends responses)
- [ ] T056 [US2] Write Code Example 2: Service client calling server (20-30 lines, sends request, waits for response, error handling for service unavailable)
- [ ] T057 [US2] Write exercise: Create battery status service (intermediate, 20-25 min, service returns mock battery percentage)
- [ ] T058 [US2] Write common pitfalls (2-3 pitfalls: service not available, blocking vs async calls, request timeout)
- [ ] T059 [US2] Write summary and further reading sections
- [ ] T060 [US2] Validate Chapter 4 against chapter-format quality checklist
- [ ] T061 [US2] Test Chapter 4 code examples in ROS 2 Humble

**Checkpoint**: At this point, User Story 2 (services) should be fully functional and testable independently

---

## Phase 5: User Story 3 - Managing Long-Running Tasks with Actions (Priority: P3)

**Goal**: Intermediate students learn to command robots for complex, long-running tasks with progress feedback and cancellation capability via ROS 2 actions

**Independent Test**: Student can create an action server, send goals from a client, receive periodic feedback, and demonstrate goal cancellation mid-execution

### Implementation for User Story 3 (Chapter 5)

- [ ] T062 [P] [US3] Create `docs/module-1/05-actions.md` with frontmatter (sidebar_position: 5, prerequisites: Chapters 3-4, estimated_minutes: 50)
- [ ] T063 [US3] Write learning objectives for Chapter 5 (3-5 objectives covering: action lifecycle, goal/feedback/result pattern, creating action servers, sending goals, cancellation)
- [ ] T064 [US3] Write introduction with "actions as long-running tasks with progress updates" analogy (200-300 words)
- [ ] T065 [US3] Write core concepts: goal/feedback/result, action states, action types, when to use actions (500-800 words with H3 subheadings)
- [ ] T066 [US3] Create Mermaid action state machine diagram (PENDING → ACTIVE → SUCCEEDED/ABORTED/CANCELED) with caption
- [ ] T067 [US3] Write Code Example 1: Countdown action server (35-45 lines, accepts goal duration, sends feedback every second, returns result on completion)
- [ ] T068 [US3] Write exercise: Add goal cancellation to countdown (intermediate-advanced, 25-30 min, handle cancel requests mid-execution)
- [ ] T069 [US3] Write common pitfalls (2-3 pitfalls: forgot to send feedback in loop, not handling cancellation, blocking action execution)
- [ ] T070 [US3] Write summary and further reading sections
- [ ] T071 [US3] Validate Chapter 5 against chapter-format quality checklist
- [ ] T072 [US3] Test Chapter 5 code examples in ROS 2 Humble

**Checkpoint**: All core ROS 2 communication patterns (topics, services, actions) are now complete

---

## Phase 6: User Story 4 - Describing Robot Structure with URDF (Priority: P4)

**Goal**: Students learn to define robot physical structure (links, joints, sensors) using URDF so robots can be visualized in RViz and simulated in Gazebo

**Independent Test**: Student can write a valid URDF file for a simple robot, launch RViz to visualize it, and explain parent-child link relationships

### Implementation for User Story 4 (Chapter 6)

- [ ] T073 [P] [US4] Create `docs/module-1/06-urdf-basics.md` with frontmatter (sidebar_position: 6, prerequisites: Chapter 1, estimated_minutes: 50)
- [ ] T074 [US4] Write learning objectives for Chapter 6 (3-5 objectives covering: URDF structure, links/joints, coordinate frames, visualizing in RViz, joint types)
- [ ] T075 [US4] Write introduction with "URDF as robot blueprint" analogy (200-300 words)
- [ ] T076 [US4] Write core concepts: links (rigid bodies), joints (connections), coordinate frames, URDF XML structure, joint types (revolute, prismatic, fixed) (500-800 words with H3 subheadings)
- [ ] T077 [US4] Create Mermaid URDF hierarchy tree diagram showing links and joints in parent-child relationship with caption
- [ ] T078 [US4] Write Code Example 1: Minimal 2-link robot URDF (XML, 30-40 lines, base link + arm link + revolute joint, visual geometry, material colors)
- [ ] T079 [US4] Write exercise: Modify joint type from revolute to prismatic (beginner, 15-20 min, observe changed motion in RViz)
- [ ] T080 [US4] Write common pitfalls (2-3 pitfalls: coordinate frame errors, missing parent/child link, invalid joint limits)
- [ ] T081 [US4] Write summary with note about RViz visualization, further reading sections
- [ ] T082 [US4] Validate Chapter 6 against chapter-format quality checklist
- [ ] T083 [US4] Validate Chapter 6 URDF example with `check_urdf` tool (or mark as illustrative)

**Checkpoint**: Robot description content complete

---

## Phase 7: User Story 5 - Bridging AI Agents to ROS 2 Controllers (Priority: P5)

**Goal**: Advanced students learn to connect Python AI code (LLM planners, RL agents) to ROS 2 robot controllers, creating hybrid nodes that run AI inference and publish control commands

**Independent Test**: Student can create a Python AI agent (simple rule-based or mock LLM) that subscribes to sensor data, processes it, and publishes motor commands via ROS 2

### Implementation for User Story 5 (Chapter 7)

- [ ] T084 [P] [US5] Create `docs/module-1/07-python-rclpy-integration.md` with frontmatter (sidebar_position: 7, prerequisites: Chapters 2-3 minimum, ideally all previous chapters, estimated_minutes: 60)
- [ ] T085 [US5] Write learning objectives for Chapter 7 (3-5 objectives covering: AI sense-think-act loop, integrating AI with ROS 2, threading/async patterns, rclpy in AI code, real-time responsiveness)
- [ ] T086 [US5] Write introduction with "bridging AI brains to robot bodies" analogy (200-300 words)
- [ ] T087 [US5] Write core concepts: sense-think-act loop, rclpy integration patterns, threading considerations, async/await in ROS 2, AI inference latency management (500-800 words with H3 subheadings)
- [ ] T088 [US5] Create Mermaid AI agent architecture flowchart (sensor topic → subscriber callback → AI processing → publisher → actuator) with caption
- [ ] T089 [US5] Write Code Example 1: Simple rule-based AI agent (40-50 lines, subscribes to `/scan` topic with mock laser data, processes data with basic logic, publishes `/cmd_vel` commands)
- [ ] T090 [US5] Write exercise: Extend agent with basic decision logic (advanced, 30-40 min, add conditional behavior based on sensor thresholds)
- [ ] T091 [US5] Write common pitfalls (2-3 pitfalls: blocking callbacks with heavy AI computation, threading issues, not handling async properly)
- [ ] T092 [US5] Write summary with async/await note, further reading sections
- [ ] T093 [US5] Validate Chapter 7 against chapter-format quality checklist
- [ ] T094 [US5] Test Chapter 7 code examples in ROS 2 Humble

**Checkpoint**: All 7 chapters are now complete

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple chapters and final module-wide validation

- [ ] T095 [P] Create Module 1 overview/introduction page in `docs/module-1/index.md` (module learning objectives, estimated time, prerequisites, chapter overview)
- [ ] T096 [P] Create Module 1 final project specification (goal: build complete ROS 2 system using nodes, topics, services; success criteria; 2-3 hour estimate; builds on all 7 chapters)
- [ ] T097 Cross-chapter terminology consistency check (ensure "publisher" not "talker", "subscriber" not "listener" unless teaching both terms)
- [ ] T098 Cross-chapter code style validation (run `black` formatter on all Python examples, ensure PEP 8 compliance)
- [ ] T099 [P] Verify all Mermaid diagrams across all chapters use consistent color scheme
- [ ] T100 [P] Accessibility audit: verify all 10+ diagrams have alt text and captions, all acronyms defined on first use in each chapter, all code blocks have language identifiers
- [ ] T101 [P] Link validation: verify all external links across all chapters point to valid ROS 2 Humble documentation
- [ ] T102 Constitution compliance final check: review all 7 chapters against `.specify/memory/constitution.md` 7 principles
- [ ] T103 Word count validation: verify each chapter is 800-1500 words (excluding code examples)
- [ ] T104 [P] Create acknowledgments section crediting official ROS 2 documentation and community resources
- [ ] T105 Final quality review: proofread all chapters for typos, unclear sentences, welcoming tone

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all chapter creation
- **User Stories (Phases 3-7)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4 → P5)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 - P1 (Chapters 1-3)**: Can start after Foundational - No dependencies on other stories - **THIS IS THE MVP**
- **User Story 2 - P2 (Chapter 4)**: Can start after Foundational - Builds on Chapter 3 concepts for comparison
- **User Story 3 - P3 (Chapter 5)**: Can start after Foundational - Builds on Chapters 3-4 for context
- **User Story 4 - P4 (Chapter 6)**: Can start after Foundational - Only depends on Chapter 1, independent of US2/US3
- **User Story 5 - P5 (Chapter 7)**: Can start after Foundational - Ideally after all others but minimum Chapters 2-3

### Within Each User Story (Chapter)

- Frontmatter and structure creation first
- Learning objectives before content sections
- Introduction before core concepts
- Core concepts before code examples (concepts inform examples)
- Code examples before exercises (exercises build on examples)
- Exercises before common pitfalls (pitfalls address exercise issues)
- Summary last (summarizes all preceding content)
- Validation after chapter completion

### Parallel Opportunities

**Phase 1 (Setup):**
- T003, T004, T005, T006 can all run in parallel (reviewing different skills)

**Phase 2 (Foundational):**
- T007, T008, T009, T010 can run in parallel once Setup is done

**Phase 3 (US1 - Chapters 1-3):**
- Once Chapter 1 tasks (T011-T021) are complete, Chapter 2 (T022-T032) and Chapter 3 (T033-T043) can be created in parallel since they're different files
- Within Chapter 1: T011 (create file) must complete before other tasks, but T015 (diagram), T016 (code example 1), T017 (exercise) can happen in parallel after T014 (core concepts) completes

**Phase 4 (US2 - Chapter 4):**
- T049-T061 are sequential within the chapter

**Phase 5 (US3 - Chapter 5):**
- Can start in parallel with Phase 4 if team capacity allows (T062-T072 work on different file than Chapter 4)

**Phase 6 (US4 - Chapter 6):**
- Can start in parallel with Phases 4-5 (T073-T083 independent)

**Phase 7 (US5 - Chapter 7):**
- Can start in parallel with Phases 4-6 (T084-T094 independent)

**Phase 8 (Polish):**
- T095, T096, T099, T100, T101, T104 can run in parallel (different concerns)

---

## Parallel Example: User Story 1 (Chapters 1-3)

```bash
# After Foundation is complete, launch all 3 chapters in parallel:
Task: "Create Chapter 1: Introduction to ROS 2" (T011-T021)
Task: "Create Chapter 2: ROS 2 Nodes" (T022-T032)
Task: "Create Chapter 3: Topics and Publishers" (T033-T043)

# Or within Chapter 1, after core concepts (T014) completes:
Task: "Create Mermaid architecture diagram" (T015)
Task: "Write Code Example 1: Hello World node" (T016)
Task: "Write exercise: Modify Hello World" (T017)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only - Chapters 1-3)

1. Complete Phase 1: Setup (T001-T006)
2. Complete Phase 2: Foundational (T007-T010) - CRITICAL, blocks all chapters
3. Complete Phase 3: User Story 1 Chapters 1-3 (T011-T048)
4. **STOP and VALIDATE**: Test Chapters 1-3 with beginner student
5. Deploy/demo if ready - this provides foundational ROS 2 learning

### Incremental Delivery

1. Complete Setup + Foundational → Templates and standards ready
2. Add User Story 1 (Chapters 1-3) → Test with students → Deploy (MVP! - Beginner ROS 2 path complete)
3. Add User Story 2 (Chapter 4) → Test independently → Deploy (Services added)
4. Add User Story 3 (Chapter 5) → Test independently → Deploy (Actions added)
5. Add User Story 4 (Chapter 6) → Test independently → Deploy (URDF added)
6. Add User Story 5 (Chapter 7) → Test independently → Deploy (AI integration added)
7. Polish → Final module complete

Each user story adds value without breaking previous stories. Students can stop at any checkpoint.

### Parallel Team Strategy

With multiple content creators:

1. Team completes Setup + Foundational together (T001-T010)
2. Once Foundational is done:
   - Creator A: User Story 1 - Chapters 1-3 (T011-T048)
   - Creator B: User Story 2 - Chapter 4 (T049-T061)
   - Creator C: User Story 4 - Chapter 6 (T073-T083)
3. Later:
   - Creator D: User Story 3 - Chapter 5 (T062-T072)
   - Creator E: User Story 5 - Chapter 7 (T084-T094)
4. All creators: Polish together (T095-T105)

---

## Notes

- **[P] tasks** = different files/chapters, no dependencies, can run in parallel
- **[Story] label** maps task to specific learning milestone for traceability
- Each user story (learning path) should be independently completable and testable with students
- Follow all three skills strictly: chapter-format, code-example-format, exercise-creation-format
- All code examples must target ROS 2 Humble (not Foxy/Galactic/Rolling)
- Commit after each chapter or logical group
- Stop at any checkpoint to validate content with beta students
- Avoid: vague content, inconsistent terminology, skipping quality checks
- Success metrics: Students complete chapters in estimated time ± 20%, code examples run successfully, exercises have clear success criteria

---

## Summary

**Total Tasks**: 105
**Task Breakdown by User Story**:
- Setup: 6 tasks
- Foundational: 4 tasks
- User Story 1 (P1 - Chapters 1-3): 38 tasks (T011-T048) - **MVP**
- User Story 2 (P2 - Chapter 4): 13 tasks (T049-T061)
- User Story 3 (P3 - Chapter 5): 11 tasks (T062-T072)
- User Story 4 (P4 - Chapter 6): 11 tasks (T073-T083)
- User Story 5 (P5 - Chapter 7): 11 tasks (T084-T094)
- Polish: 11 tasks (T095-T105)

**Parallel Opportunities**: 15+ tasks marked [P] across all phases

**Independent Test Criteria**:
- US1: Beginner runs Chapters 1-3 code, creates pub/sub system
- US2: Student creates service, makes requests, explains services vs topics
- US3: Student creates action server, sends goals, demonstrates cancellation
- US4: Student writes URDF, visualizes in RViz, explains link relationships
- US5: Student creates AI agent that subscribes, processes, publishes

**Suggested MVP Scope**: User Story 1 only (Chapters 1-3) - provides foundational ROS 2 learning path

**Format Validation**: ✅ All 105 tasks follow checklist format with checkbox, ID, [P]/[Story] labels where applicable, and file paths
