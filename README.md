# 🚀 Personal Developer Portfolio

A modern, full-stack personal developer portfolio with a .NET 8 Web API backend and an Angular 17+ frontend. This portfolio features a glass-morphic, neon-styled UI with Three.js 3D animations, interactive components, and a responsive design.

![Portfolio Preview](https://via.placeholder.com/1200x600/1a1a2e/16213e?text=Portfolio+Preview)

## ✨ Features

### Backend (.NET 8 Web API)
- ✅ RESTful API endpoints for all entities
- ✅ Entity Framework Core with SQLite database
- ✅ Seed data for initial content
- ✅ Email service for contact form submissions
- ✅ Swagger/OpenAPI documentation
- ✅ CORS configuration for Angular frontend
- ✅ Comprehensive error handling and logging

### Frontend (Angular 17+)
- ✅ Glass-morphic, neon-styled UI
- ✅ Three.js hero animations
- ✅ 3D tilt effect on cards
- ✅ Scroll reveal animations
- ✅ Dark/light theme toggle
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Contact form with validation
- ✅ Project showcase with filtering
- ✅ Skills visualization with proficiency bars
- ✅ Experience timeline
- ✅ Achievements display
- ✅ Social media links
- ✅ SEO-friendly structure

## 🛠️ Technologies Used

### Backend
- **.NET 8** - Latest .NET framework
- **ASP.NET Core Web API** - RESTful API framework
- **Entity Framework Core** - ORM for database operations
- **SQLite** - Lightweight database
- **Swashbuckle.AspNetCore** - Swagger/OpenAPI documentation
- **MailKit** - Email service library

### Frontend
- **Angular 17.3.0** - Modern web framework
- **TypeScript** - Type-safe JavaScript
- **Three.js** - 3D graphics library
- **Tailwind CSS** - Utility-first CSS framework
- **RxJS** - Reactive programming library
- **Angular Animations** - Animation library
- **Lucide Icons** - Icon library

### Development Tools
- **Visual Studio Code** - Code editor
- **Git** - Version control
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Karma** - Test runner
- **Jasmine** - Testing framework
- **Docker** - Containerization

## 📁 Project Structure

```
portfolio/
├── portfolio-backend/          # .NET 8 Web API backend
│   ├── Controllers/            # API controllers
│   ├── Data/                   # Database context
│   ├── Models/                 # Data models
│   ├── Services/               # Business logic
│   ├── Program.cs              # Application entry point
│   ├── appsettings.json        # Configuration
│   ├── PortfolioBackend.csproj # Project file
│   ├── Dockerfile              # Docker configuration
│   ├── .dockerignore           # Docker ignore file
│   ├── setup-backend.ps1       # Windows setup script
│   └── setup-backend.sh        # Unix setup script
│
├── portfolio-fronted/          # Angular 17+ frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/           # Core services and models
│   │   │   ├── features/       # Feature components
│   │   │   ├── shared/         # Shared components
│   │   │   ├── app.component.* # Root component
│   │   │   ├── app.config.ts   # App configuration
│   │   │   └── app.routes.ts   # App routing
│   │   ├── assets/             # Static assets
│   │   ├── environments/       # Environment configs
│   │   ├── index.html          # HTML entry point
│   │   ├── main.ts             # Application bootstrap
│   │   └── styles.scss         # Global styles
│   ├── angular.json            # Angular configuration
│   ├── package.json            # Node dependencies
│   ├── proxy.conf.json         # API proxy configuration
│   ├── Dockerfile              # Docker configuration
│   ├── nginx.conf              # Nginx configuration
│   ├── .dockerignore           # Docker ignore file
│   ├── setup-frontend.ps1      # Windows setup script
│   └── setup-frontend.sh       # Unix setup script
│
├── docker-compose.yml          # Docker Compose configuration
├── global.json                 # .NET SDK version pinning
├── SETUP.md                    # Detailed setup instructions
├── DOCKER.md                   # Docker setup guide
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **.NET 8 SDK** - [Download here](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js** (LTS) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)

### Option 1: Docker (Recommended)

The easiest way to run the portfolio is using Docker and Docker Compose:

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Build and run with Docker Compose
docker-compose up -d

# Access the application
# Frontend: http://localhost
# Backend API: http://localhost:5000
# Swagger UI: http://localhost:5000/swagger
```

For detailed Docker instructions, see [DOCKER.md](DOCKER.md).

### Option 2: Manual Setup

For detailed installation instructions for Windows, macOS, and Linux, please see [SETUP.md](SETUP.md).

#### Quick Setup (Windows)

1. **Backend Setup:**
   ```powershell
   cd portfolio-backend
   .\setup-backend.ps1
   dotnet run
   ```

2. **Frontend Setup:**
   ```powershell
   cd portfolio-fronted
   .\setup-frontend.ps1
   npm start
   ```

#### Quick Setup (macOS/Linux)

1. **Backend Setup:**
   ```bash
   cd portfolio-backend
   chmod +x setup-backend.sh
   ./setup-backend.sh
   dotnet run
   ```

2. **Frontend Setup:**
   ```bash
   cd portfolio-fronted
   chmod +x setup-frontend.sh
   ./setup-frontend.sh
   npm start
   ```

### Access the Application

- **Frontend:** http://localhost:4200 (manual setup) or http://localhost (Docker)
- **Backend API:** http://localhost:5000
- **Swagger UI:** http://localhost:5000/swagger

## 📖 Documentation

- [SETUP.md](SETUP.md) - Detailed setup instructions for all operating systems
- [DOCKER.md](DOCKER.md) - Docker setup and deployment guide
- [Backend README](portfolio-backend/README.md) - Backend-specific documentation
- [Frontend README](portfolio-fronted/README.md) - Frontend-specific documentation

## 🎨 Customization

### Backend Customization

1. **Update Seed Data:** Modify `PortfolioDbContext.cs` to add your own projects, experience, skills, and achievements
2. **Configure Email:** Update `appsettings.json` with your SMTP settings
3. **Add API Endpoints:** Create new controllers in the `Controllers` folder
4. **Modify Database:** Update models and run migrations

### Frontend Customization

1. **Update Content:** Modify component files in `src/app/features/` to update portfolio content
2. **Change Styling:** Update `src/styles.scss` and component SCSS files
3. **Add Features:** Create new components in `src/app/features/`
4. **Configure Theme:** Modify CSS variables in `src/styles.scss`

## 🧪 Testing

### Backend Testing

```bash
cd portfolio-backend
dotnet test
```

### Frontend Testing

```bash
cd portfolio-fronted
npm test
```

## 📦 Building for Production

### Backend

```bash
cd portfolio-backend
dotnet publish -c Release
```

### Frontend

```bash
cd portfolio-fronted
npm run build
```

The production build will be in the `dist/` directory.

### Docker Production Build

```bash
docker-compose -f docker-compose.yml build
```

## 🚢 Deployment

### Docker Deployment (Recommended)

The easiest way to deploy the portfolio is using Docker:

```bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

For detailed Docker deployment instructions, see [DOCKER.md](DOCKER.md).

### Backend Deployment Options

- **Azure App Service**
- **AWS Elastic Beanstalk**
- **Google Cloud Run**
- **Heroku**
- **Docker containers**

### Frontend Deployment Options

- **Azure Static Web Apps**
- **AWS S3 + CloudFront**
- **Google Cloud Storage + Firebase Hosting**
- **Netlify**
- **Vercel**
- **GitHub Pages**

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**

- Website: [yourwebsite.com](https://yourwebsite.com)
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [yourlinkedin](https://linkedin.com/in/yourlinkedin)

## 🙏 Acknowledgments

- [Angular](https://angular.io/) - The web framework used
- [.NET](https://dotnet.microsoft.com/) - The backend framework
- [Three.js](https://threejs.org/) - 3D graphics library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide Icons](https://lucide.dev/) - Icon library
- [Docker](https://www.docker.com/) - Containerization platform

## 📞 Support

If you have any questions or need help, please:

1. Check the [SETUP.md](SETUP.md) file for detailed setup instructions
2. Check the [DOCKER.md](DOCKER.md) file for Docker-specific instructions
3. Review the troubleshooting section in SETUP.md
4. Open an issue on GitHub
5. Contact the author

## 🗺️ Roadmap

- [x] Basic portfolio structure
- [x] Backend API with .NET 8
- [x] Frontend with Angular 17+
- [x] Three.js animations
- [x] Docker support
- [ ] Add authentication and authorization
- [ ] Implement blog functionality
- [ ] Add admin dashboard
- [ ] Implement analytics tracking
- [ ] Add multi-language support
- [ ] Create CI/CD pipeline
- [ ] Implement automated testing
- [ ] Add performance monitoring
- [ ] Create mobile app version

---

Made with ❤️ using .NET 8 and Angular 17