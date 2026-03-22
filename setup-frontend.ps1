# Portfolio Frontend Setup Script for Windows
# This script automates the setup process for the Angular 17+ frontend

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Portfolio Frontend Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
$nodeVersion = node --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "Follow the instructions in SETUP.md for detailed installation steps." -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Node.js version: $nodeVersion" -ForegroundColor Green

# Check if npm is installed
Write-Host "Checking npm installation..." -ForegroundColor Yellow
$npmVersion = npm --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: npm is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ npm version: $npmVersion" -ForegroundColor Green
Write-Host ""

# Check if we're in the correct directory
if (-not (Test-Path "package.json")) {
    Write-Host "ERROR: package.json not found!" -ForegroundColor Red
    Write-Host "Please run this script from the portfolio-fronted directory." -ForegroundColor Yellow
    exit 1
}

# Install npm dependencies
Write-Host "Installing npm dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to install npm dependencies!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ npm dependencies installed successfully" -ForegroundColor Green
Write-Host ""

# Build the project
Write-Host "Building the project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to build the project!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Project built successfully" -ForegroundColor Green
Write-Host ""

# Display success message
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup completed successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To run the frontend, execute:" -ForegroundColor Yellow
Write-Host "  npm start" -ForegroundColor White
Write-Host ""
Write-Host "The frontend will start on http://localhost:4200" -ForegroundColor White
Write-Host "It will automatically proxy API calls to the backend at http://localhost:5000" -ForegroundColor White
Write-Host ""
Write-Host "Make sure the backend is running before starting the frontend!" -ForegroundColor Yellow
Write-Host ""
Write-Host "For backend setup, navigate to the portfolio-backend directory and run:" -ForegroundColor Yellow
Write-Host "  .\setup-backend.ps1" -ForegroundColor White
Write-Host "  dotnet run" -ForegroundColor White
Write-Host ""
Write-Host "For more information, see SETUP.md" -ForegroundColor Yellow
Write-Host ""