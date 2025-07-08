"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  showTooltip?: boolean;
}

export default function Tooltip({
  children,
  content,
  position = "top-right",
  showTooltip = true,
}: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false);

  const positionClasses = {
    "top-right": "top-2 right-2",
    "top-left": "top-2 left-2",
    "bottom-right": "bottom-2 right-2",
    "bottom-left": "bottom-2 left-2",
  };

  const tooltipPositionClasses = {
    "top-right": "top-8 right-0",
    "top-left": "top-8 left-0",
    "bottom-right": "bottom-8 right-0",
    "bottom-left": "bottom-8 left-0",
  };

  return (
    <div className="relative">
      {children}
      <div
        role="tooltip"
        className={cn(
          "absolute z-50 cursor-help",
          positionClasses[position],
          showTooltip ? "block" : "hidden",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Tooltip trigger circle */}
        <div
          className={cn(
            "h-4 w-4 rounded-full bg-gray-200/60 backdrop-blur-sm transition-all duration-200",
            isHovered && "scale-105 bg-gray-200/80",
          )}
        />

        {/* Tooltip content */}
        {isHovered && (
          <div
            className={cn(
              "absolute z-50 w-64 rounded-lg border border-gray-700/50 bg-gray-900/95 p-3 text-sm text-white shadow-lg backdrop-blur-sm",
              "fade-in-0 zoom-in-95 animate-in duration-200",
              tooltipPositionClasses[position],
            )}
          >
            <div className="relative">
              {content}
              <div
                className={cn(
                  "absolute h-2 w-2 rotate-45 bg-gray-900/95",
                  position.includes("top") ? "-bottom-1" : "-top-1",
                  position.includes("right") ? "right-4" : "left-4",
                )}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
