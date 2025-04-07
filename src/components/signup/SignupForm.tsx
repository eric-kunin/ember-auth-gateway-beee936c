
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Mail, Lock } from "lucide-react";

interface SignupFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  agreeToTerms: boolean;
  setAgreeToTerms: (agree: boolean) => void;
  isLoading: boolean;
  handleSignup: (e: React.FormEvent) => void;
}

const SignupForm = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  agreeToTerms,
  setAgreeToTerms,
  isLoading,
  handleSignup
}: SignupFormProps) => {
  return (
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
  );
};

export default SignupForm;
