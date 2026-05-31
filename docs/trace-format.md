# Trace Format v0.1

OpenAlgoLab traces are language-agnostic JSON documents that describe how an algorithm moves through an input.

The trace is the source of truth. Markdown tables, browser visualizers, CLI output, and future renderers should all be generated from or aligned with the same trace data.

## Required Top-level Fields

```json
{
  "version": "0.1",
  "id": "sliding-window-max-sum-subarray-k",
  "title": "Maximum Sum Subarray of Size K",
  "pattern": "Sliding Window",
  "visualType": "array-window",
  "input": {},
  "answer": null,
  "steps": []
}
```

### `version`

Trace format version. The first version is `0.1`.

### `id`

Stable machine-readable trace identifier.

### `title`

Human-readable title.

### `pattern`

Algorithmic pattern or family, such as `Sliding Window`.

### `visualType`

Renderer hint, such as `array-window`. This should not contain UI-specific state.

### `input`

The input used for the trace.

### `answer`

The final answer for the traced input.

### `steps`

Ordered list of trace steps.

## Required Step Fields

Each step must include:

```json
{
  "step": 1,
  "action": "Describe what changes now.",
  "state": {},
  "decision": "Describe the decision being made.",
  "why": "Explain why this step is correct."
}
```

### `step`

One-based step number.

### `action`

Short description of what the algorithm does at this step.

### `state`

Current algorithm state after the action. For array-window traces, useful fields include:

- `left`;
- `right`;
- `windowStart`;
- `windowEnd`;
- `window`;
- `window_sum`;
- `best`;
- `removed`;
- `highlights`.

### `decision`

The comparison, condition, or choice made at this step.

### `why`

The educational explanation. This field is required because OpenAlgoLab traces are meant to explain reasoning, not only animation state.

## Guidelines

- Keep traces independent from any programming language.
- Keep traces independent from any specific UI framework.
- Prefer explicit state over hidden renderer assumptions.
- Include enough state for a renderer to show the current input, pointers, highlights, and important variables.
- Make `decision` and `why` clear enough to be useful without reading the implementation.
