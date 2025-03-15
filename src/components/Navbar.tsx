import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/30 border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div onClick={() => navigate('/')} className="flex-shrink-0 cursor-pointer">
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-white" />
                <span className="text-xl font-bold text-white">API Hub</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-sm text-white hover:text-gray-200 px-3 py-2"
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigate('/docs')}
              className="text-sm text-white hover:text-gray-200 px-3 py-2"
            >
              Documentation
            </button>
            <button 
              onClick={() => navigate('/create')}
              className="text-sm bg-white text-blue-600 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all"
            >
              Create API
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;