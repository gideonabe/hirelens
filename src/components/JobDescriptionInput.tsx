import React from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  value,
  onChange,
  className
}) => {
  return (
    <Card className={cn("p-6 transition-all duration-300", className)}>
      <div className="space-y-4">
        <Label htmlFor="job-description" className="text-lg font-semibold">
          Job Description
        </Label>
        <Textarea
          id="job-description"
          placeholder="Paste the job description here...

Example:
We are looking for a Senior React Developer with 3+ years of experience in React, TypeScript, and Node.js. The ideal candidate should have experience with state management libraries, testing frameworks, and modern deployment practices."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[200px] resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          rows={8}
        />
        <p className="text-sm text-muted-foreground">
          Provide a detailed job description for better analysis results
        </p>
      </div>
    </Card>
  );
};