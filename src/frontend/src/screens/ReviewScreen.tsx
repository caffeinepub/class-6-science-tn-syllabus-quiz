import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { QuizState } from '../quiz/types';
import { CheckCircle2, XCircle, ArrowLeft, RotateCcw, Clock, BookOpen } from 'lucide-react';

interface ReviewScreenProps {
  quizState: QuizState;
  onBackToResults: () => void;
  onRestart: () => void;
}

export default function ReviewScreen({
  quizState,
  onBackToResults,
  onRestart,
}: ReviewScreenProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 p-6 rounded-3xl bg-gradient-to-r from-card via-card to-primary/5 border-2 border-border/40 shadow-lg">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            Answer Review
          </h2>
          <p className="text-muted-foreground mt-2 text-base md:text-lg font-medium">
            Review all questions and their correct answers
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBackToResults} 
            className="font-semibold rounded-2xl border-2 hover:scale-105 transition-transform"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back to Results</span>
          </Button>
          <Button 
            size="sm" 
            onClick={onRestart} 
            className="font-semibold rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Restart</span>
          </Button>
        </div>
      </div>

      {/* Questions List */}
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="space-y-5 pr-4">
          {quizState.questions.map((question, index) => {
            const userAnswer = quizState.answers.find(a => a.questionId === question.id);
            const isCorrect = userAnswer?.selectedOption === question.correctAnswer;
            const wasAnswered = userAnswer !== undefined && userAnswer.selectedOption !== null;
            const wasUnanswered = userAnswer === undefined || userAnswer.selectedOption === null;

            return (
              <Card
                key={question.id}
                className={`border-2 shadow-xl rounded-3xl overflow-hidden ${
                  wasUnanswered
                    ? 'border-muted bg-muted/10'
                    : isCorrect
                    ? 'border-success/40 bg-gradient-to-br from-success/5 to-transparent'
                    : 'border-error/40 bg-gradient-to-br from-error/5 to-transparent'
                }`}
              >
                <CardHeader className="pb-4 bg-gradient-to-r from-muted/20 to-transparent">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <Badge variant="secondary" className="font-bold rounded-full">
                          Question {index + 1}
                        </Badge>
                        {question.chapter && (
                          <Badge variant="outline" className="rounded-full">
                            Chapter {question.chapter}
                          </Badge>
                        )}
                        {question.topic && (
                          <Badge variant="outline" className="rounded-full text-xs">
                            {question.topic}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl md:text-2xl leading-relaxed font-bold">
                        {question.question}
                      </CardTitle>
                    </div>
                    <div className="flex-shrink-0">
                      {wasUnanswered ? (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-muted border-2 border-border">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                          <span className="text-sm font-bold text-muted-foreground">Timeout</span>
                        </div>
                      ) : isCorrect ? (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-success/10 border-2 border-success/30">
                          <CheckCircle2 className="h-5 w-5 text-success" />
                          <span className="text-sm font-bold text-success">Correct</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-error/10 border-2 border-error/30">
                          <XCircle className="h-5 w-5 text-error" />
                          <span className="text-sm font-bold text-error">Incorrect</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {question.options.map((option, optionIndex) => {
                    const isCorrectOption = optionIndex === question.correctAnswer;
                    const isUserSelection = userAnswer?.selectedOption === optionIndex;

                    return (
                      <div
                        key={optionIndex}
                        className={`p-4 rounded-2xl border-2 ${
                          isCorrectOption
                            ? 'border-success bg-success/10 font-semibold'
                            : isUserSelection
                            ? 'border-error bg-error/10'
                            : 'border-border/30 bg-muted/20'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-base md:text-lg leading-relaxed flex-1">
                            {option}
                          </span>
                          {isCorrectOption && (
                            <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0" />
                          )}
                          {isUserSelection && !isCorrectOption && (
                            <XCircle className="h-6 w-6 text-error flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
