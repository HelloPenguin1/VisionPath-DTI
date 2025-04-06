import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">  {/* Reduced top/bottom padding */}
      <div 
        className="text-center relative rounded-xl overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: 'url("/background-image2.jpg")',
          minHeight: '420px'  // Reduced from 500px
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 px-4 py-16"> 
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Shape Your Future Career Path
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-100 sm:text-lg md:mt-4 md:text-xl md:max-w-3xl">
            Discover personalized career recommendations, analyze skill gaps, and simulate different career paths to make informed decisions about your future.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="w-full sm:w-1/2">
              <Link
                to="/explore"
                className="h-full w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
            </div>
            <div className="mt-3 w-full sm:w-1/2 sm:mt-0 sm:ml-3">
              <Link
                to="/simulate"
                className="h-full w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Try Career Simulation
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">  {/* Reduced from mt-24 */}
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Key Features
        </h2>
        <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-3">
          <div className="bg-white rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100 hover:border-primary-500">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary-100 text-primary-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Career Simulation</h3>
            <p className="mt-2 text-gray-600">
              Explore different career paths and see how your choices impact your future opportunities.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100 hover:border-primary-500">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary-100 text-primary-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Skill Gap Analysis</h3>
            <p className="mt-2 text-gray-600">
              Identify the skills you need to develop to reach your career goals.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100 hover:border-primary-500">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary-100 text-primary-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Market Insights</h3>
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