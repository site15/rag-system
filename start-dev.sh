#!/usr/bin/env bash
docker compose up -d

# Wait for PostgreSQL health check to pass
echo "Waiting for PostgreSQL to be healthy..."
while [ "$(docker inspect --format='{{json .State.Health}}' rag_system_postgres | grep -o '"Status":"healthy"')" != '"Status":"healthy"' ]; do
  sleep 2
done
echo "PostgreSQL is healthy"

# Wait for Ollama health check to pass
echo "Waiting for Ollama to be healthy..."
while [ "$(docker inspect --format='{{json .State.Health}}' rag_system_ollama | grep -o '"Status":"healthy"')" != '"Status":"healthy"' ]; do
  sleep 2
done
echo "Ollama is healthy"

set -e

echo "▶ Waiting for Ollama..."
until docker exec rag_system_ollama ollama list >/dev/null 2>&1; do
  sleep 2
done

pull_if_missing () {
  MODEL=$1
  if docker exec rag_system_ollama ollama list | grep -q "^$MODEL"; then
    echo "✔ Model '$MODEL' already exists"
  else
    echo "⬇ Pulling model '$MODEL'"
    docker exec rag_system_ollama ollama pull "$MODEL"
  fi
}

pull_if_missing mistral
pull_if_missing nomic-embed-text


echo "▶ Running Prisma migrations"
cd ./backend
./node_modules/.bin/prisma migrate deploy
cd ..

echo "✅ Done"
npx -y pm2 start ./ecosystem.config.json


