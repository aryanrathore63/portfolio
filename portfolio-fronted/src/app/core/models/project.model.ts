export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  category: string;
  imageUrl: string;
  createdAt: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  category: string;
  imageUrl: string;
}