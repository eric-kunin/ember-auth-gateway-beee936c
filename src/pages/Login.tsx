
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Mail, AlertCircle } from "lucide-react";
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
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-theme-dark via-theme-purple to-theme-main dark:from-[#0B0205] dark:via-[#1A1025] dark:to-[#2C1B47]">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-[10%] w-64 h-64 rounded-full bg-theme-accent/20 blur-3xl"></div>
        <div className="absolute bottom-10 right-[10%] w-72 h-72 rounded-full bg-theme-main/30 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-theme-light/20 blur-3xl"></div>
      </div>
      
      {/* Theme toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-md mx-4 z-10 shadow-xl bg-white/10 backdrop-blur-lg border border-white/20 dark:bg-black/20 dark:border-white/10">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-theme-accent/20">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-theme-accent to-theme-main animate-pulse"></div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-white">Welcome Back</CardTitle>
          <CardDescription className="text-theme-light dark:text-gray-300">
            Sign in to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-theme-light dark:text-gray-200" htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-theme-accent focus:border-theme-accent dark:bg-black/30"
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-theme-light dark:text-gray-200" htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-theme-light hover:text-white transition-colors dark:text-gray-300">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-theme-accent focus:border-theme-accent dark:bg-black/30"
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-xs"
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
                  className="data-[state=checked]:bg-theme-accent"
                />
                <Label htmlFor="remember-me" className="text-sm text-theme-light dark:text-gray-300">
                  Remember me for 30 days
                </Label>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-theme-accent hover:bg-theme-accent/90 transition-all duration-300 transform hover:translate-y-[-2px]"
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
              <span className="bg-background px-2 text-theme-light bg-theme-purple/50 backdrop-blur-sm dark:bg-[#1A1025]/80">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white transition-all duration-300 transform hover:translate-y-[-2px] dark:bg-black/30 dark:hover:bg-black/40"
              type="button"
              onClick={() => handleOAuthLogin("GitHub")}
              disabled={isLoading}
            >
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white transition-all duration-300 transform hover:translate-y-[-2px] dark:bg-black/30 dark:hover:bg-black/40"
              type="button"
              onClick={() => handleOAuthLogin("Google")}
              disabled={isLoading}
            >
              <Mail className="mr-2 h-4 w-4" /> Google
            </Button>
          </div>

          <div className="text-center text-xs text-theme-light dark:text-gray-300">
            <span className="flex items-center gap-1 justify-center">
              <AlertCircle className="h-3 w-3" /> Protected by reCAPTCHA and subject to the Privacy Policy and Terms of Service
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t border-white/10 bg-white/5 rounded-b-lg pt-6 dark:bg-black/20">
          <div className="text-center text-sm text-theme-light dark:text-gray-300">
            Don't have an account?{" "}
            <a href="/signup" className="underline text-white hover:text-theme-light transition-colors">
              Sign up
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
