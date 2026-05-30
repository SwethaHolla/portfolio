export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  github?: string;
  live?: string;
  tags: string[];
  year: number;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  year: number;
  description?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  year: string;
  location: string;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description?: string;
}

export interface ResumeData {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  yearsOfExperience: number;
  philosophy: string;
  skills: Record<string, string[]>;
  projects: Project[];
  awards: Award[];
  education: Education[];
  experience: Experience[];
  lastSynced?: string;
}
