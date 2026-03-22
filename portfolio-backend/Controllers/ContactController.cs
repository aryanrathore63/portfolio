using Microsoft.AspNetCore.Mvc;
using PortfolioBackend.Models;
using PortfolioBackend.Services;

namespace PortfolioBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IPortfolioService _portfolioService;
        private readonly IEmailService _emailService;
        private readonly ILogger<ContactController> _logger;

        public ContactController(
            IPortfolioService portfolioService,
            IEmailService emailService,
            ILogger<ContactController> logger)
        {
            _portfolioService = portfolioService;
            _emailService = emailService;
            _logger = logger;
        }

        /// <summary>
        /// Submit a contact message
        /// </summary>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> SubmitContactMessage([FromBody] ContactMessage message)
        {
            try
            {
                // Validate model
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { error = "Invalid message data", details = ModelState });
                }

                // Save message to database
                var saved = await _portfolioService.SubmitContactMessageAsync(message);
                if (!saved)
                {
                    return StatusCode(500, new { error = "Failed to save message" });
                }

                // Send email notification
                var emailSent = await _emailService.SendContactEmailAsync(message);
                if (!emailSent)
                {
                    _logger.LogWarning("Email notification failed for message from: {Email}", message.Email);
                }

                return Ok(new { 
                    message = "Contact message submitted successfully",
                    emailSent = emailSent
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error submitting contact message from: {Email}", message.Email);
                return StatusCode(500, new { error = "An error occurred while submitting your message" });
            }
        }

        /// <summary>
        /// Get all contact messages (admin endpoint)
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(List<ContactMessage>), StatusCodes.Status200OK)]
        public async Task<ActionResult<List<ContactMessage>>> GetAllContactMessages()
        {
            try
            {
                var messages = await _portfolioService.GetAllContactMessagesAsync();
                return Ok(messages);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all contact messages");
                return StatusCode(500, new { error = "An error occurred while retrieving messages" });
            }
        }
    }
}