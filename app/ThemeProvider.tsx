"use client";
import { useEffect } from "react";
import { useFormStore } from "../store/store";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDarkMode, toggleDarkMode } = useFormStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? "dark 🌙" : "light 🌞"}
      </button>
      <div className="min-h-screen bg-white text-black dark:bg-gray-900  dark:text-white transition-colors">
        <div className="container mx-auto px-4">{children}</div>
      </div>
    </>
  );
}
