using Microsoft.EntityFrameworkCore;
using PortfolioBackend.Models;

namespace PortfolioBackend.Data
{
    public class PortfolioDbContext : DbContext
    {
        public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options)
            : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<SkillCategory> SkillCategories { get; set; }
        public DbSet<ContactMessage> ContactMessages { get; set; }
        public DbSet<Achievement> Achievements { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed Projects
            modelBuilder.Entity<Project>().HasData(
                new Project
                {
                    Id = 1,
                    Title = "Real-Time Chat App",
                    Description = "WebSocket-based real-time chat application with role-based access control, JWT authentication, and a complete CI/CD pipeline deployed on Linux servers.",
                    TechStack = new List<string> { "MERN", "TypeScript", "Socket.io", "JWT", "Docker", "MongoDB", "Express.js", "React" },
                    GitHubUrl = "https://github.com/aryanrathore63",
                    LiveUrl = "",
                    Category = "Full Stack",
                    ImageUrl = "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800",
                    CreatedAt = new DateTime(2024, 1, 15)
                },
                new Project
                {
                    Id = 2,
                    Title = "TOO-YUM Food Delivery App",
                    Description = "Full-stack food delivery platform featuring live order tracking, user authentication, shopping cart, and secure checkout with payment integration.",
                    TechStack = new List<string> { "React", "Node.js", "MongoDB", "SQL", "JWT", "Express.js", "Redux" },
                    GitHubUrl = "https://github.com/aryanrathore63",
                    LiveUrl = "",
                    Category = "Full Stack",
                    ImageUrl = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
                    CreatedAt = new DateTime(2024, 2, 20)
                },
                new Project
                {
                    Id = 3,
                    Title = "Interactive Quiz Application",
                    Description = "GUI-based quiz engine with Object-Oriented design, SQL-backed dynamic question loading, and comprehensive JUnit test suite ensuring 100% code coverage.",
                    TechStack = new List<string> { "Java", "Spring Framework", "SQL", "JUnit", "MVC", "Maven" },
                    GitHubUrl = "https://github.com/aryanrathore63",
                    LiveUrl = "",
                    Category = "Backend",
                    ImageUrl = "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
                    CreatedAt = new DateTime(2024, 3, 10)
                }
            );

            // Seed Experiences
            modelBuilder.Entity<Experience>().HasData(
                new Experience
                {
                    Id = 1,
                    Company = "S&P Global",
                    Position = "Software Developer Apprentice",
                    Location = "Noida, Uttar Pradesh",
                    StartDate = new DateTime(2025, 7, 1),
                    EndDate = null,
                    Description = "Developing enterprise applications using Angular, TypeScript, and .NET C#. Implementing CI/CD pipelines using Jenkins and Docker on Linux environments. Ensuring code quality through SonarQube analysis and following Agile/Scrum methodologies.",
                    Responsibilities = new List<string>
                    {
                        "Developed enterprise applications using Angular 17+ and .NET 8",
                        "Implemented CI/CD pipelines with Jenkins and Docker",
                        "Ensured code quality using SonarQube",
                        "Participated in Agile/Scrum ceremonies"
                    },
                    CompanyLogoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/S%26P_Global_logo.svg/200px-S%26P_Global_logo.svg.png"
                },
                new Experience
                {
                    Id = 2,
                    Company = "Thriftyx Private Limited",
                    Position = "Software Engineer Intern",
                    Location = "Hyderabad, Telangana",
                    StartDate = new DateTime(2025, 4, 1),
                    EndDate = new DateTime(2025, 6, 30),
                    Description = "Built responsive web applications using React and TypeScript. Developed RESTful APIs and optimized application performance, achieving 25% improvement in page load speed. Maintained 95% unit test coverage using Jest.",
                    Responsibilities = new List<string>
                    {
                        "Built responsive web applications with React and TypeScript",
                        "Developed RESTful APIs",
                        "Optimized application performance - 25% page load improvement",
                        "Maintained 95% unit test coverage with Jest"
                    },
                    CompanyLogoUrl = ""
                },
                new Experience
                {
                    Id = 3,
                    Company = "YHills EdTech",
                    Position = "Web Development Intern",
                    Location = "Remote",
                    StartDate = new DateTime(2022, 9, 1),
                    EndDate = new DateTime(2022, 10, 31),
                    Description = "Developed interactive dashboards using HTML, CSS, and JavaScript. Improved data handling efficiency by 80% through optimized algorithms and better data structures.",
                    Responsibilities = new List<string>
                    {
                        "Developed interactive dashboards with HTML, CSS, JavaScript",
                        "Improved data handling efficiency by 80%",
                        "Implemented responsive design principles"
                    },
                    CompanyLogoUrl = ""
                }
            );

            // Seed Skill Categories
            modelBuilder.Entity<SkillCategory>().HasData(
                new SkillCategory { Id = 1, Name = "Frontend", Icon = "🎨" },
                new SkillCategory { Id = 2, Name = "Backend", Icon = "⚙️" },
                new SkillCategory { Id = 3, Name = "DevOps", Icon = "🚀" },
                new SkillCategory { Id = 4, Name = "Database", Icon = "🗄️" },
                new SkillCategory { Id = 5, Name = "Testing", Icon = "🧪" }
            );

            // Seed Skills
            modelBuilder.Entity<Skill>().HasData(
                // Frontend Skills
                new Skill { Id = 1, Name = "Angular", Category = "Frontend", Proficiency = 90, DisplayOrder = 1 },
                new Skill { Id = 2, Name = "React", Category = "Frontend", Proficiency = 85, DisplayOrder = 2 },
                new Skill { Id = 3, Name = "TypeScript", Category = "Frontend", Proficiency = 90, DisplayOrder = 3 },
                new Skill { Id = 4, Name = "JavaScript", Category = "Frontend", Proficiency = 95, DisplayOrder = 4 },
                new Skill { Id = 5, Name = "HTML5/CSS3", Category = "Frontend", Proficiency = 95, DisplayOrder = 5 },
                new Skill { Id = 6, Name = "RxJS", Category = "Frontend", Proficiency = 80, DisplayOrder = 6 },
                new Skill { Id = 7, Name = "NgRx", Category = "Frontend", Proficiency = 75, DisplayOrder = 7 },
                new Skill { Id = 8, Name = "Redux", Category = "Frontend", Proficiency = 80, DisplayOrder = 8 },
                new Skill { Id = 9, Name = "SCSS", Category = "Frontend", Proficiency = 90, DisplayOrder = 9 },

                // Backend Skills
                new Skill { Id = 10, Name = "Java", Category = "Backend", Proficiency = 85, DisplayOrder = 1 },
                new Skill { Id = 11, Name = ".NET C#", Category = "Backend", Proficiency = 80, DisplayOrder = 2 },
                new Skill { Id = 12, Name = "Spring Boot", Category = "Backend", Proficiency = 80, DisplayOrder = 3 },
                new Skill { Id = 13, Name = "Node.js", Category = "Backend", Proficiency = 85, DisplayOrder = 4 },
                new Skill { Id = 14, Name = "Python", Category = "Backend", Proficiency = 75, DisplayOrder = 5 },
                new Skill { Id = 15, Name = "RESTful APIs", Category = "Backend", Proficiency = 90, DisplayOrder = 6 },
                new Skill { Id = 16, Name = "Microservices", Category = "Backend", Proficiency = 70, DisplayOrder = 7 },

                // DevOps Skills
                new Skill { Id = 17, Name = "Docker", Category = "DevOps", Proficiency = 80, DisplayOrder = 1 },
                new Skill { Id = 18, Name = "Kubernetes", Category = "DevOps", Proficiency = 65, DisplayOrder = 2 },
                new Skill { Id = 19, Name = "Jenkins", Category = "DevOps", Proficiency = 75, DisplayOrder = 3 },
                new Skill { Id = 20, Name = "AWS", Category = "DevOps", Proficiency = 70, DisplayOrder = 4 },
                new Skill { Id = 21, Name = "Azure", Category = "DevOps", Proficiency = 65, DisplayOrder = 5 },
                new Skill { Id = 22, Name = "CI/CD", Category = "DevOps", Proficiency = 80, DisplayOrder = 6 },
                new Skill { Id = 23, Name = "Linux", Category = "DevOps", Proficiency = 75, DisplayOrder = 7 },
                new Skill { Id = 24, Name = "Git", Category = "DevOps", Proficiency = 90, DisplayOrder = 8 },
                new Skill { Id = 25, Name = "GitHub", Category = "DevOps", Proficiency = 90, DisplayOrder = 9 },
                new Skill { Id = 26, Name = "SonarQube", Category = "DevOps", Proficiency = 70, DisplayOrder = 10 },

                // Database Skills
                new Skill { Id = 27, Name = "SQL", Category = "Database", Proficiency = 85, DisplayOrder = 1 },
                new Skill { Id = 28, Name = "MySQL", Category = "Database", Proficiency = 80, DisplayOrder = 2 },
                new Skill { Id = 29, Name = "MongoDB", Category = "Database", Proficiency = 80, DisplayOrder = 3 },
                new Skill { Id = 30, Name = "Entity Framework Core", Category = "Database", Proficiency = 75, DisplayOrder = 4 },

                // Testing Skills
                new Skill { Id = 31, Name = "JUnit", Category = "Testing", Proficiency = 85, DisplayOrder = 1 },
                new Skill { Id = 32, Name = "Jest", Category = "Testing", Proficiency = 85, DisplayOrder = 2 },
                new Skill { Id = 33, Name = "Unit Testing", Category = "Testing", Proficiency = 90, DisplayOrder = 3 },
                new Skill { Id = 34, Name = "TDD", Category = "Testing", Proficiency = 80, DisplayOrder = 4 },
                new Skill { Id = 35, Name = "SonarQube", Category = "Testing", Proficiency = 70, DisplayOrder = 5 }
            );

            // Seed Achievements
            modelBuilder.Entity<Achievement>().HasData(
                new Achievement
                {
                    Id = 1,
                    Title = "250+ LeetCode Problems Solved",
                    Description = "Successfully solved over 250 Data Structures and Algorithms problems on LeetCode, demonstrating strong problem-solving skills and algorithmic thinking.",
                    Category = "Coding",
                    IconUrl = "https://leetcode.com/static/images/LeetCode_logo.png",
                    CertificateUrl = "https://leetcode.com/aryanrathore63",
                    AchievedAt = new DateTime(2024, 6, 1),
                    DisplayOrder = 1
                },
                new Achievement
                {
                    Id = 2,
                    Title = "Top 10 Finalist - IIT Dharwad Hackathon",
                    Description = "Achieved top 10 finalist position out of 500+ teams in the prestigious IIT Dharwad Hackathon, competing against talented developers from across India.",
                    Category = "Competition",
                    IconUrl = "",
                    CertificateUrl = "",
                    AchievedAt = new DateTime(2024, 3, 15),
                    DisplayOrder = 2
                },
                new Achievement
                {
                    Id = 3,
                    Title = "Java Development Certified",
                    Description = "Earned professional certification in Java Development, validating expertise in core Java concepts, OOP principles, and enterprise application development.",
                    Category = "Certification",
                    IconUrl = "",
                    CertificateUrl = "",
                    AchievedAt = new DateTime(2023, 8, 20),
                    DisplayOrder = 3
                },
                new Achievement
                {
                    Id = 4,
                    Title = "Data Structures & Algorithms Certified",
                    Description = "Completed comprehensive certification in Data Structures and Algorithms, mastering essential algorithms, data structures, and optimization techniques.",
                    Category = "Certification",
                    IconUrl = "",
                    CertificateUrl = "",
                    AchievedAt = new DateTime(2023, 10, 15),
                    DisplayOrder = 4
                },
                new Achievement
                {
                    Id = 5,
                    Title = "Node.js Development Certified",
                    Description = "Obtained certification in Node.js development, demonstrating proficiency in server-side JavaScript, Express.js, and building scalable backend applications.",
                    Category = "Certification",
                    IconUrl = "",
                    CertificateUrl = "",
                    AchievedAt = new DateTime(2024, 1, 10),
                    DisplayOrder = 5
                }
            );
        }
    }
}