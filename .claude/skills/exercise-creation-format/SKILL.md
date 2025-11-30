# Exercise Creation Format Skill

**Version:** 1.0
**Purpose:** Define exact structure and quality standards for all hands-on exercises
**Target:** <2000 words, actionable templates only

---

## 1. Standard Template (Copy-Paste Ready)

```markdown
### Exercise [N]: [Descriptive Title]

**Difficulty**: [Beginner | Intermediate | Advanced]

**Objective**: [What student will build/accomplish in 1 sentence]

**Estimated Time**: [X minutes]

**Instructions**:
1. [Clear, actionable step starting with verb]
2. [Next step]
3. [Continue numbering all steps]
4. [Include verification steps]

**Success Criteria**:
- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]
- [ ] [Measurable outcome 3]
- [ ] [Measurable outcome 4]

**Hints** (click to expand):
<details>
<summary>Hint 1: [Specific Topic]</summary>

[Guidance without giving away answer - point to chapter section, suggest approach, or ask guiding question]
</details>

<details>
<summary>Hint 2: [Specific Topic]</summary>

[More specific guidance for next common stumbling block]
</details>

<details>
<summary>Hint 3: [Specific Topic]</summary>

[Additional help if needed]
</details>

**Extension Challenge** (optional):
- [Advanced variation for fast finishers - 1-2 sentences]

**Estimated Time**: [X minutes]
```

---

## 2. Difficulty Level Definitions

### Beginner
- **What**: Modify existing code example (change 1-3 parameters/values)
- **Concepts**: Single concept from chapter
- **Lines changed**: 1-10 lines
- **Time**: 5-15 minutes
- **Scaffolding**: Detailed step-by-step instructions
- **Example**: "Change the publisher topic name from `/topic` to `/my_topic` and verify with `ros2 topic list`"

### Intermediate
- **What**: Combine 2-3 concepts into new program
- **Concepts**: Multiple related concepts from chapter
- **Lines written**: 20-50 lines new code
- **Time**: 15-30 minutes
- **Scaffolding**: Outcome-focused, fewer detailed steps
- **Example**: "Create a subscriber that processes incoming messages and publishes transformed results to a new topic"

### Advanced
- **What**: Apply concepts to novel scenario requiring problem-solving
- **Concepts**: All chapter concepts + integration thinking
- **Lines written**: 50-100+ lines
- **Time**: 30-60 minutes
- **Scaffolding**: Minimal - goal stated, student designs approach
- **Example**: "Build a multi-node system where Node A publishes sensor data, Node B processes it, and Node C subscribes to results and logs statistics"

---

## 3. Instruction Writing Rules

### Every Instruction Must Be:

- **Actionable**: Start with verb (Open, Create, Modify, Run, Verify)
- **Specific**: Tell exactly what (line numbers, exact values)
- **Sequential**: Build on previous steps logically
- **Testable**: Student can verify completion

**Good Example**:
```markdown
1. Copy `minimal_publisher.py` from Example 1 to `greeter.py`
2. Change line 8: replace `'minimal_publisher'` with `'greeter'`
3. Add import: `from datetime import datetime`
4. Add line 13: `self.get_logger().info(f'Time: {datetime.now()}')`
5. Run: `python3 greeter.py`
6. Verify output shows timestamp
```

**Bad Example**: "Understand the code, make it better, try different things"

---

## 4. Success Criteria Standards

### Requirements:
- **Quantity**: 3-5 measurable outcomes
- **Observable**: Use verbs that describe visible/testable results
- **Objective**: Can be verified yes/no without interpretation
- **Aligned**: Match exercise objective

### Observable Verbs:
- **Output/Display**: "Outputs `[specific text]`", "Displays message containing..."
- **Execution**: "Runs without errors", "Executes successfully", "Completes in under X seconds"
- **Behavior**: "Responds to input", "Reacts to Ctrl+C", "Publishes messages"
- **State**: "Topic appears in `ros2 topic list`", "Node shows in `ros2 node list`"
- **Code quality**: "Passes `black` formatter", "No syntax errors", "Follows PEP 8"

### Template:

```markdown
**Success Criteria**:
- [ ] [Observable action] [specific expected result]
- [ ] [Program/node/command] [observable behavior]
- [ ] [Verification command] [expected output]
- [ ] [Code quality check] [passes/meets standard]
```

### Examples by Difficulty:

**Beginner**:
```markdown
- [ ] Node name appears as `greeter` in terminal output
- [ ] Log message includes your actual name
- [ ] Node runs without errors for 10+ seconds
```

**Intermediate**:
```markdown
- [ ] Subscriber receives messages from `/sensor_data` topic
- [ ] Processed results published to `/processed_data`
- [ ] Code follows PEP 8 (run `black` shows no changes)
```

