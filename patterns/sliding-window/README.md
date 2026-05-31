# Sliding Window

Sliding Window is a pattern for problems about **contiguous segments** of an array or string.

It is not a magic code template. It is a way to avoid repeating work when neighboring candidates overlap.

## Start With The Picture

Imagine an array as a tape of numbers.

Now place a small frame over a few neighboring values:

```text
nums = [2, 1, 5, 1, 3, 2]
        └─────┘
        window
```

That frame is the window.

In a fixed-size sliding window, the frame always has the same width. In a variable-size sliding window, the frame can grow or shrink depending on a condition.

## The Key Observation

Neighboring windows overlap.

```text
current window: [2, 1, 5]
next window:       [1, 5, 1]
```

These are not completely different groups. The values `1` and `5` stay inside the frame. Only `2` leaves on the left, and a new `1` enters on the right.

So if we already know the current window state, we can update it instead of recomputing everything.

For a sum:

```text
new_sum = old_sum - value_leaving_left + value_entering_right
```

That is the essence of Sliding Window.

## Why This Matters

The brute-force approach treats every candidate segment as a separate problem.

Sliding Window treats the sequence as one continuous scan. It keeps useful state for the active segment and updates that state when the boundaries move.

This often changes the runtime from:

```text
number_of_windows * work_per_window
```

to:

```text
one pass over the input
```

## Historical Note

Sliding Window is not usually introduced as one classical named algorithm like Dijkstra or Quick Sort. It is a general scanning technique.

The same idea appears in many places:

- streaming analytics;
- text processing;
- network protocols;
- signal processing;
- interview problems over arrays and strings.

The common theme is always the same: process a sequence through a limited active range instead of restarting from scratch.

## The Core Invariant

A sliding window algorithm works only if we preserve a clear invariant.

An invariant is a statement that remains true while the algorithm moves.

For a fixed-size sum window:

```text
window_sum is always the sum of the values currently inside the window.
```

Every operation must preserve that truth:

```text
add value on the right  -> window_sum increases
remove value on the left -> window_sum decreases
```

Once the invariant is clear, the code becomes much easier to reason about.

## When To Use It

Try Sliding Window when:

- the candidates are contiguous subarrays or substrings;
- neighboring candidates overlap;
- the state can be updated when a value enters or leaves;
- the problem asks for a maximum, minimum, count, length, or aggregate over such segments.

## Variants

- **Fixed-size window**: the window length is always `k`.
- **Variable-size window**: the window expands and shrinks until a condition is satisfied.

## First Module

- [Maximum Sum Subarray of Size K](./max-sum-subarray-k/)
