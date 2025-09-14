import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { LoadingPage } from '@/components/LoadingPage';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Pages
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import MapPage from './pages/MapPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import MandalRegistration from './pages/MandalRegistration';

const queryClient = new QueryClient();

// Component to handle authentication state changes
const AuthStateHandler = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingPage message="Loading your session..." />;
  }

  return <>{children}</>;
};

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('hasLoaded');

    if (hasLoaded) {
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('hasLoaded', 'true');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (isLoading) {
    return <LoadingPage message="Loading..." />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage isSignUp />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<MandalRegistration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Toaster />
      <Sonner />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <AuthStateHandler>
              <AppContent />
            </AuthStateHandler>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
