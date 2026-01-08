import React from 'react';
import svgCloud from '../../imports/svg-cloud';

interface CloudIconProps {
  stroke?: string;
  disabled?: boolean;
  size?: number;
  className?: string;
}

export function CloudIcon({ stroke = "currentColor", disabled = false, size = 24, className = "" }: CloudIconProps) {
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
          d={svgCloud.cloud} 
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

