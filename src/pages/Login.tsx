
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Facebook, Github, Lock, Mail } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { ThemeToggle } from "@/components/ThemeToggle";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Email and password are required",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // This is just a mockup without actual authentication
      // In a real implementation, you would connect to Supabase here
      setTimeout(() => {
        toast({
          title: "Success!",
          description: "You've successfully logged in.",
        });
        setIsLoading(false);
        navigate("/dashboard");
      }, 1500);
      
    } catch (error: any) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "An error occurred during login",
      });
    }
  };

  const handleOAuthLogin = (provider: string) => {
    setIsLoading(true);
    
    // This is just a mockup without actual OAuth authentication
    // In a real implementation, you would connect to Supabase or another auth provider here
    setTimeout(() => {
      toast({
        title: `${provider} Login`,
        description: `Logging in with ${provider}...`,
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden auth-gradient">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-[10%] w-64 h-64 rounded-full bg-theme-primary/20 blur-3xl"></div>
        <div className="absolute bottom-10 right-[10%] w-72 h-72 rounded-full bg-theme-medium/30 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-theme-lighter/20 blur-3xl"></div>
      </div>
      
      {/* Theme toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-md mx-4 z-10 shadow-xl bg-white/10 backdrop-blur-lg border border-white/20 dark:bg-black/20 dark:border-white/10">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <img 
              src="/lovable-uploads/101c11e0-73f1-4140-b100-53896f884b88.png" 
              alt="AkhlaDate Logo" 
              className="h-28 w-28 object-contain drop-shadow-lg animate-pulse"
            />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-white">Welcome Back</CardTitle>
          <CardDescription className="text-theme-lightest dark:text-theme-lighter">
            Sign in to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-theme-lightest dark:text-theme-lightest" htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-theme-lightest/60" />
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-theme-medium focus:border-theme-medium pl-10 dark:bg-black/30"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-theme-lightest dark:text-theme-lightest" htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-theme-lightest hover:text-white transition-colors dark:text-theme-lighter">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-theme-lightest/60" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-theme-medium focus:border-theme-medium pl-10 dark:bg-black/30"
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-xs font-medium"
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                  className="data-[state=checked]:bg-theme-medium"
                />
                <Label htmlFor="remember-me" className="text-sm text-theme-lightest dark:text-theme-lighter">
                  Remember me for 30 days
                </Label>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-theme-medium hover:bg-theme-primary transition-all duration-300 transform hover:translate-y-[-2px]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-white/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-theme-lightest bg-theme-dark/50 backdrop-blur-sm dark:bg-theme-dark/80">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white transition-all duration-300 transform hover:translate-y-[-2px] dark:bg-black/30 dark:hover:bg-black/40"
              type="button"
              onClick={() => handleOAuthLogin("Facebook")}
              disabled={isLoading}
            >
              <Facebook className="h-5 w-5 text-blue-500" />
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white transition-all duration-300 transform hover:translate-y-[-2px] dark:bg-black/30 dark:hover:bg-black/40"
              type="button"
              onClick={() => handleOAuthLogin("Google")}
              disabled={isLoading}
            >
              <div className="flex items-center justify-center h-5 w-5 bg-white rounded-full overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              </div>
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white transition-all duration-300 transform hover:translate-y-[-2px] dark:bg-black/30 dark:hover:bg-black/40"
              type="button"
              onClick={() => handleOAuthLogin("GitHub")}
              disabled={isLoading}
            >
              <Github className="h-5 w-5 text-white" />
            </Button>
          </div>

          <div className="text-center text-xs">
            <div className="flex flex-wrap items-center justify-center gap-1 py-2 px-3 rounded-md bg-white/5 backdrop-blur-sm">
              <AlertCircle className="h-3 w-3 text-theme-lightest/70" /> 
              <span className="text-theme-lightest dark:text-theme-lighter">
                Protected by reCAPTCHA and subject to the 
                <a href="#" className="privacy-link mx-1 underline">Privacy Policy</a> 
                and 
                <a href="#" className="privacy-link mx-1 underline">Terms of Service</a>
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t border-white/10 bg-white/5 rounded-b-lg pt-6 dark:bg-black/20">
          <div className="text-center text-sm text-theme-lightest dark:text-theme-lighter">
            Don't have an account?{" "}
            <a href="/signup" className="underline text-white hover:text-theme-light transition-colors font-medium">
              Sign up
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
