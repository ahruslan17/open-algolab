#!/usr/bin/env python3
"""Run the OpenAlgoLab static visualizer locally.

This script intentionally uses only the Python standard library so it works on
Linux, macOS, and Windows without installing project dependencies.
"""

from __future__ import annotations

import argparse
import functools
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


DEFAULT_HOST = "127.0.0.1"
DEFAULT_PORT = 8000


class NoCacheHTTPRequestHandler(SimpleHTTPRequestHandler):
    """Static file handler with dev-friendly cache headers."""

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Serve the OpenAlgoLab static visualizer from the repository root."
    )
    parser.add_argument(
        "--host",
        default=DEFAULT_HOST,
        help=f"Host/interface to bind to. Default: {DEFAULT_HOST}",
    )
    parser.add_argument(
        "--port",
        type=int,
        default=DEFAULT_PORT,
        help=f"Port to listen on. Default: {DEFAULT_PORT}",
    )
    return parser.parse_args()


def find_repo_root() -> Path:
    scripts_dir = Path(__file__).resolve().parent
    repo_root = scripts_dir.parent

    required_paths = [
        repo_root / "README.md",
        repo_root / "visualizer" / "index.html",
        repo_root / "visualizer" / "app.js",
    ]

    if not all(path.exists() for path in required_paths):
        raise RuntimeError(
            "scripts/serve.py must be run from an OpenAlgoLab checkout with the visualizer files present."
        )

    return repo_root


def main() -> int:
    args = parse_args()
    repo_root = find_repo_root()
    handler = functools.partial(NoCacheHTTPRequestHandler, directory=str(repo_root))

    try:
        server = ThreadingHTTPServer((args.host, args.port), handler)
    except OSError as error:
        print(f"Could not start server on {args.host}:{args.port}: {error}", file=sys.stderr)
        print("Try another port, for example: python3 scripts/serve.py --port 8080", file=sys.stderr)
        return 1

    visualizer_url = f"http://{args.host}:{args.port}/visualizer/"

    print("OpenAlgoLab local server")
    print(f"Serving: {repo_root}")
    print(f"Visualizer: {visualizer_url}")
    print("Press Ctrl+C to stop.")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        server.server_close()

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
