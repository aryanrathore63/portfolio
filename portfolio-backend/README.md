# Portfolio Backend API

A .NET 8 Web API backend for a personal developer portfolio website.

## 🚀 Features

- RESTful API for portfolio data
- SQLite database with Entity Framework Core
- Email service for contact form submissions
- CORS support for frontend integration
- Seed data for initial database population

## 📋 Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [dotnet-ef](https://docs.microsoft.com/ef/core/cli/dotnet) (Entity Framework Core tools)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-backend
   ```

2. **Restore NuGet packages**
   ```bash
   dotnet restore
   ```

3. **Install EF Core tools** (if not already installed)
   ```bash
   dotnet tool install --global dotnet-ef
   ```

4. **Create and apply database migrations**
   ```bash
   dotnet ef migrations add Initial
   dotnet ef database update
   ```

5. **Configure email settings** (optional)
   
   Edit `appsettings.json` and add your SMTP configuration:
   ```json
   {
     "EmailSettings": {
       "SmtpHost": "smtp.example.com",
       "SmtpPort": 587,
       "SmtpUser": "your-email@example.com",
       "SmtpPassword": "your-password",
       "FromEmail": "noreply@example.com",
       "FromName": "Portfolio"
     }
   }
   ```

## 🏃 Running the Project

1. **Run the API**
   ```bash
   dotnet run
   ```

   The API will be available at `http://localhost:5000`

2. **Run in development mode**
   ```bash
   dotnet watch run
   ```

## 📡 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/{id}` - Get a specific project
- `POST /api/projects` - Create a new project
- `PUT /api/projects/{id}` - Update a project
- `DELETE /api/projects/{id}` - Delete a project

### Experience
- `GET /api/experience` - Get all work experiences
- `GET /api/experience/{id}` - Get a specific experience
- `POST /api/experience` - Create a new experience
- `PUT /api/experience/{id}` - Update an experience
- `DELETE /api/experience/{id}` - Delete an experience

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/{id}` - Get a specific skill
- `POST /api/skills` - Create a new skill
- `PUT /api/skills/{id}` - Update a skill
- `DELETE /api/skills/{id}` - Delete a skill

### Achievements
- `GET /api/achievements` - Get all achievements
- `GET /api/achievements/{id}` - Get a specific achievement
- `POST /api/achievements` - Create a new achievement
- `PUT /api/achievements/{id}` - Update an achievement
- `DELETE /api/achievements/{id}` - Delete an achievement

### Contact
- `POST /api/contact` - Submit a contact form message

## 🗄️ Database

The project uses SQLite as the database. The database file (`portfolio.db`) will be created in the project root when you run the migrations.

### Seed Data

The database is automatically seeded with sample data when the application starts. This includes:
- Sample projects
- Sample work experiences
- Sample skills
- Sample achievements

## 🔧 Configuration

The application configuration is stored in `appsettings.json`. Key settings include:

- `ConnectionStrings`: Database connection string
- `EmailSettings`: SMTP configuration for email service
- `CorsSettings`: CORS configuration for frontend integration

## 🧪 Testing

To run tests (if any):
```bash
dotnet test
```

## 📦 Building for Production

1. **Build the project**
   ```bash
   dotnet build -c Release
   ```

2. **Publish the project**
   ```bash
   dotnet publish -c Release -o ./publish
   ```

3. **Run the published application**
   ```bash
   cd publish
   dotnet PortfolioBackend.dll
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, please open an issue in the repository.