"use client";

import { useEffect, useState } from "react";

export default function useDevMode() {
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    const updateDevMode = () => {
      if (typeof window !== "undefined") {
        const savedDevMode = localStorage.getItem("dev-mode");
        setDevMode(savedDevMode === "true");
      }
    };

    // Initial load
    updateDevMode();

    // Listen for storage changes (cross-tab sync)
    window.addEventListener("storage", updateDevMode);
    
    // Listen for custom dev mode change event
    window.addEventListener("devModeChanged", updateDevMode);

    return () => {
      window.removeEventListener("storage", updateDevMode);
      window.removeEventListener("devModeChanged", updateDevMode);
    };
  }, []);

  const toggleDevMode = () => {
    const newDevMode = !devMode;
    setDevMode(newDevMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("dev-mode", newDevMode.toString());
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event("devModeChanged"));
    }
  };

  return { devMode, toggleDevMode };
}
