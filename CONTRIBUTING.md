# Contributing to OpenAlgoLab

OpenAlgoLab is an early-stage educational project. The best contributions are small, clear, and easy to review.

## Principles

- Teach the idea before the template.
- Keep explanations beginner-friendly and explicit.
- Prefer boring reference code over clever shortcuts.
- Every complete module should have a trace.
- Every trace step should explain what changed and why the move is safe.
- Keep the visualizer static and dependency-free unless a dependency is explicitly discussed first.

## Local Setup

Clone the repository:

```bash
git clone https://github.com/ahruslan17/open-algolab.git
cd open-algolab
```

Run the local visualizer:

```bash
python3 scripts/serve.py
```

Windows PowerShell:

```powershell
py -3 scripts/serve.py
```

Open:

```text
http://127.0.0.1:8000/visualizer/
```

## Validation

Run this before opening a pull request:

```bash
python3 scripts/validate_modules.py
node --check visualizer/app.js
python3 -m py_compile scripts/serve.py scripts/validate_modules.py patterns/two-pointers/two-sum-ii/implementations/python.py patterns/two-pointers/two-sum-ii/trace_generator.py patterns/sliding-window/max-sum-subarray-k/implementations/python.py patterns/sliding-window/max-sum-subarray-k/trace_generator.py
g++ -std=c++17 -fsyntax-only patterns/sliding-window/max-sum-subarray-k/implementations/cpp.cpp patterns/two-pointers/two-sum-ii/implementations/cpp.cpp
```

If you do not have Node or g++, still run the Python validator and mention which checks you could not run.

## Module Format

Each complete module should follow this shape:

```text
patterns/<pattern>/<problem>/
  README.md
  intuition.md
  trace.md
  trace.json
  trace_generator.py
  common-mistakes.md
  problems.md
  implementations/
    python.py
    cpp.cpp
```

Reference implementations should stay short and focused. Trace-generation tooling belongs in `trace_generator.py`, not in `implementations/python.py`.

## Adding a Module

1. Create the module folder under `patterns/`.
2. Add the Markdown learning files.
3. Add `trace.json` and `trace_generator.py`.
4. Add clean Python and C++ reference implementations.
5. Register the module in `visualizer/modules.json`.
6. Add EN/RU lesson and localized trace text in `visualizer/locales/`.
7. Run `python3 scripts/validate_modules.py`.
8. Open the visualizer locally and test the trace step by step.

## Pull Request Style

- Keep one logical change per PR.
- Explain what changed and why.
- Include the validation commands you ran.
- Avoid broad refactors mixed with content changes.
- Do not add dependencies without opening a discussion first.
