using Microsoft.EntityFrameworkCore;
using PortfolioBackend.Data;
using PortfolioBackend.Models;

namespace PortfolioBackend.Services
{
    public class PortfolioService : IPortfolioService
    {
        private readonly PortfolioDbContext _context;
        private readonly ILogger<PortfolioService> _logger;

        public PortfolioService(PortfolioDbContext context, ILogger<PortfolioService> logger)
        {
            _context = context;
            _logger = logger;
        }

        // Projects
        public async Task<List<Project>> GetAllProjectsAsync()
        {
            try
            {
                return await _context.Projects
                    .OrderByDescending(p => p.CreatedAt)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all projects");
                throw;
            }
        }

        public async Task<Project?> GetProjectByIdAsync(int id)
        {
            try
            {
                return await _context.Projects.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving project with ID: {ProjectId}", id);
                throw;
            }
        }

        public async Task<List<Project>> GetProjectsByCategoryAsync(string category)
        {
            try
            {
                return await _context.Projects
                    .Where(p => p.Category.Equals(category, StringComparison.OrdinalIgnoreCase))
                    .OrderByDescending(p => p.CreatedAt)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving projects for category: {Category}", category);
                throw;
            }
        }

        public async Task<(List<Project> Projects, int TotalCount)> GetPaginatedProjectsAsync(int page, int pageSize)
        {
            try
            {
                var totalCount = await _context.Projects.CountAsync();
                
                var projects = await _context.Projects
                    .OrderByDescending(p => p.CreatedAt)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                return (projects, totalCount);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving paginated projects for page: {Page}", page);
                throw;
            }
        }

        // Experience
        public async Task<List<Experience>> GetAllExperiencesAsync()
        {
            try
            {
                return await _context.Experiences
                    .OrderByDescending(e => e.StartDate)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all experiences");
                throw;
            }
        }

        public async Task<Experience?> GetExperienceByIdAsync(int id)
        {
            try
            {
                return await _context.Experiences.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving experience with ID: {ExperienceId}", id);
                throw;
            }
        }

        // Skills
        public async Task<List<SkillCategory>> GetAllSkillCategoriesAsync()
        {
            try
            {
                var categories = await _context.SkillCategories
                    .OrderBy(c => c.Id)
                    .ToListAsync();

                foreach (var category in categories)
                {
                    category.Skills = await _context.Skills
                        .Where(s => s.Category == category.Name)
                        .OrderBy(s => s.DisplayOrder)
                        .ToListAsync();
                }

                return categories;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all skill categories");
                throw;
            }
        }

        public async Task<List<Skill>> GetAllSkillsAsync()
        {
            try
            {
                return await _context.Skills
                    .OrderBy(s => s.Category)
                    .ThenBy(s => s.DisplayOrder)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all skills");
                throw;
            }
        }

        public async Task<List<Skill>> GetSkillsByCategoryAsync(string category)
        {
            try
            {
                return await _context.Skills
                    .Where(s => s.Category.Equals(category, StringComparison.OrdinalIgnoreCase))
                    .OrderBy(s => s.DisplayOrder)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving skills for category: {Category}", category);
                throw;
            }
        }

        // Achievements
        public async Task<List<Achievement>> GetAllAchievementsAsync()
        {
            try
            {
                return await _context.Achievements
                    .OrderByDescending(a => a.AchievedAt)
                    .ThenBy(a => a.DisplayOrder)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all achievements");
                throw;
            }
        }

        public async Task<Achievement?> GetAchievementByIdAsync(int id)
        {
            try
            {
                return await _context.Achievements.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving achievement with ID: {AchievementId}", id);
                throw;
            }
        }

        // Contact
        public async Task<bool> SubmitContactMessageAsync(ContactMessage message)
        {
            try
            {
                message.CreatedAt = DateTime.UtcNow;
                message.IsRead = false;

                _context.ContactMessages.Add(message);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Contact message submitted from: {Email}", message.Email);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error submitting contact message from: {Email}", message.Email);
                return false;
            }
        }

        public async Task<List<ContactMessage>> GetAllContactMessagesAsync()
        {
            try
            {
                return await _context.ContactMessages
                    .OrderByDescending(m => m.CreatedAt)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all contact messages");
                throw;
            }
        }
    }
}