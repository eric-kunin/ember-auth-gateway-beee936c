
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
      backdrop-blur-md 
      dark:bg-[#240046]/30 dark:hover:bg-[#240046]/50
      bg-white/10 hover:bg-white/20 transition-all duration-300
      border border-white/5"
    >
      {theme === 'dark' ? 
        <Sun className="h-[18px] w-[18px] text-white" /> : 
        <Moon className="h-[18px] w-[18px] text-custom-medium" />
      }
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
