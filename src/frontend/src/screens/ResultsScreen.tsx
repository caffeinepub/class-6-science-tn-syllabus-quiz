import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { calculateScore } from '../quiz/scoring';
import type { QuizState } from '../quiz/types';
import { Trophy, RotateCcw, FileText, Award, Target, TrendingUp } from 'lucide-react';

interface ResultsScreenProps {
  quizState: QuizState;
  onRestart: () => void;
  onViewReview: () => void;
}

export default function ResultsScreen({
  quizState,
  onRestart,
  onViewReview,
}: ResultsScreenProps) {
  const result = calculateScore(quizState);
  const unansweredCount = quizState.questions.length - quizState.answers.filter(a => a.selectedOption !== null).length;

  const getPerformanceMessage = (percentage: number) => {
    if (percentage >= 90) return { text: 'Outstanding!', color: 'text-success', emoji: '🌟', badge: 'Master' };
    if (percentage >= 75) return { text: 'Great Job!', color: 'text-primary', emoji: '🎉', badge: 'Expert' };
    if (percentage >= 60) return { text: 'Good Effort!', color: 'text-accent-foreground', emoji: '👍', badge: 'Skilled' };
    if (percentage >= 40) return { text: 'Keep Practicing!', color: 'text-secondary-foreground', emoji: '💪', badge: 'Learner' };
    return { text: 'Keep Learning!', color: 'text-muted-foreground', emoji: '📚', badge: 'Beginner' };
  };

  const performance = getPerformanceMessage(result.percentage);

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2 shadow-2xl rounded-3xl bg-gradient-to-br from-card via-card to-primary/5 overflow-hidden">
        <CardHeader className="text-center space-y-6 pb-8 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent">
          <div className="mx-auto w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 flex items-center justify-center shadow-2xl ring-4 ring-primary/20 animate-pulse">
            <Trophy className="h-16 w-16 text-primary" />
          </div>
          <div>
            <Badge className="mb-3 px-4 py-2 text-base font-bold rounded-full shadow-lg">
              <Award className="h-4 w-4 mr-2" />
              {performance.badge}
            </Badge>
            <CardTitle className="text-4xl md:text-5xl mb-3 font-black tracking-tight">Quiz Complete! 🎊</CardTitle>
            <CardDescription className="text-lg md:text-xl font-semibold">
              Here's how you performed
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-8 pt-8">
          {/* Score Display */}
          <div className="text-center py-12 space-y-6 bg-gradient-to-br from-muted/30 via-muted/20 to-transparent rounded-3xl border-2 border-border/40">
            <div className="space-y-3">
              <div className={`text-7xl md:text-8xl font-black ${performance.color}`}>
                {result.percentage}%
              </div>
              <div className="text-5xl md:text-6xl animate-bounce">
                {performance.emoji}
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-black text-foreground">
              {performance.text}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/20">
              <div className="flex items-center gap-3 mb-2">
                <Award className="h-6 w-6 text-success" />
                <span className="text-sm font-semibold text-muted-foreground">Correct</span>
              </div>
              <p className="text-4xl font-black text-foreground">{result.correctAnswers}</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-error/10 to-error/5 border-2 border-error/20">
              <div className="flex items-center gap-3 mb-2">
                <Target className="h-6 w-6 text-error" />
                <span className="text-sm font-semibold text-muted-foreground">Incorrect</span>
              </div>
              <p className="text-4xl font-black text-foreground">
                {result.totalQuestions - result.correctAnswers - unansweredCount}
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-muted/40 to-muted/20 border-2 border-border">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-6 w-6 text-muted-foreground" />
                <span className="text-sm font-semibold text-muted-foreground">Unanswered</span>
              </div>
              <p className="text-4xl font-black text-foreground">{unansweredCount}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              variant="outline"
              className="flex-1 h-16 text-lg font-bold border-2 rounded-2xl hover:scale-[1.02] transition-transform"
              onClick={onViewReview}
            >
              <FileText className="mr-2 h-6 w-6" />
              Review Answers
            </Button>
            <Button
              size="lg"
              className="flex-1 h-16 text-lg font-bold shadow-2xl rounded-2xl hover:scale-[1.02] transition-transform"
              onClick={onRestart}
            >
              <RotateCcw className="mr-2 h-6 w-6" />
              Restart Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
