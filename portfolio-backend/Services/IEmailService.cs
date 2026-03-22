using PortfolioBackend.Models;

namespace PortfolioBackend.Services
{
    public interface IEmailService
    {
        Task<bool> SendContactEmailAsync(ContactMessage message);
        Task<bool> SendEmailAsync(string toEmail, string subject, string body, bool isHtml = true);
    }
}