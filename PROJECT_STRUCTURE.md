# 📁 Project Structure

This document provides a comprehensive overview of the Personal Developer Portfolio project structure, including all files and directories.

## 🌳 Root Directory Structure

```
portfolio/
├── portfolio-backend/          # .NET 8 Web API backend
├── portfolio-fronted/          # Angular 17+ frontend
├── .gitignore                  # Root-level gitignore file
├── LICENSE                     # MIT License
├── README.md                   # Project README
├── SETUP.md                    # Detailed setup instructions
├── DOCKER.md                   # Docker setup guide
├── PROJECT_STRUCTURE.md        # This file
├── docker-compose.yml          # Docker Compose configuration
└── global.json                 # .NET SDK version pinning
```

## 📂 Backend Structure (`portfolio-backend/`)

```
portfolio-backend/
├── Controllers/                # API Controllers
│   ├── AchievementsController.cs
│   ├── ContactController.cs
│   ├── ExperienceController.cs
│   ├── ProjectsController.cs
│   └── SkillsController.cs
│
├── Data/                       # Database Context
│   └── PortfolioDbContext.cs
│
├── Models/                     # Data Models
│   ├── Achievement.cs
│   ├── ContactMessage.cs
│   ├── Experience.cs
│   ├── Project.cs
│   └── Skill.cs
│
├── Services/                   # Business Logic
│   ├── EmailService.cs
│   ├── IEmailService.cs
│   ├── IPortfolioService.cs
│   └── PortfolioService.cs
│
├── Properties/                 # Project Properties
│   └── launchSettings.json
│
├── .dockerignore               # Docker ignore file
├── .gitignore                  # Git ignore file
├── Dockerfile                  # Docker configuration
├── PortfolioBackend.csproj     # Project file
├── Program.cs                  # Application entry point
├── README.md                   # Backend README
├── appsettings.Development.json
├── appsettings.json            # Configuration
├── setup-backend.ps1           # Windows setup script
├── setup-backend.sh            # Unix setup script
└── portfolio.db                # SQLite database (generated)
```

### Backend File Descriptions

| File | Description |
|------|-------------|
| `Program.cs` | Application entry point, configures services, middleware, and pipeline |
| `PortfolioBackend.csproj` | .NET project file with dependencies and build configuration |
| `appsettings.json` | Application configuration (connection strings, email settings, etc.) |
| `PortfolioDbContext.cs` | Entity Framework Core database context with seed data |
| `ProjectsController.cs` | API endpoints for project CRUD operations |
| `ExperienceController.cs` | API endpoints for experience CRUD operations |
| `SkillsController.cs` | API endpoints for skills CRUD operations |
| `ContactController.cs` | API endpoint for contact form submissions |
| `AchievementsController.cs` | API endpoints for achievements CRUD operations |
| `PortfolioService.cs` | Service layer implementation for data access |
| `IPortfolioService.cs` | Service layer interface |
| `EmailService.cs` | Email service implementation using MailKit |
| `IEmailService.cs` | Email service interface |
| `Project.cs` | Project data model |
| `Experience.cs` | Experience data model |
| `Skill.cs` | Skill data model |
| `ContactMessage.cs` | Contact message data model |
| `Achievement.cs` | Achievement data model |
| `Dockerfile` | Docker configuration for building backend image |
| `.dockerignore` | Files to exclude from Docker build context |
| `setup-backend.ps1` | PowerShell script for Windows setup |
| `setup-backend.sh` | Bash script for Unix/macOS setup |

## 📂 Frontend Structure (`portfolio-fronted/`)

