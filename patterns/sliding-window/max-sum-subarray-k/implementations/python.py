"""Reference implementation for Maximum Sum Subarray of Size K."""

from __future__ import annotations


def _validate_input(nums: list[int], k: int) -> None:
    if k <= 0:
        raise ValueError("k must be positive")
    if k > len(nums):
        raise ValueError("k must not be greater than len(nums)")


def max_sum_subarray_k(nums: list[int], k: int) -> int:
    """Return the maximum sum of any contiguous subarray of size k."""
    _validate_input(nums, k)

    window_sum = 0
    best: int | None = None
    left = 0

    for right, value in enumerate(nums):
        window_sum += value

        if right - left + 1 == k:
            best = window_sum if best is None else max(best, window_sum)
            window_sum -= nums[left]
            left += 1

    assert best is not None
    return best
