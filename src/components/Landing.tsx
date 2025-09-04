import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { GanpatiBappa } from './GanpatiBappa';
import { MapPin, Users, Gift, Calendar } from 'lucide-react';

interface LandingProps {
  onSelectRole: (role: 'mandal' | 'devotee') => void;
}

export const Landing: React.FC<LandingProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 
                   flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 opacity-20 animate-float">
          <GanpatiBappa size="lg" />
        </div>
        <div className="absolute top-20 right-20 opacity-15 animate-float" style={{ animationDelay: '2s' }}>
          <GanpatiBappa size="md" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-10 animate-float" style={{ animationDelay: '4s' }}>
          <GanpatiBappa size="lg" />
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-secondary/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-accent/15 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <motion.div 
        className="max-w-4xl mx-auto text-center space-y-8 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <GanpatiBappa size="lg" className="animate-glow-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-divine bg-clip-text text-transparent">
              Bhakti-United
            </h1>
            <GanpatiBappa size="lg" className="animate-glow-pulse" />
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            Ganesh Chaturthi 2025
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>August 27 - September 6, 2025</span>
          </div>
        </motion.div>

        {/* Festival Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="glass border-primary/20 shadow-divine p-6 md:p-8 backdrop-blur-glass">
            <p className="text-lg text-foreground leading-relaxed">
              Join Mumbai's most sacred festival celebration. Discover mandals, vote for your favorites, 
              and order blessed prasad with our devotional map experience.
            </p>
          </Card>
        </motion.div>

        {/* Role Selection */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Choose Your Journey
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Devotee Card */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="glass border-primary/20 shadow-divine p-6 cursor-pointer 
                             hover:shadow-glow transition-all duration-300 backdrop-blur-glass
                             group"
                    onClick={() => onSelectRole('devotee')}>
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-saffron rounded-full 
                                 flex items-center justify-center shadow-divine
                                 group-hover:shadow-glow transition-all duration-300">
                    <MapPin className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">I am a Devotee</h3>
                    <p className="text-sm text-muted-foreground">
                      Discover mandals, cast votes, and order sacred prasad from Mumbai's finest celebrations
                    </p>
                  </div>
                  <div className="flex justify-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Explore Map
                    </span>
                    <span className="flex items-center gap-1">
                      <Gift className="w-3 h-3" />
                      Order Prasad
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Mandal Card */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="glass border-primary/20 shadow-divine p-6 cursor-pointer 
                             hover:shadow-glow transition-all duration-300 backdrop-blur-glass
                             group"
                    onClick={() => onSelectRole('mandal')}>
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-sunset rounded-full 
                                 flex items-center justify-center shadow-divine
                                 group-hover:shadow-glow transition-all duration-300">
                    <Users className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">I am a Mandal</h3>
                    <p className="text-sm text-muted-foreground">
                      Register your mandal, showcase your celebration, and connect with devotees across Mumbai
                    </p>
                  </div>
                  <div className="flex justify-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Register
                    </span>
                    <span className="flex items-center gap-1">
                      <Gift className="w-3 h-3" />
                      Sell Prasad
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Festival Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">12+</div>
              <div className="text-xs text-muted-foreground">Famous Mandals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">11</div>
              <div className="text-xs text-muted-foreground">Days Festival</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">∞</div>
              <div className="text-xs text-muted-foreground">Blessings</div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="pt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <p className="text-sm text-muted-foreground mb-4">
            Experience Mumbai's most beloved festival like never before
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="divine" size="lg" onClick={() => onSelectRole('devotee')}>
              Discover Mandals
            </Button>
            <Button variant="holy" size="lg" onClick={() => onSelectRole('mandal')}>
              Register Mandal
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom decorative pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"></div>
    </div>
  );
};