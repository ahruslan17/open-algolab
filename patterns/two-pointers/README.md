# Two Pointers

Two Pointers is a pattern for problems where two indexes move through the same sequence to narrow the search space.

The pointers often start at opposite ends:

```text
numbers = [1, 2, 4, 6, 10]
           L           R
```

At each step, the algorithm uses the current pair to decide which pointer can move safely.

## The Key Idea

Two Pointers works when the input structure gives movement meaning.

For sorted arrays, if `numbers[left] + numbers[right]` is too small, moving `right` left would only make the sum smaller. The only useful move is to increase `left`.

If the sum is too large, moving `left` right would only make the sum larger. The useful move is to decrease `right`.

## When To Use It

Try Two Pointers when:

- the input is sorted, or can be treated from both ends;
- the problem asks about pairs, ranges, or mirrored positions;
- a decision at the current pair can safely discard part of the search space;
- brute force would compare many repeated combinations.

## Common Shapes

- Opposite-direction pointers: `left` starts at the beginning and `right` starts at the end.
- Same-direction pointers: both pointers move forward, often to track a range.
- Fast/slow pointers: one pointer moves faster to detect cycles or middle positions.

## First Module

- [Two Sum II](./two-sum-ii/)
