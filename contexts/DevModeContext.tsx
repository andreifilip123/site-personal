"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface DevModeContextType {
  devMode: boolean;
  toggleDevMode: () => void;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export function DevModeProvider({ children }: { children: ReactNode }) {
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    // Load initial state from localStorage
    if (typeof window !== "undefined") {
      const savedDevMode = localStorage.getItem("dev-mode");
      setDevMode(savedDevMode === "true");
    }
  }, []);

  const toggleDevMode = () => {
    const newDevMode = !devMode;
    setDevMode(newDevMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("dev-mode", newDevMode.toString());
    }
  };

  return (
    <DevModeContext.Provider value={{ devMode, toggleDevMode }}>
      {children}
    </DevModeContext.Provider>
  );
}

export function useDevMode() {
  const context = useContext(DevModeContext);
  if (context === undefined) {
    throw new Error("useDevMode must be used within a DevModeProvider");
  }
  return context;
}
