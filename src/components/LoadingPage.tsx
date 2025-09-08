import React from 'react';

interface LoadingPageProps {
  message?: string;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({ 
  message = "Loading..." 
}) => {
  return (
    <div className="min-h-screen bg-[#FFF5EE] flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <div className="relative flex items-center justify-center w-64 h-64">
          <img 
            src="/chakra.png" 
            alt="Spinning Chakra" 
            className="absolute inset-0 w-full h-full animate-spin-slow"
          />
          <img 
            src="/ganpati.png" 
            alt="Ganpati Bappa" 
            className="absolute inset-0 w-48 h-48 m-auto animate-zoom-in-out"
          />
        </div>
        
        {/* Loading text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-primary-foreground">
            Ganpati Bappa Morya
          </h2>
          <p className="text-muted-foreground animate-pulse">
            {message}
          </p>
        </div>
        
        {/* Decorative dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.1s]"></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></div>
        </div>
      </div>
    </div>
  );
};