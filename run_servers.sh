#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting G-eez Application Servers${NC}"
echo "=================================="

# Check if Python is available
if ! command -v python &> /dev/null; then
    echo -e "${RED}❌ Python is not installed or not in PATH${NC}"
    exit 1
fi

# Function to install dependencies
install_dependencies() {
    echo -e "${YELLOW}📦 Installing Python dependencies...${NC}"
    cd roomba_mapping
    pip install -r requirements.txt
    cd ..
    echo -e "${GREEN}✅ Dependencies installed successfully${NC}"
}

# Check if dependencies are installed
if ! python -c "import fastapi, uvicorn, cv2" 2>/dev/null; then
    echo -e "${YELLOW}⚠️  Some dependencies are missing${NC}"
    install_dependencies
fi

# Function to start backend server
start_backend() {
    echo -e "${BLUE}🔧 Starting Backend Server (FastAPI)...${NC}"
    cd roomba_mapping
    python app.py &
    BACKEND_PID=$!
    cd ..
    echo -e "${GREEN}✅ Backend server started (PID: $BACKEND_PID)${NC}"
    echo -e "${GREEN}   🌐 Backend URL: http://localhost:8000${NC}"
}

# Function to start frontend server
start_frontend() {
    echo -e "${BLUE}🎨 Starting Frontend Server (HTTP)...${NC}"
    cd grocer-ease-ui
    python -m http.server 8080 &
    FRONTEND_PID=$!
    cd ..
    echo -e "${GREEN}✅ Frontend server started (PID: $FRONTEND_PID)${NC}"
    echo -e "${GREEN}   🌐 Frontend URL: http://localhost:8080${NC}"
}

# Function to cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}🛑 Shutting down servers...${NC}"
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        echo -e "${GREEN}✅ Backend server stopped${NC}"
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        echo -e "${GREEN}✅ Frontend server stopped${NC}"
    fi
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start servers
start_backend
sleep 2  # Give backend time to start
start_frontend

echo ""
echo -e "${GREEN}🎉 All servers are running!${NC}"
echo "=================================="
echo -e "${BLUE}📱 Frontend:${NC} http://localhost:8080"
echo -e "${BLUE}🔧 Backend API:${NC} http://localhost:8000"
echo -e "${BLUE}📄 Staff Page:${NC} http://localhost:8080/staff%20page%20v2%20-%20login%20try.html"
echo ""
echo -e "${YELLOW}💡 Press Ctrl+C to stop all servers${NC}"
echo ""

# Wait for user to stop
wait 