# Use the official .NET 10 SDK as a parent image for building
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy csproj and restore as distinct layers
COPY ["PortfolioBackend.csproj", "./"]
RUN dotnet restore "PortfolioBackend.csproj"

# Copy everything else and build
COPY . .
RUN dotnet publish "PortfolioBackend.csproj" -c Release -o /app/publish

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Create directory for database
RUN mkdir -p /app/data

# Expose port
EXPOSE 80
EXPOSE 443

# Set environment variables
ENV ASPNETCORE_URLS=http://+:80
ENV ASPNETCORE_ENVIRONMENT=Production

# Run the application
ENTRYPOINT ["dotnet", "PortfolioBackend.dll"]