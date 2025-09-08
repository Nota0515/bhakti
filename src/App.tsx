import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MapPage from "./pages/MapPage";
import RegistrationPage from "./pages/RegistrationPage";
import { LoadingPage } from "@/components/LoadingPage";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");

    if (hasLoaded) {
      setIsLoading(false);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("hasLoaded", "true");
      }, 3000);
    }
  }, []);

  if (isLoading) {
    return <LoadingPage message="Preparing the festival experience..." />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
