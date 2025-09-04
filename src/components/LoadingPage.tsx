import React from 'react';
import ganpatiBappaImage from '@/assets/ganpati-bappa.png';

interface LoadingPageProps {
  message?: string;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({ 
  message = "Loading..." 
}) => {
  return (
    <div className="min-h-screen bg-gradient-divine flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        {/* Spinning Chakra with Glow */}
        <div className="relative flex items-center justify-center">
          {/* Outer glow ring */}
          <div className="absolute w-32 h-32 rounded-full bg-primary/10 animate-spin blur-sm"></div>
          
          {/* Main chakra */}
          <div className="relative w-24 h-24 rounded-full border-4 border-primary/30 animate-spin">
            {/* Chakra spokes */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center rotate-45">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center rotate-90">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center -rotate-45">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
            
            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-primary shadow-glow animate-glow-pulse"></div>
            </div>
          </div>
          
          {/* Ganpati Bappa Image on top */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={ganpatiBappaImage} 
              alt="Ganpati Bappa" 
              className="w-16 h-16 object-contain animate-float filter drop-shadow-lg"
            />
          </div>
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