using PortfolioBackend.Models;

namespace PortfolioBackend.Services
{
    public interface IPortfolioService
    {
        // Projects
        Task<List<Project>> GetAllProjectsAsync();
        Task<Project?> GetProjectByIdAsync(int id);
        Task<List<Project>> GetProjectsByCategoryAsync(string category);
        Task<(List<Project> Projects, int TotalCount)> GetPaginatedProjectsAsync(int page, int pageSize);

        // Experience
        Task<List<Experience>> GetAllExperiencesAsync();
        Task<Experience?> GetExperienceByIdAsync(int id);

        // Skills
        Task<List<SkillCategory>> GetAllSkillCategoriesAsync();
        Task<List<Skill>> GetAllSkillsAsync();
        Task<List<Skill>> GetSkillsByCategoryAsync(string category);

        // Achievements
        Task<List<Achievement>> GetAllAchievementsAsync();
        Task<Achievement?> GetAchievementByIdAsync(int id);

        // Contact
        Task<bool> SubmitContactMessageAsync(ContactMessage message);
        Task<List<ContactMessage>> GetAllContactMessagesAsync();
    }
}