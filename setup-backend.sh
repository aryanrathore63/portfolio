#!/bin/bash

# Portfolio Backend Setup Script for Unix-based Systems (macOS/Linux)
# This script automates the setup process for the .NET 8 backend

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}Portfolio Backend Setup Script${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""

# Check if .NET SDK is installed
echo -e "${YELLOW}Checking .NET SDK installation...${NC}"
if ! command -v dotnet &> /dev/null; then
    echo -e "${RED}ERROR: .NET SDK is not installed!${NC}"
    echo -e "${YELLOW}Please install .NET 8 SDK from: https://dotnet.microsoft.com/download/dotnet/8.0${NC}"
    echo -e "${YELLOW}Follow the instructions in SETUP.md for detailed installation steps.${NC}"
    exit 1
fi

DOTNET_VERSION=$(dotnet --version)
echo -e "${GREEN}✓ .NET SDK version: $DOTNET_VERSION${NC}"
echo ""

# Check if we're in the correct directory
if [ ! -f "PortfolioBackend.csproj" ]; then
    echo -e "${RED}ERROR: PortfolioBackend.csproj not found!${NC}"
    echo -e "${YELLOW}Please run this script from the portfolio-backend directory.${NC}"
    exit 1
fi

# Restore NuGet packages
echo -e "${YELLOW}Restoring NuGet packages...${NC}"
if ! dotnet restore; then
    echo -e "${RED}ERROR: Failed to restore NuGet packages!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ NuGet packages restored successfully${NC}"
echo ""

# Create database migration
echo -e "${YELLOW}Creating database migration...${NC}"
if ! dotnet ef migrations add InitialCreate; then
    echo -e "${YELLOW}WARNING: Failed to create migration (might already exist)${NC}"
    echo -e "${YELLOW}Continuing with database update...${NC}"
else
    echo -e "${GREEN}✓ Database migration created successfully${NC}"
fi
echo ""

# Apply database migration
echo -e "${YELLOW}Applying database migration...${NC}"
if ! dotnet ef database update; then
    echo -e "${RED}ERROR: Failed to apply database migration!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Database migration applied successfully${NC}"
echo ""

# Build the project
echo -e "${YELLOW}Building the project...${NC}"
if ! dotnet build; then
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
echo -e "${YELLOW}To run the backend, execute:${NC}"
echo -e "${WHITE}  dotnet run${NC}"
echo ""
echo -e "${WHITE}The backend will start on http://localhost:5000${NC}"
echo -e "${WHITE}Swagger UI will be available at http://localhost:5000/swagger${NC}"
echo ""
echo -e "${YELLOW}For frontend setup, navigate to the portfolio-fronted directory and run:${NC}"
echo -e "${WHITE}  npm install${NC}"
echo -e "${WHITE}  npm start${NC}"
echo ""
echo -e "${YELLOW}For more information, see SETUP.md${NC}"
echo ""