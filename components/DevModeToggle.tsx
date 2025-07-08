"use client";

import useDevMode from "@/hooks/useDevMode";
import { cn } from "@/lib/utils";

export default function DevModeToggle() {
  const { devMode, toggleDevMode } = useDevMode();

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <button
        type="button"
        onClick={toggleDevMode}
        className={cn(
          "flex items-center gap-2 rounded-full px-4 py-2 font-medium text-sm transition-all duration-200",
          "border shadow-lg backdrop-blur-sm",
          devMode
            ? "border-green-400/30 bg-green-500/90 text-white hover:bg-green-500"
            : "border-gray-700/30 bg-gray-800/90 text-gray-300 hover:bg-gray-800",
        )}
      >
        <div
          className={cn(
            "h-2 w-2 rounded-full transition-colors duration-200",
            devMode ? "bg-green-200" : "bg-gray-500",
          )}
        />
        {devMode ? "Dev Mode ON" : "Toggle Dev Mode"}
      </button>
    </div>
  );
}
