# Common Mistakes

## Updating `best` Too Early

Do not update the answer before the window reaches size `k`.

For this problem, windows smaller than `k` are not valid candidates.

Wrong shape:

```python
window_sum += nums[right]
best = max(best, window_sum)  # wrong before the window has k values
```

## Removing The Left Value Too Soon

A common order bug is:

1. add the new right value;
2. remove the left value immediately;
3. then try to evaluate the window.

For a fixed-size maximum sum window, evaluate the complete window first, then remove `nums[left]` and move `left` forward.

Safe order:

```python
best = max(best, window_sum)
window_sum -= nums[left]
left += 1
```

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

Example:

```text
nums = [-5, -2, -7]
k = 2
answer = -7
```

Returning `0` would be invalid because `0` is not the sum of any size-`k` window.

## Confusing Fixed-size And Variable-size Windows

This problem has a fixed window size. There is no need for a `while` loop that shrinks based on a condition. The window slides by one position after every valid window is evaluated.

## Returning The Last Window Instead Of The Best Window

The last window is only the final candidate checked. It is not necessarily the answer.

In the example, the last window is `[1, 3, 2]` with sum `6`, but the answer is `9` from `[5, 1, 3]`.

## Losing The Meaning Of `left`

`left` should point to the first value currently inside the window.

After removing `nums[left]`, move `left` exactly once. Moving it too early or too late breaks the invariant that `window_sum` matches the current window.
