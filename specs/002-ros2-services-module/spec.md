# Feature Specification: ROS 2 Services Module

**Feature Branch**: `003-ros2-services-module`  
**Created**: 2025-11-29
**Status**: Draft  
**Input**: User description: "This module will introduce ROS 2 services, a request-response communication pattern in the ROS 2 ecosystem..."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand Service Concepts (Priority: P1)

A student new to ROS 2 wants to learn the fundamental theory behind services. They need to understand what services are, how they differ from topics, and when to use them.

**Why this priority**: This is the foundational knowledge required before moving on to practical implementation.

**Independent Test**: The student can answer conceptual questions about services vs. topics and identify correct use cases for services.

**Acceptance Scenarios**:

1. **Given** the introductory material, **When** asked to explain a ROS 2 service, **Then** the student can describe it as a request-response communication pattern.
2. **Given** the comparison material, **When** asked to differentiate services from topics, **Then** the student can explain that topics are for continuous data streams (one-to-many) while services are for transactional interactions (one-to-one).

---

### User Story 2 - Implement a Service (Priority: P1)

A developer wants to create a simple request-response interaction between two nodes. They will define a service, implement a server that provides the service, and a client that calls it.

**Why this priority**: This is the core practical skill for using services.

**Independent Test**: The developer can successfully build and run a client-server pair that communicates using a custom service definition. This will be done for both C++ and Python.

**Acceptance Scenarios**:

1. **Given** a `.srv` definition file, **When** the developer builds the ROS 2 workspace, **Then** the necessary C++ and Python message-generation code is created without errors.
2. **Given** a running service server, **When** the developer executes the client node, **Then** the client sends a request, the server processes it and returns a response, and the client receives the response correctly.

---

### User Story 3 - Interact with Services via CLI (Priority: P2)

A user wants to debug or inspect services running on a ROS 2 system. They need to use command-line tools to find, inspect, and call services without writing a full client node.

**Why this priority**: CLI tools are essential for debugging, testing, and system introspection, which is a common real-world task.

**Independent Test**: The user can successfully call a running service and receive a response using only `ros2` command-line tools.

**Acceptance Scenarios**:

1. **Given** a running node with a service server, **When** the user runs `ros2 service list`, **Then** the service name appears in the output.
2. **Given** a service name, **When** the user runs `ros2 service type`, **Then** the correct service type is printed.
3. **Given** a service name and valid arguments, **When** the user runs `ros2 service call`, **Then** the service is executed and the response is printed to the console.

### Edge Cases

- How does a service client behave if the service server is not available when the call is made?
- What happens if a service call takes a long time to process? (synchronous vs. asynchronous clients)
- How are errors handled if the server fails to process a request successfully?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The module MUST explain the conceptual difference between ROS 2 services and topics.
- **FR-002**: The module MUST provide example code for creating a custom `.srv` interface file.
- **FR-003**: The module MUST provide complete, working examples of a service server and client written in C++.
- **FR-004**: The module MUST provide complete, working examples of a service server and client written in Python.
- **FR-005**: The examples MUST demonstrate how to handle both synchronous and asynchronous service clients.
- **FR-006**: The module MUST demonstrate the usage of `ros2 service list`, `ros2 service type`, and `ros2 service call` command-line tools.

### Key Entities 

- **Service Definition (`.srv`)**: Represents the contract between the client and server. It defines the data structure for the request and the response.
- **Service Server**: A node that advertises a service, waits for requests, processes them, and sends back a response.
- **Service Client**: A node that looks for a service, sends a request, and waits for a response.

### Assumptions

- Users (students) have a working ROS 2 development environment (e.g., Humble Hawksbill) installed and configured.
- Users have a basic understanding of ROS 2 nodes and topics.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 95% of students can correctly identify when to use a service vs. a topic in a given scenario.
- **SC-002**: Students can successfully write and run a C++ service client/server pair that communicates correctly within 15 minutes of being given the requirements.
- **SC-003**: Students can successfully write and run a Python service client/server pair that communicates correctly within 10 minutes of being given the requirements.
- **SC-004**: 100% of students can use the `ros2 service` command-line tools to discover and call a running service.