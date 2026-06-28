#!/usr/bin/env bash
docker compose down
./node_modules/.bin/pm2 delete ./ecosystem-prod.config.json
echo "✅ Done"


