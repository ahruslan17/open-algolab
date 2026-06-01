# Maximum Sum Subarray of Size K

Given an array of numbers and an integer `k`, find the maximum sum of any contiguous subarray of exactly size `k`.

This is the canonical first OpenAlgoLab module for fixed-size Sliding Window. It is meant to show the full learning format: problem shape, intuition, trace, implementation, mistakes, practice, and variations.

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

## Problem Shape

Use this pattern when all of these are true:

- the candidates are contiguous subarrays or substrings;
- every candidate has the same length `k`;
- moving from one candidate to the next removes one item and adds one item;
- the answer depends on state that can be updated quickly, such as a sum, count, frequency map, or max/min helper.

This problem asks for a maximum sum, so the only state we need is `window_sum` and `best`.

## Brute Force Baseline

The brute-force idea is:

1. Start at every possible index `left`.
2. Sum the next `k` values from scratch.
3. Keep the largest sum.

For `n` numbers, there are roughly `n` windows, and each window costs `k` work to sum.

```text
Time:  O(n * k)
Space: O(1)
```

That is correct, but it repeats almost all work between neighboring windows.

## Sliding Window Algorithm

The optimized algorithm scans once:

1. Add the new right value to `window_sum`.
2. If the window is still smaller than `k`, keep expanding.
3. Once the window has exactly `k` values, compare `window_sum` with `best`.
4. Remove the left value from `window_sum`.
5. Move `left` forward so the next iteration builds the next window.

The key order is important:

```text
add right -> evaluate full window -> remove left -> move left
```

```text
Time:  O(n)
Space: O(1)
```

## Correctness Invariant

The invariant is:

```text
Before any valid window is evaluated, window_sum equals the sum of nums[left:right + 1].
```

When `right` moves, the new value enters the window, so we add it. After evaluating a full window, `nums[left]` must leave before the next window starts, so we subtract it and move `left`.

Because every size-`k` window is evaluated exactly once, and `best` stores the maximum valid sum seen so far, the final `best` is the answer.

## State Variables

- `left`: start index of the current window;
- `right`: end index of the current window;
- `window_sum`: sum of the current window values;
- `best`: best valid window sum seen so far;
- `removed`: value removed when the window slides, when applicable.

## Edge Cases

- `k == 1`: every single value is a valid window.
- `k == len(nums)`: the whole array is the only valid window.
- negative numbers: do not initialize `best` to `0`.
- `k <= 0`: invalid input.
- `k > len(nums)`: invalid input because no full window exists.

## Learning Path

Read this module in this order:

1. [intuition.md](./intuition.md) for the mental model.
2. [trace.md](./trace.md) or the local visualizer for the step-by-step run.
3. [implementations/python.py](./implementations/python.py) for the reference code.
4. [common-mistakes.md](./common-mistakes.md) before solving practice problems.
5. [problems.md](./problems.md) for variations that reuse the same shape.

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
