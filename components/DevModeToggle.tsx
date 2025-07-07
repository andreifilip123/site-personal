"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DevModeToggleProps {
  onToggle: (devMode: boolean) => void;
}

export default function DevModeToggle({ onToggle }: DevModeToggleProps) {
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDevMode = localStorage.getItem("dev-mode");
      const isDevMode = savedDevMode === "true";
      setDevMode(isDevMode);
      onToggle(isDevMode);
    }
  }, [onToggle]);

  const toggleDevMode = () => {
    const newDevMode = !devMode;
    setDevMode(newDevMode);
    onToggle(newDevMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("dev-mode", newDevMode.toString());
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        type="button"
        onClick={toggleDevMode}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
          "backdrop-blur-sm border shadow-lg",
          devMode 
            ? "bg-green-500/90 border-green-400/30 text-white hover:bg-green-500" 
            : "bg-gray-800/90 border-gray-700/30 text-gray-300 hover:bg-gray-800"
        )}
      >
        <div className={cn(
          "w-2 h-2 rounded-full transition-colors duration-200",
          devMode ? "bg-green-200" : "bg-gray-500"
        )} />
        {devMode ? "Dev Mode ON" : "Toggle Dev Mode"}
      </button>
    </div>
  );
}