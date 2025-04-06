
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
      className="rounded-full backdrop-blur-lg hover:bg-white/20 text-white
      dark:bg-theme-darker/40 dark:hover:bg-theme-darker/60
      bg-theme-primary/30 hover:bg-theme-primary/40 transition-all duration-300
      shadow-lg border border-white/10"
    >
      {theme === 'dark' ? 
        <Sun className="h-5 w-5 text-theme-lightest animate-pulse" /> : 
        <Moon className="h-5 w-5 text-white" />
      }
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
