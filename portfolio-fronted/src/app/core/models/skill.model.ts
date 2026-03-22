export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  iconUrl: string;
  displayOrder: number;
}

export interface SkillCategory {
  id: number;
  name: string;
  icon: string;
  skills: Skill[];
}

export interface SkillFormData {
  name: string;
  category: string;
  proficiency: number;
  iconUrl: string;
  displayOrder: number;
}