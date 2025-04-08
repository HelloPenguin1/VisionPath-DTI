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

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface SkillLevels {
  [key: string]: number;
}
