# OpenAlgoLab Architecture

Date: 2026-06-01

## Core Idea

OpenAlgoLab should be built around one architectural principle:

```text
Algorithm -> Trace -> Renderer
```

An algorithm should not only return an answer. It should also be able to produce a step-by-step trace of its decisions, state changes, and reasoning.

```text
input -> algorithm runner -> trace steps -> markdown / browser / CLI / website
```

The trace is the source of truth. The browser, Markdown files, CLI output, and future website are renderers of the same trace data.

This keeps the project useful even before a polished website exists.

## Product Principle

OpenAlgoLab is not a solution dump, LeetCode clone, or generic notes repository.

It should be a free and open-source visual algorithm lab where every finished topic explains the algorithm as a sequence of visible decisions.

Core framing:

```text
OpenAlgoLab = open-source algorithm debugger for learning.
```

Hard rule:

```text
No topic is complete without a trace.
```

## Key Feature

The key feature is **Interactive Algorithm Trace**.

Each trace step should answer:

- What is the current input or structure?
- What is the current algorithm state?
- What decision is being made?
- How does the state change?
- Why is this step correct?

Conceptually:

```text
input -> current state -> decision -> state update -> why this step is correct
```

Every useful trace step must include `decision` and `why`. These fields are what make the project educational rather than just visual.

## Repository Shape

Long-term target structure:

```text
open-algolab/
  README.md
  LICENSE
  CONTRIBUTING.md

  patterns/
    sliding-window/
      README.md
      fixed-size-window/
        README.md
        explanation.md
        implementation.py
        trace.json
        trace.md
        problems.md
        common-mistakes.md
      variable-size-window/
        README.md
        explanation.md
        implementation.py
        trace.json
        trace.md
        problems.md
        common-mistakes.md

    two-pointers/
      README.md
      opposite-direction/
      same-direction/

    bfs/
      README.md
      graph-traversal/
      shortest-path-unweighted/

    binary-search/
      README.md
      classic-search/
      binary-search-on-answer/

  traces/
    schema/
      trace.schema.json
    examples/
      sliding-window-max-sum.json

  visualizer/
    index.html
    src/
      app.js
      state.js
      renderers/
        array-renderer.js
        graph-renderer.js
        table-renderer.js
        code-renderer.js
        explanation-renderer.js
      patterns/
        sliding-window.js
        two-pointers.js
        bfs.js
      styles/
        main.css

  tools/
    trace_to_markdown.py
    validate_trace.py

  docs/
    architecture.md
    trace-format.md
    authoring-guide.md
```

The initial version should be much smaller, but it should preserve the same direction.

## Layers

OpenAlgoLab has six logical layers:

```text
1. Content Layer
2. Algorithm Layer
3. Trace Layer
4. Renderer Layer
5. Visualizer Layer
6. Tooling Layer
```

## 1. Content Layer

The content layer explains the idea, when to use it, where it breaks, and how to practice it.

It lives under `patterns/`.

Example:

```text
patterns/sliding-window/fixed-size-window/
  README.md
  explanation.md
  problems.md
  common-mistakes.md
```

Each topic should answer four questions:

- What is it?
- When do I use it?
- How does it move?
- Where does it break?

Example for Sliding Window:

```text
What is it?
A technique for scanning contiguous segments of an array or string.

When do I use it?
When the problem asks about subarrays/substrings and the state can be updated as boundaries move.

How does it move?
The right pointer expands the window. The left pointer shrinks or slides it.

Where does it break?
Invalid update order, off-by-one errors, and wrong shrink conditions.
```

## 2. Algorithm Layer

The algorithm layer contains clean reference implementations.

At the start, Python is enough.

Each example can have two functions:

- A clean solution function that returns the answer.
- A trace function that returns structured trace data.

Example shape:

```python
def max_sum_subarray_k(nums: list[int], k: int) -> int:
    window_sum = 0
    best = float("-inf")

    for right, value in enumerate(nums):
        window_sum += value

        if right >= k - 1:
            best = max(best, window_sum)
            window_sum -= nums[right - k + 1]

    return best
```

Trace functions may duplicate some logic from the clean solution. That is acceptable. Educational clarity is more important than premature abstraction.

## 3. Trace Layer

The trace layer is the most important part of the project.

Trace files should be UI-independent JSON documents.

Example location:

```text
patterns/sliding-window/max-sum-subarray-k/trace.json
```

Minimal trace shape:

