# 🐳 Docker Setup Guide

This guide provides instructions for running the Personal Developer Portfolio using Docker and Docker Compose.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Docker** - [Download here](https://www.docker.com/get-started)
- **Docker Compose** - Usually included with Docker Desktop

To verify your installation:

```bash
docker --version
docker-compose --version
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Build and Run the Containers

```bash
docker-compose up -d
```

This command will:
- Build the Docker images for both backend and frontend
- Start the containers in detached mode
- Create a network for the containers to communicate
- Create a volume for the backend database

### 3. Access the Application

- **Frontend:** http://localhost
- **Backend API:** http://localhost:5000
- **Swagger UI:** http://localhost:5000/swagger

## 📝 Docker Commands

### Build the Images

```bash
docker-compose build
```

### Start the Containers

```bash
docker-compose up -d
```

### View Container Logs

```bash
# View all logs
docker-compose logs

# View backend logs
docker-compose logs backend

# View frontend logs
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f
```

### Stop the Containers

```bash
docker-compose stop
```

### Stop and Remove Containers

```bash
docker-compose down
```

### Stop and Remove Containers with Volumes

```bash
docker-compose down -v
```

### Rebuild and Restart

```bash
docker-compose up -d --build
```

### Execute Commands in Containers

```bash
# Access backend container
docker-compose exec backend sh

# Access frontend container
docker-compose exec frontend sh
```

## 🔧 Configuration

### Environment Variables

You can customize the application by modifying environment variables in `docker-compose.yml`:

#### Backend Environment Variables

```yaml
environment:
  - ASPNETCORE_ENVIRONMENT=Production
  - ASPNETCORE_URLS=http://+:80
```

#### Frontend Environment Variables

The frontend uses Nginx configuration in `nginx.conf` to proxy API requests to the backend.

### Ports

The following ports are exposed:

- **Frontend:** 80 (mapped to host port 80)
- **Backend:** 80 (mapped to host port 5000)

To change the ports, modify the `ports` section in `docker-compose.yml`:

```yaml
services:
  backend:
    ports:
      - "8080:80"  # Change backend port to 8080
  
  frontend:
    ports:
      - "3000:80"  # Change frontend port to 3000
```

### Volumes

The backend uses a named volume for database persistence:

```yaml
volumes:
  backend-data:
    driver: local
```

This ensures that your database data persists even if you remove the containers.

## 🏗️ Docker Architecture

### Backend Container

- **Base Image:** `mcr.microsoft.com/dotnet/aspnet:8.0`
- **Build Image:** `mcr.microsoft.com/dotnet/sdk:8.0`
- **Port:** 80
- **Health Check:** `/health` endpoint

### Frontend Container

- **Base Image:** `nginx:alpine`
- **Build Image:** `node:20-alpine`
- **Port:** 80
- **Health Check:** `/health` endpoint

### Network

Both containers are connected to a bridge network named `portfolio-network`, allowing them to communicate with each other.

## 🐛 Troubleshooting

### Container Won't Start

1. Check the logs:
   ```bash
   docker-compose logs
   ```

2. Verify that ports 80 and 5000 are not already in use:
   ```bash
   # On Linux/macOS
   lsof -i :80
   lsof -i :5000
   
   # On Windows
   netstat -ano | findstr :80
   netstat -ano | findstr :5000
   ```

3. Stop and remove containers:
   ```bash
   docker-compose down
   ```

4. Rebuild and start:
   ```bash
   docker-compose up -d --build
   ```

### Build Fails

1. Clear Docker cache:
   ```bash
   docker system prune -a
   ```

2. Rebuild without cache:
   ```bash
   docker-compose build --no-cache
   ```

### Database Issues

1. Remove the volume to reset the database:
   ```bash
   docker-compose down -v
   docker-compose up -d
   ```

2. Check database logs:
   ```bash
   docker-compose logs backend
   ```

### Frontend Can't Connect to Backend

1. Verify that both containers are running:
   ```bash
   docker-compose ps
   ```

2. Check the network configuration:
   ```bash
   docker network inspect portfolio_portfolio-network
   ```

3. Verify the Nginx configuration in `portfolio-fronted/nginx.conf`

### Permission Issues (Linux)

If you encounter permission issues on Linux, you may need to run Docker with sudo or add your user to the docker group:

```bash
sudo usermod -aG docker $USER
```

Then log out and log back in for the changes to take effect.

## 📊 Monitoring

### View Container Status

```bash
docker-compose ps
```

### View Resource Usage

```bash
docker stats
```

### View Container Details

```bash
docker inspect portfolio-backend
docker inspect portfolio-frontend
```

## 🔄 Updating the Application

### Update Code

1. Pull the latest changes:
   ```bash
   git pull origin main
   ```

2. Rebuild and restart:
   ```bash
   docker-compose up -d --build
   ```

### Update Dependencies

#### Backend Dependencies

1. Update `PortfolioBackend.csproj` with new package versions
2. Rebuild:
   ```bash
   docker-compose up -d --build
   ```

#### Frontend Dependencies

1. Update `package.json` with new package versions
2. Rebuild:
   ```bash
   docker-compose up -d --build
   ```

## 🚢 Production Deployment

### Using Docker Compose

For production deployment, consider the following:

1. **Environment Variables:** Use environment-specific variables
2. **SSL/TLS:** Configure SSL certificates in Nginx
3. **Database:** Use a managed database service instead of SQLite
4. **Logging:** Configure centralized logging
5. **Monitoring:** Set up monitoring and alerting
6. **Backup:** Implement regular database backups

### Using Docker Swarm or Kubernetes

For larger deployments, consider using Docker Swarm or Kubernetes:

- **Docker Swarm:** Simple orchestration for small to medium deployments
- **Kubernetes:** More complex but offers advanced features for large-scale deployments

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [.NET Docker Images](https://hub.docker.com/_/microsoft-dotnet)
- [Nginx Documentation](https://nginx.org/en/docs/)

## 🆘 Support

If you encounter any issues:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the container logs
3. Open an issue on GitHub
4. Contact the author

---

Happy Dockerizing! 🐳