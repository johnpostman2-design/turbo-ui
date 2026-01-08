import React from 'react';
import svgPaths from "../../imports/svg-6vv2tfv4q9";

interface ChartIconProps {
  stroke?: string;
  disabled?: boolean;
  size?: number;
  className?: string;
}

export function ChartIcon({ stroke = "currentColor", disabled = false, size = 24, className = "" }: ChartIconProps) {
  return (
    <div 
      className={`overflow-clip relative shrink-0 ${className}`} 
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <svg 
        className="block max-w-none w-full h-full" 
        fill="none" 
        viewBox="0 0 24 24"
        style={{ 
          color: stroke,
          opacity: disabled ? 0.08 : 1
        }}
      >
        <path 
          d={svgPaths.chart} 
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

