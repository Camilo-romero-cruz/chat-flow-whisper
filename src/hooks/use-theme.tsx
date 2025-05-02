
import { useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Try to get theme from localStorage
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme && (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system")) {
      return storedTheme;
    }
    // If no theme in localStorage, use system preference
    return "system";
  });

  // Update body class and localStorage when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove old theme classes
    root.classList.remove("light", "dark");

    // Determine if should use dark mode
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = theme === "dark" || (theme === "system" && systemDark);

    // Apply the theme
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.add("light");
    }

    // Store theme preference
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
