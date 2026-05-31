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

## State Variables

### `left`

The index where the current window starts.

### `right`

The index where the current window ends.

### `window_sum`

The sum of the values currently inside the window.

### `best`

The largest valid window sum found so far.

## What To Remember

Do not memorize this as "Sliding Window is used for maximum sum subarray."

Remember the deeper reason:

```text
The candidates are contiguous.
Neighboring candidates overlap.
So we can move the boundaries and update state instead of starting over.
```

That is the essence of Sliding Window.
