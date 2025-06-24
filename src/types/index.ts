export interface ResumeAnalysis {
  id: string;
  fileName: string;
  uploadDate: string;
  overallScore: number;
  sections: {
    contactInfo: SectionScore;
    summary: SectionScore;
    experience: SectionScore;
    education: SectionScore;
    skills: SectionScore;
    formatting: SectionScore;
  };
  suggestions: string[];
  keywords: {
    found: string[];
    missing: string[];
  };
  atsCompatibility: number;
}

export interface SectionScore {
  score: number;
  maxScore: number;
  feedback: string;
  suggestions: string[];
}

export interface UploadedFile {
  file: File;
  preview?: string;
}