**Advanced**:
```markdown
- [ ] Three nodes run concurrently without errors
- [ ] Node A publishes at 10Hz (verify with `ros2 topic hz`)
- [ ] System recovers gracefully when nodes restart
```

---

## 5. Hint Design Guidelines

### Purpose:
Help stuck students without revealing the solution

### Structure:
- **Quantity**: 2-4 hints per exercise
- **Progressive**: Hint 1 = gentle nudge, Hint 4 = very specific
- **Collapsible**: Use `<details>` tags (students choose when to reveal)
- **Targeted**: Each addresses a specific sub-problem

### Hint Types:

**Reference**: Point to chapter content
- "Review Example 2 in Practical Examples section, lines 10-15"

**Approach**: Suggest strategy without code
- "Consider using `create_timer()` callback instead of `while` loop"

**Syntax**: Remind of language usage
- "Import datetime: `from datetime import datetime`, then use `datetime.now()`"

**Debugging**: Guide troubleshooting
- "If ModuleNotFoundError: source ROS 2 environment first"

### What to Avoid:
❌ Complete code solutions
❌ Vague hints ("Think differently")
❌ Too many hints (>4)
❌ New concepts not in chapter

### Example:
```markdown
<details>
<summary>Hint 1: Node naming</summary>
The node name is in `super().__init__('node_name')`, around line 8.
</details>

<details>
<summary>Hint 2: Adding timestamp</summary>
Import `datetime`, then: `self.get_logger().info(f'Time: {datetime.now()}')`.
</details>
```

---

## 6. Extension Challenge Guidelines

### Purpose:
Keep advanced students engaged after completing main exercise

### Rules:
- **Optional**: Not required for chapter completion
- **Harder**: 1.5-2x difficulty of main exercise
- **Preview**: May use concepts from later chapters
- **Concise**: 1-2 sentences describing challenge

### Format:

```markdown
**Extension Challenge** (optional):
- [Describe advanced variation in 1-2 sentences, indicate which future chapter concept it previews]
```

### Examples:

**Beginner → Intermediate**:
- "Print greeting every 2 seconds using timer callback (preview Chapter 3)"

**Intermediate → Advanced**:
- "Add service to change message at runtime (preview Chapter 4)"

**Advanced → Expert**:
- "Implement graceful degradation with 5-second timeout and fallback behavior"

---

## 7. Exercise Quality Checklist

Before finalizing ANY exercise, verify:

**Structure**:
- [ ] Uses standard template (Section 1)
- [ ] All required sections present

**Objective**:
- [ ] States what to build in 1 specific sentence
- [ ] Aligns with chapter learning objectives

**Difficulty**:
- [ ] Label matches actual complexity
- [ ] Appropriate for chapter position

**Instructions**:
- [ ] Numbered sequentially (1, 2, 3...)
- [ ] Each starts with action verb
- [ ] Specific enough to follow without guessing
- [ ] Build on previous steps logically

**Success Criteria**:
- [ ] 3-5 measurable outcomes
- [ ] Use observable verbs
- [ ] Can be verified objectively (yes/no)
- [ ] Align with exercise objective

**Hints**:
- [ ] 2-4 hints provided
- [ ] Progressive (easier → harder)
- [ ] Use collapsible `<details>` tags
- [ ] Don't give away complete solution

**Extension**:
- [ ] Optional challenge included
- [ ] 1.5-2x harder than main exercise
- [ ] 1-2 sentences description

**Pedagogy**:
- [ ] Builds on chapter content only
- [ ] No new concepts introduced
- [ ] Appropriate challenge (not too easy/hard)
- [ ] Time estimate realistic

**Testing**:
- [ ] Can be completed from instructions alone
- [ ] Success verifiable without instructor
- [ ] Tested personally (time estimate accurate)

---

## 8. Common Mistakes to Avoid

### Vague Objective
❌ "Learn about publishers"
✅ "Create a publisher that sends custom greeting messages to `/greetings` topic"

### Untestable Success
❌ "Understand how the code works"
✅ "Code executes without errors and outputs expected messages"

### Missing Steps
❌ "Create a publisher and test it"
✅ "1. Copy Example 1 code\n2. Change topic name to `/greetings`\n3. Run: `python3 publisher.py`\n4. Verify: `ros2 topic list` shows `/greetings`"

### Too Easy
❌ "Copy-paste Example 1 and run it"
✅ "Modify Example 1 to publish custom messages at 5Hz instead of 1Hz"

### Too Hard
❌ "Implement a custom QoS profile with lifespan and deadline policies" (in Chapter 1)
✅ "Create a simple publisher with default QoS settings" (QoS details in Chapter 5)

### No Hints
❌ [No hints section]
✅ [2-4 progressive hints guiding through sub-problems]

