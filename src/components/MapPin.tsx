import React from 'react';
import { MapPin as MapPinIcon } from 'lucide-react';
import { GanpatiBappa } from './GanpatiBappa';

interface MapPinProps {
  verified?: boolean;
  onClick?: () => void;
  className?: string;
  animate?: boolean;
}

export const MapPin: React.FC<MapPinProps> = ({ 
  verified = false, 
  onClick, 
  className = '', 
  animate = false 
}) => {
  return (
    <div 
      className={`
        relative cursor-pointer transform transition-all duration-300 hover:scale-110 
        ${animate ? 'animate-pin-drop' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {/* Diya-style pin */}
      <div className={`
        relative w-8 h-10 rounded-full rounded-b-none 
        ${verified 
          ? 'bg-gradient-saffron shadow-glow animate-diya-flicker' 
          : 'bg-gradient-sunset shadow-divine'
        }
        border-2 border-primary-foreground/20
      `}>
        {/* Pin point */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-0 h-0 
                        border-l-4 border-r-4 border-t-6 border-transparent border-t-current"></div>
        
        {/* Ganpati icon inside */}
        <div className="absolute inset-0 flex items-center justify-center">
          <GanpatiBappa size="sm" className="text-primary-foreground" />
        </div>

        {/* Verification badge */}
        {verified && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full 
                         border border-primary-foreground flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse"></div>
          </div>
        )}
      </div>

      {/* Glowing circle animation for active state */}
      <div className="absolute inset-0 rounded-full opacity-30 animate-ping 
                     bg-primary pointer-events-none scale-150 duration-1000"></div>
    </div>
  );
};