import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { LogIn, LogOut, User, Sparkles } from 'lucide-react';
import BackgroundMusicControls from './BackgroundMusicControls';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import QuizLevelTabs from './QuizLevelTabs';

interface LayoutProps {
  children: ReactNode;
  quizLevel: 'class6' | 'class7' | 'class8' | 'class9' | 'class10';
  onQuizLevelChange: (level: 'class6' | 'class7' | 'class8' | 'class9' | 'class10') => void;
  canSwitchLevel: boolean;
  quizTitle: string;
  quizSubtitle: string;
}

export default function Layout({ 
  children, 
  quizLevel, 
  onQuizLevelChange, 
  canSwitchLevel,
  quizTitle,
  quizSubtitle
}: LayoutProps) {
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const music = useBackgroundMusic('/assets/audio/quiz-bgm.mp3');
  
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'science-quiz-app'
  );

  const isAuthenticated = !!identity;
  const principalText = identity?.getPrincipal().toString();
  const truncatedPrincipal = principalText
    ? `${principalText.slice(0, 8)}...${principalText.slice(-6)}`
    : '';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-accent/5 to-primary/10">
      <header className="border-b-2 border-border/40 bg-card/90 backdrop-blur-xl sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src="/assets/generated/science-quiz-logo.dim_256x256.png" 
                alt="Science Quiz Logo" 
                className="h-14 w-14 object-contain rounded-2xl shadow-lg ring-2 ring-primary/20"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
                {quizTitle}
                <Sparkles className="h-5 w-5 text-primary" />
              </h1>
              <p className="text-xs text-muted-foreground font-semibold">{quizSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {music.isUnlocked && (
              <BackgroundMusicControls
                isMuted={music.isMuted}
                volume={music.volume}
                onToggleMute={music.toggleMute}
                onVolumeChange={music.setVolume}
              />
            )}
            
            {isAuthenticated ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20 shadow-md">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm font-mono text-foreground font-semibold">
                    {truncatedPrincipal}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clear}
                  className="gap-2 font-semibold rounded-2xl border-2 hover:scale-105 transition-transform"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={login}
                disabled={isLoggingIn}
                className="gap-2 font-semibold rounded-2xl shadow-lg hover:scale-105 transition-transform"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            )}
          </div>
        </div>
        
        {/* Quiz Level Tabs - shown below header */}
        <div className="container mx-auto px-4 pb-4">
          <QuizLevelTabs
            value={quizLevel}
            onChange={onQuizLevelChange}
            disabled={!canSwitchLevel}
          />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t-2 border-border/40 bg-gradient-to-r from-card/80 via-card/90 to-card/80 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 py-6 text-center space-y-2">
          <p className="text-sm text-muted-foreground font-medium">
            © {currentYear} {quizTitle}. Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-bold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-muted-foreground/80">
            Designed by Modi Mohammed Shafeeq
          </p>
        </div>
      </footer>
    </div>
  );
}
