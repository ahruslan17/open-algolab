# AGENTS.md

Agent instructions for working in this repository.

## Project

OpenAlgoLab is a static, dependency-free visual algorithms learning lab.

The app teaches algorithm patterns through explanations, trace data, state changes, reference implementations, and curated practice links.

## Hard Constraints

- Keep the visualizer static: HTML, CSS, vanilla JavaScript.
- Do not add dependencies without explicit approval.
- Do not add backend services, accounts, databases, submissions, hidden tests, or online judge behavior.
- Practice is curated guidance and external links, not hosted grading.
- Keep changes small, explicit, and easy to review.

## Key Commands

Run the local visualizer:

```bash
python3 scripts/serve.py
```

Validate module registry, traces, and localized trace counts:

```bash
python3 scripts/validate_modules.py
```

Check visualizer JavaScript syntax:

```bash
node --check visualizer/app.js
```

Optional implementation syntax checks:

```bash
python3 -m py_compile scripts/serve.py scripts/validate_modules.py patterns/two-pointers/two-sum-ii/implementations/python.py patterns/two-pointers/two-sum-ii/trace_generator.py patterns/sliding-window/max-sum-subarray-k/implementations/python.py patterns/sliding-window/max-sum-subarray-k/trace_generator.py
g++ -std=c++17 -fsyntax-only patterns/sliding-window/max-sum-subarray-k/implementations/cpp.cpp patterns/two-pointers/two-sum-ii/implementations/cpp.cpp
```

## Important Files

- `visualizer/app.js`: visualizer rendering, navigation, trace UI, practice UI.
- `visualizer/styles.css`: visualizer styling.
- `visualizer/locales/en.js` and `visualizer/locales/ru.js`: UI text, lesson text, localized trace explanations.
- `visualizer/modules.json`: source of truth for available visualizer modules and implementation paths.
- `patterns/*/*/trace.json`: trace data consumed by the visualizer.
- `patterns/*/*/trace_generator.py`: tooling to regenerate trace data.
- `patterns/*/*/implementations/`: clean reference implementations.
- `docs/practice-scope.md`: scope for practice links and external problem references.

## Content Rules

- Explain intuition before code.
- Every complete module should have a trace.
- Every trace step should explain what changed and why the move is safe.
- Keep reference implementations boring and readable.
- Do not copy full external problem statements; link to original platforms instead.
- Practice links should have concrete platforms and URLs unless the item is an OpenAlgoLab module.

## Localization

- Keep EN and RU locale structures in sync.
- When adding localized trace steps, update both languages and run `python3 scripts/validate_modules.py`.
- Prefer clear learner-friendly wording over literal translation.

## Git Hygiene

- Commit only intended files.
- Do not commit `.opencode/`; it is local agent memory and is gitignored.
- Run validation before committing visualizer, trace, module registry, or locale changes.
