import React, { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { FileUpload } from '@/components/FileUpload';
import { JobDescriptionInput } from '@/components/JobDescriptionInput';
import { AnalysisResults } from '@/components/AnalysisResults';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Brain } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState<{ result: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const cleanJobDescription = (input: string): string => {
    return input
      .replace(/\r\n/g, '\n')          // Normalize line endings
      .replace(/\u00A0/g, ' ')         // Replace non-breaking spaces
      .replace(/[ \t]+\n/g, '\n')      // Remove trailing spaces before newlines
      .replace(/\n{3,}/g, '\n\n')      // Collapse extra blank lines
      .trim();                         // Remove leading/trailing whitespace
  };
  

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
      const formData = new FormData();
      const cleanedJobDescription = cleanJobDescription(jobDescription);
      formData.append('jobDescription', cleanedJobDescription);

      formData.append('resume', selectedFile);
  
      const res = await fetch('https://resumescan-ai-resume-analyzer.onrender.com/analyze-file', {
        method: 'POST',
        body: formData,
      });
  
      const responseText = await res.text();
  
      if (!res.ok) {
        console.error('Non-OK response from server:', res.status, responseText);
        throw new Error(`Server returned status ${res.status}`);
      }
  
      let result;
      try {
        result = JSON.parse(responseText);  // expects { result: string }
      } catch (parseErr) {
        console.error("Failed to parse JSON from server:", responseText);
        throw new Error("Received invalid JSON from server.");
      }
  
      setAnalysisResult(result);
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been analyzed successfully.",
        variant: "default",
      });
    } catch (error: any) {
      console.error("Resume analysis failed:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const scrollToAnalyzer = () => {
    document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' });
  };

  

  return (
    <div className="min-h-screen bg-background">
      <div onClick={scrollToAnalyzer}>
        <HeroSection />
      </div>

      <main className="container mx-auto px-6 py-12" id="analyzer">
        <div className="max-w-6xl mx-auto">
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

          {(analysisResult || isAnalyzing) && (
            <div className="mt-12">
              <AnalysisResults 
                result={analysisResult}
                isLoading={isAnalyzing}
              />
            </div>
          )}

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

      <footer className="bg-muted/30 py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            CV Compare Genius - Powered by AI for better job applications
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            <p>All rights reserved &copy; DEON {new Date().getFullYear()}</p>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
