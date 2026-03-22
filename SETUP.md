# Portfolio Project Setup Guide

This guide will help you set up the development environment for the Portfolio project, which consists of a .NET 8 Web API backend and an Angular 17+ frontend.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Windows](#windows)
  - [macOS](#macos)
  - [Linux](#linux)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Project](#running-the-project)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following:

- A code editor (Visual Studio Code recommended)
- Git installed and configured
- Internet connection for downloading dependencies

## Installation

### Windows

#### 1. Install .NET 8 SDK

1. Download the .NET 8 SDK from the official website: https://dotnet.microsoft.com/download/dotnet/8.0
2. Run the installer and follow the installation wizard
3. Open a new Command Prompt or PowerShell window
4. Verify the installation by running:
   ```bash
   dotnet --version
   ```
   You should see output like: `8.0.100`

#### 2. Install Node.js and npm

1. Download the LTS version of Node.js from: https://nodejs.org/
2. Run the installer and follow the installation wizard
3. Open a new Command Prompt or PowerShell window
4. Verify the installation by running:
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers for both.

#### 3. (Optional) Install Git

If you don't have Git installed:
1. Download Git from: https://git-scm.com/download/win
2. Run the installer and follow the installation wizard
3. Verify the installation by running:
   ```bash
   git --version
   ```

### macOS

#### 1. Install .NET 8 SDK

**Using Homebrew (Recommended):**
```bash
brew install dotnet@8
```

**Manual Installation:**
1. Download the .NET 8 SDK for macOS from: https://dotnet.microsoft.com/download/dotnet/8.0
2. Open the downloaded PKG file and follow the installation wizard
3. Open a new Terminal window
4. Verify the installation by running:
   ```bash
   dotnet --version
   ```
   You should see output like: `8.0.100`

#### 2. Install Node.js and npm

**Using Homebrew (Recommended):**
```bash
brew install node
```

**Manual Installation:**
1. Download the LTS version of Node.js for macOS from: https://nodejs.org/
2. Open the PKG file and follow the installation wizard
3. Open a new Terminal window
4. Verify the installation by running:
   ```bash
   node --version
   npm --version
   ```

#### 3. (Optional) Install Git

Git is usually pre-installed on macOS. If not:
```bash
brew install git
```

### Linux

#### 1. Install .NET 8 SDK

**Ubuntu/Debian:**
```bash
# Install dependencies
sudo apt-get update && sudo apt-get install -y curl gnupg

# Add Microsoft package repository
curl -sSL https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
echo "deb [arch=amd64] https://packages.microsoft.com/ubuntu/$(lsb_release -rs)/prod $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/microsoft.list

# Install .NET SDK
sudo apt-get update
sudo apt-get install -y dotnet-sdk-8.0
```

**Fedora:**
```bash
sudo dnf install dotnet-sdk-8.0
```

**Arch Linux:**
```bash
sudo pacman -S dotnet-sdk
```

Verify the installation:
```bash
dotnet --version
```

#### 2. Install Node.js and npm

**Ubuntu/Debian:**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Fedora:**
```bash
sudo dnf install nodejs
```

**Arch Linux:**
```bash
sudo pacman -S nodejs npm
```

Verify the installation:
```bash
node --version
npm --version
```

#### 3. (Optional) Install Git

**Ubuntu/Debian:**
```bash
sudo apt-get install git
```

**Fedora:**
```bash
sudo dnf install git
```

**Arch Linux:**
```bash
sudo pacman -S git
```

## Backend Setup

### 1. Navigate to the Backend Directory

```bash
cd portfolio-backend
```

### 2. Restore NuGet Packages

```bash
dotnet restore
```

### 3. Create and Apply Database Migration

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

This will create a `portfolio.db` SQLite database file in the backend directory with seed data.

### 4. Verify the Build

```bash
dotnet build
```

You should see a successful build message.

### 5. Run the Backend

```bash
dotnet run
```

The backend will start on `http://localhost:5000`. You can access the Swagger UI at `http://localhost:5000/swagger` to explore the API endpoints.

## Frontend Setup

### 1. Navigate to the Frontend Directory

Open a new terminal window and navigate to the frontend directory:

```bash
cd portfolio-fronted
```

### 2. Install Node Dependencies

```bash
npm install
```

This will install all the required packages including Angular, Three.js, and development tools.

### 3. Verify the Build

```bash
npm run build
```

You should see a successful build message.

### 4. Run the Frontend

```bash
npm start
```

The frontend will start on `http://localhost:4200` and will automatically proxy API calls to the backend at `http://localhost:5000`.

## Running the Project

### Option 1: Manual Startup

1. Open two terminal windows
2. In the first terminal, navigate to the backend directory and run:
   ```bash
   cd portfolio-backend
   dotnet run
   ```
3. In the second terminal, navigate to the frontend directory and run:
   ```bash
   cd portfolio-fronted
   npm start
   ```
4. Open your browser and navigate to `http://localhost:4200`

### Option 2: Using Setup Scripts

**Windows:**
```bash
.\setup-backend.ps1
```

**macOS/Linux:**
```bash
chmod +x setup-backend.sh
./setup-backend.sh
```

Then follow the manual startup instructions above.

## Troubleshooting

### .NET SDK Not Found

**Error:** `No .NET SDKs were found`

**Solution:**
1. Verify .NET is installed by running `dotnet --version`
2. If not installed, follow the installation instructions above
3. If installed but not found, restart your terminal/command prompt
4. Check your PATH environment variable includes the .NET SDK path

### Port Already in Use

**Error:** `Port 5000 is already in use` or `Port 4200 is already in use`

**Solution:**
1. Find the process using the port:
   - Windows: `netstat -ano | findstr :5000`
   - macOS/Linux: `lsof -i :5000`
2. Kill the process or use a different port by modifying the configuration files

### Database Connection Error

**Error:** `Unable to open database file`

**Solution:**
1. Ensure you've run the database migration: `dotnet ef database update`
2. Check that the `portfolio.db` file exists in the backend directory
3. Verify the connection string in `appsettings.json` is correct

### Node.js Version Incompatibility

**Error:** `The engine "node" is incompatible with this module`

**Solution:**
1. Check your Node.js version: `node --version`
2. If using an older version, update to the latest LTS version
3. You can use `nvm` (Node Version Manager) to manage multiple Node.js versions

### npm Install Fails

**Error:** `npm ERR! code ECONNREFUSED` or similar network errors

**Solution:**
1. Check your internet connection
2. Try clearing npm cache: `npm cache clean --force`
3. If behind a corporate proxy, configure npm to use it:
   ```bash
   npm config set proxy http://proxy.company.com:8080
   npm config set https-proxy http://proxy.company.com:8080
   ```

### CORS Errors

**Error:** `Access to XMLHttpRequest at 'http://localhost:5000/api/...' from origin 'http://localhost:4200' has been blocked by CORS policy`

**Solution:**
1. Ensure the backend is running
2. Check that CORS is properly configured in `Program.cs`
3. Verify the frontend proxy configuration in `proxy.conf.json`

### Angular Build Errors

**Error:** TypeScript compilation errors

**Solution:**
1. Ensure all dependencies are installed: `npm install`
2. Check for TypeScript errors in your code
3. Run `npm run lint` to identify linting issues
4. Clear the Angular cache: `rm -rf node_modules/.cache` (macOS/Linux) or `rmdir /s /q node_modules\.cache` (Windows)

### Three.js Not Loading

**Error:** Three.js 3D scenes not displaying

**Solution:**
1. Check browser console for JavaScript errors
2. Ensure Three.js is properly installed: `npm list three`
3. Verify the component is properly initialized and the canvas element exists
4. Check that the browser supports WebGL

## Additional Resources

- [.NET Documentation](https://docs.microsoft.com/en-us/dotnet/)
- [Angular Documentation](https://angular.io/docs)
- [Three.js Documentation](https://threejs.org/docs/)
- [Node.js Documentation](https://nodejs.org/en/docs/)

## Getting Help

If you encounter any issues not covered in this guide:

1. Check the error messages in your terminal/console
2. Review the logs in the backend and frontend
3. Search for the error message online
4. Check the project's issue tracker (if available)
5. Contact the project maintainer

## Next Steps

Once you have the project running:

1. Explore the API endpoints using Swagger UI at `http://localhost:5000/swagger`
2. Customize the portfolio content by modifying the seed data in `PortfolioDbContext.cs`
3. Update the frontend styling in `src/styles.scss` and component SCSS files
4. Add your own projects, experience, and skills
5. Configure email settings in `appsettings.json` to enable the contact form
6. Deploy the application to your preferred hosting platform

Happy coding! 🚀