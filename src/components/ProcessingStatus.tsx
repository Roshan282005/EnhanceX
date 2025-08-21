import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import DownloadButton from "./DownloadButton";

import { 
  Clock, 
  Cpu, 
  Download, 
  CheckCircle, 
  AlertCircle,
  Zap
} from 'lucide-react';

interface ProcessingStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress?: number;
}

interface ProcessingStatusProps {
  isProcessing: boolean;
  progress: number;
  currentStep: string;
  steps: ProcessingStep[];
  estimatedTime?: string;
  downloadUrl?: string;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  isProcessing,
  progress,
  currentStep,
  steps,
  estimatedTime,
  downloadUrl
}) => {
  const getStepIcon = (status: ProcessingStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: ProcessingStep['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Processing</Badge>;
      case 'error':
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Error</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  if (!isProcessing && !downloadUrl) {
    return null;
  }

  return (
    <Card className="bg-gradient-glass backdrop-blur-xl border-white/10 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold flex items-center">
            <Zap className="mr-3 h-5 w-5 text-primary" />
            Enhancement Progress
          </h3>
          {estimatedTime && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              Est. {estimatedTime}
            </div>
          )}
        </div>

        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{currentStep}</span>
            <span className="text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Processing Steps */}
        <div className="space-y-3">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center space-x-4 p-3 rounded-lg bg-background/30">
              {getStepIcon(step.status)}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{step.name}</span>
                  {getStatusBadge(step.status)}
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {step.progress !== undefined && step.status === 'processing' && (
                  <div className="mt-2">
                    <Progress value={step.progress} className="h-1" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center space-x-2">
            <Cpu className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">GPU Acceleration</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI Processing</span>
          </div>
        </div>

        {/* Download Button */}
        {downloadUrl && (
         <div className="pt-4 border-t border-white/10">
           <a
             href={downloadUrl}
             download
             className="flex items-center justify-center w-full px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-medium hover:shadow-glow hover:scale-105 transition-glow"
            >
              <Download className="mr-2 h-5 w-5" />
                 Download Enhanced Video
           </a>
         </div>
        )}

      </div>
    </Card>
  );
};