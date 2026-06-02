"""Reference implementation for Two Sum II."""

from __future__ import annotations


def two_sum_ii(numbers: list[int], target: int) -> list[int]:
    """Return 1-based indexes of two values that add up to target."""
    left = 0
    right = len(numbers) - 1

    while left < right:
        current_sum = numbers[left] + numbers[right]

        if current_sum == target:
            return [left + 1, right + 1]

        if current_sum < target:
            left += 1
        else:
            right -= 1

    raise ValueError("no pair adds up to target")
