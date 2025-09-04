import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';
import { GanpatiBappa } from './GanpatiBappa';

interface SuccessToastProps {
  show: boolean;
  onClose: () => void;
  message?: string;
  duration?: number;
}

export const SuccessToast: React.FC<SuccessToastProps> = ({ 
  show, 
  onClose, 
  message = "Order completed successfully! Ganpati Bappa Morya! 🙏",
  duration = 4000 
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-4 left-4 right-4 z-50 flex justify-center pointer-events-none"
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ 
            duration: 0.4,
            type: "spring",
            bounce: 0.3
          }}
        >
          <div className="glass border-2 border-primary/30 shadow-divine backdrop-blur-glass 
                         rounded-2xl p-4 max-w-sm mx-auto pointer-events-auto">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-divine rounded-full flex items-center justify-center shadow-glow animate-glow-pulse">
                  <CheckCircle className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-relaxed">
                  {message}
                </p>
                
                <div className="flex items-center gap-1 mt-2">
                  <GanpatiBappa size="sm" className="animate-glow-pulse" />
                  <span className="text-xs text-primary font-medium">Blessed Order</span>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="flex-shrink-0 text-muted-foreground hover:text-foreground 
                          transition-colors p-1 rounded-full hover:bg-background/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};