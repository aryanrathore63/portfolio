using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.Models;
using PortfolioBackend.Services;

namespace PortfolioBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExperienceController : ControllerBase
    {
        private readonly IPortfolioService _portfolioService;
        private readonly ILogger<ExperienceController> _logger;

        public ExperienceController(IPortfolioService portfolioService, ILogger<ExperienceController> logger)
        {
            _portfolioService = portfolioService;
            _logger = logger;
        }

        /// <summary>
        /// Get all work experiences
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(List<Experience>), StatusCodes.Status200OK)]
        public async Task<ActionResult<List<Experience>>> GetAllExperiences()
        {
            try
            {
                var experiences = await _portfolioService.GetAllExperiencesAsync();
                return Ok(experiences);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all experiences");
                return StatusCode(500, new { error = "An error occurred while retrieving experiences" });
            }
        }

        /// <summary>
        /// Get an experience by ID
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Experience), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Experience>> GetExperienceById(int id)
        {
            try
            {
                var experience = await _portfolioService.GetExperienceByIdAsync(id);
                if (experience == null)
                {
                    return NotFound(new { error = $"Experience with ID {id} not found" });
                }
                return Ok(experience);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving experience with ID: {ExperienceId}", id);
                return StatusCode(500, new { error = "An error occurred while retrieving the experience" });
            }
        }
    }
}