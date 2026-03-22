export interface Achievement {
  id: number;
  title: string;
  description: string;
  category: string;
  iconUrl: string;
  certificateUrl: string;
  achievedAt: string;
  displayOrder: number;
}

export interface AchievementFormData {
  title: string;
  description: string;
  category: string;
  iconUrl: string;
  certificateUrl: string;
  achievedAt: string;
  displayOrder: number;
}