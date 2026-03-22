using System.ComponentModel.DataAnnotations;

namespace PortfolioBackend.Models
{
    public class Achievement
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(300)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;

        [MaxLength(500)]
        public string IconUrl { get; set; } = string.Empty;

        [MaxLength(500)]
        public string CertificateUrl { get; set; } = string.Empty;

        public DateTime AchievedAt { get; set; } = DateTime.UtcNow;

        public int DisplayOrder { get; set; } = 0;
    }
}