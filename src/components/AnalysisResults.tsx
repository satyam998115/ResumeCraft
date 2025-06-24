import React from 'react';
import { 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Layout,
  Download,
  RefreshCw
} from 'lucide-react';
import { ResumeAnalysis } from '../types';

interface AnalysisResultsProps {
  analysis: ResumeAnalysis;
  onNewAnalysis: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis, onNewAnalysis }) => {
  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'bg-green-100';
    if (percentage >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const sections = [
    { key: 'contactInfo', name: 'Contact Information', icon: User },
    { key: 'summary', name: 'Professional Summary', icon: FileText },
    { key: 'experience', name: 'Work Experience', icon: Briefcase },
    { key: 'education', name: 'Education', icon: GraduationCap },
    { key: 'skills', name: 'Skills', icon: Code },
    { key: 'formatting', name: 'Formatting & Structure', icon: Layout },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Resume Analysis Results</h2>
            <p className="text-gray-600 mt-1">Analysis for {analysis.fileName}</p>
          </div>
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
            <button 
              onClick={onNewAnalysis}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-teal-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              New Analysis
            </button>
          </div>
        </div>

        {/* Overall Score */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-6 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Score</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{analysis.overallScore}%</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-lg p-6 border border-teal-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ATS Compatibility</p>
                <p className="text-3xl font-bold text-teal-600 mt-1">{analysis.atsCompatibility}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-teal-600" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Keywords Found</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">{analysis.keywords.found.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Section Scores */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Section Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map(({ key, name, icon: Icon }) => {
            const section = analysis.sections[key as keyof typeof analysis.sections];
            return (
              <div key={key} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getScoreBgColor(section.score, section.maxScore)}`}>
                      <Icon className={`h-5 w-5 ${getScoreColor(section.score, section.maxScore)}`} />
                    </div>
                    <span className="font-medium text-gray-900">{name}</span>
                  </div>
                  <span className={`text-lg font-bold ${getScoreColor(section.score, section.maxScore)}`}>
                    {section.score}/{section.maxScore}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{section.feedback}</p>
                {section.suggestions.length > 0 && (
                  <ul className="text-xs text-gray-500 space-y-1">
                    {section.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Keywords Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            Keywords Found ({analysis.keywords.found.length})
          </h3>
          {analysis.keywords.found.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.found.map((keyword, index) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  {keyword}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No keywords detected</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
            Missing Keywords ({analysis.keywords.missing.length})
          </h3>
          {analysis.keywords.missing.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.missing.map((keyword, index) => (
                <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                  {keyword}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Great! No missing keywords detected</p>
          )}
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Improvement Suggestions</h3>
        <div className="space-y-3">
          {analysis.suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">{suggestion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};