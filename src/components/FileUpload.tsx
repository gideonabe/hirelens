import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  accept?: string;
  maxSize?: number;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = '.pdf,.doc,.docx',
  maxSize = 5 * 1024 * 1024, // 5MB
  className
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError('');
    
    if (rejectedFiles.length > 0) {
      setError('Please upload a valid resume file (PDF, DOC, DOCX)');
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize,
    multiple: false
  });

  const removeFile = () => {
    setSelectedFile(null);
    onFileSelect(null);
    setError('');
  };

  return (
    <Card className={cn("p-6 transition-all duration-300", className)}>
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 hover:border-primary/50",
            isDragActive ? "border-primary bg-primary/5" : "border-border",
            error && "border-destructive bg-destructive/5"
          )}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
          <p className="text-muted-foreground mb-4">
            {isDragActive
              ? "Drop your resume here..."
              : "Drag & drop your resume, or click to browse"}
          </p>
          <p className="text-sm text-muted-foreground">
            Supports PDF, DOC, DOCX (max 5MB)
          </p>
          {error && (
            <p className="text-sm text-destructive mt-2">{error}</p>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg border border-success/20">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-success" />
            <div>
              <p className="font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeFile}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Card>
  );
};