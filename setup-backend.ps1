# Portfolio Backend Setup Script for Windows
# This script automates the setup process for the .NET 8 backend

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Portfolio Backend Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .NET SDK is installed
Write-Host "Checking .NET SDK installation..." -ForegroundColor Yellow
$dotnetVersion = dotnet --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: .NET SDK is not installed!" -ForegroundColor Red
    Write-Host "Please install .NET 8 SDK from: https://dotnet.microsoft.com/download/dotnet/8.0" -ForegroundColor Yellow
    Write-Host "Follow the instructions in SETUP.md for detailed installation steps." -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ .NET SDK version: $dotnetVersion" -ForegroundColor Green
Write-Host ""

# Check if we're in the correct directory
if (-not (Test-Path "PortfolioBackend.csproj")) {
    Write-Host "ERROR: PortfolioBackend.csproj not found!" -ForegroundColor Red
    Write-Host "Please run this script from the portfolio-backend directory." -ForegroundColor Yellow
    exit 1
}

# Restore NuGet packages
Write-Host "Restoring NuGet packages..." -ForegroundColor Yellow
dotnet restore
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to restore NuGet packages!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ NuGet packages restored successfully" -ForegroundColor Green
Write-Host ""

# Create database migration
Write-Host "Creating database migration..." -ForegroundColor Yellow
dotnet ef migrations add InitialCreate
if ($LASTEXITCODE -ne 0) {
    Write-Host "WARNING: Failed to create migration (might already exist)" -ForegroundColor Yellow
    Write-Host "Continuing with database update..." -ForegroundColor Yellow
} else {
    Write-Host "✓ Database migration created successfully" -ForegroundColor Green
}
Write-Host ""

# Apply database migration
Write-Host "Applying database migration..." -ForegroundColor Yellow
dotnet ef database update
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to apply database migration!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Database migration applied successfully" -ForegroundColor Green
Write-Host ""

# Build the project
Write-Host "Building the project..." -ForegroundColor Yellow
dotnet build
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
Write-Host "To run the backend, execute:" -ForegroundColor Yellow
Write-Host "  dotnet run" -ForegroundColor White
Write-Host ""
Write-Host "The backend will start on http://localhost:5000" -ForegroundColor White
Write-Host "Swagger UI will be available at http://localhost:5000/swagger" -ForegroundColor White
Write-Host ""
Write-Host "For frontend setup, navigate to the portfolio-fronted directory and run:" -ForegroundColor Yellow
Write-Host "  npm install" -ForegroundColor White
Write-Host "  npm start" -ForegroundColor White
Write-Host ""
Write-Host "For more information, see SETUP.md" -ForegroundColor Yellow
Write-Host ""