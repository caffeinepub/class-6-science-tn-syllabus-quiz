import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Shield, AlertCircle, Loader2, Lock, Sparkles } from 'lucide-react';

export default function LoginRequiredScreen() {
  const { login, isLoggingIn, isLoginError } = useInternetIdentity();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="mx-auto w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 flex items-center justify-center shadow-2xl ring-4 ring-primary/20 animate-pulse">
          <Shield className="h-16 w-16 text-primary" />
        </div>
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-foreground mb-4 tracking-tight flex items-center justify-center gap-3 flex-wrap">
            Secure Sign In Required
            <Sparkles className="h-8 w-8 text-primary" />
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            Access the Science Quiz with your secure Internet Identity. Your progress and results are protected with blockchain-level security. 🔐
          </p>
        </div>
      </div>

      {/* Login Card */}
      <Card className="border-2 shadow-2xl max-w-lg mx-auto rounded-3xl bg-gradient-to-br from-card via-card to-primary/5 overflow-hidden">
        <CardHeader className="space-y-3 text-center pb-6 bg-gradient-to-br from-primary/10 to-transparent">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl md:text-4xl font-black">Internet Identity</CardTitle>
          <CardDescription className="text-base md:text-lg font-medium">
            Sign in securely to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {isLoginError && (
            <Alert variant="destructive" className="rounded-2xl border-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="font-semibold">
                Authentication failed. Please try again.
              </AlertDescription>
            </Alert>
          )}

          <Button
            size="lg"
            className="w-full text-lg md:text-xl h-16 md:h-20 font-black shadow-2xl rounded-2xl hover:scale-[1.02] transition-transform"
            onClick={login}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Shield className="mr-3 h-6 w-6" />
                Sign In with Internet Identity
              </>
            )}
          </Button>

          {/* Info Section */}
          <div className="mt-6 p-5 rounded-2xl bg-muted/30 border-2 border-border/40">
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              <strong className="text-foreground font-bold">Blockchain Security:</strong> Internet Identity is a secure, 
              privacy-preserving authentication system built on the Internet Computer blockchain. Your identity 
              is cryptographically protected and never shared with third parties. No passwords, no tracking, 
              just secure access. ✨
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
