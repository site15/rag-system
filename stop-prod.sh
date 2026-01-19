#!/usr/bin/env bash
docker compose down
npx -y pm2 delete all
echo "✅ Done"


