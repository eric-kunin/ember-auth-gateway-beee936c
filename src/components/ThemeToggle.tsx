
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [animateIcon, setAnimateIcon] = useState(false);
  const [mounted, setMounted] = useState(false);

  // This ensures hydration matching
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setAnimateIcon(true);
    toggleTheme();
    
    setTimeout(() => {
      setAnimateIcon(false);
    }, 1000);
  };

  // Prevent rendering until after client-side hydration
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="rounded-full w-12 h-12 flex items-center justify-center
        backdrop-blur-xl 
        dark:bg-[#240046]/70 dark:hover:bg-[#240046]/90
        bg-white/60 hover:bg-white/80 transition-all duration-300
        border-2 dark:border-purple-500/30 border-purple-500/20 
        shadow-lg hover:shadow-purple-500/20
        z-50 cursor-pointer"
    >
      {theme === 'dark' ? 
        <Sun className={`h-6 w-6 text-yellow-300 ${animateIcon ? 'animate-sun' : ''} transition-colors duration-300 pointer-events-none`} /> : 
        <Moon className={`h-6 w-6 text-[#240046] ${animateIcon ? 'animate-moon' : ''} transition-colors duration-300 pointer-events-none`} />
      }
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