```
portfolio-fronted/
├── src/
│   ├── app/
│   │   ├── core/               # Core Services and Models
│   │   │   ├── models/         # Data Models
│   │   │   │   ├── achievement.model.ts
│   │   │   │   ├── contact.model.ts
│   │   │   │   ├── experience.model.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── project.model.ts
│   │   │   │   └── skill.model.ts
│   │   │   └── services/       # Services
│   │   │       ├── animation.service.ts
│   │   │       ├── index.ts
│   │   │       ├── portfolio.service.ts
│   │   │       └── theme.service.ts
│   │   │
│   │   ├── features/           # Feature Components
│   │   │   ├── about/
│   │   │   │   ├── about.component.html
│   │   │   │   ├── about.component.scss
│   │   │   │   └── about.component.ts
│   │   │   ├── contact/
│   │   │   │   ├── contact.component.html
│   │   │   │   ├── contact.component.scss
│   │   │   │   └── contact.component.ts
│   │   │   ├── experience/
│   │   │   │   ├── experience.component.html
│   │   │   │   ├── experience.component.scss
│   │   │   │   └── experience.component.ts
│   │   │   ├── hero/
│   │   │   │   ├── hero.component.html
│   │   │   │   ├── hero.component.scss
│   │   │   │   └── hero.component.ts
│   │   │   ├── projects/
│   │   │   │   ├── projects.component.html
│   │   │   │   ├── projects.component.scss
│   │   │   │   └── projects.component.ts
│   │   │   └── skills/
│   │   │       ├── skills.component.html
│   │   │       ├── skills.component.scss
│   │   │       └── skills.component.ts
│   │   │
│   │   ├── shared/             # Shared Components
│   │   │   ├── components/     # Shared UI Components
│   │   │   │   ├── footer/
│   │   │   │   │   ├── footer.component.html
│   │   │   │   │   ├── footer.component.scss
│   │   │   │   │   └── footer.component.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── loader/
│   │   │   │   │   ├── loader.component.html
│   │   │   │   │   ├── loader.component.scss
│   │   │   │   │   └── loader.component.ts
│   │   │   │   └── navbar/
│   │   │   │       ├── navbar.component.html
│   │   │   │       ├── navbar.component.scss
│   │   │   │       └── navbar.component.ts
│   │   │   └── directives/     # Custom Directives
│   │   │       ├── index.ts
│   │   │       ├── scroll-reveal.directive.ts
│   │   │       └── tilt.directive.ts
│   │   │
│   │   ├── app.component.html # Root component template
│   │   ├── app.component.scss # Root component styles
│   │   ├── app.component.ts   # Root component logic
│   │   ├── app.config.ts      # App configuration
│   │   └── app.routes.ts      # App routing
│   │
│   ├── assets/                 # Static Assets
│   │   └── .gitkeep
│   │
│   ├── environments/           # Environment Configurations
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   │
│   ├── styles/                 # Global Styles
│   │   ├── styles.scss
│   │   └── variables.scss
│   │
│   ├── favicon.ico             # Favicon
│   ├── index.html              # HTML entry point
│   ├── main.ts                 # Application bootstrap
│   ├── polyfills.ts            # Polyfills
│   ├── test.ts                 # Test entry point
│   └── typings.d.ts            # TypeScript type definitions
│
├── .browserslistrc             # Browser support configuration
├── .dockerignore               # Docker ignore file
├── .editorconfig               # Editor configuration
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore file
├── .prettierignore             # Prettier ignore file
├── .prettierrc                 # Prettier configuration
├── .vscode/                    # VS Code configuration
│   ├── extensions.json
│   ├── launch.json
│   ├── settings.json
│   └── tasks.json
├── angular.json                # Angular configuration
├── Dockerfile                  # Docker configuration
├── karma.conf.js               # Karma test runner configuration
├── nginx.conf                  # Nginx configuration
├── package.json                # Node dependencies
├── proxy.conf.json             # API proxy configuration
├── README.md                   # Frontend README
├── setup-frontend.ps1          # Windows setup script
├── setup-frontend.sh           # Unix setup script
├── tsconfig.app.json           # TypeScript app configuration
├── tsconfig.base.json          # TypeScript base configuration
├── tsconfig.json               # TypeScript configuration
└── tsconfig.spec.json          # TypeScript spec configuration
```

### Frontend File Descriptions

| File | Description |
|------|-------------|
| `main.ts` | Application bootstrap entry point |
| `index.html` | HTML entry point |
| `angular.json` | Angular CLI configuration |
| `package.json` | Node.js dependencies and scripts |
| `tsconfig.json` | TypeScript compiler configuration |
| `proxy.conf.json` | Development API proxy configuration |
| `nginx.conf` | Nginx configuration for Docker |
| `Dockerfile` | Docker configuration for building frontend image |
| `.dockerignore` | Files to exclude from Docker build context |
| `app.component.ts` | Root component logic |
| `app.component.html` | Root component template |
| `app.component.scss` | Root component styles |
| `app.config.ts` | Application configuration (providers) |
| `app.routes.ts` | Application routing configuration |
| `portfolio.service.ts` | HTTP service for API communication |
| `animation.service.ts` | Animation service for scroll/tilt effects |
| `theme.service.ts` | Theme service for dark/light mode |
| `hero.component.ts` | Hero section with Three.js animations |
| `about.component.ts` | About section component |
| `skills.component.ts` | Skills section component |
| `experience.component.ts` | Experience timeline component |
| `projects.component.ts` | Projects showcase component |
| `contact.component.ts` | Contact form component |
| `navbar.component.ts` | Navigation bar component |
| `footer.component.ts` | Footer component |
| `loader.component.ts` | Loading spinner component |
| `tilt.directive.ts` | 3D tilt effect directive |
| `scroll-reveal.directive.ts` | Scroll reveal animation directive |
| `project.model.ts` | Project data model |
| `experience.model.ts` | Experience data model |
| `skill.model.ts` | Skill data model |
| `contact.model.ts` | Contact message data model |
| `achievement.model.ts` | Achievement data model |
| `styles.scss` | Global styles |
| `variables.scss` | SCSS variables and design tokens |
| `environment.ts` | Development environment configuration |
| `environment.prod.ts` | Production environment configuration |
| `setup-frontend.ps1` | PowerShell script for Windows setup |
| `setup-frontend.sh` | Bash script for Unix/macOS setup |

## 📂 Root Files

| File | Description |
|------|-------------|
| `README.md` | Project overview and quick start guide |
| `SETUP.md` | Detailed setup instructions for all operating systems |
| `DOCKER.md` | Docker setup and deployment guide |
| `PROJECT_STRUCTURE.md` | This file - detailed project structure |
| `LICENSE` | MIT License |
| `.gitignore` | Root-level gitignore file |
| `docker-compose.yml` | Docker Compose configuration |
| `global.json` | .NET SDK version pinning |

