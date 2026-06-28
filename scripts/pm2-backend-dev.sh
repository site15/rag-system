#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck source=scripts/lib/ensure-node.sh
. "$ROOT_DIR/scripts/lib/ensure-node.sh"

cd "$ROOT_DIR/backend"
exec ./node_modules/.bin/nest start --env-file .env --watch
