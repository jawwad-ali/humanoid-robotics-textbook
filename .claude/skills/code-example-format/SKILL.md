# Code Example Format Skill

**Version:** 1.0
**Purpose:** Define exact structure and quality standards for all code examples
**Target:** <2000 words, actionable templates only

---

## 1. Standard Template (Copy-Paste Ready)

````markdown
### Example [N]: [Descriptive Title]

**Objective**: [What this demonstrates in 1 sentence]

**Prerequisites**:
- [Package/knowledge requirement 1]
- [Package/knowledge requirement 2]

#### Code

```[language]
# Comments explaining logic every 3-5 lines
[Complete, runnable code]
```

#### How to Run

```bash
# Step 1: [Action]
[command]

# Step 2: [Action]
[command]

# Step 3: [Verification]
[command]
```

#### Expected Output

```
[Exact terminal output user will see]
```

#### Explanation

[2-4 sentences: WHY it works this way, highlight non-obvious logic, reference key concepts]

**Key Takeaway**: [1 sentence summarizing what was learned]
````

---

## 2. Code Quality Checklist

Before finalizing ANY code example, verify:

- [ ] **Language identifier** in code block (```python, ```bash, ```xml, ```yaml)
- [ ] **Complete and runnable** (all imports, no undefined variables)
- [ ] **Inline comments** every 3-5 lines explaining logic
- [ ] **PEP 8 compliant** for Python (run `black` formatter)
- [ ] **Error handling** for common failures (file not found, service unavailable)
- [ ] **Version specs** mentioned (Python 3.10+, ROS 2 Humble)
- [ ] **Installation commands** provided in "How to Run"
- [ ] **Expected output** shown exactly as terminal displays
- [ ] **Key takeaway** states the main lesson (1 sentence)
- [ ] **Explanation** focuses on WHY (not just WHAT)

---

## 3. Comment Style by Language

### Python

```python
#!/usr/bin/env python3
"""
Module-level docstring explaining overall purpose.
Used for files intended as scripts.
"""
import rclpy  # Brief inline comment if import is non-obvious
from rclpy.node import Node

class MinimalPublisher(Node):
    """
    Class docstring explaining purpose and usage.
    Required for all classes.
    """
    def __init__(self):
        # Initialize parent Node class with name 'minimal_publisher'
        super().__init__('minimal_publisher')

        # Create publisher: String messages on /topic, queue size 10
        self.publisher_ = self.create_publisher(String, 'topic', 10)

        # Timer: call timer_callback every 0.5 seconds
        self.timer = self.create_timer(0.5, self.timer_callback)
        self.i = 0  # Message counter

    def timer_callback(self):
        """Publish incremented message on timer tick."""
        msg = String()
        msg.data = f'Hello World: {self.i}'

        # Publish message and log to console
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1
```

