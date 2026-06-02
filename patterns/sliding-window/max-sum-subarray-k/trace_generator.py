"""Generate the educational trace for Maximum Sum Subarray of Size K."""

from __future__ import annotations

import json
from typing import Any


def _validate_input(nums: list[int], k: int) -> None:
    if k <= 0:
        raise ValueError("k must be positive")
    if k > len(nums):
        raise ValueError("k must not be greater than len(nums)")


def trace_max_sum_subarray_k(nums: list[int], k: int) -> dict[str, Any]:
    """Return an educational trace for the fixed-size sliding window."""
    _validate_input(nums, k)

    steps: list[dict[str, Any]] = []
    window_sum = 0
    best: int | None = None
    left = 0

    for right, value in enumerate(nums):
        window_sum += value
        current_size = right - left + 1

        if current_size < k:
            steps.append(
                {
                    "step": len(steps) + 1,
                    "action": f"Add nums[{right}] = {value}; keep building the first full window.",
                    "state": {
                        "left": left,
                        "right": right,
                        "windowStart": left,
                        "windowEnd": right,
                        "window": nums[left : right + 1],
                        "window_sum": window_sum,
                        "best": best,
                        "removed": None,
                        "highlights": [right],
                    },
                    "decision": f"Window size is {current_size}, which is smaller than k = {k}.",
                    "why": "A partial window cannot answer the problem because the required size is exactly k.",
                }
            )
            continue

        previous_best = best
        best = window_sum if best is None else max(best, window_sum)
        removed = nums[left]
        window_before_slide = nums[left : right + 1]

        if previous_best is None:
            decision = f"First complete window has sum {window_sum}, so best becomes {best}."
        elif window_sum > previous_best:
            decision = f"Current window sum {window_sum} is better than previous best {previous_best}."
        else:
            decision = f"Current window sum {window_sum} does not beat best {previous_best}."

        steps.append(
            {
                "step": len(steps) + 1,
                "action": f"Evaluate window nums[{left}:{right + 1}] and prepare to slide.",
                "state": {
                    "left": left,
                    "right": right,
                    "windowStart": left,
                    "windowEnd": right,
                    "window": window_before_slide,
                    "window_sum": window_sum,
                    "best": best,
                    "removed": removed,
                    "highlights": list(range(left, right + 1)),
                },
                "decision": decision,
                "why": "Now that the window has exactly k values, it is a valid candidate for the answer.",
            }
        )

        window_sum -= removed
        left += 1

    assert best is not None
    return {
        "version": "0.1",
        "id": "sliding-window-max-sum-subarray-k",
        "title": "Maximum Sum Subarray of Size K",
        "pattern": "Sliding Window",
        "visualType": "array-window",
        "input": {"nums": nums, "k": k},
        "answer": best,
        "steps": steps,
    }


if __name__ == "__main__":
    trace = trace_max_sum_subarray_k([2, 1, 5, 1, 3, 2], 3)
    print(json.dumps(trace, indent=2))
