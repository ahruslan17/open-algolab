# OpenAlgoLab

Free and open-source algorithms lab for visual, intuition-first learning.

OpenAlgoLab is a free and open-source project for learning algorithms and interview patterns from first principles.

The goal is not to memorize solutions. The goal is to understand how an algorithm moves, why it works, when to use it, and where it usually breaks.

## Why This Exists

Many algorithm resources jump too quickly from a problem statement to code. That works when you already understand the pattern, but it is frustrating when you are still building intuition.

OpenAlgoLab is built around a different order:

1. Intuition
2. Visual trace
3. Step-by-step state changes
4. Clean implementation
5. Common mistakes
6. Practice problems
7. Interview variations

## Principles

- Free forever: the core learning material should be available to everyone.
- Open-source: explanations, code, diagrams, and examples should be easy to inspect and improve.
- Intuition first: every topic starts with the idea behind the algorithm, not the final code.
- Visual when useful: algorithms should be shown through traces, tables, diagrams, or animations when that makes them easier to understand.
- Practical: each topic should explain when to use the pattern and how to recognize it in problems.
- Honest about mistakes: edge cases, wrong approaches, and common traps are part of the learning material.

## Who It Is For

- Students learning algorithms for the first time.
- Developers preparing for coding interviews.
- Self-taught programmers who want stronger fundamentals.
- Anyone who prefers visual and intuition-first explanations over memorization.

## Planned Structure

Each topic should eventually follow the same learning format:

```text
topic/
  intuition.md        # The core idea in plain language
  trace.md            # Step-by-step execution on examples
  implementation.py   # Clean reference implementation
  mistakes.md         # Common bugs and edge cases
  problems.md         # Practice problems and variations
```

## MVP Quick Start

The first complete MVP module now exists:

- [Sliding Window: Maximum Sum Subarray of Size K](./patterns/sliding-window/max-sum-subarray-k/)
- [Trace format v0.1](./docs/trace-format.md)
- [Localization guide](./docs/localization.md)
- [Local browser visualizer](./visualizer/)

Run the local static server from the repository root:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/visualizer/
```

The visualizer runs fully in the browser. There is no backend, account system, or SaaS dependency.

The MVP visualizer is structured as a small local course interface: a chapter menu, a text explanation, and an interactive trace panel for the selected algorithm.

It currently supports English and Russian via dependency-free locale files.

## Initial Roadmap

- Two pointers
- Sliding window
- Binary search
- Prefix sums
- Stacks and monotonic stacks
- BFS
- DFS
- Dijkstra's algorithm
- Dynamic programming patterns

## Example Topic Goals

A finished topic should help answer questions like:

- What problem shape does this algorithm solve?
- What is the simplest mental model for it?
- What state does the algorithm keep?
- How does that state change after each step?
- What are the most common edge cases?
- How do interview problems usually disguise this pattern?

## Contributing

The project is in an early stage, so the best contributions are simple and educational:

- Fix unclear explanations.
- Add small examples.
- Add visual traces.
- Add common mistakes and edge cases.
- Improve existing implementations without making them clever.

Please keep explanations beginner-friendly and avoid unnecessary abstractions.

## Status

OpenAlgoLab has its first complete MVP module: Sliding Window / Maximum Sum Subarray of Size K.

The next milestone is to use this module as the template for additional algorithm patterns and renderers.
