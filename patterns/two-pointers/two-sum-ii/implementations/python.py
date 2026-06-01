"""Reference implementation for Two Sum II.

This module includes both a clean answer function and a trace-producing
function. The trace is intentionally educational and language-agnostic.
"""

from __future__ import annotations

import json
from typing import Any


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


def trace_two_sum_ii(numbers: list[int], target: int) -> dict[str, Any]:
    """Return an educational trace for opposite-direction Two Pointers."""
    steps: list[dict[str, Any]] = []
    left = 0
    right = len(numbers) - 1
    answer: list[int] | None = None

    while left < right:
        current_sum = numbers[left] + numbers[right]
        pair = [numbers[left], numbers[right]]

        if current_sum == target:
            answer = [left + 1, right + 1]
            decision = f"Current sum {current_sum} equals target {target}; answer found."
            move = "found"
        elif current_sum < target:
            decision = f"Current sum {current_sum} is smaller than target {target}; move left rightward."
            move = "left"
        else:
            decision = f"Current sum {current_sum} is greater than target {target}; move right leftward."
            move = "right"

        steps.append(
            {
                "step": len(steps) + 1,
                "action": f"Compare numbers[{left}] + numbers[{right}] = {numbers[left]} + {numbers[right]}.",
                "state": {
                    "left": left,
                    "right": right,
                    "pair": pair,
                    "current_sum": current_sum,
                    "target": target,
                    "answer": answer,
                    "move": move,
                    "highlights": [left, right],
                },
                "decision": decision,
                "why": _why_for_move(move, left, right, numbers, target, answer),
            }
        )

        if move == "found":
            break
        if move == "left":
            left += 1
        else:
            right -= 1

    if answer is None:
        raise ValueError("no pair adds up to target")

    return {
        "version": "0.1",
        "id": "two-pointers-two-sum-ii",
        "title": "Two Sum II",
        "pattern": "Two Pointers",
        "visualType": "two-pointers",
        "input": {"numbers": numbers, "target": target},
        "answer": answer,
        "steps": steps,
    }


def _why_for_move(
    move: str,
    left: int,
    right: int,
    numbers: list[int],
    target: int,
    answer: list[int] | None,
) -> str:
    if move == "found":
        return f"The values at 1-based indexes {answer} add up to {target}."
    if move == "left":
        return (
            f"Keeping {numbers[left]} cannot help because moving right leftward would only make "
            "the sum smaller or equal."
        )
    return (
        f"Keeping {numbers[right]} cannot help because moving left rightward would only make "
        "the sum larger or equal."
    )


if __name__ == "__main__":
    trace = trace_two_sum_ii([1, 2, 4, 6, 10], 8)
    print(json.dumps(trace, indent=2))