## 🔧 Configuration Files

### Backend Configuration

- `appsettings.json` - Main configuration file
- `appsettings.Development.json` - Development overrides
- `launchSettings.json` - Launch profiles for development

### Frontend Configuration

- `angular.json` - Angular CLI configuration
- `tsconfig.json` - TypeScript configuration
- `tsconfig.base.json` - Base TypeScript configuration
- `tsconfig.app.json` - App TypeScript configuration
- `tsconfig.spec.json` - Spec TypeScript configuration
- `.eslintrc.json` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `.browserslistrc` - Browser support configuration
- `karma.conf.js` - Karma test runner configuration
- `proxy.conf.json` - API proxy configuration

### Docker Configuration

- `docker-compose.yml` - Docker Compose orchestration
- `portfolio-backend/Dockerfile` - Backend Docker image
- `portfolio-fronted/Dockerfile` - Frontend Docker image
- `portfolio-fronted/nginx.conf` - Nginx configuration
- `portfolio-backend/.dockerignore` - Backend Docker ignore
- `portfolio-fronted/.dockerignore` - Frontend Docker ignore

### VS Code Configuration

- `.vscode/settings.json` - VS Code settings
- `.vscode/extensions.json` - Recommended extensions
- `.vscode/launch.json` - Debug configuration
- `.vscode/tasks.json` - Task configuration

## 🗂️ Directory Purposes

### Backend Directories

- `Controllers/` - API endpoint definitions
- `Data/` - Database context and configuration
- `Models/` - Data models/entities
- `Services/` - Business logic and data access
- `Properties/` - Project properties and launch settings

### Frontend Directories

- `src/app/core/` - Core services and models
- `src/app/features/` - Feature-specific components
- `src/app/shared/` - Shared components and directives
- `src/assets/` - Static assets (images, fonts, etc.)
- `src/environments/` - Environment-specific configurations
- `src/styles/` - Global styles and variables

## 📊 File Statistics

### Backend

- **Controllers:** 5 files
- **Models:** 5 files
- **Services:** 4 files
- **Configuration:** 3 files
- **Total:** ~20 files

### Frontend

- **Components:** 9 files (3 shared + 6 features)
- **Services:** 3 files
- **Models:** 5 files
- **Directives:** 2 files
- **Configuration:** 10+ files
- **Total:** ~50 files

### Root

- **Documentation:** 4 files
- **Configuration:** 2 files
- **Total:** 6 files

## 🔄 Data Flow

### Backend Data Flow

```
Client Request → Controller → Service → DbContext → Database
                      ↓
                 Response ← Service ← DbContext ← Database
```

### Frontend Data Flow

```
User Interaction → Component → Service → HTTP Request → Backend API
                      ↓
                 Update UI ← Service ← HTTP Response ← Backend API
```

### Docker Data Flow

```
User → Nginx (Frontend) → Backend API → Database
```

## 🎯 Key Features by Component

### Backend Features

| Component | Features |
|-----------|----------|
| ProjectsController | CRUD operations for projects |
| ExperienceController | CRUD operations for experience |
| SkillsController | CRUD operations for skills |
| ContactController | Contact form submission |
| AchievementsController | CRUD operations for achievements |
| EmailService | Email sending functionality |
| PortfolioService | Data access layer |

### Frontend Features

| Component | Features |
|-----------|----------|
| HeroComponent | Three.js 3D animations |
| AboutComponent | Personal information display |
| SkillsComponent | Skills with proficiency bars |
| ExperienceComponent | Timeline of work experience |
| ProjectsComponent | Project showcase with filtering |
| ContactComponent | Contact form with validation |
| NavbarComponent | Navigation and theme toggle |
| FooterComponent | Footer with social links |
| LoaderComponent | Loading spinner |
| TiltDirective | 3D tilt effect on hover |
| ScrollRevealDirective | Scroll reveal animations |

## 🚀 Build and Deployment

### Backend Build Process

1. Restore NuGet packages
2. Compile C# code
3. Apply database migrations
4. Build output in `bin/Release/`

### Frontend Build Process

1. Install npm dependencies
2. Compile TypeScript
3. Build Angular application
4. Optimize assets
5. Build output in `dist/`

### Docker Build Process

1. Build backend image from `portfolio-backend/Dockerfile`
2. Build frontend image from `portfolio-fronted/Dockerfile`
3. Create network and volumes
4. Start containers with `docker-compose`

## 📝 Notes

- The backend uses SQLite for simplicity, but can be easily switched to PostgreSQL, MySQL, or SQL Server
- The frontend uses Angular 17+ with standalone components
- Both backend and frontend have Docker support for easy deployment
- The project includes comprehensive documentation for setup and deployment
- All configuration files are included for easy customization

---

For more information, see:
- [README.md](README.md) - Project overview
- [SETUP.md](SETUP.md) - Setup instructions
- [DOCKER.md](DOCKER.md) - Docker guide