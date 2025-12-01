# Data Model: ROS 2 Services Module

**Date**: 2025-11-29

This document outlines the key conceptual entities for the "ROS 2 Services Module" feature. As this is an educational module, these are not database models but rather concepts to be taught.

## Key Entities

### 1. Service Definition (`.srv` file)
- **Description**: A service definition file acts as the contract between a service server and a service client. It defines the structure of the request message and the response message.
- **Attributes**:
    - `Request`: A set of typed fields that the client sends to the server.
    - `Response`: A set of typed fields that the server sends back to the client.
- **Relationships**: A service definition is used by one or more Service Servers and Service Clients.

### 2. Service Server
- **Description**: A ROS 2 node that provides a service. It advertises its availability, waits for incoming requests, processes them, and returns a response.
- **Key Behaviors**:
    - Advertises a service with a specific name and type.
    - Implements a callback function to process requests.
    - Constructs and sends a response.

### 3. Service Client
- **Description**: A ROS 2 node that consumes a service. It looks for a specific service, sends a request, and waits to receive the response.
- **Key Behaviors**:
    - Looks for a service by name.
    - Creates a request object that matches the service definition.
    - Calls the service (either synchronously or asynchronously).
    - Processes the response received from the server.
