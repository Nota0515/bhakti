import React from 'react';
import { Landing } from '@/components/Landing';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role: 'mandal' | 'devotee') => {
    if (role === 'devotee') {
      navigate('/map');
    } else {
      navigate('/register');
    }
  };

  return <Landing onSelectRole={handleRoleSelection} />;
};

export default Index;
