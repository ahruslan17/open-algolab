#!/usr/bin/env python3
"""Validate OpenAlgoLab visualizer modules.

The script uses only the Python standard library. It checks that the module
registry, trace files, implementation files, and localized trace step counts
stay in sync as new chapters are added.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parents[1]
VISUALIZER_DIR = REPO_ROOT / "visualizer"
MODULES_FILE = VISUALIZER_DIR / "modules.json"
SUPPORTED_VISUAL_TYPES = {"array-window", "two-pointers"}
REQUIRED_TRACE_FIELDS = {"version", "id", "title", "pattern", "visualType", "input", "answer", "steps"}
REQUIRED_IMPLEMENTATIONS = {"python", "cpp"}
LOCALE_FILES = {
    "en": VISUALIZER_DIR / "locales" / "en.js",
    "ru": VISUALIZER_DIR / "locales" / "ru.js",
}
LOCALE_CHAPTERS = {
    "sliding-window": ("top-level", "trace"),
    "two-pointers": ("twoPointers", "trace"),
}


def main() -> int:
    errors: list[str] = []

    modules_data = load_json(MODULES_FILE, errors)
    modules = modules_data.get("modules") if isinstance(modules_data, dict) else None

    if not isinstance(modules, list) or not modules:
        errors.append("visualizer/modules.json must contain a non-empty 'modules' array")
        return report(errors)

    seen_module_ids: set[str] = set()

    for index, module in enumerate(modules):
        if not isinstance(module, dict):
            errors.append(f"modules[{index}] must be an object")
            continue

        module_id = expect_string(module, "id", f"modules[{index}]", errors)
        if not module_id:
            continue

        if module_id in seen_module_ids:
            errors.append(f"Duplicate module id: {module_id}")
        seen_module_ids.add(module_id)

        trace = validate_trace(module, module_id, errors)
        validate_implementations(module, module_id, errors)

        if trace:
            validate_localized_trace_steps(module_id, len(trace["steps"]), errors)

    return report(errors)


def load_json(path: Path, errors: list[str]) -> Any:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        errors.append(f"Missing JSON file: {relative(path)}")
    except json.JSONDecodeError as error:
        errors.append(f"Invalid JSON in {relative(path)}: {error}")
    return None


def expect_string(source: dict[str, Any], key: str, owner: str, errors: list[str]) -> str | None:
    value = source.get(key)
    if not isinstance(value, str) or not value.strip():
        errors.append(f"{owner}.{key} must be a non-empty string")
        return None
    return value


def validate_trace(module: dict[str, Any], module_id: str, errors: list[str]) -> dict[str, Any] | None:
    trace_path_value = expect_string(module, "trace", f"module '{module_id}'", errors)
    if not trace_path_value:
        return None

    trace_path = resolve_visualizer_path(trace_path_value)
    if not trace_path.exists():
        errors.append(f"module '{module_id}' trace path does not exist: {trace_path_value}")
        return None

    validate_trace_generator(trace_path, module_id, errors)

    trace = load_json(trace_path, errors)
    if not isinstance(trace, dict):
        errors.append(f"module '{module_id}' trace must be a JSON object: {trace_path_value}")
        return None

    missing_fields = sorted(REQUIRED_TRACE_FIELDS - trace.keys())
    if missing_fields:
        errors.append(f"module '{module_id}' trace missing fields: {', '.join(missing_fields)}")

    visual_type = trace.get("visualType")
    if visual_type not in SUPPORTED_VISUAL_TYPES:
        errors.append(
            f"module '{module_id}' trace visualType must be one of {sorted(SUPPORTED_VISUAL_TYPES)}, got {visual_type!r}"
        )

    steps = trace.get("steps")
    if not isinstance(steps, list) or not steps:
        errors.append(f"module '{module_id}' trace.steps must be a non-empty array")
        return None

    for expected_step, step in enumerate(steps, start=1):
        validate_trace_step(module_id, visual_type, expected_step, step, errors)

    return trace


def validate_trace_generator(trace_path: Path, module_id: str, errors: list[str]) -> None:
    trace_generator_path = trace_path.parent / "trace_generator.py"

    if not trace_generator_path.exists():
        errors.append(f"module '{module_id}' is missing trace_generator.py next to trace.json")
        return

    if not trace_generator_path.read_text(encoding="utf-8").strip():
        errors.append(f"module '{module_id}' trace_generator.py is empty")


def validate_trace_step(
    module_id: str,
    visual_type: Any,
    expected_step: int,
    step: Any,
    errors: list[str],
) -> None:
    owner = f"module '{module_id}' trace.steps[{expected_step - 1}]"
    if not isinstance(step, dict):
        errors.append(f"{owner} must be an object")
        return

    if step.get("step") != expected_step:
        errors.append(f"{owner}.step must be {expected_step}")

    state = step.get("state")
    if not isinstance(state, dict):
        errors.append(f"{owner}.state must be an object")
        return

    required_state_keys = {
        "array-window": {"left", "right", "window", "window_sum", "highlights"},
        "two-pointers": {"left", "right", "pair", "current_sum", "highlights"},
    }.get(visual_type, set())

    missing_state_keys = sorted(required_state_keys - state.keys())
    if missing_state_keys:
        errors.append(f"{owner}.state missing keys: {', '.join(missing_state_keys)}")


def validate_implementations(module: dict[str, Any], module_id: str, errors: list[str]) -> None:
    implementations = module.get("implementations")
    if not isinstance(implementations, dict):
        errors.append(f"module '{module_id}'.implementations must be an object")
        return

    missing_implementations = sorted(REQUIRED_IMPLEMENTATIONS - implementations.keys())
    if missing_implementations:
        errors.append(f"module '{module_id}' missing implementations: {', '.join(missing_implementations)}")

    for language, path_value in implementations.items():
        if not isinstance(path_value, str) or not path_value.strip():
            errors.append(f"module '{module_id}'.implementations.{language} must be a non-empty string")
            continue

        implementation_path = resolve_visualizer_path(path_value)
        if not implementation_path.exists():
            errors.append(f"module '{module_id}' implementation path does not exist: {path_value}")
            continue

        if not implementation_path.read_text(encoding="utf-8").strip():
            errors.append(f"module '{module_id}' implementation file is empty: {path_value}")


def validate_localized_trace_steps(module_id: str, trace_step_count: int, errors: list[str]) -> None:
    if module_id not in LOCALE_CHAPTERS:
        errors.append(f"No locale trace mapping configured for module '{module_id}'")
        return

    for language, locale_path in LOCALE_FILES.items():
        locale_text = locale_path.read_text(encoding="utf-8")
        localized_count = count_localized_steps(locale_text, module_id)

        if localized_count is None:
            errors.append(f"Could not find localized trace steps for module '{module_id}' in {relative(locale_path)}")
            continue

        if localized_count != trace_step_count:
            errors.append(
                f"Localized trace step count mismatch for module '{module_id}' in {language}: "
                f"trace.json has {trace_step_count}, locale has {localized_count}"
            )


def count_localized_steps(locale_text: str, module_id: str) -> int | None:
    chapter_marker, trace_marker = LOCALE_CHAPTERS[module_id]

    if chapter_marker == "top-level":
        search_start = 0
    else:
        chapter_start = locale_text.find(f"  {chapter_marker}: {{")
        if chapter_start == -1:
            return None
        search_start = chapter_start

    if chapter_marker == "top-level":
        match = re.search(rf"^  {re.escape(trace_marker)}: {{", locale_text[search_start:], re.MULTILINE)
        trace_start = search_start + match.start() if match else -1
    else:
        match = re.search(rf"^    {re.escape(trace_marker)}: {{", locale_text[search_start:], re.MULTILINE)
        trace_start = search_start + match.start() if match else -1
    if trace_start == -1:
        return None

    steps_start = locale_text.find("steps: [", trace_start)
    if steps_start == -1:
        return None

    array_start = locale_text.find("[", steps_start)
    array_end = find_matching(locale_text, array_start, "[", "]")
    if array_end is None:
        return None

    steps_block = locale_text[array_start : array_end + 1]
    return steps_block.count("action:")


def find_matching(text: str, start: int, open_char: str, close_char: str) -> int | None:
    depth = 0
    in_string = False
    string_quote = ""
    escaped = False

    for index in range(start, len(text)):
        char = text[index]

        if in_string:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == string_quote:
                in_string = False
            continue

        if char in {'"', "'", "`"}:
            in_string = True
            string_quote = char
            continue

        if char == open_char:
            depth += 1
        elif char == close_char:
            depth -= 1
            if depth == 0:
                return index

    return None


def resolve_visualizer_path(path_value: str) -> Path:
    return (VISUALIZER_DIR / path_value).resolve()


def relative(path: Path) -> str:
    try:
        return str(path.resolve().relative_to(REPO_ROOT))
    except ValueError:
        return str(path)


def report(errors: list[str]) -> int:
    if errors:
        print("Module validation failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print("Module validation passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
