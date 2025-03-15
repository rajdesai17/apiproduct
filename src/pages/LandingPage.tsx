import React from 'react';
import { ArrowRight, ArrowDownCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BackgroundGradient from '../components/BackgroundGradient';

const LandingPage: React.FC = () => {
  return (
    <>
      <BackgroundGradient />
      <Navbar />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 text-center">
          {/* Hero Section */}
          <div className="flex flex-col items-center gap-12">
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
                Welcome to <span className="text-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">API Hub</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Create, manage, and deploy APIs with ease. Build powerful integrations in minutes without complex setup.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/create"
                  className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <button
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-all duration-300"
                >
                  Learn More
                  <ArrowDownCircle className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-xl blur-lg opacity-75"></div>
              {/* Add your image or illustration here */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;