**Rules**:
- Docstrings for modules, classes, complex functions
- Inline `#` comments every 3-5 lines
- Comment the WHY, not the WHAT (don't write `x = 5  # Set x to 5`)
- Type hints where helpful: `def process(value: int) -> str:`

### Bash

```bash
#!/bin/bash
# Script: setup_workspace.sh
# Purpose: Initialize ROS 2 workspace and install dependencies

# Step 1: Update package index
sudo apt update

# Step 2: Install ROS 2 Humble base packages
sudo apt install -y ros-humble-desktop

# Step 3: Source ROS 2 environment
source /opt/ros/humble/setup.bash

# Step 4: Create workspace directory structure
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws

# Step 5: Build workspace (initially empty)
colcon build
```

**Rules**:
- Shebang (`#!/bin/bash`) if executable
- Comment before each logical step
- Group related commands under one comment

### XML (URDF, Launch Files)

```xml
<?xml version="1.0"?>
<!-- Simple 2-link robot arm URDF -->
<robot name="simple_arm">

  <!-- Base link: Fixed to ground -->
  <link name="base_link">
    <visual>
      <geometry>
        <cylinder length="0.1" radius="0.05"/>
      </geometry>
      <material name="blue">
        <color rgba="0 0 0.8 1"/>
      </material>
    </visual>
  </link>

  <!-- Joint: Revolute joint connecting base to arm -->
  <joint name="base_to_arm" type="revolute">
    <parent link="base_link"/>
    <child link="arm_link"/>
    <origin xyz="0 0 0.1" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>  <!-- Rotates around Z axis -->
    <limit lower="-3.14" upper="3.14" effort="10" velocity="1"/>
  </joint>

</robot>
```

**Rules**:
- Comment major sections
- Explain parameter meanings (especially axes, limits)
- 2-space indentation

### YAML (Config Files)

```yaml
# Navigation parameters for mobile robot
amcl:
  ros__parameters:
    # Particle filter: Number of samples for localization
    min_particles: 500
    max_particles: 2000

    # Update thresholds: How much movement triggers re-localization
    update_min_d: 0.2  # Meters
    update_min_a: 0.5  # Radians

    # Odometry model type (diff-corrected accounts for wheel slip)
    odom_model_type: "diff-corrected"
```

**Rules**:
- Comment parameter groups
- Explain units (meters, radians, seconds)
- Align values for readability

---

## 4. Installation Commands Format

Always show dependency installation:

```bash
# Install ROS 2 package from apt
sudo apt update
sudo apt install ros-humble-package-name

# Install Python packages (--break-system-packages for Ubuntu 22.04+)
pip install numpy matplotlib --break-system-packages

# Clone source package to workspace
cd ~/ros2_ws/src
git clone https://github.com/org/repo.git

# Build workspace
cd ~/ros2_ws
colcon build --packages-select package_name
source install/setup.bash
```

**Rules**:
- Show complete installation (apt, pip, build)
- Explain flags (`--break-system-packages`, `--packages-select`)
- Include sourcing workspace

---

## 5. Expected Output Format

Show EXACTLY what user sees in terminal:

```
[INFO] [1638360000.123456789] [minimal_publisher]: Publishing: "Hello World: 0"
[INFO] [1638360000.623456789] [minimal_publisher]: Publishing: "Hello World: 1"
[INFO] [1638360001.123456789] [minimal_publisher]: Publishing: "Hello World: 2"
^C[INFO] [1638360002.456789012] [rclpy]: Signal received, shutting down...
```

**Include**:
- Timestamps if ROS 2 logging
- Log levels (INFO, WARN, ERROR)
- Exit indicators (`^C` for Ctrl+C)
- Error messages if demonstrating failure handling

**For Commands**:
```bash
$ ros2 topic list
/parameter_events
/rosout
/topic

$ ros2 topic echo /topic --once
data: 'Hello World: 42'
---
```

**Rules**:
- Show command prompt (`$`) for clarity
- Include command flags (`--once`)
- Show data structure (YAML format for ROS messages)

---

## 6. Explanation Section Guidelines

**Purpose**: Explain WHY, not just WHAT

**Length**: 2-4 sentences maximum

**Structure**:
1. What concept this demonstrates
2. Why it works this way (technical reasoning)
3. Non-obvious details highlighted
4. Optional: Link to official docs for deep dive

**Example**:

```markdown
#### Explanation

This example demonstrates ROS 2's timer-based publishing pattern. The `create_timer()` method schedules periodic callbacks without blocking the main thread, enabling concurrent operations. The queue size parameter (10) determines how many messages are cached if subscribers can't keep up—messages beyond this limit are dropped. For reliable communication in production systems, consider using QoS profiles instead of default settings.

**Key Takeaway**: Timers enable periodic publishing without blocking node execution.
```

**Avoid**:
- ❌ Repeating what the code already shows
- ❌ Line-by-line code walkthrough
- ❌ Vague statements like "This is useful for robotics"

**Do**:
- ✅ Explain design decisions (why timer vs while loop)
- ✅ Highlight non-obvious behavior (message dropping)
- ✅ Connect to larger concepts (QoS profiles)

---

## 7. Difficulty Level Standards

### Beginner (First 1-2 examples per chapter)
- **Lines**: 10-30
- **Concepts**: Single concept only
- **Comments**: Every 2-3 lines (heavy commenting)
- **Dependencies**: Minimal (rclpy, standard library)
- **Example**: Minimal publisher node

### Intermediate (Middle examples)
- **Lines**: 30-60
- **Concepts**: Combine 2-3 related concepts
- **Comments**: Every 3-5 lines
- **Dependencies**: Common ROS packages
- **Example**: Publisher + subscriber in one node

### Advanced (Extension exercises, optional)
- **Lines**: 60+
- **Concepts**: Multiple integrated concepts
- **Comments**: Only on complex logic
- **Dependencies**: Specialized packages
- **Example**: Multi-threaded executor with services and topics

---

## 8. Common Mistakes Checklist

Avoid these errors:

❌ **No language identifier**: ` ```[no language] ` won't syntax highlight
❌ **Incomplete code**: Missing imports (`import rclpy`)
❌ **Undefined variables**: Using `msg` without creating it
❌ **No installation steps**: Assumes user has packages installed
❌ **No expected output**: User can't verify success
❌ **Wrong ROS distro**: Using Foxy/Galactic instead of Humble
❌ **Uncommented code**: Beginners need guidance
❌ **Too complex first**: First example should be <20 lines
❌ **Missing error handling**: No try/except for file I/O, service calls
❌ **Hardcoded paths**: Use `~/ros2_ws` or `${HOME}/ros2_ws`

---

## 9. Language-Specific Standards

### Python
- **PEP 8**: Run `black your_file.py` before finalizing
- **Type hints**: Use where helpful (`def process(x: int) -> str:`)
- **Docstrings**: Classes and complex functions
- **Error handling**: `try/except` for I/O, network, ROS services
- **Imports**: Group standard lib, third-party, local (PEP 8 order)

### Bash
- **Comments**: Before each command group
- **Error checking**: `|| exit 1` for critical commands
- **Variables**: Meaningful names (`workspace_path` not `wp`)
- **Quoting**: Quote paths with spaces (`cd "$HOME/my path"`)

### URDF/XML
- **Indentation**: 2 spaces
- **Comments**: Explain link/joint purposes
- **Units**: Comment if meters vs centimeters
- **Validation**: Run `check_urdf` before publishing

### YAML
- **Indentation**: 2 spaces, consistent
- **Comments**: Parameter groups and units
- **Alignment**: Align values for readability
- **Validation**: Check syntax with YAML linter

---

## 10. Final Validation Checklist

Before submitting ANY code example:

**Structure**:
- [ ] Uses standard template (Section 1)
- [ ] Has all required sections (Code, How to Run, Expected Output, Explanation, Key Takeaway)

**Code Quality**:
- [ ] Language identifier present
- [ ] Code is complete and runnable
- [ ] Inline comments every 3-5 lines
- [ ] PEP 8 compliant (Python)
- [ ] Error handling included

**Instructions**:
- [ ] Installation commands provided
- [ ] Run instructions step-by-step
- [ ] Expected output shown exactly

**Content**:
- [ ] Explanation focuses on WHY (2-4 sentences)
- [ ] Key takeaway summarizes lesson (1 sentence)
- [ ] Version specs mentioned (Python 3.10+, ROS 2 Humble)

**Test**:
- [ ] Can I copy-paste and run this immediately?
- [ ] Does it work in a fresh ROS 2 Humble environment?

---

## 11. Usage Instructions

### Creating a New Code Example
1. **Copy template** from Section 1
2. **Write code** following language standards (Section 9)
3. **Add comments** per style guide (Section 3)
4. **Test it** (actually run the code)
5. **Capture output** exactly as shown
6. **Write explanation** (WHY not WHAT, 2-4 sentences)
7. **Run checklist** (Section 10)

### Reviewing an Existing Example
1. **Load Section 10 checklist**
2. **Verify each item** systematically
3. **Fix violations**
4. **Test code** if changes made
5. **Update output** if code changed

---

## 12. Quick Reference

**Minimum Requirements**:
- Language identifier: ` ```python `
- Comments: Every 3-5 lines
- Installation: Show dependencies
- Output: Exact terminal text
- Explanation: 2-4 sentences
- Takeaway: 1 sentence

**File Naming for Example Code**:
- `example_01_hello_world.py` (numbered, descriptive)
- Store in: `examples/module-#/chapter-##/`

**Testing Command**:
```bash
# Python: Format and lint
black example.py
flake8 example.py

# Run and capture output
python3 example.py 2>&1 | tee output.txt
```

---

**Version**: 1.0 | **Word Count**: ~1,950 | **Status**: Production Ready

Use this skill for EVERY code example across all 4 modules. Consistency is key.
