# Related Problems And Variations

## Same Opposite-direction Shape

- Two Sum II - Input Array Is Sorted
- 3Sum
- 4Sum
- Container With Most Water
- Valid Palindrome
- Squares of a Sorted Array

## Suggested Practice Order

1. **Valid Palindrome**: same inward movement, but compare characters instead of sums.
2. **Squares of a Sorted Array**: compare absolute values at both ends.
3. **Container With Most Water**: move the pointer at the smaller height.
4. **3Sum**: fix one value, then run Two Pointers on the remaining range.
5. **4Sum**: extend the same idea with two fixed values.

## Slight Variations

- Return values instead of indexes.
- Return 0-based indexes instead of 1-based indexes.
- Return all pairs that sum to the target.
- Handle duplicate pairs.
- Return `None` when no valid pair exists.

## Questions To Ask During Practice

- Is the input sorted?
- What does the current comparison prove?
- Which pointer can move without losing a possible answer?
- Does the answer need values or indexes?
- Are indexes expected to be 0-based or 1-based?

## Mini Drills

Use these small inputs to test your implementation by hand:

```text
numbers = [1, 2], target = 3 -> [1, 2]
numbers = [1, 2, 4, 6, 10], target = 8 -> [2, 4]
numbers = [-3, -1, 0, 2, 4], target = 1 -> [1, 5]
numbers = [2, 2, 3, 4], target = 4 -> [1, 2]
```
