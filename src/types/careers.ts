export interface Career {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  salary_range: string;
  growth_rate: string;
  skills_required: string[];
  education_required: string;
  experience_level: string;
  industry: string;
  related_careers: string[];
  career_paths: CareerPath[];
}

export interface CareerPath {
  title: string;
  description: string;
  timeline: string;
  requirements: string[];
  next_steps: string[];
  potential_roles: string[];
}

export interface SimulationPath {
  id: string;
  title: string;
  description: string;
  averageSalary: string;
  growthRate: string;
  requiredSkills: string[];
  timeToAchieve: string;
  steps: string[];
  trending: boolean;
}
