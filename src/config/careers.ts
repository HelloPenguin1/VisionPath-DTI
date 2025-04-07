import { Career, SimulationPath } from "@/types/careers";

export const careers: Career[] = [
  {
    id: "software-dev",
    title: "Software Developer",
    description: "Design and develop software applications and systems.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "Programming experience",
      "Problem-solving skills",
    ],
    salary_range: "$70,000 - $150,000",
    growth_rate: "22%",
    skills_required: ["JavaScript", "Python", "SQL", "Git", "Agile"],
    education_required: "Bachelor's Degree",
    experience_level: "Entry Level to Senior",
    industry: "Technology",
    related_careers: [
      "frontend-dev",
      "backend-dev",
      "fullstack-dev",
      "devops-engineer",
      "software-architect",
    ],
    career_paths: [
      {
        title: "Frontend Specialist",
        description: "Focus on user interface and experience development",
        timeline: "2-3 years",
        requirements: ["React/Vue/Angular", "HTML/CSS", "UI/UX principles"],
        next_steps: [
          "Senior Frontend Developer",
          "UI/UX Engineer",
          "Technical Lead",
        ],
        potential_roles: [
          "UI Engineer",
          "Frontend Architect",
          "Web Performance Engineer",
        ],
      },
      {
        title: "Backend Specialist",
        description: "Focus on server-side development and databases",
        timeline: "2-3 years",
        requirements: ["Node.js/Java/Python", "Databases", "API Design"],
        next_steps: [
          "Senior Backend Developer",
          "System Architect",
          "Technical Lead",
        ],
        potential_roles: [
          "API Developer",
          "Database Engineer",
          "Cloud Engineer",
        ],
      },
    ],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Analyze complex data sets to help guide business decisions.",
    requirements: [
      "Master's degree in Data Science, Statistics, or related field",
      "Strong analytical skills",
      "Programming experience",
    ],
    salary_range: "$85,000 - $165,000",
    growth_rate: "31%",
    skills_required: ["Python", "R", "Machine Learning", "SQL", "Statistics"],
    education_required: "Master's Degree",
    experience_level: "Mid Level to Senior",
    industry: "Technology",
    related_careers: [
      "ml-engineer",
      "data-analyst",
      "research-scientist",
      "bi-analyst",
    ],
    career_paths: [
      {
        title: "Machine Learning Specialist",
        description: "Focus on developing ML models and algorithms",
        timeline: "2-4 years",
        requirements: ["Deep Learning", "NLP", "Computer Vision"],
        next_steps: ["Senior ML Engineer", "AI Researcher", "ML Architect"],
        potential_roles: [
          "ML Operations Engineer",
          "AI Developer",
          "Research Scientist",
        ],
      },
      {
        title: "Analytics Leader",
        description: "Focus on business analytics and insights",
        timeline: "3-5 years",
        requirements: [
          "Business Intelligence",
          "Statistical Analysis",
          "Data Visualization",
        ],
        next_steps: [
          "Analytics Manager",
          "Chief Data Officer",
          "Analytics Director",
        ],
        potential_roles: [
          "Business Analytics Manager",
          "Data Strategy Lead",
          "Analytics Consultant",
        ],
      },
    ],
  },
  {
    id: "cloud-architect",
    title: "Cloud Architect",
    description:
      "Design and manage cloud computing strategies and infrastructure.",
    requirements: [
      "Bachelor's/Master's in Computer Science or related field",
      "Cloud certification",
      "Infrastructure experience",
    ],
    salary_range: "$120,000 - $200,000",
    growth_rate: "25%",
    skills_required: [
      "AWS/Azure/GCP",
      "Infrastructure as Code",
      "Security",
      "Networking",
    ],
    education_required: "Bachelor's Degree",
    experience_level: "Senior",
    industry: "Technology",
    related_careers: [
      "devops-engineer",
      "system-architect",
      "security-engineer",
      "network-engineer",
    ],
    career_paths: [
      {
        title: "Cloud Solutions Architect",
        description: "Design comprehensive cloud solutions for enterprises",
        timeline: "4-6 years",
        requirements: [
          "Multi-cloud expertise",
          "Solution design",
          "Enterprise architecture",
        ],
        next_steps: [
          "Principal Cloud Architect",
          "Chief Cloud Architect",
          "Technical Director",
        ],
        potential_roles: [
          "Enterprise Architect",
          "Cloud Strategy Lead",
          "Digital Transformation Lead",
        ],
      },
      {
        title: "Cloud Security Specialist",
        description: "Focus on cloud security and compliance",
        timeline: "3-5 years",
        requirements: [
          "Security certifications",
          "Compliance frameworks",
          "Security architecture",
        ],
        next_steps: ["Cloud Security Architect", "Security Director", "CISO"],
        potential_roles: [
          "Security Architect",
          "Compliance Manager",
          "Security Consultant",
        ],
      },
    ],
  },
  {
    id: "ux-ui-designer",
    title: "UX/UI Designer",
    description:
      "Design user-friendly interfaces and experiences for digital products.",
    requirements: [
      "Bachelor's degree in Design, HCI, or related field",
      "Design portfolio",
      "User research experience",
    ],
    salary_range: "$65,000 - $130,000",
    growth_rate: "15%",
    skills_required: [
      "Figma",
      "Adobe XD",
      "Wireframing",
      "User Testing",
      "Prototyping",
    ],
    education_required: "Bachelor's Degree",
    experience_level: "Entry Level to Senior",
    industry: "Design",
    related_careers: [
      "product-designer",
      "interaction-designer",
      "design-researcher",
    ],
    career_paths: [
      {
        title: "UX Researcher",
        description: "Focus on user research and testing",
        timeline: "2-4 years",
        requirements: ["User Research", "Usability Testing", "Data Analysis"],
        next_steps: ["Senior UX Researcher", "Research Lead", "UX Manager"],
        potential_roles: [
          "User Researcher",
          "Usability Specialist",
          "Design Strategist",
        ],
      },
      {
        title: "UI Designer",
        description: "Focus on visual design and interfaces",
        timeline: "2-3 years",
        requirements: ["Visual Design", "Design Systems", "Typography"],
        next_steps: ["Senior UI Designer", "Design Lead", "Art Director"],
        potential_roles: [
          "Visual Designer",
          "Design System Manager",
          "Brand Designer",
        ],
      },
    ],
  },
  {
    id: "product-manager",
    title: "Product Manager",
    description:
      "Define product vision and strategy, and lead cross-functional teams.",
    requirements: [
      "Bachelor's degree in Business or related field",
      "Understanding of technology",
      "Strong communication",
    ],
    salary_range: "$90,000 - $160,000",
    growth_rate: "20%",
    skills_required: [
      "Product Strategy",
      "Roadmapping",
      "User Stories",
      "Agile",
      "Stakeholder Management",
    ],
    education_required: "Bachelor's Degree",
    experience_level: "Mid Level to Senior",
    industry: "Technology",
    related_careers: [
      "product-owner",
      "program-manager",
      "technical-product-manager",
    ],
    career_paths: [
      {
        title: "Technical Product Manager",
        description: "Focus on products with deep technical components",
        timeline: "3-5 years",
        requirements: [
          "Technical Background",
          "API Management",
          "Developer Experience",
        ],
        next_steps: ["Senior Technical PM", "Director of Product", "CTO"],
        potential_roles: [
          "API Product Manager",
          "Platform Product Manager",
          "Technical Program Manager",
        ],
      },
      {
        title: "Growth Product Manager",
        description: "Focus on driving product growth and user acquisition",
        timeline: "3-4 years",
        requirements: ["Analytics", "A/B Testing", "Marketing Knowledge"],
        next_steps: ["Head of Growth", "VP of Product", "CMO"],
        potential_roles: [
          "Growth Lead",
          "Acquisition Manager",
          "Conversion Specialist",
        ],
      },
    ],
  },
];

