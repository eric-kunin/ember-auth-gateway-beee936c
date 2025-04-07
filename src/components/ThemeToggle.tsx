
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
      backdrop-blur-xl 
      dark:bg-[#240046]/40 dark:hover:bg-[#240046]/60
      bg-white/20 hover:bg-white/30 transition-all duration-300
      border border-white/10 shadow-lg"
    >
      {theme === 'dark' ? 
        <Sun className="h-[20px] w-[20px] text-white" /> : 
        <Moon className="h-[20px] w-[20px] text-[#240046]" />
      }
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
