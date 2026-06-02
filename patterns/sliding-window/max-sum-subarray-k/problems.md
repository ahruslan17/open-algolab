# Practice

OpenAlgoLab does not host submissions or grade solutions. Use these notes to learn the pattern, then solve and submit on the linked platform when a link is available.

## How To Practice This Pattern

For fixed-size sliding windows, ask:

- What enters the window when `right` moves?
- What leaves the window when the size becomes larger than `k`?
- Can the window state be updated in constant time?
- When is the window valid enough to update the answer?

Start with sums or averages, then move to counts, queues, and frequency maps. If the window size can grow or shrink based on a condition, treat it as a variable-window variation.

## Guided Problems

| Problem | Platform | Difficulty | Pattern Signal | Focus |
|---|---|---:|---|---|
| [Maximum Sum Subarray of Size K](./) | OpenAlgoLab | Beginner | Contiguous subarray with exactly `k` elements | Maintain `window_sum`, remove the left value at the right time, and initialize `best` safely. |

## Practice-Only Problems

| Problem | Platform | Difficulty | Pattern Signal | Focus |
|---|---|---:|---|---|
| [Contains Duplicate II](https://leetcode.com/problems/contains-duplicate-ii/) | LeetCode 219 | Easy | Equal values may appear within distance `k` | Keep only the last `k` values in the window and update membership as the window moves. |
| [Maximum Number of Vowels in a Substring of Given Length](https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/) | LeetCode 1456 | Medium | Fixed-length substring, maximize a count | Replace `window_sum` with `vowel_count` and update it when characters enter or leave. |
| [Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/) | LeetCode 438 | Medium | Fixed-length substring plus character frequencies | Track frequency differences and record every window that matches the target counts. |
| [Permutation in String](https://leetcode.com/problems/permutation-in-string/) | LeetCode 567 | Medium | Fixed-length substring asks whether a permutation exists | Use the same frequency-map idea as anagrams, but return as soon as a match appears. |
