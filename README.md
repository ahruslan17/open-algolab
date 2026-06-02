<div align="center">

# OpenAlgoLab

### Visual algorithms, explained by traces.

Learn patterns by watching state change step by step, not by memorizing templates.

<p>
  <a href="https://ahruslan17.github.io/open-algolab/visualizer/"><strong>Live Demo</strong></a>
  ·
  <a href="./visualizer/"><strong>Visualizer</strong></a>
  ·
  <a href="./docs/architecture.md"><strong>Docs</strong></a>
  ·
  <a href="./CONTRIBUTING.md"><strong>Contribute</strong></a>
</p>

<p>
  <a href="./LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
  <img alt="Static app" src="https://img.shields.io/badge/static-app-16a34a.svg">
  <img alt="No backend" src="https://img.shields.io/badge/backend-none-0f172a.svg">
  <img alt="EN and RU" src="https://img.shields.io/badge/i18n-EN%20%7C%20RU-f59e0b.svg">
</p>

</div>

---

## What It Is

OpenAlgoLab is a static, dependency-free algorithms lab.

It focuses on one thing: making algorithm movement visible.

```text
intuition -> trace -> state changes -> implementation -> practice
```

No backend. No accounts. No online judge. No hidden tests.

## Try It

Open the live visualizer:

```text
https://ahruslan17.github.io/open-algolab/visualizer/
```

## Current Modules

| Pattern | Guided problem | Practice |
|---|---|---|
| Sliding Window | [Maximum Sum Subarray of Size K](./patterns/sliding-window/max-sum-subarray-k/) | Fixed-size windows, running state, update order |
| Two Pointers | [Two Sum II](./patterns/two-pointers/two-sum-ii/) | Opposite pointers, sorted-order decisions |

## Run Locally

```bash
git clone https://github.com/ahruslan17/open-algolab.git
cd open-algolab
python3 scripts/serve.py
```

Then open:

```text
http://127.0.0.1:8000/visualizer/
```

On Windows, use `py -3 scripts/serve.py`.

## Project Shape

```text
open-algolab/
  visualizer/      static browser app
  patterns/        guided algorithm modules
  docs/            architecture and trace format
  scripts/         local validation and serving
```

## Validate

```bash
python3 scripts/validate_modules.py
node --check visualizer/app.js
```

## Practice Scope

Practice is curated learning guidance, not submission hosting.

OpenAlgoLab links to external platforms such as LeetCode when solving and judging belong there. See [Practice scope](./docs/practice-scope.md).

## Contributing

Good contributions are small and educational:

- clarify an explanation;
- improve a trace;
- add a focused practice link;
- add a clean reference implementation;
- fix confusing UI.

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Support

OpenAlgoLab is free and open-source.

- Boosty: [boosty.to/ahruslan17](https://boosty.to/ahruslan17)
- TRON TRC20: `TY48pFYWc5V82VpNb53ch8Uju5LTnyY5nF`

## License

[MIT](./LICENSE)
