ensure_node_in_path() {
  if command -v node >/dev/null 2>&1; then
    return 0
  fi

  export NVM_DIR="${NVM_DIR:-${HOME:-}/.nvm}"
  if [[ -s "${NVM_DIR}/nvm.sh" ]]; then
    # shellcheck disable=SC1090
    . "${NVM_DIR}/nvm.sh"
  fi

  if command -v node >/dev/null 2>&1; then
    return 0
  fi

  local home="${HOME:-}"
  local candidate
  for candidate in \
    "${home}/.nvm/versions/node/"*/bin/node \
    /usr/local/bin/node \
    /usr/bin/node; do
    if [[ -x "$candidate" ]]; then
      export PATH="$(dirname "$candidate"):$PATH"
      return 0
    fi
  done

  echo "node не найден в PATH" >&2
  return 1
}

ensure_node_in_path
