import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface BackgroundMusicControlsProps {
  isMuted: boolean;
  volume: number;
  onToggleMute: () => void;
  onVolumeChange: (volume: number) => void;
}

export default function BackgroundMusicControls({
  isMuted,
  volume,
  onToggleMute,
  onVolumeChange,
}: BackgroundMusicControlsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
          <span className="hidden sm:inline text-xs">Music</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Background Music</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleMute}
              className="h-8 w-8 p-0"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Volume</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <Slider
              value={[volume]}
              onValueChange={([value]) => onVolumeChange(value)}
              max={1}
              step={0.1}
              disabled={isMuted}
              className="w-full"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
