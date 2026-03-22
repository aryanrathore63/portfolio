using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using PortfolioBackend.Data;
using PortfolioBackend.Services;

var builder = WebApplication.CreateBuilder(args);

// Configure Email Settings
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));

// Add services to the container
builder.Services.AddControllers();

// Configure CORS for Angular frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Add DbContext - InMemoryDatabase for development, SQLite for production
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddDbContext<PortfolioDbContext>(options =>
        options.UseInMemoryDatabase("PortfolioDb"));
}
else
{
    builder.Services.AddDbContext<PortfolioDbContext>(options =>
        options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
}

// Register services
builder.Services.AddScoped<IPortfolioService, PortfolioService>();
builder.Services.AddScoped<IEmailService, EmailService>();

// Add API Explorer and Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo 
    { 
        Title = "Portfolio API", 
        Version = "v1",
        Description = "API for Aryan Rathore's Developer Portfolio"
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Portfolio API v1");
        c.RoutePrefix = string.Empty; // Serve Swagger UI at root
    });
}

app.UseHttpsRedirection();

app.UseCors("AllowAngularDev");

app.UseAuthorization();

app.MapControllers();

// Seed database on startup
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
    context.Database.EnsureCreated();
}

app.Run();