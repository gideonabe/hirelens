import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Lightbulb, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalysisResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

interface AnalysisResultsProps {
  result: AnalysisResult;
  isLoading?: boolean;
  className?: string;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  result,
  isLoading = false,
  className
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  if (isLoading) {
    return (
      <Card className={cn("p-6 animate-pulse", className)}>
        <div className="space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("p-6 transition-all duration-300 hover:shadow-lg", className)}>
      <div className="space-y-6">
        {/* Score Section */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Analysis Results</h2>
          </div>
          
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${result.score}, 100`}
                className={getScoreColor(result.score)}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={cn("text-3xl font-bold", getScoreColor(result.score))}>
                {result.score}%
              </span>
            </div>
          </div>
          
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Match Score
          </Badge>
        </div>

        {/* Strengths Section */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <h3 className="text-lg font-semibold">Strengths</h3>
          </div>
          <div className="space-y-2">
            {result.strengths.map((strength, index) => (
              <div key={index} className="flex items-start space-x-2 p-3 bg-success/10 rounded-lg border border-success/20">
                <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span className="text-sm">{strength}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weaknesses Section */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <XCircle className="h-5 w-5 text-destructive" />
            <h3 className="text-lg font-semibold">Areas for Improvement</h3>
          </div>
          <div className="space-y-2">
            {result.weaknesses.map((weakness, index) => (
              <div key={index} className="flex items-start space-x-2 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                <span className="text-sm">{weakness}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-warning" />
            <h3 className="text-lg font-semibold">Recommendations</h3>
          </div>
          <div className="space-y-2">
            {result.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-2 p-3 bg-warning/10 rounded-lg border border-warning/20">
                <Lightbulb className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                <span className="text-sm">{recommendation}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};