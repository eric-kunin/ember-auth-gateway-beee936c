
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Mail, Lock } from "lucide-react";

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;
  isLoading: boolean;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  handleEmailLogin: (e: React.FormEvent) => void;
}

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  isLoading,
  showPassword,
  setShowPassword,
  handleEmailLogin
}: LoginFormProps) => {
  return (
    <form onSubmit={handleEmailLogin} className="space-y-5">
      <div className="space-y-2">
        <Label className="text-[#240046] dark:text-white text-sm transition-colors duration-300" htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                     text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                     pl-10 h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]"
            disabled={isLoading}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-[#240046] dark:text-white text-sm transition-colors duration-300" htmlFor="password">Password</Label>
          <a href="#" className="text-xs text-[#9D4EDD] dark:text-custom-lighter hover:text-[#7B2CBF] dark:hover:text-white transition-colors">
            Forgot password?
          </a>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="password123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                     text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                     pl-10 h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]"
            disabled={isLoading}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9D4EDD] dark:text-[#9D4EDD] hover:text-[#7B2CBF] dark:hover:text-[#C77DFF] text-xs font-medium transition-colors duration-300"
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
        <Label htmlFor="remember-me" className="text-sm text-[#3B185F] dark:text-custom-lighter transition-colors duration-300">
          Remember me for 30 days
        </Label>
      </div>
      
      <Button
        type="submit"
        className="w-full bg-[#9D4EDD] hover:bg-[#7B2CBF] text-white border-0 h-12 transition-all duration-300"
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
  );
};

export default LoginForm;
