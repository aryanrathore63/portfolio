using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using PortfolioBackend.Models;

namespace PortfolioBackend.Services
{
    public class EmailSettings
    {
        public string SmtpHost { get; set; } = string.Empty;
        public int SmtpPort { get; set; }
        public string SmtpUser { get; set; } = string.Empty;
        public string SmtpPassword { get; set; } = string.Empty;
        public string FromEmail { get; set; } = string.Empty;
        public string FromName { get; set; } = string.Empty;
    }

    public class EmailService : IEmailService
    {
        private readonly EmailSettings _emailSettings;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IOptions<EmailSettings> emailSettings, ILogger<EmailService> logger)
        {
            _emailSettings = emailSettings.Value;
            _logger = logger;
        }

        public async Task<bool> SendContactEmailAsync(ContactMessage message)
        {
            try
            {
                var subject = !string.IsNullOrEmpty(message.Subject) 
                    ? message.Subject 
                    : $"New Contact Message from {message.Name}";

                var body = BuildContactEmailBody(message);

                return await SendEmailAsync(_emailSettings.FromEmail, subject, body, true);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending contact email from: {Email}", message.Email);
                return false;
            }
        }

        public async Task<bool> SendEmailAsync(string toEmail, string subject, string body, bool isHtml = true)
        {
            try
            {
                // Check if email settings are configured
                if (string.IsNullOrEmpty(_emailSettings.SmtpHost) || 
                    string.IsNullOrEmpty(_emailSettings.SmtpPassword))
                {
                    _logger.LogWarning("Email settings not configured. Skipping email send.");
                    return true; // Return true to not block the flow in development
                }

                var emailMessage = new MimeMessage();
                emailMessage.From.Add(new MailboxAddress(_emailSettings.FromName, _emailSettings.FromEmail));
                emailMessage.To.Add(new MailboxAddress("", toEmail));
                emailMessage.Subject = subject;

                emailMessage.Body = new TextPart(isHtml ? "html" : "plain")
                {
                    Text = body
                };

                using var client = new SmtpClient();
                try
                {
                    await client.ConnectAsync(_emailSettings.SmtpHost, _emailSettings.SmtpPort, SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync(_emailSettings.SmtpUser, _emailSettings.SmtpPassword);
                    await client.SendAsync(emailMessage);
                    await client.DisconnectAsync(true);

                    _logger.LogInformation("Email sent successfully to: {Email}", toEmail);
                    return true;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error sending email via SMTP");
                    await client.DisconnectAsync(true);
                    return false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error preparing email");
                return false;
            }
        }

        private string BuildContactEmailBody(ContactMessage message)
        {
            return $@"
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
        .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
        .field {{ margin-bottom: 20px; }}
        .label {{ font-weight: bold; color: #7c3aed; }}
        .value {{ margin-top: 5px; padding: 10px; background: white; border-left: 4px solid #00d4ff; }}
        .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 12px; }}
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>📬 New Contact Message</h1>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>From:</div>
                <div class='value'>{message.Name} <{message.Email}></div>
            </div>
            <div class='field'>
                <div class='label'>Subject:</div>
                <div class='value'>{message.Subject ?? "No Subject"}</div>
            </div>
            <div class='field'>
                <div class='label'>Message:</div>
                <div class='value'>{message.Message}</div>
            </div>
            <div class='field'>
                <div class='label'>Received:</div>
                <div class='value'>{message.CreatedAt:yyyy-MM-dd HH:mm:ss} UTC</div>
            </div>
        </div>
        <div class='footer'>
            <p>This message was sent from Aryan Rathore's Portfolio Website</p>
        </div>
    </div>
</body>
</html>";
        }
    }
}