```json
{
  "version": "0.1",
  "id": "sliding-window.max-sum-subarray-k",
  "title": "Maximum Sum Subarray of Size K",
  "pattern": "sliding-window",
  "visualType": "array",
  "input": {
    "nums": [2, 1, 5, 1, 3, 2],
    "k": 3
  },
  "answer": 9,
  "steps": [
    {
      "step": 1,
      "action": "add_right",
      "left": 0,
      "right": 0,
      "windowStart": 0,
      "windowEnd": 0,
      "highlights": [0],
      "state": {
        "window_sum": 2,
        "best": null
      },
      "decision": "Add nums[right] to the current window.",
      "why": "The algorithm expands the window until it reaches size k."
    }
  ]
}
```

Required top-level fields:

- `version`
- `id`
- `title`
- `pattern`
- `input`
- `answer`
- `steps`

Required fields for every step:

- `step`
- `action`
- `state`
- `decision`
- `why`

The first trace schema should stay simple. It should support the first few patterns well instead of trying to model every possible algorithm perfectly.

## Visual Types

Different patterns need different visual renderers.

### Array Renderer

Used for:

- Sliding Window
- Two Pointers
- Binary Search
- Prefix Sum
- Monotonic Stack partially

Useful fields:

```json
{
  "visualType": "array",
  "left": 0,
  "right": 2,
  "mid": 1,
  "windowStart": 0,
  "windowEnd": 2,
  "highlights": [0, 1, 2],
  "discarded": [4, 5]
}
```

### Graph Renderer

Used for:

- BFS
- DFS
- Dijkstra
- Topological Sort
- Union Find partially

Useful fields:

```json
{
  "visualType": "graph",
  "currentNode": "A",
  "currentEdge": ["A", "B"],
  "visited": ["A"],
  "queue": ["B", "C"],
  "highlightedNodes": ["A", "B"],
  "highlightedEdges": [["A", "B"]]
}
```

### Table Renderer

Used for:

- Dynamic Programming
- Prefix Sum Matrix
- Graph adjacency matrix

Useful fields:

```json
{
  "visualType": "table",
  "currentCell": [2, 3],
  "dependencyCells": [[1, 3], [2, 2]],
  "table": [
    [0, 0, 0],
    [0, 1, 1]
  ],
  "formula": "dp[i][j] = dp[i - 1][j] + dp[i][j - 1]"
}
```

### Stack Renderer

Used for:

- Monotonic Stack
- Valid Parentheses
- Iterative DFS
- Next Greater Element

Useful fields:

```json
{
  "visualType": "stack",
  "currentIndex": 3,
  "stack": [1, 2],
  "popped": [4],
  "pushed": 3
}
```

## 4. Renderer Layer

Renderers convert trace steps into visual output.

A renderer should not know the algorithm. It should only know how to display a visual type.

Example renderer split:

```text
array-renderer.js
graph-renderer.js
table-renderer.js
state-renderer.js
code-renderer.js
explanation-renderer.js
```

Conceptual flow:

```javascript
function renderStep(trace, stepIndex) {
  const step = trace.steps[stepIndex];

  renderExplanation(step);
  renderState(step.state);
  renderCode(trace.code, step.codeLine);

  if (step.visualType === "array" || trace.visualType === "array") {
    renderArray(trace.input.nums, step);
  }

  if (step.visualType === "graph" || trace.visualType === "graph") {
    renderGraph(trace.graph, step);
  }

  if (step.visualType === "table" || trace.visualType === "table") {
    renderTable(step.table, step);
  }
}
```

Principle:

```text
Trace chooses what happened.
Renderer chooses how to show it.
```

## 5. Visualizer Layer

The visualizer should be a local browser app first.

Start without React, Vite, or other dependencies:

```text
visualizer/
  index.html
  app.js
  styles.css
```

Reasons:

- zero dependencies;
- easy local usage;
- easy contribution;
- fast first demo;
- less tooling noise.

The first visualizer can embed one trace directly in JavaScript. Later it can load `trace.json` files via a local server or a static website.

Local JSON loading through `file://` can hit browser restrictions, so the first version can use embedded examples.

