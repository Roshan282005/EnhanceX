import React, { useState } from 'react';
import { VideoUploadZone } from '@/components/VideoUploadZone';
import { EnhancementSettings } from '@/components/EnhancementSettings';
import { ProcessingStatus } from '@/components/ProcessingStatus';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Film, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  Monitor,
  Award
} from 'lucide-react';
import heroImage from '@/assets/hero-video-enhancement.jpg';

interface EnhancementSettings {
  resolution: string;
  aiUpscaling: boolean;
  noiseReduction: boolean;
  sharpening: number;
  colorEnhancement: boolean;
  motionStabilization: boolean;
  audioEnhancement: boolean;
  hdrProcessing: boolean;
}

const Index = () => {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [downloadUrl, setDownloadUrl] = useState<string | undefined>();
  
  const [enhancementSettings, setEnhancementSettings] = useState<EnhancementSettings>({
    resolution: '2040p',
    aiUpscaling: true,
    noiseReduction: true,
    sharpening: 75,
    colorEnhancement: true,
    motionStabilization: true,
    audioEnhancement: true,
    hdrProcessing: true,
  });

  const processingSteps = [
    {
      id: 'analysis',
      name: 'Video Analysis',
      description: 'Analyzing video structure and quality metrics',
      status: isProcessing ? 'completed' as const : 'pending' as const,
    },
    {
      id: 'upscaling',
      name: 'AI Upscaling',
      description: 'Neural network enhancement to target resolution',
      status: (isProcessing && progress > 20 ? 'processing' : 'pending') as 'processing' | 'pending',
      progress: Math.max(0, Math.min(100, (progress - 20) * 2.5)),
    },
    {
      id: 'enhancement',
      name: 'Quality Enhancement',
      description: 'Noise reduction, sharpening, and color correction',
      status: (isProcessing && progress > 60 ? 'processing' : 'pending') as 'processing' | 'pending',
      progress: Math.max(0, Math.min(100, (progress - 60) * 2.5)),
    },
    {
      id: 'finalization',
      name: 'Finalization',
      description: 'Audio processing and final encoding',
      status: (progress === 100 ? 'completed' : 'pending') as 'completed' | 'pending',
    },
  ];

  const handleStartProcessing = () => {
    if (!selectedVideo) return;
    
    setIsProcessing(true);
    setProgress(0);
    setCurrentStep('Initializing enhancement process...');
    setDownloadUrl(undefined);

    // Simulate processing steps
    const steps = [
      { step: 'Analyzing video...', duration: 1000, progress: 10 },
      { step: 'Preparing AI models...', duration: 1500, progress: 20 },
      { step: 'Upscaling to 2040p...', duration: 3000, progress: 40 },
      { step: 'Applying noise reduction...', duration: 2000, progress: 60 },
      { step: 'Enhancing sharpness...', duration: 1500, progress: 75 },
      { step: 'Color enhancement...', duration: 1000, progress: 85 },
      { step: 'Audio processing...', duration: 1000, progress: 95 },
      { step: 'Final encoding...', duration: 1000, progress: 100 },
    ];

    let totalTime = 0;
    steps.forEach(({ step, duration, progress: stepProgress }, index) => {
      totalTime += duration;
      setTimeout(() => {
        setCurrentStep(step);
        setProgress(stepProgress);
        
        if (index === steps.length - 1) {
          setDownloadUrl('https://example.com/enhanced-video.mp4');
          setIsProcessing(false);
          setCurrentStep('Enhancement completed successfully!');
        }
      }, totalTime);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-cinematic">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Video Enhancement Technology"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-cinematic/80" />
        </div>
        
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
              <Zap className="mr-2 h-4 w-4" />
              Ultra-HD Enhancement Technology
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-primary-glow bg-clip-text text-transparent leading-tight">
              Enhance Videos to
              <br />
              <span className="text-primary">Ultra-High Resolution</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Transform your videos with AI-powered enhancement. Upscale to 2040p, remove noise, 
              sharpen details, and achieve cinematic quality with our professional-grade processing.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Film className="mr-2 h-4 w-4 text-primary" />
                Professional Quality
              </div>
              <div className="flex items-center">
                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                AI Enhancement
              </div>
              <div className="flex items-center">
                <Monitor className="mr-2 h-4 w-4 text-primary" />
                Ultra-HD Output
              </div>
              <div className="flex items-center">
                <Award className="mr-2 h-4 w-4 text-primary" />
                Cinema Quality
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Application */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Upload & Settings */}
            <div className="space-y-8">
              <VideoUploadZone 
                selectedVideo={selectedVideo} 
                onVideoSelect={setSelectedVideo} 
              />
              
              {selectedVideo && (
                <EnhancementSettings
                  settings={enhancementSettings}
                  onSettingsChange={setEnhancementSettings}
                  onStartProcessing={handleStartProcessing}
                  isProcessing={isProcessing}
                />
              )}
            </div>

            {/* Right Column - Processing Status */}
            <div className="space-y-8">
              {(isProcessing || downloadUrl) && (
                <ProcessingStatus
                  isProcessing={isProcessing}
                  progress={progress}
                  currentStep={currentStep}
                  steps={processingSteps}
                  estimatedTime="5-10 minutes"
                  downloadUrl={downloadUrl}
                />
              )}
              
              {!selectedVideo && !isProcessing && (
                <div className="bg-gradient-glass backdrop-blur-xl rounded-xl border border-white/10 p-8 text-center space-y-6">
                  <div className="p-4 rounded-full bg-primary/10 border border-primary/20 w-fit mx-auto">
                    <ArrowRight className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Ready to Enhance</h3>
                    <p className="text-muted-foreground">
                      Upload a video to begin the enhancement process. 
                      Our AI will analyze and improve every frame.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
