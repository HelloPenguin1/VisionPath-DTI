import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { UserProfile } from '../types/careers';

const educationLevels = [
  'High School',
  'Some College',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'PhD',
];

const interestAreas = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Creative Arts',
  'Science',
  'Business',
  'Engineering',
];

const workEnvironments = [
  'Office',
  'Remote',
  'Hybrid',
  'Field Work',
  'Travel Required',
];

function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/login');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', profile.id);

      if (error) throw error;
      alert('Profile updated successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!profile) return <div className="text-center py-12">No profile found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Career Profile</h1>

            <form onSubmit={handleUpdate} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.full_name}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Role/Status
                  </label>
                  <input
                    type="text"
                    value={profile.current_status}
                    onChange={(e) => setProfile({ ...profile, current_status: e.target.value })}
                    placeholder="e.g., Student, Working Professional"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Years of Work Experience
                  </label>
                  <input
                    type="number"
                    value={profile.work_experience || 0}
                    onChange={(e) => setProfile({ ...profile, work_experience: parseInt(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Education */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Education</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Education Level
                  </label>
                  <select
                    value={profile.education_level}
                    onChange={(e) => setProfile({ ...profile, education_level: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="">Select Education Level</option>
                    {educationLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {profile.education_level && profile.education_level !== 'High School' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        University/College
                      </label>
                      <input
                        type="text"
                        value={profile.university || ''}
                        onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Major/Field of Study
                      </label>
                      <input
                        type="text"
                        value={profile.major || ''}
                        onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Graduation Year
                      </label>
                      <input
                        type="number"
                        value={profile.graduation_year || ''}
                        onChange={(e) => setProfile({ ...profile, graduation_year: parseInt(e.target.value) || undefined })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Career Interests */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Career Interests</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Areas of Interest
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {interestAreas.map((interest) => (
                      <label key={interest} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={profile.interests?.includes(interest)}
                          onChange={(e) => {
                            const interests = profile.interests || [];
                            setProfile({
                              ...profile,
                              interests: e.target.checked
                                ? [...interests, interest]
                                : interests.filter((i) => i !== interest),
                            });
                          }}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Career Goals
                  </label>
                  <textarea
                    value={profile.career_goals?.join('\n') || ''}
                    onChange={(e) => setProfile({
                      ...profile,
                      career_goals: e.target.value.split('\n').filter(Boolean)
                    })}
                    placeholder="Enter your career goals (one per line)"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Work Preferences</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Preferred Work Environment
                  </label>
                  <select
                    value={profile.preferred_work_environment || ''}
                    onChange={(e) => setProfile({ ...profile, preferred_work_environment: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="">Select Work Environment</option>
                    {workEnvironments.map((env) => (
                      <option key={env} value={env}>{env}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Preferred Location
                  </label>
                  <input
                    type="text"
                    value={profile.preferred_location || ''}
                    onChange={(e) => setProfile({ ...profile, preferred_location: e.target.value })}
                    placeholder="e.g., New York, Remote, Europe"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Salary Expectations
                  </label>
                  <input
                    type="text"
                    value={profile.salary_expectations || ''}
                    onChange={(e) => setProfile({ ...profile, salary_expectations: e.target.value })}
                    placeholder="e.g., $50,000 - $70,000"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={profile.willing_to_relocate || false}
                    onChange={(e) => setProfile({ ...profile, willing_to_relocate: e.target.checked })}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Willing to Relocate
                  </label>
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {loading ? 'Saving...' : 'Save Profile'}
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Sign Out
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;