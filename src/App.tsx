import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ResumeUpload } from './components/ResumeUpload';
import { AnalysisResults } from './components/AnalysisResults';
import { analyzeResume } from './services/resumeAnalyzer';
import { ResumeAnalysis } from './types';

type AppState = 'dashboard' | 'upload' | 'analyzing' | 'results';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('dashboard');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysis | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true);
    setCurrentState('analyzing');

    try {
      const result = await analyzeResume(file);
      setAnalysisResult(result);
      setCurrentState('results');
    } catch (error) {
      console.error('Analysis failed:', error);
      setCurrentState('upload');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
    setCurrentState('upload');
  };

  const startAnalysis = () => {
    setCurrentState('upload');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        {currentState === 'dashboard' && (
          <div className="space-y-8">
            <Dashboard />
            <div className="text-center">
              <button
                onClick={startAnalysis}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 hover:shadow-xl"
              >
                Analyze New Resume
              </button>
            </div>
          </div>
        )}

        {(currentState === 'upload' || currentState === 'analyzing') && (
          <div className="py-12">
            <ResumeUpload onFileUpload={handleFileUpload} isAnalyzing={isAnalyzing} />
          </div>
        )}

        {currentState === 'results' && analysisResult && (
          <div className="py-8">
            <AnalysisResults 
              analysis={analysisResult} 
              onNewAnalysis={handleNewAnalysis}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;