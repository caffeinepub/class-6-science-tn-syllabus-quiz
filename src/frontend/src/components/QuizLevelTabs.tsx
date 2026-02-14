import { Button } from '@/components/ui/button';

interface QuizLevelTabsProps {
  value: 'class6' | 'class7' | 'class8' | 'class9' | 'class10';
  onChange: (level: 'class6' | 'class7' | 'class8' | 'class9' | 'class10') => void;
  disabled?: boolean;
}

export default function QuizLevelTabs({ value, onChange, disabled = false }: QuizLevelTabsProps) {
  return (
    <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg w-fit">
      <Button
        variant={value === 'class6' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('class6')}
        disabled={disabled}
        className="font-semibold"
      >
        Class 6
      </Button>
      <Button
        variant={value === 'class7' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('class7')}
        disabled={disabled}
        className="font-semibold"
      >
        Class 7
      </Button>
      <Button
        variant={value === 'class8' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('class8')}
        disabled={disabled}
        className="font-semibold"
      >
        Class 8
      </Button>
      <Button
        variant={value === 'class9' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('class9')}
        disabled={disabled}
        className="font-semibold"
      >
        Class 9
      </Button>
      <Button
        variant={value === 'class10' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('class10')}
        disabled={disabled}
        className="font-semibold"
      >
        Class 10
      </Button>
    </div>
  );
}
