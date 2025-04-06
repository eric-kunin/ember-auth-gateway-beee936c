
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
      className="rounded-full w-10 h-10 flex items-center justify-center
      backdrop-blur-md hover:bg-white/10
      dark:bg-[#240046]/30 dark:hover:bg-[#240046]/50
      bg-custom-primary/20 hover:bg-custom-primary/30 transition-all duration-300
      border border-white/10"
    >
      {theme === 'dark' ? 
        <Sun className="h-5 w-5 text-white" /> : 
        <Moon className="h-5 w-5 text-custom-medium" />
      }
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
