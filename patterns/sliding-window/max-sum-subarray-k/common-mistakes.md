# Common Mistakes

## Updating `best` Too Early

Do not update the answer before the window reaches size `k`.

For this problem, windows smaller than `k` are not valid candidates.

## Removing The Left Value Too Soon

A common order bug is:

1. add the new right value;
2. remove the left value immediately;
3. then try to evaluate the window.

For a fixed-size maximum sum window, evaluate the complete window first, then remove `nums[left]` and move `left` forward.

## Off-by-One Window Size

The current window size is:

```text
right - left + 1
```

Forgetting `+ 1` is a frequent source of wrong boundaries.

## Forgetting Invalid Inputs

Handle cases where:

- `k <= 0`;
- `k > len(nums)`.

These inputs do not define a valid fixed-size window.

## Initializing `best` To `0`

If the array may contain negative numbers, `best = 0` can be wrong.

Use the first valid window sum, or initialize with negative infinity.

## Confusing Fixed-size And Variable-size Windows

This problem has a fixed window size. There is no need for a `while` loop that shrinks based on a condition. The window slides by one position after every valid window is evaluated.
