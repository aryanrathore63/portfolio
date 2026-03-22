using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.Models;
using PortfolioBackend.Services;

namespace PortfolioBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AchievementsController : ControllerBase
    {
        private readonly IPortfolioService _portfolioService;
        private readonly ILogger<AchievementsController> _logger;

        public AchievementsController(IPortfolioService portfolioService, ILogger<AchievementsController> logger)
        {
            _portfolioService = portfolioService;
            _logger = logger;
        }

        /// <summary>
        /// Get all achievements
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(List<Achievement>), StatusCodes.Status200OK)]
        public async Task<ActionResult<List<Achievement>>> GetAllAchievements()
        {
            try
            {
                var achievements = await _portfolioService.GetAllAchievementsAsync();
                return Ok(achievements);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all achievements");
                return StatusCode(500, new { error = "An error occurred while retrieving achievements" });
            }
        }

        /// <summary>
        /// Get an achievement by ID
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Achievement), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Achievement>> GetAchievementById(int id)
        {
            try
            {
                var achievement = await _portfolioService.GetAchievementByIdAsync(id);
                if (achievement == null)
                {
                    return NotFound(new { error = $"Achievement with ID {id} not found" });
                }
                return Ok(achievement);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving achievement with ID: {AchievementId}", id);
                return StatusCode(500, new { error = "An error occurred while retrieving the achievement" });
            }
        }
    }
}