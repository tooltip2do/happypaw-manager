
import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, session, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if we've finished loading and there's no user/session
    if (!isLoading && !user && !session) {
      console.log("No authenticated user, redirecting to auth page");
      navigate("/auth");
    }
  }, [user, session, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  // Only render children if we have a user AND session
  return (user && session) ? <>{children}</> : null;
}
