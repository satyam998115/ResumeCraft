import React from 'react';
import { FileText, BarChart3, User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ResumeATS</h1>
              <p className="text-xs text-gray-500">AI-Powered Resume Analyzer</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
              <BarChart3 className="h-4 w-4" />
              <span className="text-sm font-medium">Analytics</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">Profile</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};