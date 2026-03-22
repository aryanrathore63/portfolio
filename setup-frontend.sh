#!/bin/bash

# Portfolio Frontend Setup Script for Unix-based Systems (macOS/Linux)
# This script automates the setup process for the Angular 17+ frontend

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}Portfolio Frontend Setup Script${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""

# Check if Node.js is installed
echo -e "${YELLOW}Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}ERROR: Node.js is not installed!${NC}"
    echo -e "${YELLOW}Please install Node.js from: https://nodejs.org/${NC}"
    echo -e "${YELLOW}Follow the instructions in SETUP.md for detailed installation steps.${NC}"
    exit 1
fi

NODE_VERSION=$(node --version)
echo -e "${GREEN}✓ Node.js version: $NODE_VERSION${NC}"

# Check if npm is installed
echo -e "${YELLOW}Checking npm installation...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}ERROR: npm is not installed!${NC}"
    echo -e "${YELLOW}Please install Node.js from: https://nodejs.org/${NC}"
    exit 1
fi

NPM_VERSION=$(npm --version)
echo -e "${GREEN}✓ npm version: $NPM_VERSION${NC}"
echo ""

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}ERROR: package.json not found!${NC}"
    echo -e "${YELLOW}Please run this script from the portfolio-fronted directory.${NC}"
    exit 1
fi

# Install npm dependencies
echo -e "${YELLOW}Installing npm dependencies...${NC}"
echo -e "${YELLOW}This may take a few minutes...${NC}"
if ! npm install; then
    echo -e "${RED}ERROR: Failed to install npm dependencies!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm dependencies installed successfully${NC}"
echo ""

# Build the project
echo -e "${YELLOW}Building the project...${NC}"
if ! npm run build; then
    echo -e "${RED}ERROR: Failed to build the project!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Project built successfully${NC}"
echo ""

# Display success message
echo -e "${CYAN}========================================${NC}"
echo -e "${GREEN}Setup completed successfully!${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""
echo -e "${YELLOW}To run the frontend, execute:${NC}"
echo -e "${WHITE}  npm start${NC}"
echo ""
echo -e "${WHITE}The frontend will start on http://localhost:4200${NC}"
echo -e "${WHITE}It will automatically proxy API calls to the backend at http://localhost:5000${NC}"
echo ""
echo -e "${YELLOW}Make sure the backend is running before starting the frontend!${NC}"
echo ""
echo -e "${YELLOW}For backend setup, navigate to the portfolio-backend directory and run:${NC}"
echo -e "${WHITE}  chmod +x setup-backend.sh${NC}"
echo -e "${WHITE}  ./setup-backend.sh${NC}"
echo -e "${WHITE}  dotnet run${NC}"
echo ""
echo -e "${YELLOW}For more information, see SETUP.md${NC}"
echo ""