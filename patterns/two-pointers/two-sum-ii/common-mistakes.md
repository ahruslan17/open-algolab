# Common Mistakes

## Forgetting The Input Must Be Sorted

The pointer movement logic depends on sorted order.

If the array is not sorted, `current_sum < target` does not prove that moving `left` is safe.

## Moving The Wrong Pointer

Safe movement:

```text
current_sum < target -> left += 1
current_sum > target -> right -= 1
```

Reversing these moves makes the algorithm discard the wrong candidates.

## Returning 0-based Indexes

The classic Two Sum II problem expects 1-based indexes.

The implementation pointers are usually 0-based, but the returned answer is shifted by `+1`.

If `left = 1` and `right = 3`, the returned answer is:

```text
[2, 4]
```

not:

```text
[1, 3]
```

## Continuing After The Answer Is Found

Once `current_sum == target`, the pair is found. Return immediately.

## Using Nested Loops By Habit

Nested loops are correct but miss the point of sorted order.

The goal is to make one comparison discard many impossible pairs.

## Losing The Search Invariant

`left` and `right` define the remaining search range.

After each move, the algorithm should still be able to say:

```text
If a valid pair exists, it is still between left and right.
```
