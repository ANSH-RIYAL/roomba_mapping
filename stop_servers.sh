#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🛑 Stopping G-eez Application Servers${NC}"
echo "=================================="

# Stop backend server (port 8000)
BACKEND_PIDS=$(lsof -ti:8000)
if [ -n "$BACKEND_PIDS" ]; then
    kill -9 $BACKEND_PIDS
    echo -e "${GREEN}✅ Backend server(s) stopped (port 8000)${NC}"
else
    echo -e "${YELLOW}⚠️  No backend server running on port 8000${NC}"
fi

# Stop frontend server (port 8080)
FRONTEND_PIDS=$(lsof -ti:8080)
if [ -n "$FRONTEND_PIDS" ]; then
    kill -9 $FRONTEND_PIDS
    echo -e "${GREEN}✅ Frontend server(s) stopped (port 8080)${NC}"
else
    echo -e "${YELLOW}⚠️  No frontend server running on port 8080${NC}"
fi

echo -e "${GREEN}🎉 All servers stopped!${NC}"
echo "==================================" 