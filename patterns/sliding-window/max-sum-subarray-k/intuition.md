# Intuition

The direct way to solve this problem is to list every subarray of size `k` and sum each one.

For `nums = [2, 1, 5, 1, 3, 2]` and `k = 3`, that means:

```text
[2, 1, 5] -> 8
[1, 5, 1] -> 7
[5, 1, 3] -> 9
[1, 3, 2] -> 6
```

This works, but it repeats work. Neighboring windows mostly contain the same values.

When the window moves from `[2, 1, 5]` to `[1, 5, 1]`:

- `2` leaves the window;
- `1` enters the window;
- `1` and `5` stay.

So the new sum can be computed from the old sum:

```text
new_window_sum = old_window_sum - value_that_left + value_that_entered
```

That is the sliding window idea: update only the boundary changes.

## State Variables

### `left`

`left` is the first index in the current window. For a fixed-size window, it moves forward after every valid window is processed.

### `right`

`right` is the index currently being added to the window. It moves from the start of the array to the end.

### `window_sum`

`window_sum` is the sum of the values currently inside the window. It grows when `right` adds a value and shrinks when `left` removes a value.

### `best`

`best` is the largest sum seen among complete windows of size `k`. It is updated only after the window reaches size `k`.

## Why This Avoids Recomputation

Every array element is added to `window_sum` once and removed at most once. The algorithm does constant work per index, so the total time is `O(n)` instead of recomputing each window in `O(k)` time.
