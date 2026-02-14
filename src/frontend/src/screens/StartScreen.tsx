import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Shuffle, Play, Clock, Zap, Target } from 'lucide-react';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';

interface StartScreenProps {
  totalQuestions: number;
  onStart: (shuffleEnabled: boolean) => void;
  quizTitle: string;
  quizSubtitle: string;
}

export default function StartScreen({ totalQuestions, onStart, quizTitle, quizSubtitle }: StartScreenProps) {
  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const music = useBackgroundMusic('/assets/audio/quiz-bgm.mp3');

  const handleStart = () => {
    music.unlock();
    music.play();
    onStart(shuffleEnabled);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-2 ring-primary/20">
        <img
          src="/assets/generated/science-hero.dim_1400x600.png"
          alt="Science Quiz Hero"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent flex items-end">
          <div className="p-8 md:p-12 w-full">
            <Badge className="mb-4 px-4 py-2 text-sm font-bold rounded-full shadow-lg">
              <Zap className="h-4 w-4 mr-2" />
              Interactive Learning
            </Badge>
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4 tracking-tight">
              Welcome to Science Quiz! 🎓
            </h2>
            <p className="text-lg md:text-2xl text-muted-foreground font-semibold">
              Test your knowledge of {quizTitle} ({quizSubtitle})
            </p>
          </div>
        </div>
      </div>

      {/* Quiz Info Card */}
      <Card className="border-2 shadow-2xl rounded-3xl bg-gradient-to-br from-card via-card to-primary/5 overflow-hidden">
        <CardHeader className="space-y-3 pb-6 bg-gradient-to-br from-accent/10 to-transparent">
          <CardTitle className="text-3xl md:text-4xl flex items-center gap-3 font-black">
            <div className="p-3 rounded-2xl bg-primary/10">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            Quiz Information
          </CardTitle>
          <CardDescription className="text-base md:text-lg font-medium">
            Ready to test your science knowledge? Let's get started! 🚀
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <Target className="h-6 w-6 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">Total Questions</span>
              </div>
              <p className="text-3xl font-black text-foreground">{totalQuestions}</p>
            </div>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/20">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-6 w-6 text-accent-foreground" />
                <span className="text-sm font-semibold text-muted-foreground">Time per Question</span>
              </div>
              <p className="text-3xl font-black text-foreground">30s</p>
            </div>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/20">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="h-6 w-6 text-secondary-foreground" />
                <span className="text-sm font-semibold text-muted-foreground">Instant Feedback</span>
              </div>
              <p className="text-3xl font-black text-foreground">✓</p>
            </div>
          </div>

          {/* Shuffle Toggle */}
          <div className="flex items-center justify-between p-6 rounded-2xl border-2 border-border bg-gradient-to-r from-muted/40 to-muted/20 hover:from-muted/60 hover:to-muted/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <Shuffle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <Label htmlFor="shuffle-mode" className="text-lg font-bold cursor-pointer">
                  Shuffle Questions
                </Label>
                <p className="text-sm text-muted-foreground mt-1 font-medium">
                  Randomize the order of questions for varied practice
                </p>
              </div>
            </div>
            <Switch
              id="shuffle-mode"
              checked={shuffleEnabled}
              onCheckedChange={setShuffleEnabled}
              className="scale-125"
            />
          </div>

          {/* Start Button */}
          <Button
            size="lg"
            className="w-full text-xl md:text-2xl h-16 md:h-20 font-black shadow-2xl rounded-2xl hover:scale-[1.02] transition-transform"
            onClick={handleStart}
          >
            <Play className="mr-3 h-7 w-7" />
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
