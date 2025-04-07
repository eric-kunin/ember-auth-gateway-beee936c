
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Apply theme class to document element when component mounts and when theme changes
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

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
        <Sun className="h-[18px] w-[18px] text-white animate-pulse" /> : 
        <Moon className="h-[18px] w-[18px] text-custom-medium animate-pulse" />
      }
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
