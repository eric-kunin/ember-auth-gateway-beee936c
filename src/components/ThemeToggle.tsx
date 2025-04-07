
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [animateIcon, setAnimateIcon] = useState(false);

  const handleToggle = () => {
    setAnimateIcon(true);
    toggleTheme();
    
    // Reset animation after it completes
    setTimeout(() => {
      setAnimateIcon(false);
    }, 1000);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="rounded-full w-12 h-12 flex items-center justify-center
      backdrop-blur-xl 
      dark:bg-[#240046]/70 dark:hover:bg-[#240046]/90
      bg-white/60 hover:bg-white/80 transition-all duration-300
      border-2 dark:border-purple-500/30 border-purple-500/20 shadow-lg"
    >
      {theme === 'dark' ? 
        <Sun className={`h-6 w-6 text-yellow-300 ${animateIcon ? 'animate-sun' : ''} transition-colors duration-300`} /> : 
        <Moon className={`h-6 w-6 text-[#240046] ${animateIcon ? 'animate-moon' : ''} transition-colors duration-300`} />
      }
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
