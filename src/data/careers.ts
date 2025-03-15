import { Career } from '../types/careers';

export const careers: Career[] = [
  {
    id: 'software-dev',
    title: 'Software Developer',
    description: 'Design and develop software applications and systems.',
    requirements: ['Bachelor\'s degree in Computer Science or related field', 'Programming experience', 'Problem-solving skills'],
    salary_range: '$70,000 - $150,000',
    growth_rate: '22%',
    skills_required: ['JavaScript', 'Python', 'SQL', 'Git', 'Agile'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level to Senior',
    industry: 'Technology',
    related_careers: ['frontend-dev', 'backend-dev', 'fullstack-dev', 'devops-engineer', 'software-architect'],
    career_paths: [
      {
        title: 'Frontend Specialist',
        description: 'Focus on user interface and experience development',
        timeline: '2-3 years',
        requirements: ['React/Vue/Angular', 'HTML/CSS', 'UI/UX principles'],
        next_steps: ['Senior Frontend Developer', 'UI/UX Engineer', 'Technical Lead'],
        potential_roles: ['UI Engineer', 'Frontend Architect', 'Web Performance Engineer']
      },
      {
        title: 'Backend Specialist',
        description: 'Focus on server-side development and databases',
        timeline: '2-3 years',
        requirements: ['Node.js/Java/Python', 'Databases', 'API Design'],
        next_steps: ['Senior Backend Developer', 'System Architect', 'Technical Lead'],
        potential_roles: ['API Developer', 'Database Engineer', 'Cloud Engineer']
      }
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analyze complex data sets to help guide business decisions.',
    requirements: ['Master\'s degree in Data Science, Statistics, or related field', 'Strong analytical skills', 'Programming experience'],
    salary_range: '$85,000 - $165,000',
    growth_rate: '31%',
    skills_required: ['Python', 'R', 'Machine Learning', 'SQL', 'Statistics'],
    education_required: "Master's Degree",
    experience_level: 'Mid Level to Senior',
    industry: 'Technology',
    related_careers: ['ml-engineer', 'data-analyst', 'research-scientist', 'bi-analyst'],
    career_paths: [
      {
        title: 'Machine Learning Specialist',
        description: 'Focus on developing ML models and algorithms',
        timeline: '2-4 years',
        requirements: ['Deep Learning', 'NLP', 'Computer Vision'],
        next_steps: ['Senior ML Engineer', 'AI Researcher', 'ML Architect'],
        potential_roles: ['ML Operations Engineer', 'AI Developer', 'Research Scientist']
      },
      {
        title: 'Analytics Leader',
        description: 'Focus on business analytics and insights',
        timeline: '3-5 years',
        requirements: ['Business Intelligence', 'Statistical Analysis', 'Data Visualization'],
        next_steps: ['Analytics Manager', 'Chief Data Officer', 'Analytics Director'],
        potential_roles: ['Business Analytics Manager', 'Data Strategy Lead', 'Analytics Consultant']
      }
    ]
  },
  // Adding more careers with detailed paths...
  {
    id: 'cloud-architect',
    title: 'Cloud Architect',
    description: 'Design and manage cloud computing strategies and infrastructure.',
    requirements: ['Bachelor\'s/Master\'s in Computer Science or related field', 'Cloud certification', 'Infrastructure experience'],
    salary_range: '$120,000 - $200,000',
    growth_rate: '25%',
    skills_required: ['AWS/Azure/GCP', 'Infrastructure as Code', 'Security', 'Networking'],
    education_required: "Bachelor's Degree",
    experience_level: 'Senior',
    industry: 'Technology',
    related_careers: ['devops-engineer', 'system-architect', 'security-engineer', 'network-engineer'],
    career_paths: [
      {
        title: 'Cloud Solutions Architect',
        description: 'Design comprehensive cloud solutions for enterprises',
        timeline: '4-6 years',
        requirements: ['Multi-cloud expertise', 'Solution design', 'Enterprise architecture'],
        next_steps: ['Principal Cloud Architect', 'Chief Cloud Architect', 'Technical Director'],
        potential_roles: ['Enterprise Architect', 'Cloud Strategy Lead', 'Digital Transformation Lead']
      },
      {
        title: 'Cloud Security Specialist',
        description: 'Focus on cloud security and compliance',
        timeline: '3-5 years',
        requirements: ['Security certifications', 'Compliance frameworks', 'Security architecture'],
        next_steps: ['Cloud Security Architect', 'Security Director', 'CISO'],
        potential_roles: ['Security Architect', 'Compliance Manager', 'Security Consultant']
      }
    ]
  }
  // ... (I'll continue with the rest of the careers in the next action to maintain readability)
];