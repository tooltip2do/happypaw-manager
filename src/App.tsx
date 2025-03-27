
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import PetProfiles from "./pages/PetProfiles";
import Health from "./pages/Health";
import Community from "./pages/Community";
import Services from "./pages/Services";
import Resources from "./pages/Resources";
import Store from "./pages/Store";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

// Create a client
const queryClient = new QueryClient();

// This component adds the forceHideBadge parameter to the URL if it's not already there
// This will hide the Lovable badge/watermark in the app
const HideBadgeEffect = () => {
  const location = useLocation();
  
  React.useEffect(() => {
    // Only add the parameter if it's not already in the URL
    if (!window.location.href.includes('forceHideBadge=true')) {
      // Check if there are already parameters in the URL
      const separator = window.location.href.includes('?') ? '&' : '?';
      // Modify the URL without causing a page reload
      const newUrl = `${window.location.href}${separator}forceHideBadge=true`;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [location]);
  
  return null;
};

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <HideBadgeEffect />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <div className="flex flex-col min-h-screen">
                      <Navbar />
                      <main className="flex-grow pt-20">
                        <Index />
                      </main>
                      <Footer />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pet-profiles"
                element={
                  <ProtectedRoute>
                    <div className="flex flex-col min-h-screen">
                      <Navbar />
                      <main className="flex-grow pt-20">
                        <PetProfiles />
                      </main>
                      <Footer />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/health"
                element={
                  <ProtectedRoute>
                    <div className="flex flex-col min-h-screen">
                      <Navbar />
                      <main className="flex-grow pt-20">
                        <Health />
                      </main>
                      <Footer />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/community"
                element={
                  <ProtectedRoute>
                    <div className="flex flex-col min-h-screen">
                      <Navbar />
                      <main className="flex-grow pt-20">
                        <Community />
                      </main>
                      <Footer />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/services"
                element={
                  <ProtectedRoute>
                    <div className="flex flex-col min-h-screen">
                      <Navbar />
                      <main className="flex-grow pt-20">
                        <Services />
                      </main>
                      <Footer />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/resources"
                element={
                  <ProtectedRoute>
                    <div className="flex flex-col min-h-screen">
                      <Navbar />
                      <main className="flex-grow pt-20">
                        <Resources />
                      </main>
                      <Footer />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/store"
                element={
                  <ProtectedRoute>
                    <div className="flex flex-col min-h-screen">
                      <Navbar />
                      <main className="flex-grow pt-20">
                        <Store />
                      </main>
                      <Footer />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <div className="flex flex-col min-h-screen">
                      <Navbar />
                      <main className="flex-grow pt-20">
                        <Settings />
                      </main>
                      <Footer />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
