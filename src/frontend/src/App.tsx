import { useState, useMemo } from 'react';
import { loadQuestions } from './quiz/loadQuestions';
import { getCommittedCounts } from './quiz/committedCounts';
import StartScreen from './screens/StartScreen';
import QuestionScreen from './screens/QuestionScreen';
import ResultsScreen from './screens/ResultsScreen';
import ReviewScreen from './screens/ReviewScreen';
import LoginRequiredScreen from './screens/LoginRequiredScreen';
import Layout from './components/Layout';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import type { QuizState, UserAnswer } from './quiz/types';

type Screen = 'start' | 'question' | 'results' | 'review';
type QuizLevel = 'class6' | 'class7' | 'class8' | 'class9' | 'class10';

function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const [quizLevel, setQuizLevel] = useState<QuizLevel>('class6');
  const [screen, setScreen] = useState<Screen>('start');
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [pendingAnswer, setPendingAnswer] = useState<UserAnswer | null>(null);

  const isAuthenticated = !!identity;

  // Load questions based on selected quiz level
  const questionsResult = useMemo(() => loadQuestions(quizLevel), [quizLevel]);

  // Derive display strings for the selected quiz level
  const quizTitle = 
    quizLevel === 'class6' ? 'Class 6 Science Quiz' :
    quizLevel === 'class7' ? 'Class 7 Science Quiz' :
    quizLevel === 'class8' ? 'Class 8 Science Quiz' :
    quizLevel === 'class9' ? 'Class 9 Science Quiz' :
    'Class 10 Science Quiz';
  const quizSubtitle = 'TN Syllabus';

  // Compute committed correct/wrong counts (excluding pendingAnswer)
  const committedCounts = useMemo(() => {
    if (!quizState) return { correct: 0, wrong: 0 };
    return getCommittedCounts(quizState);
  }, [quizState]);

  const handleQuizLevelChange = (newLevel: QuizLevel) => {
    // Only allow switching on the start screen
    if (screen === 'start') {
      setQuizLevel(newLevel);
      setQuizState(null);
    }
  };

  const handleStartQuiz = (shuffleEnabled: boolean) => {
    if (questionsResult.success && questionsResult.questions) {
      const questions = shuffleEnabled
        ? [...questionsResult.questions].sort(() => Math.random() - 0.5)
        : questionsResult.questions;

      setQuizState({
        questions,
        currentIndex: 0,
        answers: [],
        shuffleEnabled,
      });
      setPendingAnswer(null);
      setScreen('question');
    }
  };

  const handleAnswerSubmit = (answer: UserAnswer) => {
    // Store the answer but don't advance yet - let user see feedback
    setPendingAnswer(answer);
  };

  const handleAdvanceQuestion = () => {
    if (!quizState || !pendingAnswer) return;

    const newAnswers = [...quizState.answers, pendingAnswer];
    const newIndex = quizState.currentIndex + 1;

    if (newIndex >= quizState.questions.length) {
      setQuizState({ ...quizState, answers: newAnswers });
      setPendingAnswer(null);
      setScreen('results');
    } else {
      setQuizState({
        ...quizState,
        currentIndex: newIndex,
        answers: newAnswers,
      });
      setPendingAnswer(null);
    }
  };

  const handleCancelQuiz = () => {
    setQuizState(null);
    setPendingAnswer(null);
    setScreen('start');
  };

  const handleRestart = () => {
    setQuizState(null);
    setPendingAnswer(null);
    setScreen('start');
  };

  const handleViewReview = () => {
    setScreen('review');
  };

  const handleBackToResults = () => {
    setScreen('results');
  };

  if (isInitializing) {
    return (
      <Layout
        quizLevel={quizLevel}
        onQuizLevelChange={handleQuizLevelChange}
        canSwitchLevel={screen === 'start'}
        quizTitle={quizTitle}
        quizSubtitle={quizSubtitle}
      >
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout
        quizLevel={quizLevel}
        onQuizLevelChange={handleQuizLevelChange}
        canSwitchLevel={screen === 'start'}
        quizTitle={quizTitle}
        quizSubtitle={quizSubtitle}
      >
        <LoginRequiredScreen />
      </Layout>
    );
  }

  if (!questionsResult.success) {
    return (
      <Layout
        quizLevel={quizLevel}
        onQuizLevelChange={handleQuizLevelChange}
        canSwitchLevel={screen === 'start'}
        quizTitle={quizTitle}
        quizSubtitle={quizSubtitle}
      >
        <div className="flex items-center justify-center min-h-[60vh]">
          <Alert variant="destructive" className="max-w-2xl">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Loading Quiz Questions</AlertTitle>
            <AlertDescription className="mt-2">
              {questionsResult.error}
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      quizLevel={quizLevel}
      onQuizLevelChange={handleQuizLevelChange}
      canSwitchLevel={screen === 'start'}
      quizTitle={quizTitle}
      quizSubtitle={quizSubtitle}
    >
      {screen === 'start' && (
        <StartScreen
          totalQuestions={questionsResult.questions?.length || 0}
          onStart={handleStartQuiz}
          quizTitle={quizTitle}
          quizSubtitle={quizSubtitle}
        />
      )}
      {screen === 'question' && quizState && (
        <QuestionScreen
          key={quizState.questions[quizState.currentIndex].id}
          question={quizState.questions[quizState.currentIndex]}
          currentIndex={quizState.currentIndex}
          totalQuestions={quizState.questions.length}
          onAnswerSubmit={handleAnswerSubmit}
          onAdvance={handleAdvanceQuestion}
          onCancel={handleCancelQuiz}
          correctCount={committedCounts.correct}
          wrongCount={committedCounts.wrong}
        />
      )}
      {screen === 'results' && quizState && (
        <ResultsScreen
          quizState={quizState}
          onRestart={handleRestart}
          onViewReview={handleViewReview}
        />
      )}
      {screen === 'review' && quizState && (
        <ReviewScreen
          quizState={quizState}
          onBackToResults={handleBackToResults}
          onRestart={handleRestart}
        />
      )}
    </Layout>
  );
}

export default App;
