import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { defaultCareers } from './Explore';
import { skillCategories } from './Skills'; // Import skillCategories from Skills.tsx

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

function Simulate() {
  const [showFormModal, setShowFormModal] = useState(true);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [filters, setFilters] = useState({
    industries: [] as string[], // Multi-select for industries
    experienceLevel: '',
    skills: [] as string[], // Multi-select for skills
  });
  const [filteredCareers, setFilteredCareers] = useState<Career[]>([]);

  // Extract unique industries from defaultCareers
  const industries = Array.from(new Set(defaultCareers.map((career) => career.industry)));
  const allIndustriesOption = 'All Industries';
  const industryOptions = [allIndustriesOption, ...industries].map((industry) => ({
    value: industry,
    label: industry,
  }));

  // Flatten skills from skillCategories
  const skillOptions = skillCategories
    .flatMap((category) => category.skills)
    .map((skill) => ({ value: skill, label: skill }));

  useEffect(() => {
    setShowFormModal(true);
  }, []);

  const handleSearch = () => {
    const filtered = (defaultCareers as Career[]).filter((career: Career) => {
      const industryMatch =
        filters.industries.length === 0 ||
        filters.industries.includes(allIndustriesOption) ||
        filters.industries.includes(career.industry);
      const expMatch = !filters.experienceLevel || career.experience_level === filters.experienceLevel;
      const skillMatch =
        filters.skills.length === 0 ||
        filters.skills.some((skill) => career.skills_required.includes(skill));
      return industryMatch && expMatch && skillMatch;
    });

    const sorted = filtered.sort((a: Career, b: Career) => {
      const growthA = parseFloat(a.growth_rate);
      const growthB = parseFloat(b.growth_rate);
      return growthB - growthA;
    });

    setFilteredCareers(sorted);
    setShowFormModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Find Your Career Path</h1>
      <p className="mt-4 text-gray-600 mb-8">Select your preferences to discover personalized career options.</p>

      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Tell Us About Yourself</h2>
              <button
                onClick={() => setShowFormModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Industries</label>
                <Select
                  isMulti
                  options={industryOptions}
                  value={industryOptions.filter((option) =>
                    filters.industries.includes(option.value)
                  )}
                  onChange={(selected) =>
                    setFilters({
                      ...filters,
                      industries: selected.map((option) => option.value),
                    })
                  }
                  className="mt-1"
                  placeholder="Select industries..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Experience Level</label>
                <select
                  value={filters.experienceLevel}
                  onChange={(e) =>
                    setFilters({ ...filters, experienceLevel: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">Select Level</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Skills</label>
                <Select
                  isMulti
                  options={skillOptions}
                  value={skillOptions.filter((option) =>
                    filters.skills.includes(option.value)
                  )}
                  onChange={(selected) =>
                    setFilters({
                      ...filters,
                      skills: selected.map((option) => option.value),
                    })
                  }
                  className="mt-1"
                  placeholder="Select skills..."
                />
              </div>

              <button
                onClick={handleSearch}
                className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 6: Display Filtered Career List - Add this block here */}
      {!showFormModal && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recommended Careers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.map((career) => (
              <div
                key={career.id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedCareer(career);
                  setShowDetailsModal(true);
                }}
              >
                <h3 className="text-xl font-semibold text-gray-800">{career.title}</h3>
                <p className="text-gray-600 mt-2">{career.description.substring(0, 100)}...</p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    {career.growth_rate} Growth
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Simulate;