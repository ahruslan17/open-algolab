# Maximum Sum Subarray of Size K

Given an array of numbers and an integer `k`, find the maximum sum of any contiguous subarray of exactly size `k`.

## Example

```text
nums = [2, 1, 5, 1, 3, 2]
k = 3
answer = 9
```

The best window is `[5, 1, 3]`, and its sum is `9`.

## Input

- `nums`: an array of integers;
- `k`: the required window size.

## Output

- The maximum sum among all contiguous windows of size `k`.

## Pattern Used

This is a fixed-size Sliding Window problem.

A brute-force solution would recompute each window sum from scratch. Sliding Window keeps a running sum and updates it when the window moves by one position.

## State Variables

- `left`: start index of the current window;
- `right`: end index of the current window;
- `window_sum`: sum of the current window values;
- `best`: best valid window sum seen so far;
- `removed`: value removed when the window slides, when applicable.

## Local Visualizer

From the repository root, run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/visualizer/
```

The visualizer renders the trace for this module.

## Files

- [intuition.md](./intuition.md) explains the core idea.
- [trace.json](./trace.json) is the source-of-truth trace.
- [trace.md](./trace.md) is a GitHub-readable trace table.
- [implementations/python.py](./implementations/python.py) contains the reference implementation.
- [common-mistakes.md](./common-mistakes.md) lists common bugs.
- [problems.md](./problems.md) lists related practice problems.
