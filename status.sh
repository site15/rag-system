#!/usr/bin/env bash

echo "=== RAG System Status ==="
echo

# Check Docker containers
echo "🐳 Docker Containers:"
if docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -q "rag_system"; then
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep "rag_system"
else
    echo "No RAG system containers running"
fi
echo

# Check PM2 processes
echo "🔧 PM2 Processes:"
if ./node_modules/.bin/pm2 list >/dev/null 2>&1; then
    ./node_modules/.bin/pm2 list
else
    echo "PM2 not running or no processes found"
fi
echo

# Check if services are responding
echo "🌐 Service Health Check:"

# Check backend
if curl -s http://localhost:23000/api >/dev/null 2>&1; then
    echo "✅ Backend API: http://localhost:23000/api - UP"
else
    echo "❌ Backend API: http://localhost:23000/api - DOWN"
fi

# Check frontend
if curl -s http://localhost:23001 >/dev/null 2>&1; then
    echo "✅ Frontend: http://localhost:23001 - UP"
else
    echo "❌ Frontend: http://localhost:23001 - DOWN"
fi

# Check swagger
if curl -s http://localhost:23000/swagger >/dev/null 2>&1; then
    echo "✅ Swagger Docs: http://localhost:23000/swagger - UP"
else
    echo "❌ Swagger Docs: http://localhost:23000/swagger - DOWN"
fi

echo
echo "=== End Status ==="