
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AlertCircle, Mail, Lock, Github, Facebook } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
    setTimeout(() => {
      toast({
        title: `${provider} Login`,
        description: `Logging in with ${provider}...`,
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0B0205]">
      {/* Theme toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-10 left-[10%] w-64 h-64 rounded-full bg-[#240046]/20 blur-3xl"></div>
        <div className="absolute bottom-10 right-[10%] w-72 h-72 rounded-full bg-[#2C1B47]/30 blur-3xl"></div>
      </div>
      
      {/* Login card */}
      <div className="relative z-10 w-full max-w-md p-8 mx-4 rounded-2xl bg-[#10002B]/95 shadow-xl border-0">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Welcome Back</h1>
          <p className="text-custom-lighter">Sign in to access your account</p>
        </div>
        
        <form onSubmit={handleEmailLogin} className="space-y-5">
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
            <div className="flex justify-between items-center">
              <Label className="text-white text-sm" htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-custom-lighter hover:text-white transition-colors">
                Forgot password?
              </a>
            </div>
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
          
          <div className="flex items-center space-x-2">
            <Switch
              id="remember-me"
              checked={rememberMe}
              onCheckedChange={setRememberMe}
              className="data-[state=checked]:bg-[#9D4EDD]"
            />
            <Label htmlFor="remember-me" className="text-sm text-custom-lighter">
              Remember me for 30 days
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
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign In"
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
            className="bg-[#240046]/80 hover:bg-[#240046] border-0 text-white h-12"
            type="button"
            onClick={() => handleOAuthLogin("GitHub")}
            disabled={isLoading}
          >
            <Github className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="bg-[#240046]/80 hover:bg-[#240046] border-0 text-white h-12"
            type="button"
            onClick={() => handleOAuthLogin("Google")}
            disabled={isLoading}
          >
            <div className="flex items-center justify-center h-5 w-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </div>
          </Button>
          <Button
            variant="outline"
            className="bg-[#240046]/80 hover:bg-[#240046] border-0 text-white h-12"
            type="button"
            onClick={() => handleOAuthLogin("Facebook")}
            disabled={isLoading}
          >
            <Facebook className="h-5 w-5 text-[#1877F2]" />
          </Button>
        </div>

        <div className="text-center text-xs mb-6">
          <div className="flex items-center justify-center gap-1 py-2 px-3 rounded-md bg-[#240046]/30">
            <AlertCircle className="h-3 w-3 text-custom-lighter/70" /> 
            <span className="text-custom-lighter">
              Protected by reCAPTCHA and subject to the{" "}
              <a href="#" className="underline text-custom-lighter hover:text-white">Privacy Policy</a> 
              {" "}and{" "}
              <a href="#" className="underline text-custom-lighter hover:text-white">Terms of Service</a>
            </span>
          </div>
        </div>
        
        <div className="text-center text-sm text-custom-light">
          Don't have an account?{" "}
          <a href="/signup" className="text-white hover:text-custom-lighter transition-colors font-medium">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
