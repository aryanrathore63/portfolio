using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.Models;
using PortfolioBackend.Services;

namespace PortfolioBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SkillsController : ControllerBase
    {
        private readonly IPortfolioService _portfolioService;
        private readonly ILogger<SkillsController> _logger;

        public SkillsController(IPortfolioService portfolioService, ILogger<SkillsController> logger)
        {
            _portfolioService = portfolioService;
            _logger = logger;
        }

        /// <summary>
        /// Get all skill categories with their skills
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(List<SkillCategory>), StatusCodes.Status200OK)]
        public async Task<ActionResult<List<SkillCategory>>> GetAllSkillCategories()
        {
            try
            {
                var categories = await _portfolioService.GetAllSkillCategoriesAsync();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all skill categories");
                return StatusCode(500, new { error = "An error occurred while retrieving skill categories" });
            }
        }

        /// <summary>
        /// Get all skills (flat list)
        /// </summary>
        [HttpGet("all")]
        [ProducesResponseType(typeof(List<Skill>), StatusCodes.Status200OK)]
        public async Task<ActionResult<List<Skill>>> GetAllSkills()
        {
            try
            {
                var skills = await _portfolioService.GetAllSkillsAsync();
                return Ok(skills);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all skills");
                return StatusCode(500, new { error = "An error occurred while retrieving skills" });
            }
        }

        /// <summary>
        /// Get skills by category
        /// </summary>
        [HttpGet("category/{category}")]
        [ProducesResponseType(typeof(List<Skill>), StatusCodes.Status200OK)]
        public async Task<ActionResult<List<Skill>>> GetSkillsByCategory(string category)
        {
            try
            {
                var skills = await _portfolioService.GetSkillsByCategoryAsync(category);
                return Ok(skills);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving skills for category: {Category}", category);
                return StatusCode(500, new { error = "An error occurred while retrieving skills" });
            }
        }
    }
}