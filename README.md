<div align="center">

# OpenAlgoLab

### Visual, trace-first algorithms learning lab

Learn algorithms by watching how state changes step by step, not by memorizing templates.

<p>
  <a href="./LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
  <img alt="Static app" src="https://img.shields.io/badge/app-static-16a34a.svg">
  <img alt="No backend" src="https://img.shields.io/badge/backend-none-0f172a.svg">
  <img alt="Languages" src="https://img.shields.io/badge/i18n-EN%20%7C%20RU-f59e0b.svg">
  <img alt="Python and C++" src="https://img.shields.io/badge/implementations-Python%20%7C%20C%2B%2B-3776AB.svg">
  <img alt="Stage" src="https://img.shields.io/badge/stage-early%20MVP-7c3aed.svg">
</p>

<p>
  <a href="https://ahruslan17.github.io/open-algolab/visualizer/"><strong>Live Demo</strong></a>
  ·
  <a href="./visualizer/"><strong>Local Visualizer</strong></a>
  ·
  <a href="./patterns/sliding-window/max-sum-subarray-k/">Sliding Window</a>
  ·
  <a href="./patterns/two-pointers/two-sum-ii/">Two Pointers</a>
  ·
  <a href="./docs/architecture.md">Architecture</a>
</p>

</div>

---

> OpenAlgoLab is an early-stage MVP. The first complete modules are usable now, and the structure is actively evolving toward a broader visual algorithms reference.

## Live Demo

The visualizer is designed to run as a static site:

```text
https://ahruslan17.github.io/open-algolab/visualizer/
```

If GitHub Pages is still deploying, use the local setup below.

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
| Content | Markdown, JSON traces, visualizer module registry |
| Implementations | Python and C++ reference solutions |
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

OpenAlgoLab is a static browser app. There is no backend, build step, package install, database, or account setup.

You only need:

- Git, to clone the repository.
- Python 3.8 or newer, to run the local static server.
- A modern browser, such as Chrome, Firefox, Safari, or Edge.

### 1. Clone

```bash
git clone https://github.com/ahruslan17/open-algolab.git
cd open-algolab
```

If you downloaded the project as a ZIP archive, unzip it and open a terminal in the extracted `open-algolab` folder instead.

### 2. Check Python

Linux / macOS:

```bash
python3 --version
```

Windows PowerShell:

```powershell
py -3 --version
```

If Python is missing, install Python 3 from [python.org](https://www.python.org/downloads/). On Windows, enable the installer option that adds Python to `PATH`, or use the `py -3` launcher shown above.

### 3. Run Locally

Linux / macOS:

```bash
python3 scripts/serve.py
```

Windows PowerShell:

```powershell
py -3 scripts/serve.py
```

Windows Command Prompt:

```bat
py -3 scripts\serve.py
```

Then open:

```text
http://127.0.0.1:8000/visualizer/
```

Stop the server with `Ctrl+C`.

### Optional Run Settings

Use another port if `8000` is busy:

```bash
python3 scripts/serve.py --port 8080
```

On Windows:

```powershell
py -3 scripts/serve.py --port 8080
```

Serve on a different host/interface only when you know why you need it:

```bash
python3 scripts/serve.py --host 127.0.0.1 --port 8000
```

The server serves the repository root and the visualizer lives at `/visualizer/`.

### Manual Fallback

If you do not want to use `scripts/serve.py`, run Python's built-in static server from the repository root:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Windows PowerShell fallback:

```powershell
py -3 -m http.server 8000 --bind 127.0.0.1
```

## Validation

Before changing modules, traces, implementations, or localized trace text, run:

```bash
python3 scripts/validate_modules.py
```

Windows PowerShell:

```powershell
py -3 scripts/validate_modules.py
```

The validator checks `visualizer/modules.json`, linked `trace.json` files, `trace_generator.py` files, Python/C++ implementation file paths, supported visualizer types, required trace fields, step state shape, and EN/RU localized trace step counts.

## What A Module Contains

Each algorithm module is designed as a small learning package:

```text
topic/
  README.md              # Overview, problem shape, algorithm, edge cases
  intuition.md           # The core idea in plain language
  trace.md               # GitHub-readable step-by-step trace
  trace.json             # Source-of-truth trace data
  trace_generator.py      # Tooling to regenerate trace.json
  common-mistakes.md     # Frequent bugs and wrong approaches
  problems.md            # Practice problems and variations
  implementations/
    python.py            # Clean reference implementation
    cpp.cpp              # Clean reference implementation
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
    modules.json         # Visualizer registry for traces and source implementations
  scripts/               # Local development helpers
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

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the module format, validation command, and contribution workflow.

## Support

OpenAlgoLab is free and open-source. If it helps you learn algorithms or prepare for interviews, you can support its development:

- Boosty: [boosty.to/ahruslan17](https://boosty.to/ahruslan17)
- TRON (TRC20): `TY48pFYWc5V82VpNb53ch8Uju5LTnyY5nF`

Support is optional. The core learning materials will remain free.

## License

OpenAlgoLab is released under the [MIT License](./LICENSE).
