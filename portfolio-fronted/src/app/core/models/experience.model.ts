export interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  responsibilities: string[];
  companyLogoUrl: string;
  isCurrent: boolean;
  duration: string;
}

export interface ExperienceFormData {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  responsibilities: string[];
  companyLogoUrl: string;
}