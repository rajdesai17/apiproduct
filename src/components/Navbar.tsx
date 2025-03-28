import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Package, Database, Layout } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 cursor-pointer">
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">API Hub</span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/dashboard"
              className="text-sm text-gray-700 hover:text-gray-900 px-3 py-2 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/docs"
              className="text-sm text-gray-700 hover:text-gray-900 px-3 py-2 transition-colors"
            >
              Documentation
            </Link>
            <Link
              to="/create-product"
              className="text-sm text-gray-700 hover:text-gray-900 px-3 py-2 flex items-center gap-1 transition-colors"
            >
              <Package className="h-4 w-4" />
              Create Product
            </Link>
            <Link
              to="/product-setup"
              className="text-sm text-gray-700 hover:text-gray-900 px-3 py-2 flex items-center gap-1 transition-colors"
            >
              <Database className="h-4 w-4" />
              Product Setup
            </Link>
            <Link
              to="/enterprise-creation"
              className="text-sm text-gray-700 hover:text-gray-900 px-3 py-2 flex items-center gap-1 transition-colors"
            >
              <Layout className="h-4 w-4" />
              Enterprise Creation
            </Link>
            <Link
              to="/create"
              className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-all"
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