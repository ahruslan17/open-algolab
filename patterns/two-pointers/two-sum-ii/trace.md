# Trace: Two Sum II

Example:

```text
numbers = [1, 2, 4, 6, 10]
target = 8
answer = [2, 4]
```

| Step | Action | Left | Right | Pair | current_sum | Decision | Why |
|---:|---|---:|---:|---|---:|---|---|
| 1 | Compare `numbers[0] + numbers[4]`. | 0 | 4 | `[1, 10]` | 11 | Sum is too large, so move `right` left. | Keeping `10` cannot help because moving `left` right would only increase the sum. |
| 2 | Compare `numbers[0] + numbers[3]`. | 0 | 3 | `[1, 6]` | 7 | Sum is too small, so move `left` right. | Keeping `1` cannot help because moving `right` left would only decrease the sum. |
| 3 | Compare `numbers[1] + numbers[3]`. | 1 | 3 | `[2, 6]` | 8 | Sum equals target, so the answer is found. | The values at 1-based indexes `[2, 4]` add up to `8`. |

## What To Notice

- The pointers start at opposite ends to test the widest possible pair.
- Every comparison discards a whole group of impossible pairs.
- If the sum is too large, `right` moves left.
- If the sum is too small, `left` moves right.
- The answer uses 1-based indexes in the classic problem statement.

## Search Range Movement

The active range shrinks like this:

```text
[1, 2, 4, 6, 10]  sum 11 -> move right
 L              R

[1, 2, 4, 6, 10]  sum 7 -> move left
 L        R

[1, 2, 4, 6, 10]  sum 8 -> found
    L     R
```
