import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoadingPage } from '@/components/LoadingPage';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading state
  if (loading) {
    return <LoadingPage message="Checking authentication..." />;
  }

  // If not authenticated, redirect to login with the return URL
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ 
          from: location.pathname !== '/login' ? location : '/',
          message: 'Please sign in to access this page'
        }}
        replace
      />
    );
  }

  // If authenticated, render the children
  return <>{children}</>;
}