Later local usage:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/visualizer/
```

## Visualizer Layout

The first UI should prioritize clarity over polish.

Target layout:

```text
┌─────────────────────────────────────────────────────────────┐
│ OpenAlgoLab                                                 │
│ Pattern: Sliding Window                                     │
│ Example: Maximum Sum Subarray of Size K                     │
├───────────────────────────────┬─────────────────────────────┤
│ Explanation                   │ Visualization               │
│                               │                             │
│ Step 4 / 12                   │ [2] [1] [5] [1] [3] [2]      │
│ Action: update_best           │  L       R                  │
│                               │                             │
│ Decision                      │ Window: [2, 1, 5]           │
│ Update the best answer.       │                             │
│                               │ State                       │
│ Why                           │ window_sum: 8               │
│ The window size is exactly k. │ best: 8                     │
├───────────────────────────────┴─────────────────────────────┤
│ Code                                                        │
│                                                             │
│ if right - left + 1 == k:                                   │
│     best = max(best, window_sum)  <-- highlighted           │
├─────────────────────────────────────────────────────────────┤
│ Previous | Next | Reset | Autoplay                          │
└─────────────────────────────────────────────────────────────┘
```

The first version only needs:

- array visualization;
- left/right labels;
- window highlight;
- state block;
- decision block;
- why block;
- previous/next/reset controls.

## 6. Tooling Layer

Tools should keep traces consistent and reduce manual duplication.

Minimal future tooling:

```text
tools/
  trace_to_markdown.py
  validate_trace.py
```

`validate_trace.py` should check:

- required top-level fields exist;
- every step has `step`, `action`, `state`, `decision`, and `why`;
- step numbers are ordered;
- pattern is known;
- visual type is known.

`trace_to_markdown.py` should generate `trace.md` from `trace.json`.

Long term, `trace.json` should be the source of truth and `trace.md` can be generated for GitHub readability.

## Minimum MVP Structure

The first real version should be small:

```text
open-algolab/
  README.md
  LICENSE

  patterns/
    sliding-window/
      README.md
      max-sum-subarray-k/
        README.md
        implementation.py
        trace.json
        trace.md
        common-mistakes.md
        problems.md

  visualizer/
    index.html
    app.js
    styles.css

  docs/
    architecture.md
    trace-format.md
```

This is enough to prove the concept.

## First Module

The first module should be:

```text
patterns/sliding-window/max-sum-subarray-k/
```

Reasons:

- simple algorithm;
- easy visualization;
- clear state changes;
- good demonstration of trace value;
- no complex UI needed.

Files:

```text
README.md              # task and pattern overview
implementation.py      # clean solution and trace function
trace.json             # structured step data
trace.md               # GitHub-readable trace table
common-mistakes.md     # off-by-one, wrong update order, wrong left update
problems.md            # similar problems and variations
```

## Stages

### Stage 1

Goal: create one complete trace-based module and one local browser visualizer.

Scope:

- Sliding Window: Maximum Sum Subarray of Size K;
- trace JSON;
- Markdown trace;
- simple array visualizer;
- docs for trace format.

### Stage 2

Goal: validate the architecture with more visual types.

Add:

- Two Pointers example;
- BFS example;
- array renderer improvements;
- graph renderer;
- basic trace validation script.

### Stage 3

Goal: publish a static site.

Options:

- GitHub Pages first;
- Vite/React only if plain JavaScript becomes limiting;
- keep traces as static data.

Do not move to a full frontend stack before at least three strong modules exist.

## When To Use React Or Vite

Do not start with React/Vite.

Consider moving to a framework only when the project needs:

- routing;
- multiple visual types;
- reusable complex components;
- input editor;
- code highlighting;
- GitHub Pages build pipeline;
- larger documentation website.

Before that, plain HTML/CSS/JavaScript is the better tradeoff.

## Contribution Model

Future contributors should follow a strict topic checklist.

Every topic must include:

- `README.md`
- `implementation.py`
- `trace.json`
- `trace.md`
- `common-mistakes.md`
- `problems.md`

Every trace step must include:

- `action`
- `state`
- `decision`
- `why`

Quality checklist:

- Explains when to use the pattern.
- Shows state changes step by step.
- Includes at least one trace.
- Includes common mistakes.
- Includes practice problems.
- Uses beginner-friendly language.
- Avoids clever code in beginner examples.

## Project Rules

The architecture should preserve these rules:

- No topic without trace.
- No trace step without `why`.
- No clever code in beginner examples.
- Prefer one excellent example over five shallow examples.
- Pattern recognition is as important as implementation.
- Markdown first, browser second, website third.
- Trace data is the source of truth.

## Final Summary

OpenAlgoLab should be trace-first.

```text
patterns/      educational content and examples
trace.json     source of truth for step-by-step execution
trace.md       GitHub-readable trace
visualizer/    local browser renderer for traces
```

Main formula:

```text
Algorithms produce traces.
OpenAlgoLab renders traces.
```

Quality criterion:

```text
After reading or playing a trace, a beginner should understand not only what the algorithm did, but why every step was necessary.
```
