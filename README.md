<div align="center">

# OpenAlgoLab

### Visual, trace-first algorithms learning lab

Learn algorithms by watching how state changes step by step, not by memorizing templates.

<p>
  <a href="./LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
  <img alt="Static app" src="https://img.shields.io/badge/app-static-16a34a.svg">
  <img alt="No backend" src="https://img.shields.io/badge/backend-none-0f172a.svg">
  <img alt="Languages" src="https://img.shields.io/badge/i18n-EN%20%7C%20RU-f59e0b.svg">
  <img alt="Python" src="https://img.shields.io/badge/python-reference%20implementations-3776AB.svg">
</p>

<p>
  <a href="./visualizer/"><strong>Open Visualizer</strong></a>
  ·
  <a href="./patterns/sliding-window/max-sum-subarray-k/">Sliding Window</a>
  ·
  <a href="./patterns/two-pointers/two-sum-ii/">Two Pointers</a>
  ·
  <a href="./docs/architecture.md">Architecture</a>
</p>

</div>

---

## Why OpenAlgoLab Exists

Most algorithm resources jump from a problem statement to final code too quickly. That is useful after you already understand the pattern, but it is frustrating when you are still building intuition.

OpenAlgoLab takes a different route:

```text
Intuition -> Trace -> State changes -> Implementation -> Mistakes -> Practice
```

Each finished topic explains what the algorithm is doing, why each movement is safe, which state is being maintained, where edge cases appear, and how the same pattern shows up in related problems.

## Tech Stack

| Area | Technology |
|---|---|
| Visualizer | HTML, CSS, vanilla JavaScript |
| Content | Markdown, JSON traces |
| Implementations | Python reference solutions |
| Runtime | Static browser app, local HTTP server |
| Localization | Dependency-free EN/RU locale files |
| License | MIT |

No framework, backend, database, build step, or account system is required.

## Current Learning Modules

| Chapter | Pattern | Problem | What It Teaches | Status |
|---|---|---|---|---|
| 01 | Sliding Window | [Maximum Sum Subarray of Size K](./patterns/sliding-window/max-sum-subarray-k/) | Fixed-size window, running state, update order | Complete MVP |
| 02 | Two Pointers | [Two Sum II](./patterns/two-pointers/two-sum-ii/) | Opposite-direction pointers, sorted-order decisions | Complete MVP |

Supporting documentation:

- [Introduction](./docs/introduction.md)
- [Architecture](./docs/architecture.md)
- [Trace format v0.1](./docs/trace-format.md)
- [Localization guide](./docs/localization.md)

## Quick Start

Clone the repository and run a static server from the project root:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open the local visualizer:

```text
http://127.0.0.1:8000/visualizer/
```

The visualizer runs fully in the browser.

## What A Module Contains

Each algorithm module is designed as a small learning package:

```text
topic/
  README.md              # Overview, problem shape, algorithm, edge cases
  intuition.md           # The core idea in plain language
  trace.md               # GitHub-readable step-by-step trace
  trace.json             # Source-of-truth trace data
  common-mistakes.md     # Frequent bugs and wrong approaches
  problems.md            # Practice problems and variations
  implementations/
    python.py            # Reference implementation and trace generator
```

Every complete module should answer:

- What problem shape does this algorithm solve?
- What is the simplest mental model?
- What state does the algorithm keep?
- How does that state change step by step?
- Why is each pointer/window/state update correct?
- What mistakes are common in implementation?
- Which related problems should be practiced next?

## Core Design Principle

OpenAlgoLab is built around one idea:

```text
Algorithm -> Trace -> Renderer
```

An algorithm should not only return an answer. It should also be explainable as visible decisions:

```text
input -> current state -> decision -> state update -> why this step is correct
```

The trace is the learning source of truth. Markdown pages, the browser visualizer, CLI tools, and future renderers should all be able to describe the same algorithm movement.

## Repository Structure

```text
open-algolab/
  docs/                  # Architecture, trace format, localization notes
  patterns/              # Algorithm pattern modules
    sliding-window/
    two-pointers/
  visualizer/            # Dependency-free browser visualizer
  .github/FUNDING.yml
  LICENSE
  README.md
```

## Who It Is For

- Students learning algorithms for the first time.
- Developers preparing for coding interviews.
- Self-taught programmers who want stronger fundamentals.
- Anyone who prefers visual, step-by-step explanations over memorized templates.

## Roadmap

Current focus:

- Reduce duplication between trace data and visualizer data.
- Improve shared lesson rendering for future chapters.
- Add more high-signal interview patterns before broad coverage.
- Keep the project static, simple, and easy to contribute to.

Planned pattern areas:

- Binary search
- Prefix sums
- Stacks and monotonic stacks
- BFS
- DFS
- Dijkstra's algorithm
- Dynamic programming patterns

## Contributing

OpenAlgoLab is early-stage, so the best contributions are simple and educational:

- Fix unclear explanations.
- Add small examples.
- Improve visual traces.
- Add edge cases and common mistakes.
- Add practice variations.
- Improve implementations without making them clever.

Please keep explanations beginner-friendly, explicit, and practical. Prefer clear educational code over compact tricks.

## Support

OpenAlgoLab is free and open-source. If it helps you learn algorithms or prepare for interviews, you can support its development:

- Boosty: [boosty.to/ahruslan17](https://boosty.to/ahruslan17)
- TRON (TRC20): `TY48pFYWc5V82VpNb53ch8Uju5LTnyY5nF`

Support is optional. The core learning materials will remain free.

## License

OpenAlgoLab is released under the [MIT License](./LICENSE).
