import React, { useState } from 'react';

interface CareerPath {
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

const careerPaths: CareerPath[] = [
  {
    id: 'software-dev',
    title: 'Software Developer',
    description: 'Design and develop software applications and systems',
    averageSalary: '$105,000/year',
    growthRate: '25%',
    requiredSkills: ['JavaScript', 'Python', 'Problem Solving', 'System Design'],
    timeToAchieve: '2-4 years',
    steps: [
      'Learn programming fundamentals',
      'Build personal projects',
      'Internship/Entry level position',
      'Gain specialized expertise'
    ],
    trending: true
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analyze complex data sets to help guide business decisions',
    averageSalary: '$120,000/year',
    growthRate: '30%',
    requiredSkills: ['Python', 'Statistics', 'Machine Learning', 'SQL'],
    timeToAchieve: '3-5 years',
    steps: [
      'Master statistics and mathematics',
      'Learn data analysis tools',
      'Practice with real datasets',
      'Develop ML expertise'
    ],
    trending: true
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    description: 'Design user-friendly interfaces and experiences',
    averageSalary: '$95,000/year',
    growthRate: '20%',
    requiredSkills: ['UI Design', 'User Research', 'Prototyping', 'Wireframing'],
    timeToAchieve: '2-3 years',
    steps: [
      'Learn design principles',
      'Master design tools',
      'Build portfolio',
      'Get certified'
    ],
    trending: false
  },
  {
    id: 'cloud-architect',
    title: 'Cloud Architect',
    description: 'Design and oversee cloud computing strategies',
    averageSalary: '$150,000/year',
    growthRate: '35%',
    requiredSkills: ['AWS/Azure', 'Network Security', 'System Architecture', 'DevOps'],
    timeToAchieve: '5-7 years',
    steps: [
      'Get cloud certifications',
      'Gain infrastructure experience',
      'Learn security best practices',
      'Master cloud platforms'
    ],
    trending: true
  }
];

function Simulate() {
  const [selectedCareer, setSelectedCareer] = useState<CareerPath | null>(null);
  const trendingPaths = careerPaths.filter(path => path.trending);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Career Simulation</h1>
      <p className="mt-4 text-gray-600 mb-8">
        Explore different career paths and see how your choices affect your future.
      </p>

      {/* Trending Careers Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔥 Trending Career Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingPaths.map(path => (
            <div
              key={path.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedCareer(path)}
            >
              <h3 className="text-xl font-semibold text-gray-800">{path.title}</h3>
              <p className="text-gray-600 mt-2">{path.description}</p>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                  {path.growthRate} Growth
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Career Paths */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Career Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerPaths.map(path => (
            <div
              key={path.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedCareer(path)}
            >
              <h3 className="text-xl font-semibold text-gray-800">{path.title}</h3>
              <p className="text-gray-600 mt-2">{path.description}</p>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {path.averageSalary}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Details Modal */}
      {selectedCareer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-900">{selectedCareer.title}</h2>
                <button
                  onClick={() => setSelectedCareer(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Overview</h3>
                  <p className="mt-2 text-gray-600">{selectedCareer.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold text-gray-700">Average Salary</h4>
                    <p className="text-gray-600">{selectedCareer.averageSalary}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-semibold text-gray-700">Growth Rate</h4>
                    <p className="text-gray-600">{selectedCareer.growthRate}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Required Skills</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedCareer.requiredSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Career Path Steps</h3>
                  <div className="mt-2 space-y-3">
                    {selectedCareer.steps.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 text-sm">
                          {index + 1}
                        </div>
                        <p className="ml-3 text-gray-600">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm text-gray-500">
                    Estimated time to achieve: {selectedCareer.timeToAchieve}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Simulate;