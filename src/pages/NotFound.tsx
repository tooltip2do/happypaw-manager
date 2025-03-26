
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 px-4">
      <div className="text-center max-w-lg animate-fade-in">
        <div className="mb-6 text-9xl font-bold bg-gradient-to-r from-petcare-blue to-petcare-coral bg-clip-text text-transparent">
          404
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          We couldn't find the page you're looking for. It might have been removed, renamed, or doesn't exist.
        </p>
        <Button size="lg" asChild>
          <Link to="/">
            <Home className="mr-2 h-5 w-5" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
