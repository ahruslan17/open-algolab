# Two Sum II

Given a sorted array of integers and a target value, find two numbers whose sum equals the target.

This module introduces the opposite-direction Two Pointers pattern.

## Example

```text
numbers = [1, 2, 4, 6, 10]
target = 8
answer = [2, 4]
```

The values at those 1-based positions are `2` and `6`, and `2 + 6 = 8`.

Important indexing note: the algorithm uses 0-based pointer indexes internally (`left = 1`, `right = 3`), but the classic problem returns 1-based answer indexes (`[2, 4]`).

## Input

- `numbers`: a sorted array of integers;
- `target`: the sum we need to find.

## Output

- The 1-based indexes of the two values that add up to `target`.

## Pattern Used

This is an opposite-direction Two Pointers problem.

A brute-force solution would test every pair. Two Pointers uses sorted order to discard impossible pairs after each comparison.

## Problem Shape

Use this pattern when all of these are true:

- the array is sorted;
- the candidate is a pair of values;
- the current sum tells us which pointer can move safely;
- we can discard many pairs without checking them one by one.

## Brute Force Baseline

The brute-force idea is:

1. Pick every first index.
2. Pair it with every later index.
3. Return the pair whose sum equals `target`.

```text
Time:  O(n^2)
Space: O(1)
```

This is correct, but it ignores sorted order.

## Two Pointers Algorithm

The optimized algorithm scans from both ends:

1. Set `left = 0` and `right = len(numbers) - 1`.
2. Compute `current_sum = numbers[left] + numbers[right]`.
3. If `current_sum == target`, return the 1-based indexes.
4. If `current_sum < target`, move `left` rightward to increase the sum.
5. If `current_sum > target`, move `right` leftward to decrease the sum.

```text
Time:  O(n)
Space: O(1)
```

## Correctness Invariant

The invariant is:

```text
If a valid pair still exists, it is inside the current [left, right] search range.
```

When the current sum is too small, every pair using the current `left` with any smaller `right` would also be too small, so `left` can move. When the current sum is too large, every pair using the current `right` with any larger `left` would also be too large, so `right` can move.

## State Variables

- `left`: index of the smaller candidate value;
- `right`: index of the larger candidate value;
- `current_sum`: sum of `numbers[left] + numbers[right]`;
- `target`: the sum we are looking for;
- `answer`: the found 1-based index pair, when available.

`left` and `right` are 0-based because they are implementation pointers. `answer` is 1-based because that is what the classic problem statement asks to return.

## Edge Cases

- exactly two numbers;
- negative numbers in a sorted array;
- duplicate values;
- no valid pair, if the problem variant does not guarantee an answer.

## Learning Path

1. [intuition.md](./intuition.md) for the mental model.
2. [trace.md](./trace.md) or the local visualizer for the step-by-step run.
3. [implementations/python.py](./implementations/python.py) for the reference code.
4. [common-mistakes.md](./common-mistakes.md) before solving practice problems.
5. [problems.md](./problems.md) for related variations.

## Local Visualizer

From the repository root, run:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8000/visualizer/
```
