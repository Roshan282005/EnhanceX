import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  Monitor, 
  Zap, 
  Sparkles, 
  Eye, 
  Palette, 
  Focus,
  Volume2,
  Film
} from 'lucide-react';

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

interface EnhancementSettingsProps {
  settings: EnhancementSettings;
  onSettingsChange: (settings: EnhancementSettings) => void;
  onStartProcessing: () => void;
  isProcessing: boolean;
}

const resolutionOptions = [
  { value: '1080p', label: '1080p Full HD', description: 'Standard high definition' },
  { value: '1440p', label: '1440p QHD', description: 'Quad high definition' },
  { value: '2040p', label: '2040p Ultra HD', description: 'Ultra high definition' },
  { value: '4K', label: '4K UHD', description: 'Ultra high definition' }
];

export const EnhancementSettings: React.FC<EnhancementSettingsProps> = ({
  settings,
  onSettingsChange,
  onStartProcessing,
  isProcessing
}) => {
  const updateSetting = <K extends keyof EnhancementSettings>(
    key: K,
    value: EnhancementSettings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-glass backdrop-blur-xl border-white/10 p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <Monitor className="mr-3 h-5 w-5 text-primary" />
          Resolution Settings
        </h3>
        
        <div className="grid gap-3">
          {resolutionOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateSetting('resolution', option.value)}
              className={`p-4 rounded-lg border text-left transition-all ${
                settings.resolution === option.value
                  ? 'border-primary bg-primary/10 shadow-glow'
                  : 'border-muted hover:border-primary/50 bg-background/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-muted-foreground">{option.description}</div>
                </div>
                {option.value === '2040p' && (
                  <Badge variant="secondary" className="bg-gradient-accent text-accent-foreground">
                    Recommended
                  </Badge>
                )}
              </div>
            </button>
          ))}
        </div>
      </Card>

      <Card className="bg-gradient-glass backdrop-blur-xl border-white/10 p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <Sparkles className="mr-3 h-5 w-5 text-primary" />
          Enhancement Options
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">AI Upscaling</div>
                <div className="text-sm text-muted-foreground">Advanced neural network enhancement</div>
              </div>
            </div>
            <Switch
              checked={settings.aiUpscaling}
              onCheckedChange={(checked) => updateSetting('aiUpscaling', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Eye className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Noise Reduction</div>
                <div className="text-sm text-muted-foreground">Remove grain and compression artifacts</div>
              </div>
            </div>
            <Switch
              checked={settings.noiseReduction}
              onCheckedChange={(checked) => updateSetting('noiseReduction', checked)}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Focus className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Sharpening</div>
                <div className="text-sm text-muted-foreground">Enhance edge definition</div>
              </div>
            </div>
            <Slider
              value={[settings.sharpening]}
              onValueChange={([value]) => updateSetting('sharpening', value)}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground text-right">{settings.sharpening}%</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Palette className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Color Enhancement</div>
                <div className="text-sm text-muted-foreground">Improve color accuracy and vibrancy</div>
              </div>
            </div>
            <Switch
              checked={settings.colorEnhancement}
              onCheckedChange={(checked) => updateSetting('colorEnhancement', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Film className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Motion Stabilization</div>
                <div className="text-sm text-muted-foreground">Reduce camera shake and jitter</div>
              </div>
            </div>
            <Switch
              checked={settings.motionStabilization}
              onCheckedChange={(checked) => updateSetting('motionStabilization', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Volume2 className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Audio Enhancement</div>
                <div className="text-sm text-muted-foreground">Improve audio clarity and reduce noise</div>
              </div>
            </div>
            <Switch
              checked={settings.audioEnhancement}
              onCheckedChange={(checked) => updateSetting('audioEnhancement', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Monitor className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">HDR Processing</div>
                <div className="text-sm text-muted-foreground">High dynamic range enhancement</div>
              </div>
            </div>
            <Switch
              checked={settings.hdrProcessing}
              onCheckedChange={(checked) => updateSetting('hdrProcessing', checked)}
            />
          </div>
        </div>
      </Card>

      <Button
        variant="cinematic"
        size="lg"
        className="w-full"
        onClick={onStartProcessing}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-background border-t-transparent mr-2" />
            Processing Enhancement...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Start Enhancement Process
          </>
        )}
      </Button>
    </div>
  );
};