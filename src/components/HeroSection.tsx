import React from 'react';
import { Button } from '@/components/ui/button';
import { Brain, FileSearch, Zap } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/50 to-primary/50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center space-x-2 mb-6 mt-10">
          <Brain className="h-12 w-12 text-white" />
          <h1 className="text-4xl md:text-6xl font-bold">
            HireLens
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
          Analyze your resume against job descriptions with AI-powered insights. 
          Get instant feedback to improve your job application success rate.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="hero" size="lg" className="text-lg px-8 py-3">
            <FileSearch className="mr-2 h-5 w-5" />
            Start Analysis
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-3 border-white/30 text-black hover:bg-white/10"
          >
            <Zap className="mr-2 h-5 w-5" />
            Learn More
          </Button>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <FileSearch className="h-8 w-8 mx-auto mb-3 text-white/80" />
            <h3 className="font-semibold mb-2">Smart Analysis</h3>
            <p className="text-sm text-white/70">
              AI-powered comparison between your resume and job requirements
            </p>
          </div>
          <div className="p-4">
            <Brain className="h-8 w-8 mx-auto mb-3 text-white/80" />
            <h3 className="font-semibold mb-2">Instant Feedback</h3>
            <p className="text-sm text-white/70">
              Get immediate insights on strengths, weaknesses, and improvements
            </p>
          </div>
          <div className="p-4">
            <Zap className="h-8 w-8 mx-auto mb-3 text-white/80" />
            <h3 className="font-semibold mb-2">Quick Results</h3>
            <p className="text-sm text-white/70">
              Receive detailed analysis in seconds, not hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};