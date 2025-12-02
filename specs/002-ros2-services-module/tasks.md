---

description: "Task list for ROS 2 Services Module implementation"
---

# Tasks: ROS 2 Services Module

**Input**: Design documents from `/specs/003-ros2-services-module/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: This feature is focused on content creation. Formal TDD is not being applied, but a manual QA phase is planned to validate all code examples and exercises.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Paths assume the content will be in `docs/module-2-services/` and code examples in `static/code-examples/module-2-services/` within the repository root.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 [P] Create documentation directory docs/module-2-services
- [ ] T002 [P] Create code examples directory static/code-examples/module-2-services
- [ ] T003 [P] Create _category_.json file in docs/module-2-services/_category_.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

(No explicit foundational tasks identified that block all user stories beyond setup.)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Understand Service Concepts (Priority: P1) 🎯 MVP

**Goal**: A student new to ROS 2 wants to learn the fundamental theory behind services. They need to understand what services are, how they differ from topics, and when to use them.

**Independent Test**: The student can answer conceptual questions about services vs. topics and identify correct use cases for services.

### Implementation for User Story 1

- [ ] T004 [US1] Create 01-introduction-to-services.md explaining service concepts in docs/module-2-services/01-introduction-to-services.md

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Implement a Service (Priority: P1)

**Goal**: A developer wants to create a simple request-response interaction between two nodes. They will define a service, implement a server that provides the service, and a client that calls it.

**Independent Test**: The developer can successfully build and run a client-server pair that communicates using a custom service definition. This will be done for both C++ and Python.

### Implementation for User Story 2

- [ ] T005 [US2] Create custom .srv definition file (e.g., AddTwoInts.srv) in static/code-examples/module-2-services/srv/AddTwoInts.srv
- [ ] T006 [P] [US2] Implement C++ service server in static/code-examples/module-2-services/cpp_service_server.cpp
- [ ] T007 [P] [US2] Implement Python service server in static/code-examples/module-2-services/py_service_server.py
- [ ] T008 [P] [US2] Implement C++ service client (synchronous/asynchronous) in static/code-examples/module-2-services/cpp_service_client.cpp
- [ ] T009 [P] [US2] Implement Python service client (synchronous/asynchronous) in static/code-examples/module-2-services/py_service_client.py
- [ ] T010 [US2] Create 02-creating-a-service.md explaining service server implementation in docs/module-2-services/02-creating-a-service.md
- [ ] T011 [US2] Create 03-creating-a-client.md explaining service client implementation in docs/module-2-services/03-creating-a-client.md

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Interact with Services via CLI (Priority: P2)

**Goal**: A user wants to debug or inspect services running on a ROS 2 system. They need to use command-line tools to find, inspect, and call services without writing a full client node.

**Independent Test**: The user can successfully call a running service and receive a response using only `ros2` command-line tools.

### Implementation for User Story 3

- [ ] T012 [US3] Create 04-services-in-practice.md demonstrating ros2 service CLI tools in docs/module-2-services/04-services-in-practice.md

**Checkpoint**: All user stories should now be independently functional

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T013 Review and refine all Markdown content for clarity and accuracy
- [ ] T014 Review and test all code examples for correctness and functionality
- [ ] T015 Run quickstart.md validation

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
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Depends on User Story 1 (conceptual understanding is prerequisite for practical implementation)
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Depends on User Story 2 (CLI interaction requires implemented services to interact with)

### Within Each User Story

- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- Once Foundational phase completes, tasks within User Story 2 marked [P] can run in parallel (T006, T007, T008, T009)
- Different user stories can be worked on in parallel by different team members, considering their dependencies.

---

## Parallel Example: User Story 2 Implementation

```bash
# Launch all parallel implementation tasks for User Story 2 together after T005:
Task: "Implement C++ service server in static/code-examples/module-2-services/cpp_service_server.cpp"
Task: "Implement Python service server in static/code-examples/module-2-services/py_service_server.py"
Task: "Implement C++ service client (synchronous/asynchronous) in static/code-examples/module-2-services/cpp_service_client.cpp"
Task: "Implement Python service client (synchronous/asynchronous) in static/code-examples/module-2-services/py_service_client.py"
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
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
