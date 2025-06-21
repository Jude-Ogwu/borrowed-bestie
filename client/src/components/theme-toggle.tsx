import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 dark:bg-slate-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Toggle theme"
    >
      <span
        className={`${
          theme === "dark" ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white dark:bg-slate-200 transition-all duration-300 ease-in-out shadow-lg flex items-center justify-center`}
      >
        <Sun className={`h-2.5 w-2.5 text-amber-500 transition-all duration-300 ${theme === "dark" ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`} />
        <Moon className={`absolute h-2.5 w-2.5 text-slate-700 transition-all duration-300 ${theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`} />
      </span>
    </button>
  );
}