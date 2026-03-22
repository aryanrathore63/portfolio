using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.Models;
using PortfolioBackend.Services;

namespace PortfolioBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly IPortfolioService _portfolioService;
        private readonly ILogger<ProjectsController> _logger;

        public ProjectsController(IPortfolioService portfolioService, ILogger<ProjectsController> logger)
        {
            _portfolioService = portfolioService;
            _logger = logger;
        }

        /// <summary>
        /// Get all projects
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(List<Project>), StatusCodes.Status200OK)]
        public async Task<ActionResult<List<Project>>> GetAllProjects()
        {
            try
            {
                var projects = await _portfolioService.GetAllProjectsAsync();
                return Ok(projects);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all projects");
                return StatusCode(500, new { error = "An error occurred while retrieving projects" });
            }
        }

        /// <summary>
        /// Get projects with pagination
        /// </summary>
        [HttpGet("paginated")]
        [ProducesResponseType(typeof(PaginatedResponse<Project>), StatusCodes.Status200OK)]
        public async Task<ActionResult<PaginatedResponse<Project>>> GetPaginatedProjects(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 6)
        {
            try
            {
                if (page < 1) page = 1;
                if (pageSize < 1 || pageSize > 20) pageSize = 6;

                var (projects, totalCount) = await _portfolioService.GetPaginatedProjectsAsync(page, pageSize);
                var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

                var response = new PaginatedResponse<Project>
                {
                    Data = projects,
                    Page = page,
                    PageSize = pageSize,
                    TotalCount = totalCount,
                    TotalPages = totalPages,
                    HasNextPage = page < totalPages
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving paginated projects");
                return StatusCode(500, new { error = "An error occurred while retrieving projects" });
            }
        }

        /// <summary>
        /// Get a project by ID
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Project), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Project>> GetProjectById(int id)
        {
            try
            {
                var project = await _portfolioService.GetProjectByIdAsync(id);
                if (project == null)
                {
                    return NotFound(new { error = $"Project with ID {id} not found" });
                }
                return Ok(project);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving project with ID: {ProjectId}", id);
                return StatusCode(500, new { error = "An error occurred while retrieving the project" });
            }
        }

        /// <summary>
        /// Get projects by category
        /// </summary>
        [HttpGet("category/{category}")]
        [ProducesResponseType(typeof(List<Project>), StatusCodes.Status200OK)]
        public async Task<ActionResult<List<Project>>> GetProjectsByCategory(string category)
        {
            try
            {
                var projects = await _portfolioService.GetProjectsByCategoryAsync(category);
                return Ok(projects);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving projects for category: {Category}", category);
                return StatusCode(500, new { error = "An error occurred while retrieving projects" });
            }
        }
    }
}