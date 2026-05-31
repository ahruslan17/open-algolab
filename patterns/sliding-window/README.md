# Sliding Window

Sliding Window is a pattern for working with contiguous parts of an array or string.

Instead of recomputing information for every possible subarray or substring, the algorithm keeps a small amount of state for the current window and updates that state when the window moves.

## When To Use It

Sliding Window is useful when a problem asks about:

- contiguous subarrays or substrings;
- a fixed-size range, such as "every subarray of length `k`";
- the longest, shortest, maximum, minimum, or count of windows satisfying a condition;
- state that can be updated when one item enters the window and one item leaves it.

## Mental Model

A window has two boundaries:

- `left`: the first index currently inside the window;
- `right`: the last index currently inside the window.

The window moves across the input. The algorithm updates only what changed at the boundaries instead of scanning the whole window again.

## Variants

- **Fixed-size window**: the window length is always `k`.
- **Variable-size window**: the window expands and shrinks to satisfy a condition.

## First Module

- [Maximum Sum Subarray of Size K](./max-sum-subarray-k/)
