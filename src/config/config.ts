import { UserProfile } from "@/types/user";

export const user: UserProfile = {
  id: "demo-user-123",
  email: "user@example.com",
  full_name: "John Doe",
  current_status: "Working Professional",
  education_level: "Bachelor's Degree",
  graduation_year: 2020,
  university: "Example University",
  major: "Computer Science",
  work_experience: 3,
  current_role: "Developer",
  interests: ["Technology", "Science"],
  preferred_careers: ["software-dev", "data-scientist"],
  skills: ["JavaScript", "Python", "Communication", "Problem Solving"],
  career_goals: ["Become a Senior Developer", "Learn AI/ML", "Lead a team"],
  preferred_work_environment: "Hybrid",
  preferred_location: "United States",
  salary_expectations: "$90,000 - $120,000",
  willing_to_relocate: true,
};

export const siteConfig = {
  name: "VisionPath",
  description: "Discover your ideal career path",
  links: {
    github: "https://github.com",
    docs: "https://example.com/docs",
  },
};
