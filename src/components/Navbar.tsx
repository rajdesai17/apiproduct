import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="w-[1024px] mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <LayoutDashboard className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">API Hub</span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm"
            >
              Home
            </Link>
            <Link 
              to="/create" 
              className="px-4 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors font-medium text-sm"
            >
              Create API
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;