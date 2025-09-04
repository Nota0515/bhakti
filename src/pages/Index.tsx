import React, { useState } from 'react';
import { Landing } from '@/components/Landing';
import { MapView } from '@/components/MapView';
import { SuccessToast } from '@/components/SuccessToast';

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'map' | 'registration'>('landing');
  const [userRole, setUserRole] = useState<'mandal' | 'devotee' | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleRoleSelection = (role: 'mandal' | 'devotee') => {
    setUserRole(role);
    if (role === 'devotee') {
      setCurrentView('map');
    } else {
      setCurrentView('registration');
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setShowSuccessToast(true);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <Landing onSelectRole={handleRoleSelection} />;
      case 'map':
        return <MapView onShowToast={showToast} />;
      case 'registration':
        return (
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-divine bg-clip-text text-transparent">
                Mandal Registration
              </h1>
              <p className="text-xl text-muted-foreground">Coming Soon...</p>
              <button 
                onClick={() => setCurrentView('landing')}
                className="text-primary hover:underline"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        );
      default:
        return <Landing onSelectRole={handleRoleSelection} />;
    }
  };

  return (
    <>
      {renderCurrentView()}
      <SuccessToast 
        show={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        message={toastMessage}
      />
    </>
  );
};

export default Index;
