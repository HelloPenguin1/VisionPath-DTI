import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../components/AuthContext';

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
}

export const defaultCareers: Career[] = [
  // Technology Field (13 careers)
  {
    id: 'software-dev',
    title: 'Software Developer',
    description: 'Design and develop software applications and systems.',
    requirements: ['Bachelor\'s degree in Computer Science or related field', 'Programming experience', 'Problem-solving skills'],
    salary_range: '$70,000 - $150,000',
    growth_rate: '22%',
    skills_required: ['JavaScript', 'Python', 'SQL', 'Git', 'Agile'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Technology'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analyze and interpret complex data to help organizations make informed decisions.',
    requirements: ['Bachelor\'s degree in Data Science, Statistics, or related field', 'Experience with data analysis tools', 'Strong analytical skills'],
    salary_range: '$85,000 - $165,000',
    growth_rate: '36%',
    skills_required: ['Python', 'R', 'SQL', 'Machine Learning', 'Tableau'],
    education_required: "Bachelor's Degree",
    experience_level: 'Mid Level',
    industry: 'Technology'
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    description: 'Protect organizations’ computer systems and networks from cyber threats.',
    requirements: ['Bachelor\'s degree in Cybersecurity, Computer Science, or related field', 'Knowledge of security protocols', 'Attention to detail'],
    salary_range: '$65,000 - $130,000',
    growth_rate: '33%',
    skills_required: ['Penetration Testing', 'Firewalls', 'Encryption', 'Linux', 'Ethical Hacking'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Technology'
  },
  {
    id: 'cloud-architect',
    title: 'Cloud Architect',
    description: 'Design and manage cloud computing strategies for organizations to ensure scalability and security.',
    requirements: ['Bachelor\'s degree in Computer Science, IT, or related field', 'Experience with cloud platforms', 'Strategic thinking'],
    salary_range: '$90,000 - $170,000',
    growth_rate: '15%',
    skills_required: ['AWS', 'Azure', 'Google Cloud', 'DevOps', 'Networking'],
    education_required: "Bachelor's Degree",
    experience_level: 'Mid Level',
    industry: 'Technology'
  },
  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    description: 'Develop algorithms and models that enable machines to learn and make decisions.',
    requirements: ['Bachelor\'s degree in Computer Science, Mathematics, or related field', 'Strong programming skills', 'Knowledge of machine learning frameworks'],
    salary_range: '$80,000 - $160,000',
    growth_rate: '36%',
    skills_required: ['Python', 'TensorFlow', 'Keras', 'Data Modeling', 'Statistics'],
    education_required: "Bachelor's Degree",
    experience_level: 'Mid Level',
    industry: 'Technology'
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    description: 'Bridge the gap between development and operations by automating and streamlining software delivery.',
    requirements: ['Bachelor\'s degree in Computer Science or related field', 'Experience with CI/CD pipelines', 'Collaboration skills'],
    salary_range: '$75,000 - $140,000',
    growth_rate: '21%',
    skills_required: ['Docker', 'Kubernetes', 'Jenkins', 'Ansible', 'Scripting'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Technology'
  },
  {
    id: 'blockchain-dev',
    title: 'Blockchain Developer',
    description: 'Design and implement decentralized applications using blockchain technology.',
    requirements: ['Bachelor\'s degree in Computer Science or related field', 'Knowledge of cryptography', 'Programming experience'],
    salary_range: '$80,000 - $160,000',
    growth_rate: '25%',
    skills_required: ['Solidity', 'Ethereum', 'Smart Contracts', 'Cryptography', 'JavaScript'],
    education_required: "Bachelor's Degree",
    experience_level: 'Mid Level',
    industry: 'Technology'
  },
  {
    id: 'frontend-dev',
    title: 'Frontend Developer',
    description: 'Build and maintain the user-facing side of websites and applications.',
    requirements: ['Bachelor\'s degree in Computer Science or related field', 'Experience with web development', 'Attention to detail'],
    salary_range: '$60,000 - $120,000',
    growth_rate: '13%',
    skills_required: ['HTML', 'CSS', 'JavaScript', 'React', 'UI Design'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Technology'
  },
  {
    id: 'it-manager',
    title: 'IT Manager',
    description: 'Oversee an organization’s technology infrastructure and IT teams.',
    requirements: ['Bachelor\'s degree in Information Technology or related field', 'Leadership experience', 'Project management skills'],
    salary_range: '$90,000 - $150,000',
    growth_rate: '11%',
    skills_required: ['Project Management', 'Network Security', 'Budgeting', 'Leadership', 'IT Strategy'],
    education_required: "Bachelor's Degree",
    experience_level: 'Senior',
    industry: 'Technology'
  },
  {
    id: 'ai-research-scientist',
    title: 'AI Research Scientist',
    description: 'Conduct research to advance artificial intelligence technologies.',
    requirements: ['PhD in Computer Science or related field', 'Research experience', 'Strong analytical skills'],
    salary_range: '$100,000 - $200,000',
    growth_rate: '20%',
    skills_required: ['Machine Learning', 'Deep Learning', 'Python', 'Research', 'Statistics'],
    education_required: "PhD",
    experience_level: 'Senior',
    industry: 'Technology'
  },
  {
    id: 'systems-architect',
    title: 'Systems Architect',
    description: 'Design and oversee the implementation of complex IT systems.',
    requirements: ['Bachelor\'s degree in Computer Science or related field', 'Experience in systems design', 'Leadership skills'],
    salary_range: '$95,000 - $160,000',
    growth_rate: '10%',
    skills_required: ['Systems Design', 'Cloud Computing', 'Networking', 'Leadership', 'Problem-Solving'],
    education_required: "Bachelor's Degree",
    experience_level: 'Senior',
    industry: 'Technology'
  },
  {
    id: 'backend-dev',
    title: 'Backend Developer',
    description: 'Develop and maintain server-side applications and databases.',
    requirements: ['Bachelor\'s degree in Computer Science or related field', 'Experience with server-side programming', 'Problem-solving skills'],
    salary_range: '$65,000 - $130,000',
    growth_rate: '15%',
    skills_required: ['Node.js', 'Java', 'SQL', 'API Development', 'Database Management'],
    education_required: "Bachelor's Degree",
    experience_level: 'Mid Level',
    industry: 'Technology'
  },
  {
    id: 'robotics-engineer',
    title: 'Robotics Engineer',
    description: 'Design and build robotic systems for automation and other applications.',
    requirements: ['Master\'s degree in Robotics or related field', 'Experience with robotics programming', 'Technical skills'],
    salary_range: '$80,000 - $140,000',
    growth_rate: '9%',
    skills_required: ['ROS', 'C++', 'Python', 'Mechanical Design', 'Automation'],
    education_required: "Master's Degree",
    experience_level: 'Mid Level',
    industry: 'Technology'
  },

  // Design Field (10 careers)
  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    description: 'Create visual concepts to communicate ideas that inspire, inform, or captivate consumers.',
    requirements: ['Bachelor\'s degree in Graphic Design or related field', 'Proficiency in design software', 'Creativity and attention to detail'],
    salary_range: '$40,000 - $85,000',
    growth_rate: '3%',
    skills_required: ['Adobe Photoshop', 'Illustrator', 'InDesign', 'Typography', 'Branding'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Design'
  },
  {
    id: 'ux-ui-designer',
    title: 'UX/UI Designer',
    description: 'Design user-friendly interfaces and experiences for digital products like apps and websites.',
    requirements: ['Bachelor\'s degree in Design, Human-Computer Interaction, or related field', 'Understanding of user-centered design principles', 'Collaboration skills'],
    salary_range: '$60,000 - $120,000',
    growth_rate: '8%',
    skills_required: ['Figma', 'Sketch', 'Wireframing', 'Prototyping', 'User Research'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Design'
  },
  {
    id: 'industrial-designer',
    title: 'Industrial Designer',
    description: 'Design and develop manufactured products, such as cars, appliances, and furniture, focusing on usability and aesthetics.',
    requirements: ['Bachelor\'s degree in Industrial Design or related field', 'Proficiency in 3D modeling software', 'Creativity and technical skills'],
    salary_range: '$50,000 - $90,000',
    growth_rate: '2%',
    skills_required: ['CAD', '3D Rendering', 'Prototyping', 'Material Science', 'Sketching'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Design'
  },
  {
    id: 'motion-graphics-designer',
    title: 'Motion Graphics Designer',
    description: 'Create animated graphics and visual effects for films, TV, and digital media.',
    requirements: ['Bachelor\'s degree in Graphic Design, Animation, or related field', 'Experience with animation software', 'Storytelling skills'],
    salary_range: '$45,000 - $100,000',
    growth_rate: '4%',
    skills_required: ['After Effects', 'Cinema 4D', 'Animation', 'Storyboarding', 'Adobe Premiere'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Design'
  },
  {
    id: 'interior-designer',
    title: 'Interior Designer',
    description: 'Plan and design interior spaces to be functional, safe, and aesthetically pleasing.',
    requirements: ['Bachelor\'s degree in Interior Design or related field', 'Knowledge of building codes', 'Creativity'],
    salary_range: '$45,000 - $90,000',
    growth_rate: '4%',
    skills_required: ['AutoCAD', 'SketchUp', 'Space Planning', 'Color Theory', 'Client Communication'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Design'
  },
  {
    id: 'game-designer',
    title: 'Game Designer',
    description: 'Create concepts, mechanics, and narratives for video games.',
    requirements: ['Bachelor\'s degree in Game Design or related field', 'Experience with game engines', 'Storytelling skills'],
    salary_range: '$50,000 - $110,000',
    growth_rate: '5%',
    skills_required: ['Unity', 'Unreal Engine', 'Level Design', 'Scripting', 'Creative Writing'],
    education_required: "Bachelor's Degree",
    experience_level: 'Mid Level',
    industry: 'Design'
  },
  {
    id: 'design-researcher',
    title: 'Design Researcher',
    description: 'Conduct research to inform design decisions and improve user experiences.',
    requirements: ['PhD in Design, Human-Computer Interaction, or related field', 'Research experience', 'Analytical skills'],
    salary_range: '$70,000 - $130,000',
    growth_rate: '6%',
    skills_required: ['User Research', 'Data Analysis', 'Ethnography', 'Prototyping', 'Statistics'],
    education_required: "PhD",
    experience_level: 'Mid Level',
    industry: 'Design'
  },
  {
    id: 'creative-director',
    title: 'Creative Director',
    description: 'Lead creative teams to develop concepts for advertising, media, or products.',
    requirements: ['Bachelor\'s degree in Design or related field', 'Leadership experience', 'Creative vision'],
    salary_range: '$90,000 - $160,000',
    growth_rate: '5%',
    skills_required: ['Leadership', 'Branding', 'Creative Strategy', 'Team Management', 'Communication'],
    education_required: "Bachelor's Degree",
    experience_level: 'Senior',
    industry: 'Design'
  },
  {
    id: 'fashion-designer',
    title: 'Fashion Designer',
    description: 'Create clothing and accessories, balancing aesthetics and functionality.',
    requirements: ['Bachelor\'s degree in Fashion Design or related field', 'Knowledge of textiles', 'Creativity'],
    salary_range: '$50,000 - $100,000',
    growth_rate: '3%',
    skills_required: ['Sketching', 'Pattern Making', 'Sewing', 'Trend Analysis', 'Adobe Illustrator'],
    education_required: "Bachelor's Degree",
    experience_level: 'Mid Level',
    industry: 'Design'
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    description: 'Design consumer products with a focus on usability and aesthetics.',
    requirements: ['Master\'s degree in Product Design or related field', 'Prototyping skills', 'Creativity'],
    salary_range: '$60,000 - $110,000',
    growth_rate: '4%',
    skills_required: ['Prototyping', 'User-Centered Design', '3D Modeling', 'Material Knowledge', 'Figma'],
    education_required: "Master's Degree",
    experience_level: 'Entry Level',
    industry: 'Design'
  },

  // Healthcare Field (11 careers)
  {
    id: 'registered-nurse',
    title: 'Registered Nurse',
    description: 'Provide patient care, administer medications, and coordinate with healthcare teams.',
    requirements: ['Bachelor\'s degree in Nursing', 'Valid nursing license', 'Compassion and communication skills'],
    salary_range: '$60,000 - $110,000',
    growth_rate: '6%',
    skills_required: ['Patient Care', 'Medical Records', 'CPR', 'Infection Control', 'Teamwork'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Healthcare'
  },
  {
    id: 'health-services-manager',
    title: 'Medical and Health Services Manager',
    description: 'Oversee the operations of healthcare facilities, ensuring efficient and quality care.',
    requirements: ['Bachelor\'s degree in Healthcare Administration or related field', 'Leadership experience', 'Organizational skills'],
    salary_range: '$80,000 - $150,000',
    growth_rate: '28%',
    skills_required: ['Budgeting', 'Compliance', 'Leadership', 'EHR Systems', 'Strategic Planning'],
    education_required: "Bachelor's Degree",
    experience_level: 'Mid Level',
    industry: 'Healthcare'
  },
  {
    id: 'physician-assistant',
    title: 'Physician Assistant',
    description: 'Diagnose and treat patients under the supervision of physicians, often in primary care settings.',
    requirements: ['Master\'s degree from a Physician Assistant program', 'Clinical experience', 'Interpersonal skills'],
    salary_range: '$90,000 - $150,000',
    growth_rate: '31%',
    skills_required: ['Patient Assessment', 'Diagnostics', 'EMR Systems', 'Suturing', 'Medical Ethics'],
    education_required: "Master's Degree",
    experience_level: 'Entry Level',
    industry: 'Healthcare'
  },
  {
    id: 'physical-therapist',
    title: 'Physical Therapist',
    description: 'Help patients recover from injuries or manage chronic conditions through physical rehabilitation.',
    requirements: ['Doctor of Physical Therapy (DPT) degree', 'State licensure', 'Empathy and physical stamina'],
    salary_range: '$70,000 - $120,000',
    growth_rate: '15%',
    skills_required: ['Rehabilitation Techniques', 'Patient Education', 'Manual Therapy', 'Anatomy', 'Exercise Planning'],
    education_required: "PhD",
    experience_level: 'Entry Level',
    industry: 'Healthcare'
  },
  {
    id: 'clinical-lab-technologist',
    title: 'Clinical Laboratory Technologist',
    description: 'Perform tests on patient samples to assist in diagnosing and treating diseases.',
    requirements: ['Bachelor\'s degree in Medical Technology or related field', 'Certification (e.g., ASCP)', 'Attention to detail'],
    salary_range: '$50,000 - $85,000',
    growth_rate: '7%',
    skills_required: ['Lab Equipment', 'Microscopy', 'Data Analysis', 'Specimen Handling', 'Quality Control'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Healthcare'
  },
  {
    id: 'pharmacist',
    title: 'Pharmacist',
    description: 'Dispense medications and provide advice on their safe use.',
    requirements: ['Doctor of Pharmacy (PharmD) degree', 'State licensure', 'Attention to detail'],
    salary_range: '$100,000 - $150,000',
    growth_rate: '3%',
    skills_required: ['Medication Management', 'Patient Counseling', 'Pharmacy Software', 'Drug Interactions', 'Compliance'],
    education_required: "PhD",
    experience_level: 'Entry Level',
    industry: 'Healthcare'
  },
  {
    id: 'healthcare-admin',
    title: 'Healthcare Administrator',
    description: 'Manage healthcare facilities, focusing on policy, finance, and operations.',
    requirements: ['Master\'s degree in Healthcare Administration', 'Leadership skills', 'Knowledge of healthcare regulations'],
    salary_range: '$85,000 - $140,000',
    growth_rate: '20%',
    skills_required: ['Policy Development', 'Financial Management', 'Leadership', 'Compliance', 'Strategic Planning'],
    education_required: "Master's Degree",
    experience_level: 'Senior',
    industry: 'Healthcare'
  },
  {
    id: 'occupational-therapist',
    title: 'Occupational Therapist',
    description: 'Help patients develop or recover skills needed for daily living and working.',
    requirements: ['Master\'s degree in Occupational Therapy', 'State licensure', 'Empathy'],
    salary_range: '$65,000 - $110,000',
    growth_rate: '12%',
    skills_required: ['Therapeutic Techniques', 'Patient Assessment', 'Rehabilitation', 'Adaptability', 'Communication'],
    education_required: "Master's Degree",
    experience_level: 'Entry Level',
    industry: 'Healthcare'
  },
  {
    id: 'epidemiologist',
    title: 'Epidemiologist',
    description: 'Study patterns of diseases and health outcomes in populations.',
    requirements: ['PhD in Epidemiology or related field', 'Research experience', 'Analytical skills'],
    salary_range: '$70,000 - $120,000',
    growth_rate: '5%',
    skills_required: ['Data Analysis', 'Statistics', 'Public Health', 'Research', 'Communication'],
    education_required: "PhD",
    experience_level: 'Mid Level',
    industry: 'Healthcare'
  },
  {
    id: 'medical-researcher',
    title: 'Medical Researcher',
    description: 'Conduct research to advance medical knowledge and treatments.',
    requirements: ['PhD in Medical Science or related field', 'Research experience', 'Critical thinking'],
    salary_range: '$80,000 - $150,000',
    growth_rate: '6%',
    skills_required: ['Research Design', 'Data Analysis', 'Grant Writing', 'Lab Techniques', 'Publishing'],
    education_required: "PhD",
    experience_level: 'Senior',
    industry: 'Healthcare'
  },
  {
    id: 'nurse-practitioner',
    title: 'Nurse Practitioner',
    description: 'Provide advanced nursing care, including diagnosing and treating illnesses.',
    requirements: ['Master\'s degree in Nursing', 'State licensure', 'Clinical experience'],
    salary_range: '$90,000 - $130,000',
    growth_rate: '45%',
    skills_required: ['Patient Care', 'Diagnostics', 'Prescribing', 'EMR Systems', 'Communication'],
    education_required: "Master's Degree",
    experience_level: 'Mid Level',
    industry: 'Healthcare'
  },

  // Finance Field (10 careers)
  {
    id: 'financial-analyst',
    title: 'Financial Analyst',
    description: 'Analyze financial data to help companies make investment decisions.',
    requirements: ['Bachelor\'s degree in Finance, Economics, or related field', 'Analytical skills', 'Attention to detail'],
    salary_range: '$60,000 - $120,000',
    growth_rate: '6%',
    skills_required: ['Excel', 'Financial Modeling', 'Bloomberg Terminal', 'Data Analysis', 'Forecasting'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Finance'
  },
  {
    id: 'accountant',
    title: 'Accountant',
    description: 'Prepare and examine financial records to ensure accuracy and compliance with laws.',
    requirements: ['Bachelor\'s degree in Accounting or related field', 'Knowledge of tax regulations', 'Organizational skills'],
    salary_range: '$50,000 - $100,000',
    growth_rate: '4%',
    skills_required: ['QuickBooks', 'Tax Preparation', 'Auditing', 'GAAP', 'Excel'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Finance'
  },
  {
    id: 'investment-banker',
    title: 'Investment Banker',
    description: 'Assist companies and governments in raising capital by issuing securities and providing financial advice.',
    requirements: ['Bachelor\'s degree in Finance, Economics, or related field', 'Strong analytical skills', 'High-pressure environment adaptability'],
    salary_range: '$80,000 - $200,000+',
    growth_rate: '4%',
    skills_required: ['Financial Modeling', 'Valuation', 'Mergers & Acquisitions', 'Excel', 'Negotiation'],
    education_required: "Bachelor's Degree",
    experience_level: 'Mid Level',
    industry: 'Finance'
  },
  {
    id: 'risk-manager',
    title: 'Risk Manager',
    description: 'Identify and mitigate financial risks for organizations through analysis and strategy.',
    requirements: ['Bachelor\'s degree in Finance, Risk Management, or related field', 'Experience in risk assessment', 'Decision-making skills'],
    salary_range: '$70,000 - $130,000',
    growth_rate: '6%',
    skills_required: ['Risk Analysis', 'Compliance', 'Data Interpretation', 'Insurance Knowledge', 'Reporting'],
    education_required: "Bachelor's Degree",
    experience_level: 'Mid Level',
    industry: 'Finance'
  },
  {
    id: 'financial-advisor',
    title: 'Financial Advisor',
    description: 'Provide clients with advice on financial planning, investments, and wealth management.',
    requirements: ['Bachelor\'s degree in Finance or related field', 'Certification (e.g., CFP)', 'Interpersonal skills'],
    salary_range: '$60,000 - $150,000',
    growth_rate: '5%',
    skills_required: ['Financial Planning', 'Investment Strategies', 'Client Communication', 'Risk Assessment', 'Tax Knowledge'],
    education_required: "Bachelor's Degree",
    experience_level: 'Mid Level',
    industry: 'Finance'
  },
  {
    id: 'budget-analyst',
    title: 'Budget Analyst',
    description: 'Help organizations manage their finances by preparing budget reports and monitoring spending.',
    requirements: ['Bachelor\'s degree in Finance, Accounting, or related field', 'Analytical skills', 'Attention to detail'],
    salary_range: '$55,000 - $100,000',
    growth_rate: '3%',
    skills_required: ['Budgeting', 'Excel', 'Financial Analysis', 'Reporting', 'Forecasting'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Finance'
  },
  {
    id: 'economist',
    title: 'Economist',
    description: 'Study economic trends and provide forecasts to guide policy and business decisions.',
    requirements: ['PhD in Economics or related field', 'Research experience', 'Analytical skills'],
    salary_range: '$80,000 - $150,000',
    growth_rate: '6%',
    skills_required: ['Econometrics', 'Data Analysis', 'Statistics', 'Research', 'Policy Analysis'],
    education_required: "PhD",
    experience_level: 'Senior',
    industry: 'Finance'
  },
  {
    id: 'cfo',
    title: 'Chief Financial Officer (CFO)',
    description: 'Oversee financial operations and strategy for an organization.',
    requirements: ['Master\'s degree in Finance or related field', 'Extensive leadership experience', 'Strategic thinking'],
    salary_range: '$150,000 - $300,000+',
    growth_rate: '4%',
    skills_required: ['Financial Strategy', 'Leadership', 'Budgeting', 'Risk Management', 'Communication'],
    education_required: "Master's Degree",
    experience_level: 'Senior',
    industry: 'Finance'
  },
  {
    id: 'compliance-officer',
    title: 'Compliance Officer',
    description: 'Ensure organizations adhere to financial regulations and standards.',
    requirements: ['Bachelor\'s degree in Finance or related field', 'Knowledge of regulations', 'Attention to detail'],
    salary_range: '$60,000 - $110,000',
    growth_rate: '5%',
    skills_required: ['Regulatory Compliance', 'Auditing', 'Risk Assessment', 'Reporting', 'Communication'],
    education_required: "Bachelor's Degree",
    experience_level: 'Mid Level',
    industry: 'Finance'
  },
  {
    id: 'actuary',
    title: 'Actuary',
    description: 'Analyze financial risks using mathematics, statistics, and financial theory.',
    requirements: ['Bachelor\'s degree in Actuarial Science or related field', 'Certification (e.g., SOA)', 'Analytical skills'],
    salary_range: '$70,000 - $140,000',
    growth_rate: '18%',
    skills_required: ['Statistics', 'Risk Analysis', 'Excel', 'Data Modeling', 'Probability'],
    education_required: "Bachelor's Degree",
    experience_level: 'Mid Level',
    industry: 'Finance'
  },

  // Education Field (9 careers)
  {
    id: 'high-school-teacher',
    title: 'High School Teacher',
    description: 'Educate students in specific subjects, preparing them for higher education or careers.',
    requirements: ['Bachelor\'s degree in Education or specific subject area', 'Teaching certification', 'Communication skills'],
    salary_range: '$45,000 - $80,000',
    growth_rate: '1%',
    skills_required: ['Lesson Planning', 'Classroom Management', 'Subject Expertise', 'Communication', 'Assessment'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Education'
  },
  {
    id: 'education-administrator',
    title: 'Education Administrator',
    description: 'Manage school operations, including curriculum development and staff supervision.',
    requirements: ['Master\'s degree in Education Administration or related field', 'Leadership experience', 'Decision-making skills'],
    salary_range: '$70,000 - $120,000',
    growth_rate: '4%',
    skills_required: ['Leadership', 'Budgeting', 'Policy Development', 'Communication', 'Curriculum Design'],
    education_required: "Master's Degree",
    experience_level: 'Mid Level',
    industry: 'Education'
  },
  {
    id: 'special-ed-teacher',
    title: 'Special Education Teacher',
    description: 'Teach students with disabilities, adapting lessons to meet individual needs.',
    requirements: ['Bachelor\'s degree in Special Education', 'Teaching certification with special education endorsement', 'Patience and adaptability'],
    salary_range: '$45,000 - $80,000',
    growth_rate: '3%',
    skills_required: ['Individualized Education Plans (IEPs)', 'Behavioral Management', 'Collaboration', 'Communication', 'Curriculum Adaptation'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Education'
  },
  {
    id: 'instructional-coordinator',
    title: 'Instructional Coordinator',
    description: 'Develop curricula and teaching materials, and train educators to improve educational quality.',
    requirements: ['Master\'s degree in Education or Curriculum Development', 'Teaching experience', 'Analytical skills'],
    salary_range: '$60,000 - $100,000',
    growth_rate: '6%',
    skills_required: ['Curriculum Design', 'Educational Technology', 'Training', 'Assessment', 'Leadership'],
    education_required: "Master's Degree",
    experience_level: 'Mid Level',
    industry: 'Education'
  },
  {
    id: 'school-counselor',
    title: 'School Counselor',
    description: 'Support students’ academic, emotional, and social development.',
    requirements: ['Master\'s degree in School Counseling', 'State certification', 'Empathy and communication skills'],
    salary_range: '$50,000 - $90,000',
    growth_rate: '8%',
    skills_required: ['Counseling', 'Conflict Resolution', 'Student Assessment', 'Communication', 'Program Development'],
    education_required: "Master's Degree",
    experience_level: 'Entry Level',
    industry: 'Education'
  },
  {
    id: 'university-professor',
    title: 'University Professor',
    description: 'Teach college students, conduct research, and publish academic work.',
    requirements: ['PhD in a specific field', 'Teaching experience', 'Research skills'],
    salary_range: '$70,000 - $150,000',
    growth_rate: '9%',
    skills_required: ['Research', 'Teaching', 'Publishing', 'Critical Thinking', 'Public Speaking'],
    education_required: "PhD",
    experience_level: 'Senior',
    industry: 'Education'
  },
  {
    id: 'curriculum-developer',
    title: 'Curriculum Developer',
    description: 'Design educational materials and programs for schools or organizations.',
    requirements: ['Master\'s degree in Education or related field', 'Teaching experience', 'Creativity'],
    salary_range: '$55,000 - $95,000',
    growth_rate: '6%',
    skills_required: ['Curriculum Design', 'Educational Technology', 'Assessment', 'Collaboration', 'Writing'],
    education_required: "Master's Degree",
    experience_level: 'Mid Level',
    industry: 'Education'
  },
  {
    id: 'education-consultant',
    title: 'Education Consultant',
    description: 'Advise schools and organizations on educational strategies and improvements.',
    requirements: ['PhD in Education or related field', 'Extensive experience in education', 'Analytical skills'],
    salary_range: '$80,000 - $140,000',
    growth_rate: '7%',
    skills_required: ['Strategic Planning', 'Research', 'Communication', 'Policy Analysis', 'Leadership'],
    education_required: "PhD",
    experience_level: 'Senior',
    industry: 'Education'
  },
  {
    id: 'librarian',
    title: 'Librarian',
    description: 'Manage library resources and assist patrons with research and information needs.',
    requirements: ['Master\'s degree in Library Science', 'Organizational skills', 'Communication skills'],
    salary_range: '$45,000 - $80,000',
    growth_rate: '5%',
    skills_required: ['Cataloging', 'Research', 'Information Literacy', 'Technology', 'Customer Service'],
    education_required: "Master's Degree",
    experience_level: 'Entry Level',
    industry: 'Education'
  },

  // Engineering Field (10 careers)
  {
    id: 'civil-engineer',
    title: 'Civil Engineer',
    description: 'Design and oversee construction projects like roads, bridges, and buildings.',
    requirements: ['Bachelor\'s degree in Civil Engineering', 'Problem-solving skills', 'Project management experience'],
    salary_range: '$65,000 - $120,000',
    growth_rate: '5%',
    skills_required: ['AutoCAD', 'Structural Analysis', 'Project Management', 'Surveying', 'Math'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Engineering'
  },
  {
    id: 'mechanical-engineer',
    title: 'Mechanical Engineer',
    description: 'Design, develop, and test mechanical devices and systems.',
    requirements: ['Bachelor\'s degree in Mechanical Engineering', 'Technical skills', 'Creativity'],
    salary_range: '$70,000 - $130,000',
    growth_rate: '4%',
    skills_required: ['CAD Software', 'Thermodynamics', 'Prototyping', 'SolidWorks', 'Problem-Solving'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Engineering'
  },
  {
    id: 'electrical-engineer',
    title: 'Electrical Engineer',
    description: 'Design and develop electrical systems and equipment, such as power generation and electronics.',
    requirements: ['Bachelor\'s degree in Electrical Engineering', 'Technical problem-solving skills', 'Teamwork'],
    salary_range: '$70,000 - $130,000',
    growth_rate: '3%',
    skills_required: ['Circuit Design', 'MATLAB', 'PLC Programming', 'Electrical Testing', 'Project Management'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Engineering'
  },
  {
    id: 'environmental-engineer',
    title: 'Environmental Engineer',
    description: 'Develop solutions to environmental problems, such as pollution control and waste management.',
    requirements: ['Bachelor\'s degree in Environmental Engineering or related field', 'Knowledge of environmental regulations', 'Analytical skills'],
    salary_range: '$65,000 - $120,000',
    growth_rate: '4%',
    skills_required: ['Environmental Impact Assessment', 'Water Treatment', 'GIS', 'Sustainability Practices', 'Data Analysis'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Engineering'
  },
  {
    id: 'aerospace-engineer',
    title: 'Aerospace Engineer',
    description: 'Design aircraft, spacecraft, and related systems.',
    requirements: ['Bachelor\'s degree in Aerospace Engineering', 'Technical skills', 'Attention to detail'],
    salary_range: '$80,000 - $140,000',
    growth_rate: '6%',
    skills_required: ['Aerodynamics', 'CAD Software', 'Flight Testing', 'Structural Analysis', 'Math'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Engineering'
  },
  {
    id: 'chemical-engineer',
    title: 'Chemical Engineer',
    description: 'Develop processes for producing chemicals, fuels, and pharmaceuticals.',
    requirements: ['Bachelor\'s degree in Chemical Engineering', 'Knowledge of chemistry', 'Problem-solving skills'],
    salary_range: '$70,000 - $130,000',
    growth_rate: '4%',
    skills_required: ['Process Design', 'Chemistry', 'Safety Protocols', 'Data Analysis', 'Project Management'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Engineering'
  },
  {
    id: 'petroleum-engineer',
    title: 'Petroleum Engineer',
    description: 'Design methods to extract oil and gas from deposits below the Earth’s surface.',
    requirements: ['Bachelor\'s degree in Petroleum Engineering', 'Technical skills', 'Analytical skills'],
    salary_range: '$90,000 - $160,000',
    growth_rate: '3%',
    skills_required: ['Reservoir Engineering', 'Drilling Techniques', 'Data Analysis', 'Safety Protocols', 'Project Management'],
    education_required: "Bachelor's Degree",
    experience_level: 'Mid Level',
    industry: 'Engineering'
  },
  {
    id: 'biomedical-engineer',
    title: 'Biomedical Engineer',
    description: 'Design medical devices and equipment to improve healthcare.',
    requirements: ['Master\'s degree in Biomedical Engineering', 'Technical skills', 'Knowledge of biology'],
    salary_range: '$70,000 - $120,000',
    growth_rate: '5%',
    skills_required: ['Medical Device Design', 'Biomechanics', 'CAD Software', 'Testing', 'Collaboration'],
    education_required: "Master's Degree",
    experience_level: 'Mid Level',
    industry: 'Engineering'
  },
  {
    id: 'engineering-manager',
    title: 'Engineering Manager',
    description: 'Lead engineering teams and oversee technical projects.',
    requirements: ['Bachelor\'s degree in Engineering', 'Leadership experience', 'Project management skills'],
    salary_range: '$100,000 - $170,000',
    growth_rate: '4%',
    skills_required: ['Leadership', 'Project Management', 'Technical Knowledge', 'Budgeting', 'Team Management'],
    education_required: "Bachelor's Degree",
    experience_level: 'Senior',
    industry: 'Engineering'
  },
  {
    id: 'materials-scientist',
    title: 'Materials Scientist',
    description: 'Research and develop new materials for various applications.',
    requirements: ['PhD in Materials Science or related field', 'Research experience', 'Analytical skills'],
    salary_range: '$80,000 - $140,000',
    growth_rate: '3%',
    skills_required: ['Materials Testing', 'Research', 'Data Analysis', 'Chemistry', 'Innovation'],
    education_required: "PhD",
    experience_level: 'Senior',
    industry: 'Engineering'
  },

  // Marketing Field (5 careers)
  {
    id: 'digital-marketing-specialist',
    title: 'Digital Marketing Specialist',
    description: 'Develop and manage online marketing campaigns to promote products or services.',
    requirements: ['Bachelor\'s degree in Marketing or related field', 'Knowledge of digital tools', 'Creativity'],
    salary_range: '$50,000 - $90,000',
    growth_rate: '10%',
    skills_required: ['SEO', 'Social Media Marketing', 'Google Analytics', 'Content Creation', 'PPC'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Marketing'
  },
  {
    id: 'marketing-manager',
    title: 'Marketing Manager',
    description: 'Oversee marketing strategies and campaigns for an organization.',
    requirements: ['Bachelor\'s degree in Marketing or related field', 'Leadership experience', 'Analytical skills'],
    salary_range: '$80,000 - $140,000',
    growth_rate: '8%',
    skills_required: ['Marketing Strategy', 'Leadership', 'Budgeting', 'Market Research', 'Communication'],
    education_required: "Bachelor's Degree",
    experience_level: 'Mid Level',
    industry: 'Marketing'
  },
  {
    id: 'brand-strategist',
    title: 'Brand Strategist',
    description: 'Develop strategies to build and maintain a company’s brand identity.',
    requirements: ['Master\'s degree in Marketing or related field', 'Experience in branding', 'Creative thinking'],
    salary_range: '$90,000 - $150,000',
    growth_rate: '7%',
    skills_required: ['Branding', 'Market Research', 'Creative Strategy', 'Communication', 'Analytics'],
    education_required: "Master's Degree",
    experience_level: 'Senior',
    industry: 'Marketing'
  },
  {
    id: 'market-research-analyst',
    title: 'Market Research Analyst',
    description: 'Analyze market trends to help companies understand consumer preferences.',
    requirements: ['Bachelor\'s degree in Marketing or related field', 'Analytical skills', 'Research experience'],
    salary_range: '$55,000 - $100,000',
    growth_rate: '18%',
    skills_required: ['Data Analysis', 'Survey Design', 'Statistics', 'Market Research', 'Reporting'],
    education_required: "Bachelor's Degree",
    experience_level: 'Mid Level',
    industry: 'Marketing'
  },
  {
    id: 'advertising-executive',
    title: 'Advertising Executive',
    description: 'Manage advertising campaigns and client relationships.',
    requirements: ['Master\'s degree in Advertising or related field', 'Leadership experience', 'Creativity'],
    salary_range: '$85,000 - $140,000',
    growth_rate: '6%',
    skills_required: ['Advertising Strategy', 'Client Management', 'Creative Direction', 'Media Planning', 'Communication'],
    education_required: "Master's Degree",
    experience_level: 'Senior',
    industry: 'Marketing'
  },

  // Environmental Sciences Field (5 careers)
  {
    id: 'environmental-scientist',
    title: 'Environmental Scientist',
    description: 'Conduct research to protect the environment and human health.',
    requirements: ['Bachelor\'s degree in Environmental Science or related field', 'Fieldwork experience', 'Analytical skills'],
    salary_range: '$50,000 - $90,000',
    growth_rate: '8%',
    skills_required: ['Data Collection', 'Environmental Monitoring', 'GIS', 'Research', 'Reporting'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Environmental Sciences'
  },
  {
    id: 'climate-change-analyst',
    title: 'Climate Change Analyst',
    description: 'Study climate patterns and develop strategies to mitigate climate change impacts.',
    requirements: ['Master\'s degree in Environmental Science or related field', 'Analytical skills', 'Research experience'],
    salary_range: '$60,000 - $110,000',
    growth_rate: '7%',
    skills_required: ['Climate Modeling', 'Data Analysis', 'Policy Analysis', 'Research', 'Communication'],
    education_required: "Master's Degree",
    experience_level: 'Mid Level',
    industry: 'Environmental Sciences'
  },
  {
    id: 'sustainability-consultant',
    title: 'Sustainability Consultant',
    description: 'Advise organizations on sustainable practices and environmental impact reduction.',
    requirements: ['Master\'s degree in Environmental Science or related field', 'Experience in sustainability', 'Strategic thinking'],
    salary_range: '$70,000 - $130,000',
    growth_rate: '6%',
    skills_required: ['Sustainability Strategy', 'Environmental Auditing', 'Consulting', 'Communication', 'Project Management'],
    education_required: "Master's Degree",
    experience_level: 'Senior',
    industry: 'Environmental Sciences'
  },
  {
    id: 'wildlife-biologist',
    title: 'Wildlife Biologist',
    description: 'Study animals and their ecosystems to support conservation efforts.',
    requirements: ['PhD in Biology or related field', 'Fieldwork experience', 'Research skills'],
    salary_range: '$55,000 - $100,000',
    growth_rate: '4%',
    skills_required: ['Field Research', 'Data Analysis', 'Conservation', 'Ecology', 'Wildlife Monitoring'],
    education_required: "PhD",
    experience_level: 'Mid Level',
    industry: 'Environmental Sciences'
  },
  {
    id: 'ecologist',
    title: 'Ecologist',
    description: 'Research ecosystems to understand environmental interactions and changes.',
    requirements: ['PhD in Ecology or related field', 'Research experience', 'Analytical skills'],
    salary_range: '$60,000 - $110,000',
    growth_rate: '5%',
    skills_required: ['Ecosystem Analysis', 'Fieldwork', 'Data Analysis', 'Research', 'Conservation'],
    education_required: "PhD",
    experience_level: 'Senior',
    industry: 'Environmental Sciences'
  },

  // Arts Field (5 careers)
  {
    id: 'art-director',
    title: 'Art Director',
    description: 'Oversee the visual style and imagery for media productions.',
    requirements: ['Bachelor\'s degree in Art or related field', 'Leadership experience', 'Creative vision'],
    salary_range: '$80,000 - $140,000',
    growth_rate: '4%',
    skills_required: ['Creative Direction', 'Leadership', 'Visual Design', 'Collaboration', 'Communication'],
    education_required: "Bachelor's Degree",
    experience_level: 'Senior',
    industry: 'Arts'
  },
  {
    id: 'illustrator',
    title: 'Illustrator',
    description: 'Create drawings and illustrations for books, advertisements, and other media.',
    requirements: ['Bachelor\'s degree in Art or related field', 'Drawing skills', 'Creativity'],
    salary_range: '$40,000 - $80,000',
    growth_rate: '3%',
    skills_required: ['Drawing', 'Digital Illustration', 'Adobe Illustrator', 'Creativity', 'Storytelling'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level',
    industry: 'Arts'
  },
  {
    id: 'museum-curator',
    title: 'Museum Curator',
    description: 'Manage and preserve collections in museums, organizing exhibitions.',
    requirements: ['Master\'s degree in Art History or related field', 'Knowledge of art history', 'Organizational skills'],
    salary_range: '$50,000 - $90,000',
    growth_rate: '5%',
    skills_required: ['Curation', 'Art History', 'Exhibition Design', 'Research', 'Communication'],
    education_required: "Master's Degree",
    experience_level: 'Mid Level',
    industry: 'Arts'
  },
  {
    id: 'art-therapist',
    title: 'Art Therapist',
    description: 'Use art to help clients address emotional and psychological challenges.',
    requirements: ['Master\'s degree in Art Therapy', 'Certification', 'Empathy'],
    salary_range: '$45,000 - $80,000',
    growth_rate: '6%',
    skills_required: ['Therapy Techniques', 'Art Skills', 'Counseling', 'Empathy', 'Communication'],
    education_required: "Master's Degree",
    experience_level: 'Entry Level',
    industry: 'Arts'
  },
  {
    id: 'film-director',
    title: 'Film Director',
    description: 'Direct the creative aspects of film production, overseeing cast and crew.',
    requirements: ['Bachelor\'s degree in Film or related field', 'Leadership experience', 'Creative vision'],
    salary_range: '$70,000 - $150,000',
    growth_rate: '5%',
    skills_required: ['Directing', 'Storytelling', 'Leadership', 'Cinematography', 'Collaboration'],
    education_required: "Bachelor's Degree",
    experience_level: 'Senior',
    industry: 'Arts'
  },
];

function Explore() {
  const { user } = useAuth();
  const [careers, setCareers] = useState<Career[]>(defaultCareers);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [filters, setFilters] = useState({
    industry: '',
    experienceLevel: '',
    education: ''
  });
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setUserProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCareers = careers.filter(career => {
    return (
      (!filters.industry || career.industry === filters.industry) &&
      (!filters.experienceLevel || career.experience_level.includes(filters.experienceLevel)) &&
      (!filters.education || career.education_required === filters.education)
    );
  });

  const industries = Array.from(new Set(careers.map(career => career.industry)));
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior'];
  const educationLevels = ["Bachelor's Degree", "Master's Degree", "PhD"];

  const calculateMatchScore = (career: Career) => {
    if (!userProfile) return 0;
    
    let score = 0;
    const userSkills = new Set(userProfile.skills || []);
    
    career.skills_required.forEach(skill => {
      if (userSkills.has(skill)) score += 20;
    });

    if (userProfile.education_level === career.education_required) score += 20;
    
    return Math.min(score, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Explore Careers</h1>
        
        <div className="flex space-x-4">
          <select
            value={filters.industry}
            onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
            className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">All Industries</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>

          <select
            value={filters.experienceLevel}
            onChange={(e) => setFilters({ ...filters, experienceLevel: e.target.value })}
            className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">All Experience Levels</option>
            {experienceLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>

          <select
            value={filters.education}
            onChange={(e) => setFilters({ ...filters, education: e.target.value })}
            className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">All Education Levels</option>
            {educationLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCareers.map(career => (
          <div
            key={career.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-6"
            onClick={() => setSelectedCareer(career)}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{career.title}</h3>
              {userProfile && (
                <span className="bg-primary-100 text-primary-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {calculateMatchScore(career)}% Match
                </span>
              )}
            </div>
            
            <p className="text-gray-600 mb-4">{career.description}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Salary Range:</span>
                <span className="text-gray-900">{career.salary_range}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Growth Rate:</span>
                <span className="text-green-600">{career.growth_rate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Career Details Modal */}
      {selectedCareer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedCareer.title}</h2>
                <button
                  onClick={() => setSelectedCareer(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Description</h3>
                  <p className="mt-2 text-gray-600">{selectedCareer.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Requirements</h3>
                  <ul className="mt-2 space-y-2">
                    {selectedCareer.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span className="text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Required Skills</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedCareer.skills_required.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold text-gray-700">Salary Range</h4>
                    <p className="text-gray-600">{selectedCareer.salary_range}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold text-gray-700">Growth Rate</h4>
                    <p className="text-green-600">{selectedCareer.growth_rate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold text-gray-700">Education Required</h4>
                    <p className="text-gray-600">{selectedCareer.education_required}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold text-gray-700">Experience Level</h4>
                    <p className="text-gray-600">{selectedCareer.experience_level}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Explore;