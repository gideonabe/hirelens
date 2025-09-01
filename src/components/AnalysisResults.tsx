// components/AnalysisResults.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
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
  result: { result: string } | null;
  isLoading?: boolean;
  className?: string;
}

const parseAnalysisResult = (text: string): AnalysisResult => {
  const scoreMatch = text.match(/Match Percentage:\s*(\d+)%/i);
  const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;

  const getSection = (header: string) => {
    const regex = new RegExp(`\\*\\*${header}:\\*\\*\\s*([\\s\\S]*?)(?=\\n\\*\\*|$)`, 'i');
    const match = text.match(regex);
    return match ? match[1].trim() : '';
  };

  const parseList = (sectionText: string) => {
    if (!sectionText) return [];
    const lines = sectionText.split('\n');
    return lines
      .map(line => {
        // Remove leading numbering and whitespace
        let item = line.replace(/^\d+\.\s*/, '').trim();

        // Remove markdown bold **text**
        item = item.replace(/\*\*(.*?)\*\*/g, '$1');

        // Remove trailing colon
        item = item.replace(/:\s*$/, '');

        return item;
      })
      .filter(line => line.length > 0);
  };

  const strengths = parseList(getSection('Strengths'));
  const weaknesses = parseList(getSection('Areas for Improvement'));
  const recommendations = parseList(getSection('Recommendations'));

  return {
    score,
    strengths,
    weaknesses,
    recommendations,
  };
};

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  result,
  isLoading = false,
  className,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  if (isLoading) {
    return (
      <Card className={cn('p-6 animate-pulse', className)}>
        <div className="space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </Card>
    );
  }

  if (!result || !result.result) {
    return <p className="text-center py-10">No analysis results to display.</p>;
  }

  const parsed = parseAnalysisResult(result.result);

  return (
    <Card className={cn('p-6 transition-all duration-300 hover:shadow-lg', className)}>
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
                strokeDasharray={`${parsed.score}, 100`}
                className={getScoreColor(parsed.score)}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={cn('text-3xl font-bold', getScoreColor(parsed.score))}>
                {parsed.score}%
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
            {parsed.strengths.length > 0 ? (
              parsed.strengths.map((strength, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 p-3 bg-success/10 rounded-lg border border-success/20"
                >
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No strengths identified.</p>
            )}
          </div>
        </div>

        {/* Weaknesses Section */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <XCircle className="h-5 w-5 text-amber-600" />
            <h3 className="text-lg font-semibold">Areas for Improvement</h3>
          </div>
          <div className="space-y-2">
            {parsed.weaknesses.length > 0 ? (
              parsed.weaknesses.map((weakness, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 p-3 bg-orange-100 rounded-lg border border-amber-200"
                >
                  <XCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{weakness}</span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No areas for improvement identified.</p>
            )}
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-warning" />
            <h3 className="text-lg font-semibold">Recommendations</h3>
          </div>
          <div className="space-y-2">
            {parsed.recommendations.length > 0 ? (
              parsed.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 p-3 bg-warning/10 rounded-lg border border-warning/20"
                >
                  <Lightbulb className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{recommendation}</span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No recommendations provided.</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
