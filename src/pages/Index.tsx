import React, { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { FileUpload } from '@/components/FileUpload';
import { JobDescriptionInput } from '@/components/JobDescriptionInput';
import { AnalysisResults } from '@/components/AnalysisResults';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Brain } from 'lucide-react';

// Mock analysis function - In production, this would call your Supabase Edge Function
const mockAnalyzeResume = async (file: File, jobDescription: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Mock analysis result
  return {
    score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
    strengths: [
      "Strong technical skills in React and TypeScript",
      "Relevant work experience in frontend development",
      "Good understanding of modern development practices",
      "Experience with version control systems"
    ],
    weaknesses: [
      "Limited experience with backend technologies",
      "No mention of testing frameworks",
      "Could improve cloud deployment knowledge",
      "Missing specific project metrics and achievements"
    ],
    recommendations: [
      "Highlight specific achievements with quantifiable results",
      "Add experience with testing frameworks like Jest or Cypress",
      "Include any cloud platform experience (AWS, Azure, GCP)",
      "Emphasize teamwork and collaboration skills",
      "Consider adding relevant certifications"
    ]
  };
};

const Index = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast({
        title: "Missing Resume",
        description: "Please upload your resume file first.",
        variant: "destructive",
      });
      return;
    }

    if (!jobDescription.trim()) {
      toast({
        title: "Missing Job Description",
        description: "Please provide a job description for analysis.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await mockAnalyzeResume(selectedFile, jobDescription);
      setAnalysisResult(result);
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been analyzed successfully.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const scrollToAnalyzer = () => {
    document.getElementById('analyzer')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div onClick={scrollToAnalyzer}>
        <HeroSection />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12" id="analyzer">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">AI Resume Analyzer</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your resume and paste a job description to get instant AI-powered insights 
              on how well your resume matches the position requirements.
            </p>
          </div>

          {/* Upload and Input Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <FileUpload 
              onFileSelect={setSelectedFile}
              className="hover:shadow-md"
            />
            <JobDescriptionInput 
              value={jobDescription}
              onChange={setJobDescription}
              className="hover:shadow-md"
            />
          </div>

          {/* Analyze Button */}
          <div className="text-center mb-12">
            <Button
              variant="gradient"
              size="lg"
              onClick={handleAnalyze}
              disabled={isAnalyzing || !selectedFile || !jobDescription.trim()}
              className="px-12 py-3 text-lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-5 w-5" />
                  Analyze Resume
                </>
              )}
            </Button>
          </div>

          {/* Results Section */}
          {(analysisResult || isAnalyzing) && (
            <div className="mt-12">
              <AnalysisResults 
                result={analysisResult}
                isLoading={isAnalyzing}
              />
            </div>
          )}

          {/* Info Section */}
          {!analysisResult && !isAnalyzing && (
            <div className="mt-16 text-center">
              <div className="bg-muted/50 rounded-lg p-8 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold mb-4">How It Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
                    <p className="font-medium">Upload Resume</p>
                    <p className="text-muted-foreground">Upload your resume in PDF or DOCX format</p>
                  </div>
                  <div>
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
                    <p className="font-medium">Add Job Description</p>
                    <p className="text-muted-foreground">Paste the job description you're applying for</p>
                  </div>
                  <div>
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
                    <p className="font-medium">Get Insights</p>
                    <p className="text-muted-foreground">Receive detailed analysis and recommendations</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            CV Compare Genius - Powered by AI for better job applications
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Note:</strong> This demo uses mock analysis. For production, integrate with Supabase Edge Functions and AI APIs.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;