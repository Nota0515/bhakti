import React from 'react';

interface GanpatiBappaProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const GanpatiBappa: React.FC<GanpatiBappaProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} text-primary animate-glow-pulse`}>
      {/* Ganpati Bappa micro-logo */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-full h-full drop-shadow-sm"
      >
        <path d="M12 2c1.1 0 2 .9 2 2 0 .74-.4 1.38-1 1.73v.77c0 .55-.45 1-1 1s-1-.45-1-1v-.77c-.6-.35-1-.99-1-1.73 0-1.1.9-2 2-2zm0 3c.28 0 .5-.22.5-.5S12.28 4 12 4s-.5.22-.5.5.22.5.5.5zM12 7c3.31 0 6 2.69 6 6v1c0 1.1-.9 2-2 2h-1v1c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2v-1H8c-1.1 0-2-.9-2-2v-1c0-3.31 2.69-6 6-6zm0 2c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4zm-1 6v1h2v-1h-2z"/>
        {/* Decorative elements */}
        <circle cx="8" cy="11" r="1" opacity="0.6" />
        <circle cx="16" cy="11" r="1" opacity="0.6" />
        <path d="M12 16c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" opacity="0.8" />
      </svg>
    </div>
  );
};