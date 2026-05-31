# Related Problems And Variations

## Same Fixed-size Window Shape

- Average of Subarrays of Size K
- Maximum Sum Subarray of Size K
- Maximum Number of Vowels in a Substring of Given Length
- First Negative Number in Every Window of Size K
- Find All Anagrams in a String
- Permutation in String

## Slight Variations

- Return the window itself instead of the sum.
- Return all windows that tie for the best sum.
- Use floating-point averages instead of integer sums.
- Track more state, such as counts or frequencies, instead of only `window_sum`.

## Questions To Ask During Practice

- Is the window size fixed or variable?
- What enters the window when `right` moves?
- What leaves the window when `left` moves?
- Can the window state be updated in constant time?
- When exactly is a window valid enough to update the answer?
