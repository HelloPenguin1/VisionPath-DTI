import { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { supabase } from '../lib/supabase';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SkillCategory {
  name: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Technical Skills',
    skills: [
      'Programming',
      'Database Management',
      'Cloud Computing',
      'Network Security',
      'Technology', 
      'Data Analysis'
    ],
  },
  {
    name: 'Soft Skills',
    skills: [
      'Communication',
      'Leadership',
      'Problem Solving',
      'Teamwork',
      'Project Management',
      'Empathy',
      'Attention to Detail',
      'Negotiation'
    ],
  },
  {
    name: 'Creative Skills',
    skills: [
      'Creativity',
      'UI Design',
      'Branding'
    ],
  },
  {
    name: 'Analytical Skills',
    skills: [
      'Analytical Skills',
      'Data Analysis',
      'Research',
      'Financial Modeling'
    ],
  },
  {
    name: 'Domain-Specific Practices',
    skills: [
      'Patient Care',
      'Structural Analysis', 
      'Marketing Strategy',
      'Environmental Conservation',
      'Teaching',
      'Curriculum Design'
    ],
  },
  {
    name: 'Management and Methodologies',
    skills: [
      'Agile Methodologies',
      'Project Management',
      'Business Analysis',
      'Budgeting',
      'Strategic Planning'
    ],
  },
];

function Skills() {
  const { user } = useAuth();
  const [skillLevels, setSkillLevels] = useState<{ [key: string]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>(skillCategories[0].name);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserSkills();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadUserSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('skills')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      const initialSkillLevels: { [key: string]: number } = {};
      skillCategories.forEach(category => {
        category.skills.forEach(skill => {
          initialSkillLevels[skill] = data?.skills?.includes(skill) ? 3 : 0;
        });
      });

      setSkillLevels(initialSkillLevels);
    } catch (error) {
      console.error('Error loading skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSkillLevel = async (skill: string, level: number) => {
    if (!user) return;

    const newSkillLevels = { ...skillLevels, [skill]: level };
    setSkillLevels(newSkillLevels);

    try {
      const skills = Object.entries(newSkillLevels)
        .filter(([_, level]) => level > 0)
        .map(([skill]) => skill);

      const { error } = await supabase
        .from('profiles')
        .update({ skills })
        .eq('id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating skills:', error);
    }
  };

  const getChartData = (categoryName: string) => {
    const category = skillCategories.find(c => c.name === categoryName);
    if (!category) return null;

    return {
      labels: category.skills,
      datasets: [
        {
          label: categoryName,
          data: category.skills.map(skill => skillLevels[skill] || 0),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 5,
      },
    },
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Skill Analysis</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Skill Assessment</h2>
          
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {skillCategories.map(category => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-3 py-1.5 rounded text-sm sm:text-base sm:px-4 sm:py-2 ${
                    selectedCategory === category.name
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {skillCategories
              .find(category => category.name === selectedCategory)
              ?.skills.map(skill => (
                <div key={skill} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">{skill}</label>
                    <span className="text-sm text-gray-500">
                      Level: {skillLevels[skill] || 0}/5
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={skillLevels[skill] || 0}
                    onChange={(e) => updateSkillLevel(skill, Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Skill Visualization</h2>
          {getChartData(selectedCategory) && (
            <Radar data={getChartData(selectedCategory)!} options={chartOptions} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Skills;