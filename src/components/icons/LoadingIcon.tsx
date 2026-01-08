import React from 'react';
import svgLoading from '../../imports/svg-loading-icon';

interface LoadingIconProps {
  stroke?: string;
  size?: number;
  className?: string;
}

export function LoadingIcon({ stroke = "currentColor", size = 24, className = "" }: LoadingIconProps) {
  return (
    <div 
      className={`overflow-clip relative shrink-0 ${className}`} 
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <svg 
        className="block max-w-none w-full h-full animate-loading-spin" 
        fill="none" 
        viewBox="0 0 24 24"
        style={{ 
          color: stroke
        }}
      >
        <path 
          d={svgLoading.loading} 
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

