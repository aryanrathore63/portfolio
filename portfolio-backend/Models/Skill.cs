using System.ComponentModel.DataAnnotations;

namespace PortfolioBackend.Models
{
    public class Skill
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Category { get; set; } = string.Empty;

        [Range(0, 100)]
        public int Proficiency { get; set; } = 80;

        [MaxLength(500)]
        public string IconUrl { get; set; } = string.Empty;

        public int DisplayOrder { get; set; } = 0;
    }

    public class SkillCategory
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(500)]
        public string Icon { get; set; } = string.Empty;

        public List<Skill> Skills { get; set; } = new List<Skill>();
    }
}