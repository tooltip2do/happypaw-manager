
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Home, Menu, Users, Calendar, BookOpen, ShoppingBag, Settings, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Pet Profiles", href: "/pet-profiles", icon: Heart },
  { name: "Health", href: "/health", icon: Users },
  { name: "Community", href: "/community", icon: Users },
  { name: "Services", href: "/services", icon: Calendar },
  { name: "Resources", href: "/resources", icon: BookOpen },
  { name: "Store", href: "/store", icon: ShoppingBag },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "py-3 bg-white/90 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-semibold"
          >
            <Heart className="h-6 w-6 text-petcare-coral" />
            <span className="bg-gradient-to-r from-petcare-coral to-petcare-blue bg-clip-text text-transparent">
              PetCare
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  location.pathname === item.href
                    ? "nav-link-active"
                    : "nav-link"
                )}
              >
                <span>{item.name}</span>
              </Link>
            ))}
            
            {user && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={signOut}
                className="nav-link ml-2"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span>Logout</span>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="text-gray-700"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t animate-fade-in">
          <div className="py-2 px-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 py-3 px-4 rounded-md",
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            {user && (
              <button
                onClick={signOut}
                className="flex w-full items-center space-x-3 py-3 px-4 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
