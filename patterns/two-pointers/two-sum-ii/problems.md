# Practice

OpenAlgoLab does not host submissions or grade solutions. Use these notes to learn the pointer movement, then solve and submit on the linked platform when a link is available.

## How To Practice This Pattern

For opposite-direction two pointers, ask:

- Is the input sorted, or can sorting be used safely?
- What does the current comparison prove?
- Which pointer can move without losing a possible answer?
- Does the answer need values, indexes, or all unique combinations?
- Are duplicates important?

Start with simple inward movement, then practice problems where one or more values are fixed before running two pointers on the remaining range.

## Guided Problems

| Problem | Platform | Difficulty | Pattern Signal | Focus |
|---|---|---:|---|---|
| [Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) | LeetCode 167 | Medium | Sorted array, find one pair with a target sum | Use the sum comparison to prove whether `left` or `right` can move safely. |

## Practice-Only Problems

| Problem | Platform | Difficulty | Pattern Signal | Focus |
|---|---|---:|---|---|
| [Valid Palindrome](https://leetcode.com/problems/valid-palindrome/) | LeetCode 125 | Easy | Compare matching characters from both ends | Move inward after each valid comparison and skip ignored characters carefully. |
| [Squares of a Sorted Array](https://leetcode.com/problems/squares-of-a-sorted-array/) | LeetCode 977 | Easy | Sorted input, largest square may be at either end | Compare absolute values and fill the output from right to left. |
| [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) | LeetCode 11 | Medium | Two ends form a candidate, width shrinks each step | Move the pointer at the smaller height and understand why the other move cannot help. |
| [3Sum](https://leetcode.com/problems/3sum/) | LeetCode 15 | Medium | Sort, fix one value, then find pairs in the remaining range | Avoid duplicate triplets and reuse the Two Sum II movement inside each fixed range. |
