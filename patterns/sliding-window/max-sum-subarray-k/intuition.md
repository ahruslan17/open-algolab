# Intuition

The important word in this problem is **contiguous**.

We are not choosing any `k` values from the array. We are choosing `k` values that stand next to each other.

For this input:

```text
nums = [2, 1, 5, 1, 3, 2]
k = 3
```

The valid candidates are only:

```text
[2, 1, 5] -> 8
[1, 5, 1] -> 7
[5, 1, 3] -> 9
[1, 3, 2] -> 6
```

## Brute Force

The most direct solution is:

1. Take every window of size `k`.
2. Sum all values inside it.
3. Keep the largest sum.

This is correct, but it repeats work.

When we move from:

```text
[2, 1, 5]
```

to:

```text
   [1, 5, 1]
```

we do not get a completely new group. The values `1` and `5` are still there.

Only two things changed:

- `2` left the window;
- the new `1` entered the window.

## The Sliding Window Insight

If the old sum was:

```text
2 + 1 + 5 = 8
```

then the next sum is:

```text
8 - 2 + 1 = 7
```

We did not add `1 + 5 + 1` from scratch. We reused the previous sum.

That is the whole idea:

```text
Keep the useful state of the current window.
When the window moves, update only what changed.
```

## Why Contiguous Matters

Sliding Window works here because the next candidate is predictable.

After `[2, 1, 5]`, the next size-3 candidate must be `[1, 5, 1]`. We do not need to search for it. We only move the frame one step to the right.

If the problem allowed choosing any three numbers, then `[2, 5, 3]` or `[1, 3, 2]` could both be candidates for different reasons. There would be no simple "one value leaves, one value enters" movement.

That is the first question to ask:

```text
Are candidates continuous segments of the input?
```

If yes, Sliding Window may apply. If no, this pattern is probably the wrong tool.

## The Invariant

For this problem, the useful state is `window_sum`.

The invariant is:

```text
window_sum is always the sum of the current window.
```

When a value enters on the right:

```text
window_sum += nums[right]
```

When a value leaves on the left:

```text
window_sum -= nums[left]
```

If this invariant stays true, then every time the window has exactly `k` values, we can safely compare `window_sum` with `best`.

## Update Order

For this fixed-size version, the safest order is:

```text
1. Add nums[right] to window_sum.
2. If the window size is less than k, keep building.
3. If the window size is exactly k, update best.
4. Remove nums[left] from window_sum.
5. Move left forward.
```

The evaluation happens before the removal because the full window is the candidate. Removing first would turn a valid size-`k` window into a smaller partial window.

## State Variables

### `left`

The index where the current window starts.

### `right`

The index where the current window ends.

### `window_sum`

The sum of the values currently inside the window.

### `best`

The largest valid window sum found so far.

## Complexity

Each value enters the window once. Each value leaves the window at most once.

```text
Time:  O(n)
Space: O(1)
```

The trace shows several pieces of state, but the algorithm itself only needs a few variables.

## Recognition Checklist

Before writing code, check:

- Does the problem ask about subarrays or substrings?
- Is the required length fixed as `k`?
- Can I update the answer when one value enters and one value leaves?
- Do I know exactly when the window becomes valid?

If all answers are yes, this fixed-size Sliding Window shape is likely a good fit.

## What To Remember

Do not memorize this as "Sliding Window is used for maximum sum subarray."

Remember the deeper reason:

```text
The candidates are contiguous.
Neighboring candidates overlap.
So we can move the boundaries and update state instead of starting over.
```

That is the essence of Sliding Window.
