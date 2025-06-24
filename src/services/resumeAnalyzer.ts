import { ResumeAnalysis } from '../types';

// Mock analysis service - replace with actual Gemini API integration
export const analyzeResume = async (file: File): Promise<ResumeAnalysis> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Mock analysis data - replace with actual API response
  const mockAnalysis: ResumeAnalysis = {
    id: crypto.randomUUID(),
    fileName: file.name,
    uploadDate: new Date().toISOString(),
    overallScore: 78,
    sections: {
      contactInfo: {
        score: 9,
        maxScore: 10,
        feedback: "Contact information is complete and properly formatted.",
        suggestions: ["Consider adding a LinkedIn profile URL"]
      },
      summary: {
        score: 7,
        maxScore: 10,
        feedback: "Professional summary needs improvement to better highlight key achievements.",
        suggestions: [
          "Include specific metrics and achievements",
          "Make it more tailored to your target role",
          "Keep it concise but impactful"
        ]
      },
      experience: {
        score: 8,
        maxScore: 10,
        feedback: "Work experience section is well-structured with good use of action verbs.",
        suggestions: [
          "Add more quantifiable results",
          "Include more relevant keywords for your industry"
        ]
      },
      education: {
        score: 9,
        maxScore: 10,
        feedback: "Education section is complete and well-formatted.",
        suggestions: ["Consider adding relevant coursework if recent graduate"]
      },
      skills: {
        score: 6,
        maxScore: 10,
        feedback: "Skills section needs more industry-specific keywords and better organization.",
        suggestions: [
          "Add more technical skills relevant to your field",
          "Organize skills by category",
          "Include proficiency levels where appropriate"
        ]
      },
      formatting: {
        score: 8,
        maxScore: 10,
        feedback: "Resume formatting is clean and ATS-friendly with good use of white space.",
        suggestions: [
          "Ensure consistent font sizes",
          "Use bullet points for better readability"
        ]
      }
    },
    suggestions: [
      "Increase keyword density for better ATS compatibility",
      "Add more quantifiable achievements in your experience section",
      "Include a stronger professional summary that highlights your unique value proposition",
      "Consider adding relevant certifications or training",
      "Tailor your skills section to match job requirements more closely"
    ],
    keywords: {
      found: [
        "JavaScript", "React", "Node.js", "Python", "SQL", "Git", 
        "Project Management", "Leadership", "Communication", "Problem Solving"
      ],
      missing: [
        "AWS", "Docker", "Kubernetes", "TypeScript", "GraphQL", 
        "Agile", "Scrum", "CI/CD", "TDD", "Microservices"
      ]
    },
    atsCompatibility: 85
  };

  return mockAnalysis;
};

// TODO: Replace with actual Gemini API integration
export const analyzeResumeWithGemini = async (file: File, apiKey: string): Promise<ResumeAnalysis> => {
  // This will be implemented when the user provides the Gemini API key
  // The function should:
  // 1. Convert the file to text/base64
  // 2. Send to Gemini API with appropriate prompts for resume analysis
  // 3. Parse the response and return structured analysis data
  
  throw new Error('Gemini API integration not yet implemented. Please add your API key to the environment variables.');
};