### Wrong Difficulty
❌ Labeled "Beginner" but requires writing 100 lines of complex code
✅ Beginner = modify 5-10 lines, Intermediate = write 30-50 lines, Advanced = 60+ lines

### Unrealistic Time
❌ "Estimated Time: 5 minutes" for exercise that takes 30 minutes
✅ Test yourself, multiply by 2-3x, round to nearest 5 minutes

### No Extension
❌ [No optional challenge]
✅ "Extension Challenge: Add error handling for network failures"

---

## 9. Exercise Types by Chapter Position

### Early Chapters (1-2): Modification Exercises
- **Type**: Modify existing code examples
- **Difficulty**: Beginner only
- **Scaffolding**: Very detailed (10+ numbered steps)
- **Example**: "Change the node name, message content, and publish rate"

### Mid Chapters (3-5): Combination Exercises
- **Type**: Combine 2-3 chapter concepts
- **Difficulty**: Beginner + Intermediate
- **Scaffolding**: Moderate (5-8 steps)
- **Example**: "Create a node with both publisher and subscriber"

### Late Chapters (6-7): Application Exercises
- **Type**: Apply to novel scenarios
- **Difficulty**: Intermediate + Advanced
- **Scaffolding**: Minimal (3-5 outcome-focused steps)
- **Example**: "Build a sensor fusion node that combines camera and lidar data"

---

## 10. Time Estimation Guidelines

### Beginner: 5-15 minutes
- **Activity**: Modify 1-10 lines of existing code
- **Steps**: Copy, change parameters, run, verify
- **Example**: Change topic name and message text

### Intermediate: 15-30 minutes
- **Activity**: Write 20-50 lines of new code
- **Steps**: Design approach, implement, debug, test
- **Example**: Create publisher-subscriber pair with processing logic

### Advanced: 30-60 minutes
- **Activity**: Write 60-100+ lines, multi-file
- **Steps**: Architecture design, implementation, edge case handling, integration testing
- **Example**: Multi-node system with coordination

### How to Estimate:
1. Complete it yourself
2. Time your completion
3. Multiply by 2.5-3x (students slower)
4. Round to nearest 5 minutes

---

## 11. Quick Validation Checklist

Use for rapid quality check:

**Format**:
- [ ] Standard template used
- [ ] All sections present (Objective, Instructions, Success, Hints, Extension)

**Content**:
- [ ] Objective specific (1 sentence)
- [ ] Difficulty accurate (beginner/intermediate/advanced)
- [ ] Instructions actionable and numbered
- [ ] Success criteria measurable (3-5 items)
- [ ] Hints progressive (2-4, no spoilers)
- [ ] Extension challenge included

**Pedagogy**:
- [ ] Builds on chapter content (no new concepts)
- [ ] Appropriate difficulty for position
- [ ] Time estimate realistic (tested)

**Quality**:
- [ ] Can I complete this from instructions alone?
- [ ] Can success be verified objectively?
- [ ] Are hints helpful without giving away answer?

---

## 12. Usage Instructions

### Creating New Exercise:

1. **Copy template** from Section 1
2. **Define difficulty and objective** (Sections 2)
3. **Write numbered instructions** (Section 3 rules)
4. **Create success criteria** (Section 4 - use observable verbs)
5. **Add 2-4 progressive hints** (Section 5)
6. **Add extension challenge** (Section 6)
7. **Test yourself** and time it
8. **Estimate time** (your time × 2.5-3, round to 5 min)
9. **Run quality checklist** (Section 7)

### Reviewing Existing Exercise:

1. **Load Section 11 checklist**
2. **Verify each item** systematically
3. **Check for common mistakes** (Section 8)
4. **Fix violations**
5. **Re-test if changes made**
6. **Update time estimate** if needed

---

## 13. Quick Reference

### Minimum Requirements:
- **Objective**: 1 specific sentence
- **Difficulty**: Accurate label (beginner/intermediate/advanced)
- **Instructions**: Numbered, actionable steps
- **Success**: 3-5 measurable outcomes
- **Hints**: 2-4 progressive, no spoilers
- **Extension**: 1 optional challenge
- **Time**: Realistic estimate (tested)

### Difficulty Quick Guide:
- **Beginner**: Modify 1-10 lines, 5-15 min
- **Intermediate**: Write 20-50 lines, 15-30 min
- **Advanced**: Write 60+ lines, 30-60 min

### Success Criteria Verbs:
Outputs, Displays, Runs, Executes, Responds, Completes, Matches, Publishes, Subscribes, Passes

### Instruction Verbs:
Create, Modify, Add, Run, Test, Verify, Open, Save, Build, Source, Change

---

**Version**: 1.0 | **Word Count**: ~1,950 | **Status**: Production Ready

Use this skill for EVERY exercise across all 4 modules. Consistency enables self-directed learning.
