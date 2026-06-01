# Related Problems And Variations

## Same Fixed-size Window Shape

- Average of Subarrays of Size K
- Maximum Sum Subarray of Size K
- Maximum Number of Vowels in a Substring of Given Length
- First Negative Number in Every Window of Size K
- Find All Anagrams in a String
- Permutation in String

## Suggested Practice Order

1. **Average of Subarrays of Size K**: same state as this module, but divide each full-window sum by `k`.
2. **Maximum Number of Vowels in a Substring of Given Length**: replace `window_sum` with a vowel count.
3. **First Negative Number in Every Window of Size K**: keep a small queue of negative-number indexes.
4. **Find All Anagrams in a String**: replace the sum with a frequency map.
5. **Permutation in String**: same frequency-map idea, but return a boolean.

## Slight Variations

- Return the window itself instead of the sum.
- Return all windows that tie for the best sum.
- Use floating-point averages instead of integer sums.
- Track more state, such as counts or frequencies, instead of only `window_sum`.
- Return the start index of the best window.
- Count how many valid windows satisfy a threshold.

## Questions To Ask During Practice

- Is the window size fixed or variable?
- What enters the window when `right` moves?
- What leaves the window when `left` moves?
- Can the window state be updated in constant time?
- When exactly is a window valid enough to update the answer?

## Mini Drills

Use these small inputs to test your implementation by hand:

```text
nums = [5], k = 1 -> 5
nums = [1, 2, 3], k = 3 -> 6
nums = [-5, -2, -7], k = 2 -> -7
nums = [4, 1, 1, 9, 1], k = 2 -> 10
```

If any of these fail, check update order, `best` initialization, and invalid input handling.
