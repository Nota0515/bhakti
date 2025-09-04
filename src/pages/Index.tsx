import React, { useState } from 'react';
import { Landing } from '@/components/Landing';
import { MapView } from '@/components/MapView';
import { MandalRegistrationForm } from '@/components/MandalRegistrationForm';
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

  const handleBackToHome = () => {
    setCurrentView('landing');
    setUserRole(null);
  };

  const handleRegistrationComplete = () => {
    showToast("Mandal registration submitted successfully! We'll review and contact you soon. 🙏");
    setCurrentView('landing');
    setUserRole(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <Landing onSelectRole={handleRoleSelection} />;
      case 'map':
        return <MapView onShowToast={showToast} onBack={handleBackToHome} />;
      case 'registration':
        return (
          <MandalRegistrationForm 
            onBack={handleBackToHome}
            onRegistrationComplete={handleRegistrationComplete}
          />
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