export const simulationPaths: SimulationPath[] = [
  {
    id: "software-dev",
    title: "Software Developer",
    description: "Design and develop software applications and systems",
    averageSalary: "$105,000/year",
    growthRate: "25%",
    requiredSkills: [
      "JavaScript",
      "Python",
      "Problem Solving",
      "System Design",
    ],
    timeToAchieve: "2-4 years",
    steps: [
      "Learn programming fundamentals",
      "Build personal projects",
      "Internship/Entry level position",
      "Gain specialized expertise",
    ],
    trending: true,
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Analyze complex data sets to help guide business decisions",
    averageSalary: "$120,000/year",
    growthRate: "30%",
    requiredSkills: ["Python", "Statistics", "Machine Learning", "SQL"],
    timeToAchieve: "3-5 years",
    steps: [
      "Master statistics and mathematics",
      "Learn data analysis tools",
      "Practice with real datasets",
      "Develop ML expertise",
    ],
    trending: true,
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    description: "Design user-friendly interfaces and experiences",
    averageSalary: "$95,000/year",
    growthRate: "20%",
    requiredSkills: [
      "UI Design",
      "User Research",
      "Prototyping",
      "Wireframing",
    ],
    timeToAchieve: "2-3 years",
    steps: [
      "Learn design principles",
      "Master design tools",
      "Build portfolio",
      "Get certified",
    ],
    trending: false,
  },
  {
    id: "cloud-architect",
    title: "Cloud Architect",
    description: "Design and oversee cloud computing strategies",
    averageSalary: "$150,000/year",
    growthRate: "35%",
    requiredSkills: [
      "AWS/Azure",
      "Network Security",
      "System Architecture",
      "DevOps",
    ],
    timeToAchieve: "5-7 years",
    steps: [
      "Get cloud certifications",
      "Gain infrastructure experience",
      "Learn security best practices",
      "Master cloud platforms",
    ],
    trending: true,
  },
];

export const industries = [
  "Technology",
  "Design",
  "Healthcare",
  "Finance",
  "Education",
  "Engineering",
  "Marketing",
  "Environmental Sciences",
  "Arts",
];

export const experienceLevels = ["Entry Level", "Mid Level", "Senior"];

export const educationLevels = [
  "High School",
  "Some College",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
];
