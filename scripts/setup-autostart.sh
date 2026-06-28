#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODE="${RAG_AUTOSTART_MODE:-prod}"
SERVICE_NAME="rag-system-docker-compose.service"
SYSTEMD_UNIT="/etc/systemd/system/${SERVICE_NAME}"
PM2_USER="${SUDO_USER:-${USER:-}}"
DOCKER_BIN="$(command -v docker || true)"

usage() {
  cat <<EOF
Настройка автозапуска Docker Compose и PM2 после перезагрузки сервера.

Использование:
  npm run setup:autostart          # production (ecosystem-prod.config.json)
  npm run setup:autostart:dev      # development (ecosystem.config.json)
  npm run setup:autostart:prod     # production

Переменные окружения:
  RAG_AUTOSTART_MODE=dev|prod      # режим PM2 (по умолчанию: prod)

Требуется sudo для systemd:
  sudo npm run setup:autostart
EOF
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

if [[ "$MODE" != "dev" && "$MODE" != "prod" ]]; then
  echo "❌ Неверный RAG_AUTOSTART_MODE: $MODE (ожидается dev или prod)" >&2
  exit 1
fi

if ! command -v systemctl >/dev/null 2>&1; then
  echo "❌ systemctl не найден — скрипт рассчитан на Linux с systemd" >&2
  exit 1
fi

if [[ -z "$DOCKER_BIN" ]]; then
  echo "❌ docker не найден в PATH" >&2
  exit 1
fi

if [[ -z "$PM2_USER" ]]; then
  echo "❌ Не удалось определить пользователя для PM2" >&2
  exit 1
fi

PM2_HOME="$(getent passwd "$PM2_USER" | cut -d: -f6)"
if [[ -z "$PM2_HOME" ]]; then
  echo "❌ Не удалось определить HOME для пользователя $PM2_USER" >&2
  exit 1
fi

if [[ "$EUID" -ne 0 ]] && ! sudo -n true 2>/dev/null; then
  echo "⚠️  Для настройки systemd нужны права sudo."
  echo "   Запустите: sudo npm run setup:autostart"
  exit 1
fi

run_root() {
  if [[ "$EUID" -eq 0 ]]; then
    "$@"
  else
    sudo "$@"
  fi
}

run_pm2_user() {
  run_root sudo -u "$PM2_USER" env HOME="$PM2_HOME" bash -lc "cd '$ROOT_DIR' && $*"
}

if [[ "$MODE" == "prod" ]]; then
  ECOSYSTEM="ecosystem-prod.config.json"
else
  ECOSYSTEM="ecosystem.config.json"
fi

echo "▶ Включение автозапуска Docker..."
run_root systemctl enable docker
run_root systemctl start docker 2>/dev/null || true

echo "▶ Создание systemd-сервиса $SERVICE_NAME..."
run_root tee "$SYSTEMD_UNIT" >/dev/null <<EOF
[Unit]
Description=RAG System Docker Compose (Postgres, Ollama)
After=docker.service network-online.target
Wants=network-online.target
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=${ROOT_DIR}
ExecStart=${DOCKER_BIN} compose up -d
ExecStop=${DOCKER_BIN} compose down
TimeoutStartSec=300

[Install]
WantedBy=multi-user.target
EOF

run_root systemctl daemon-reload
run_root systemctl enable "$SERVICE_NAME"
run_root systemctl restart "$SERVICE_NAME" || run_root systemctl start "$SERVICE_NAME"

echo "▶ Настройка PM2 ($MODE, $ECOSYSTEM)..."
run_pm2_user "./node_modules/.bin/pm2 start ./$ECOSYSTEM --update-env || true"
run_pm2_user "./node_modules/.bin/pm2 save"

STARTUP_OUTPUT="$(run_pm2_user "./node_modules/.bin/pm2 startup systemd -u '$PM2_USER' --hp '$PM2_HOME'" 2>&1 || true)"
STARTUP_CMD="$(echo "$STARTUP_OUTPUT" | grep -E '^sudo env PATH' | tail -1 || true)"

if [[ -n "$STARTUP_CMD" ]]; then
  echo "▶ Регистрация PM2 в systemd..."
  eval "$STARTUP_CMD"
else
  echo "ℹ️  PM2 startup уже настроен или команда не требуется"
fi

run_pm2_user "./node_modules/.bin/pm2 save"

echo ""
echo "✅ Автозапуск настроен"
echo "   Docker Compose: systemctl status $SERVICE_NAME"
echo "   PM2:            sudo -u $PM2_USER ./node_modules/.bin/pm2 list"
echo ""
echo "Проверка после перезагрузки:"
echo "   sudo reboot"
echo "   sudo systemctl status $SERVICE_NAME"
echo "   sudo -u $PM2_USER ./node_modules/.bin/pm2 list"
