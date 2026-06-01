# Intuition

The important word in this problem is **sorted**.

Because the array is sorted, pointer movement has meaning. Moving `left` to the right makes the left value larger. Moving `right` to the left makes the right value smaller.

For this input:

```text
numbers = [1, 2, 4, 6, 10]
target = 8
```

Start with the widest pair:

```text
[1, 2, 4, 6, 10]
 L              R
```

The sum is `1 + 10 = 11`, which is too large.

Since the array is sorted, keeping `10` and moving `left` right would only make the sum even larger. So the safe move is to move `right` left.

## The Two Pointers Insight

At every step, the current sum tells us which side cannot help anymore.

```text
sum too small -> move left rightward
sum too large -> move right leftward
sum matches   -> answer found
```

This avoids checking every pair.

## Why Sorted Matters

Without sorted order, `current_sum < target` would not tell us which pointer to move. A larger value could be anywhere.

With sorted order, the direction is safe:

- moving `left` right increases or preserves the left value;
- moving `right` left decreases or preserves the right value.

That is why the algorithm can discard many pairs after one comparison.

## The Invariant

The useful state is the current search range `[left, right]`.

The invariant is:

```text
If a valid pair still exists, it is inside [left, right].
```

Every pointer move must preserve that truth.

## State Variables

### `left`

The index of the smaller current candidate.

### `right`

The index of the larger current candidate.

### `current_sum`

The sum of the values at `left` and `right`.

### `target`

The sum we are trying to reach.

## Complexity

Each pointer moves inward at most `n` times total.

```text
Time:  O(n)
Space: O(1)
```

## Recognition Checklist

Before writing code, check:

- Is the input sorted?
- Does the problem ask about a pair?
- Can the current comparison tell me which side to move?
- Does moving a pointer discard only impossible candidates?

If all answers are yes, opposite-direction Two Pointers is likely a good fit.

## What To Remember

Do not memorize this as "Two Pointers is for Two Sum".

Remember the deeper reason:

```text
Sorted order turns one comparison into a safe direction choice.
```
