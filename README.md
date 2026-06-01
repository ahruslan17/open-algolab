# OpenAlgoLab

OpenAlgoLab is a free and open-source algorithms learning lab focused on visual, intuition-first explanations.

It is built for people who do not want to memorize templates blindly. Each finished topic explains how an algorithm moves, what state it keeps, why each decision is safe, where mistakes usually happen, and how to practice the pattern.

```text
Algorithm -> Trace -> Explanation -> Implementation -> Practice
```

## What Makes It Different

- **Trace-first learning**: algorithms are explained as step-by-step state changes, not only as final code.
- **Visual intuition**: each topic is designed around the mental model behind the pattern.
- **Practical interview focus**: examples are based on common problem shapes, edge cases, and variations.
- **Common mistakes included**: wrong update order, off-by-one errors, bad initialization, and other traps are part of the learning material.
- **Bilingual visualizer**: the local browser visualizer currently supports English and Russian.
- **No backend required**: the visualizer is a static browser app and runs locally.

## Current Modules

| Chapter | Pattern | Problem | Status |
|---|---|---|---|
| 01 | Sliding Window | [Maximum Sum Subarray of Size K](./patterns/sliding-window/max-sum-subarray-k/) | Complete MVP |
| 02 | Two Pointers | [Two Sum II](./patterns/two-pointers/two-sum-ii/) | Complete MVP |

Supporting docs:

- [Introduction](./docs/introduction.md)
- [Architecture](./docs/architecture.md)
- [Trace format v0.1](./docs/trace-format.md)
- [Localization guide](./docs/localization.md)
- [Local browser visualizer](./visualizer/)

## Quick Start

Run a local static server from the repository root:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open the visualizer:

```text
http://127.0.0.1:8000/visualizer/
```

The visualizer runs fully in the browser. There is no backend, database, account system, or SaaS dependency.

## Learning Format

Each topic is designed to answer the same core questions:

- What problem shape does this algorithm solve?
- What is the simplest mental model for it?
- What state does the algorithm keep?
- How does that state change after each step?
- Why is each pointer/window/state update correct?
- What are the most common implementation mistakes?
- Which related problems should I practice next?

A complete module usually contains:

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

## Repository Structure

```text
open-algolab/
  docs/                  # Architecture, trace format, localization notes
  patterns/              # Algorithm pattern modules
    sliding-window/
    two-pointers/
  visualizer/            # Dependency-free local browser visualizer
  README.md
  LICENSE
```

## Core Idea

OpenAlgoLab is built around one principle:

```text
Algorithm -> Trace -> Renderer
```

An algorithm should not only return an answer. It should also be explainable as a sequence of visible decisions:

```text
input -> current state -> decision -> state update -> why this step is correct
```

The trace is the learning source of truth. Markdown pages, the browser visualizer, CLI tools, and future renderers should all be able to describe the same algorithm movement.

## Who This Is For

- Students learning algorithms for the first time.
- Developers preparing for coding interviews.
- Self-taught programmers who want stronger fundamentals.
- Anyone who prefers visual, step-by-step explanations over memorized templates.

## Roadmap

Current focus:

- Improve the shared trace and lesson rendering model.
- Add more high-signal interview patterns before broad coverage.
- Keep the project simple, static, and easy to contribute to.

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
