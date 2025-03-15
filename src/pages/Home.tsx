import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Shape Your Future Career Path
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Discover personalized career recommendations, analyze skill gaps, and simulate different career paths to make informed decisions about your future.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link
              to="/explore"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
            >
              Get Started
            </Link>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <Link
              to="/simulate"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
              Try Career Simulation
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Key Features
        </h2>
        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900">Career Simulation</h3>
            <p className="mt-2 text-gray-600">
              Explore different career paths and see how your choices impact your future opportunities.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900">Skill Gap Analysis</h3>
            <p className="mt-2 text-gray-600">
              Identify the skills you need to develop to reach your career goals.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900">Market Insights</h3>
            <p className="mt-2 text-gray-600">
              Get real-time data on job market trends and industry growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;