import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <img
                className="h-20 w-auto"
                src="/visionpath-logo.png"
                alt="Vision Path Logo"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/explore" className="text-gray-700 hover:text-primary-600">
              Explore Careers
            </Link>
            <Link to="/skills" className="text-gray-700 hover:text-primary-600">
              Skill Analysis
            </Link>
            <Link to="/simulate" className="text-gray-700 hover:text-primary-600">
              Career Simulation
            </Link>
            {user ? (
              <Link
                to="/profile"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;