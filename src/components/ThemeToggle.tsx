
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-12 h-12 flex items-center justify-center
      backdrop-blur-xl 
      dark:bg-[#240046]/70 dark:hover:bg-[#240046]/90
      bg-white/30 hover:bg-white/50 transition-all duration-300
      border-2 dark:border-purple-500/30 border-purple-800/20 shadow-lg"
    >
      {theme === 'dark' ? 
        <Sun className="h-6 w-6 text-yellow-300 transform transition-transform duration-300" /> : 
        <Moon className="h-6 w-6 text-[#240046] transform transition-transform duration-300" />
      }
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
