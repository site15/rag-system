#!/usr/bin/env bash
docker compose down
npx -y pm2 delete ./ecosystem-prod.config.json
echo "✅ Done"


