using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioBackend.Models
{
    public class Experience
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Company { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string Position { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string Location { get; set; } = string.Empty;

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        [MaxLength(2000)]
        public string Description { get; set; } = string.Empty;

        public List<string> Responsibilities { get; set; } = new List<string>();

        [MaxLength(500)]
        public string CompanyLogoUrl { get; set; } = string.Empty;

        [NotMapped]
        public bool IsCurrent => !EndDate.HasValue;

        [NotMapped]
        public string Duration
        {
            get
            {
                var end = EndDate ?? DateTime.UtcNow;
                var totalMonths = (end.Year - StartDate.Year) * 12 + end.Month - StartDate.Month;
                var years = totalMonths / 12;
                var months = totalMonths % 12;
                
                if (years > 0 && months > 0)
                    return $"{years} yr {months} mo";
                if (years > 0)
                    return $"{years} yr";
                return $"{months} mo";
            }
        }
    }
}