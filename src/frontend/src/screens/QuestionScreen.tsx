import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import ProgressIndicator from '../components/ProgressIndicator';
import ConfirmModal from '../components/ConfirmModal';
import type { Question, UserAnswer } from '../quiz/types';
import { Clock, CheckCircle, XCircle, ChevronRight, Star, X } from 'lucide-react';

interface QuestionScreenProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswerSubmit: (answer: UserAnswer) => void;
  onAdvance: () => void;
  onCancel: () => void;
  correctCount: number;
  wrongCount: number;
}

export default function QuestionScreen({
  question,
  currentIndex,
  totalQuestions,
  onAnswerSubmit,
  onAdvance,
  onCancel,
  correctCount,
  wrongCount,
}: QuestionScreenProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Reset state when question changes (component remounts via key prop)
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(30);
  }, [question.id]);

  // Timer countdown
  useEffect(() => {
    if (isAnswered || timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up - auto submit with no answer
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, isAnswered]);

  const handleTimeUp = useCallback(() => {
    if (!isAnswered) {
      setIsAnswered(true);
      setSelectedOption(null);
      onAnswerSubmit({
        questionId: question.id,
        selectedOption: null,
      });
    }
  }, [isAnswered, question.id, onAnswerSubmit]);

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    onAnswerSubmit({
      questionId: question.id,
      selectedOption: optionIndex,
    });
  };

  const handleNext = () => {
    onAdvance();
  };

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    onCancel();
  };

  const getOptionClassName = (optionIndex: number) => {
    if (!isAnswered) {
      return 'border-2 border-border/60 hover:border-primary hover:bg-primary/5 hover:scale-[1.02] cursor-pointer transition-all duration-200';
    }

    const isCorrect = optionIndex === question.correctAnswer;
    const isSelected = optionIndex === selectedOption;

    if (isCorrect) {
      return 'border-2 border-success bg-success/10 font-semibold scale-[1.02]';
    }
    
    if (isSelected && !isCorrect) {
      return 'border-2 border-error bg-error/10';
    }

    return 'border-2 border-border/30 bg-muted/20 opacity-50';
  };

  const getOptionIcon = (optionIndex: number) => {
    if (!isAnswered) return null;

    const isCorrect = optionIndex === question.correctAnswer;
    const isSelected = optionIndex === selectedOption;

    if (isCorrect) {
      return <CheckCircle className="h-6 w-6 text-success flex-shrink-0" />;
    }
    
    if (isSelected && !isCorrect) {
      return <XCircle className="h-6 w-6 text-error flex-shrink-0" />;
    }

    return null;
  };

  const timerColor = timeLeft <= 5 ? 'text-error' : 'text-primary';
  const progressValue = (timeLeft / 30) * 100;
  const progressColor = timeLeft <= 5 ? 'bg-error' : '';

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      <ProgressIndicator current={currentIndex} total={totalQuestions} />

      {/* Points Display with Correct/Wrong Counter */}
      <div className="flex items-center justify-between gap-4">
        <Badge variant="secondary" className="px-4 py-2 text-base font-bold rounded-full shadow-md">
          <Star className="h-4 w-4 mr-2 text-yellow-500" />
          Question {currentIndex + 1} of {totalQuestions}
        </Badge>
        
        <div className="flex items-center gap-3">
          {/* Correct/Wrong Counter */}
          <div className="flex items-center gap-3 px-4 py-2 bg-card border-2 border-border rounded-full shadow-md">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-base font-bold text-success">{correctCount}</span>
            </div>
            <div className="w-px h-5 bg-border" />
            <div className="flex items-center gap-1.5">
              <XCircle className="h-5 w-5 text-error" />
              <span className="text-base font-bold text-error">{wrongCount}</span>
            </div>
          </div>

          {question.chapter && (
            <Badge variant="outline" className="px-4 py-2 text-sm rounded-full">
              Chapter {question.chapter}
            </Badge>
          )}
        </div>
      </div>

      {/* Timer Display */}
      <Card className="border-2 shadow-lg rounded-3xl bg-gradient-to-r from-card via-card to-primary/5 overflow-hidden">
        <CardContent className="py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${timeLeft <= 5 ? 'bg-error/10' : 'bg-primary/10'}`}>
                <Clock className={`h-7 w-7 ${timerColor}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-semibold">Time Remaining</p>
                <p className={`text-4xl font-black ${timerColor}`}>
                  {timeLeft}s
                </p>
              </div>
            </div>
            <div className="flex-1 max-w-xs">
              <Progress 
                value={progressValue} 
                className={`h-4 rounded-full ${progressColor}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="border-2 shadow-2xl rounded-3xl bg-gradient-to-br from-card via-card/95 to-accent/5 overflow-hidden">
        <CardHeader className="space-y-4 pb-6 bg-gradient-to-br from-primary/5 to-transparent">
          <CardTitle className="text-2xl md:text-3xl leading-relaxed font-bold">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 pt-6">
          <RadioGroup
            value={selectedOption !== null ? selectedOption.toString() : ''}
            disabled={isAnswered}
          >
            <div className="space-y-4">
              {question.options.map((option, index) => {
                const uniqueId = `q-${question.id}-option-${index}`;
                return (
                  <div
                    key={uniqueId}
                    className={`flex items-start gap-4 p-5 rounded-2xl ${getOptionClassName(index)}`}
                    onClick={() => !isAnswered && handleOptionSelect(index)}
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={uniqueId}
                      disabled={isAnswered}
                      className="mt-1"
                    />
                    <Label
                      htmlFor={uniqueId}
                      className={`flex-1 text-base md:text-lg leading-relaxed ${isAnswered ? '' : 'cursor-pointer'}`}
                    >
                      {option}
                    </Label>
                    {getOptionIcon(index)}
                  </div>
                );
              })}
            </div>
          </RadioGroup>

          {isAnswered && (
            <Button
              size="lg"
              className="w-full mt-6 h-16 text-lg font-bold shadow-xl rounded-2xl hover:scale-[1.02] transition-transform"
              onClick={handleNext}
            >
              {currentIndex < totalQuestions - 1 ? (
                <>
                  Next Question
                  <ChevronRight className="ml-2 h-6 w-6" />
                </>
              ) : (
                <>
                  View Results
                  <Star className="ml-2 h-6 w-6" />
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Cancel Button - Bottom positioned */}
      <div className="flex justify-center pt-4">
        <Button
          variant="outline"
          size="lg"
          onClick={handleCancelClick}
          className="font-semibold rounded-2xl border-2 hover:bg-destructive/10 hover:border-destructive hover:text-destructive transition-all"
        >
          <X className="mr-2 h-5 w-5" />
          Cancel Quiz
        </Button>
      </div>

      {/* Cancel Confirmation Modal */}
      <ConfirmModal
        open={showCancelModal}
        onOpenChange={setShowCancelModal}
        onConfirm={handleConfirmCancel}
        title="Cancel Quiz?"
        description="Are you sure you want to cancel this quiz? Your current progress will be lost and you'll return to the home screen."
        confirmText="Yes, Cancel Quiz"
        cancelText="Continue Quiz"
      />
    </div>
  );
}
