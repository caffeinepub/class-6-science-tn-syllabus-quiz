import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Shield, Info, Lock, Globe, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';

interface AuthenticationHelpScreenProps {
  onBack: () => void;
}

export default function AuthenticationHelpScreen({ onBack }: AuthenticationHelpScreenProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 rounded-2xl"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Login
        </Button>
        
        <div className="text-center space-y-4">
          <div className="mx-auto w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 flex items-center justify-center shadow-xl ring-4 ring-primary/20">
            <Info className="h-12 w-12 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-foreground mb-3 tracking-tight">
              Authentication Help
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Learn about the supported sign-in method for this application
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Supported Method */}
        <Card className="border-2 shadow-xl rounded-3xl bg-gradient-to-br from-card via-card to-primary/5">
          <CardHeader className="space-y-3 bg-gradient-to-br from-primary/10 to-transparent rounded-t-3xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-black">Internet Identity</CardTitle>
                <CardDescription className="text-base">Blockchain-based authentication</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <Alert className="rounded-2xl border-2 border-primary/20 bg-primary/5">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <AlertTitle className="text-lg font-bold">Supported Sign-In Method</AlertTitle>
              <AlertDescription className="text-base leading-relaxed mt-2">
                This application uses <strong>Internet Identity</strong> for secure, privacy-preserving authentication. 
                Internet Identity is built on the Internet Computer blockchain and provides cryptographic security 
                without requiring passwords or sharing personal information.
              </AlertDescription>
            </Alert>

            <div className="space-y-3 p-5 rounded-2xl bg-muted/30 border-2 border-border/40">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                How Internet Identity Works
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed ml-7">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span><strong>No passwords:</strong> Uses cryptographic keys stored securely on your device</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span><strong>Privacy-first:</strong> No personal data is collected or shared with third parties</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span><strong>Blockchain security:</strong> Your identity is protected by Internet Computer's cryptographic protocols</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span><strong>Multi-device:</strong> Add multiple authentication methods (fingerprint, Face ID, security key, etc.)</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Not Supported Methods */}
        <Card className="border-2 shadow-xl rounded-3xl">
          <CardHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <CardTitle className="text-2xl font-black">Not Supported</CardTitle>
                <CardDescription className="text-base">Third-party authentication providers</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <Alert variant="destructive" className="rounded-2xl border-2">
              <XCircle className="h-5 w-5" />
              <AlertTitle className="text-lg font-bold">Firebase-Based Login Not Available</AlertTitle>
              <AlertDescription className="text-base leading-relaxed mt-2">
                The following authentication methods are <strong>not supported</strong> in this build environment:
              </AlertDescription>
            </Alert>

            <div className="space-y-3 p-5 rounded-2xl bg-destructive/5 border-2 border-destructive/20">
              <h3 className="font-bold text-lg text-destructive">Unavailable Sign-In Options:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed ml-7">
                <li className="flex items-start gap-2">
                  <span className="text-destructive font-bold mt-0.5">✗</span>
                  <span><strong>Google Sign-In:</strong> OAuth-based Google account authentication</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive font-bold mt-0.5">✗</span>
                  <span><strong>Microsoft/Outlook Sign-In:</strong> OAuth-based Microsoft account authentication</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive font-bold mt-0.5">✗</span>
                  <span><strong>Phone Number OTP:</strong> SMS-based one-time password authentication</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive font-bold mt-0.5">✗</span>
                  <span><strong>Email/Password:</strong> Traditional username and password authentication</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-muted/30 border-2 border-border/40">
              <h3 className="font-bold text-base flex items-center gap-2 mb-2">
                <Globe className="h-5 w-5 text-primary" />
                Why These Options Are Not Available
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This application runs on the <strong>Internet Computer blockchain</strong>, which has a different 
                architecture than traditional cloud platforms. Third-party authentication providers like Firebase 
                require server-side integration and external API calls that are not compatible with the Internet 
                Computer's decentralized execution model. Internet Identity provides equivalent security and 
                convenience while maintaining full decentralization and privacy.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card className="border-2 shadow-xl rounded-3xl bg-gradient-to-br from-card to-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl font-black">Getting Started</CardTitle>
            <CardDescription className="text-base">Ready to sign in?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              To access the Science Quiz, click the <strong>"Sign In with Internet Identity"</strong> button 
              on the login screen. If you don't have an Internet Identity yet, you'll be guided through a 
              quick setup process to create one. The setup takes less than a minute and works on any device.
            </p>
            
            <Button
              size="lg"
              onClick={onBack}
              className="w-full text-lg h-14 font-black shadow-xl rounded-2xl hover:scale-[1.02] transition-transform"
            >
              <Shield className="mr-2 h-5 w-5" />
              Go to Login Screen
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
