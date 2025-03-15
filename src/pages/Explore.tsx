import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../components/AuthContext';

interface Career {
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

const defaultCareers: Career[] = [
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
    industry: 'Technology'
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
    industry: 'Technology'
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    description: 'Design user-friendly interfaces and experiences for digital products.',
    requirements: ['Bachelor\'s degree in Design or related field', 'Portfolio of work', 'User research experience'],
    salary_range: '$65,000 - $130,000',
    growth_rate: '18%',
    skills_required: ['UI Design', 'User Research', 'Prototyping', 'Figma', 'Adobe XD'],
    education_required: "Bachelor's Degree",
    experience_level: 'Entry Level to Senior',
    industry: 'Design'
  }
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