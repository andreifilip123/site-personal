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
  showTooltip = true 
}: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!showTooltip) {
    return <>{children}</>;
  }

  const positionClasses = {
    "top-right": "top-2 right-2",
    "top-left": "top-2 left-2", 
    "bottom-right": "bottom-2 right-2",
    "bottom-left": "bottom-2 left-2"
  };

  const tooltipPositionClasses = {
    "top-right": "top-8 right-0",
    "top-left": "top-8 left-0",
    "bottom-right": "bottom-8 right-0", 
    "bottom-left": "bottom-8 left-0"
  };

  return (
    <div className="relative">
      {children}
      <div 
        className={cn(
          "absolute z-50 cursor-help",
          positionClasses[position]
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Tooltip trigger circle */}
        <div className={cn(
          "w-6 h-6 rounded-full bg-blue-500/60 backdrop-blur-sm border border-blue-300/30 transition-all duration-200",
          "flex items-center justify-center text-white text-xs font-bold",
          isHovered && "scale-110 bg-blue-500/80"
        )}>
          ?
        </div>
        
        {/* Tooltip content */}
        {isHovered && (
          <div className={cn(
            "absolute z-50 w-64 p-3 bg-gray-900/95 backdrop-blur-sm text-white text-sm rounded-lg shadow-lg border border-gray-700/50",
            "animate-in fade-in-0 zoom-in-95 duration-200",
            tooltipPositionClasses[position]
          )}>
            <div className="relative">
              {content}
              <div className={cn(
                "absolute w-2 h-2 bg-gray-900/95 rotate-45",
                position.includes("top") ? "-bottom-1" : "-top-1",
                position.includes("right") ? "right-4" : "left-4"
              )} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}