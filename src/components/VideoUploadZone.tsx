import React, { useState, useCallback } from 'react';
import { Upload, Video, FileVideo, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VideoUploadZoneProps {
  onVideoSelect: (file: File) => void;
  selectedVideo: File | null;
}

export const VideoUploadZone: React.FC<VideoUploadZoneProps> = ({ onVideoSelect, selectedVideo }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith('video/'));
    
    if (videoFile) {
      onVideoSelect(videoFile);
    }
  }, [onVideoSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      onVideoSelect(file);
    }
  }, [onVideoSelect]);

  const removeVideo = useCallback(() => {
    onVideoSelect(null as any);
  }, [onVideoSelect]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {!selectedVideo ? (
        <div
          className={cn(
            "relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300",
            "bg-gradient-glass backdrop-blur-xl",
            isDragOver 
              ? "border-primary shadow-glow scale-105" 
              : "border-muted hover:border-primary/50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-6">
            <div className="p-4 rounded-full bg-primary/10 border border-primary/20">
              <Upload className="h-12 w-12 text-primary" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-foreground">
                Upload Your Video
              </h3>
              <p className="text-muted-foreground max-w-md">
                Drag and drop your video file here, or click to browse. 
                Support for MP4, MOV, AVI, and more formats.
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button variant="cinematic" size="lg" asChild>
                <label className="cursor-pointer">
                  <Video className="mr-2 h-5 w-5" />
                  Select Video File
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-glass backdrop-blur-xl rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <FileVideo className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{selectedVideo.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(selectedVideo.size)} • {selectedVideo.type}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={removeVideo}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};