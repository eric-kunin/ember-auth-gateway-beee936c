
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import BackgroundElements from "@/components/login/BackgroundElements";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Mail, Lock } from "lucide-react";

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "All fields are required",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }

    if (!agreeToTerms) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must agree to the Terms of Service",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // This is just a mockup without actual signup
      setTimeout(() => {
        toast({
          title: "Account Created!",
          description: "Your account has been successfully created.",
        });
        setIsLoading(false);
        navigate("/login");
      }, 1500);
      
    } catch (error: any) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message || "An error occurred during signup",
      });
    }
  };

  const handleOAuthSignup = (provider: string) => {
    setIsLoading(true);
    
    // This is just a mockup without actual OAuth signup
    setTimeout(() => {
      toast({
        title: `${provider} Signup`,
        description: `Signing up with ${provider}...`,
      });
      setIsLoading(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0B0205]">
      {/* Theme toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Background elements */}
      <BackgroundElements />
      
      {/* App Logo Header */}
      <div className="relative z-10 mb-6">
        <div className="flex flex-col items-center">
          <img 
            src="/lovable-uploads/ce632b31-2764-479a-b377-2e93484bb8f1.png" 
            alt="AkhlaDate Logo" 
            className="h-20 w-20 object-contain drop-shadow-lg"
          />
        </div>
      </div>
      
      {/* Signup card */}
      <div className="relative z-10 w-full max-w-md p-8 mx-4 rounded-2xl bg-[#10002B]/95 shadow-xl border-0">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Create an Account</h1>
          <p className="text-custom-lighter">Sign up to get started</p>
        </div>
        
        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-2">
            <Label className="text-white text-sm" htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-custom-lighter/70" />
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#240046]/80 border-0 text-white placeholder:text-white/60 pl-10 h-12 py-2"
                disabled={isLoading}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-white text-sm" htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-custom-lighter/70" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#240046]/80 border-0 text-white placeholder:text-white/60 pl-10 h-12 py-2"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-xs font-medium"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-white text-sm" htmlFor="confirm-password">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-custom-lighter/70" />
              <Input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-[#240046]/80 border-0 text-white placeholder:text-white/60 pl-10 h-12 py-2"
                disabled={isLoading}
                required
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="terms"
              checked={agreeToTerms}
              onCheckedChange={setAgreeToTerms}
              className="data-[state=checked]:bg-[#9D4EDD]"
            />
            <Label htmlFor="terms" className="text-sm text-custom-lighter">
              I agree to the Terms of Service and Privacy Policy
            </Label>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-[#9D4EDD] hover:bg-[#9D4EDD]/90 text-white border-0 h-12"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
                <span>Creating Account...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full bg-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#10002B] px-2 text-custom-lighter">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <Button
            variant="outline"
            className="bg-[#240046]/40 hover:bg-[#240046]/60 border-[#9D4EDD]/20 text-white"
            type="button"
            onClick={() => handleOAuthSignup("GitHub")}
            disabled={isLoading}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.683-.217.683-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.607 9.607 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.291 2.747-1.022 2.747-1.022.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </Button>
          <Button
            variant="outline"
            className="bg-[#240046]/40 hover:bg-[#240046]/60 border-[#9D4EDD]/20 text-white"
            type="button"
            onClick={() => handleOAuthSignup("Google")}
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          </Button>
          <Button
            variant="outline"
            className="bg-[#240046]/40 hover:bg-[#240046]/60 border-[#9D4EDD]/20 text-white"
            type="button"
            onClick={() => handleOAuthSignup("Facebook")}
            disabled={isLoading}
          >
            <svg fill="#1877F2" className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </Button>
        </div>
        
        <div className="text-center text-sm text-custom-light">
          Already have an account?{" "}
          <a href="/login" className="text-white hover:text-custom-lighter transition-colors font-medium">
            Sign in
          </a>
        </div>
        
        <div className="text-center text-xs text-custom-light mt-4">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
};

export default Signup;
