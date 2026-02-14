import { Progress } from '@/components/ui/progress';
import { TrendingUp } from 'lucide-react';

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export default function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  const percentage = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div className="space-y-3 p-4 rounded-2xl bg-gradient-to-r from-muted/30 to-transparent border-2 border-border/40">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span className="text-base font-bold text-foreground">
            Progress
          </span>
        </div>
        <span className="text-sm font-semibold text-muted-foreground px-3 py-1 rounded-full bg-muted">
          {Math.round(percentage)}% Complete
        </span>
      </div>
      <Progress value={percentage} className="h-2.5 rounded-full" />
    </div>
  );
}
