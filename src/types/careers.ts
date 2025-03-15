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

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  current_status: string;
  education_level: string;
  graduation_year?: number;
  university?: string;
  major?: string;
  work_experience?: number;
  current_role?: string;
  interests: string[];
  preferred_careers: string[];
  skills: string[];
  career_goals: string[];
  preferred_work_environment?: string;
  preferred_location?: string;
  salary_expectations?: string;
  willing_to_relocate?: boolean;
}