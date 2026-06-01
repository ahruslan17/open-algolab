# Trace: Maximum Sum Subarray of Size K

Example:

```text
nums = [2, 1, 5, 1, 3, 2]
k = 3
answer = 9
```

| Step | Action | Left | Right | Window | window_sum | best | Why |
|---:|---|---:|---:|---|---:|---:|---|
| 1 | Add `nums[0] = 2`; keep building the first full window. | 0 | 0 | `[2]` | 2 | — | A partial window cannot answer the problem because the required size is exactly `k`. |
| 2 | Add `nums[1] = 1`; keep building the first full window. | 0 | 1 | `[2, 1]` | 3 | — | A partial window cannot answer the problem because the required size is exactly `k`. |
| 3 | Evaluate window `nums[0:3]` and prepare to slide. | 0 | 2 | `[2, 1, 5]` | 8 | 8 | Now that the window has exactly `k` values, it is a valid candidate for the answer. |
| 4 | Evaluate window `nums[1:4]` and prepare to slide. | 1 | 3 | `[1, 5, 1]` | 7 | 8 | Now that the window has exactly `k` values, it is a valid candidate for the answer. |
| 5 | Evaluate window `nums[2:5]` and prepare to slide. | 2 | 4 | `[5, 1, 3]` | 9 | 9 | Now that the window has exactly `k` values, it is a valid candidate for the answer. |
| 6 | Evaluate window `nums[3:6]` and prepare to slide. | 3 | 5 | `[1, 3, 2]` | 6 | 9 | Now that the window has exactly `k` values, it is a valid candidate for the answer. |

## What To Notice

- Steps 1 and 2 build the first complete window. They do not update `best` because the window is smaller than `k`.
- Step 3 is the first valid candidate. From this point on, every step evaluates one full window.
- The middle values overlap between neighboring windows. Only the boundary values change.
- `best` changes only when the current full window beats the previous best.
- The final answer is not the last window sum. It is the best value preserved across all valid windows.

## Window Movement

The four valid windows are evaluated in this order:

```text
nums[0:3] = [2, 1, 5] -> 8
nums[1:4] = [1, 5, 1] -> 7
nums[2:5] = [5, 1, 3] -> 9
nums[3:6] = [1, 3, 2] -> 6
```

Every possible size-`k` window appears exactly once. That is why a single left-to-right scan is enough.
