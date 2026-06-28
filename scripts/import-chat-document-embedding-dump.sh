#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DUMP_ARCHIVE="${CHAT_DOCUMENT_EMBEDDING_DUMP:-$ROOT_DIR/dump/2026-01-22.7z}"
CONTAINER="${POSTGRES_CONTAINER:-rag_system_postgres}"
DB_USER="${POSTGRES_USER:-rag_system_user}"
DB_NAME="${POSTGRES_DB:-rag_system_db}"
FORCE_IMPORT="${FORCE_CHAT_DOCUMENT_EMBEDDING_DUMP_IMPORT:-}"

is_force_import() {
  case "${FORCE_IMPORT,,}" in
    1 | true | yes | on) return 0 ;;
    *) return 1 ;;
  esac
}

count_rows() {
  docker exec "$CONTAINER" psql -U "$DB_USER" -d "$DB_NAME" -tAc \
    'SELECT COUNT(*) FROM "ChatDocumentEmbedding";' 2>/dev/null || true
}

COUNT="$(count_rows)"

if [ -z "$COUNT" ]; then
  echo "⚠ ChatDocumentEmbedding table is unavailable, skipping dump import"
  exit 0
fi

if [ "$COUNT" != "0" ]; then
  if is_force_import; then
    echo "▶ FORCE_CHAT_DOCUMENT_EMBEDDING_DUMP_IMPORT is set, clearing $COUNT existing records"
    docker exec "$CONTAINER" psql -U "$DB_USER" -d "$DB_NAME" -v ON_ERROR_STOP=1 -q \
      -c 'TRUNCATE TABLE "ChatDocumentEmbedding" CASCADE;'
  else
    echo "✔ ChatDocumentEmbedding already has $COUNT records, skipping dump import"
    echo "  (set FORCE_CHAT_DOCUMENT_EMBEDDING_DUMP_IMPORT=1 to replace)"
    exit 0
  fi
fi

if [ ! -f "$DUMP_ARCHIVE" ]; then
  echo "⚠ Dump archive not found at $DUMP_ARCHIVE, skipping import"
  exit 0
fi

if ! command -v 7z >/dev/null 2>&1; then
  echo "⚠ 7z is not installed, cannot extract dump archive"
  exit 0
fi

echo "▶ Importing ChatDocumentEmbedding dump from $(basename "$DUMP_ARCHIVE")..."
set -o pipefail
7z e -so "$DUMP_ARCHIVE" dump.sql | docker exec -i "$CONTAINER" psql -U "$DB_USER" -d "$DB_NAME" -v ON_ERROR_STOP=1 -q

IMPORTED_COUNT="$(count_rows)"
echo "✔ ChatDocumentEmbedding dump imported ($IMPORTED_COUNT records)"
