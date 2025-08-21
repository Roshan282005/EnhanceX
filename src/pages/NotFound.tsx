import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Film } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-cinematic flex items-center justify-center px-6">
      <div className="text-center space-y-8 max-w-lg">
        <div className="space-y-4">
          <div className="p-6 rounded-full bg-primary/10 border border-primary/20 w-fit mx-auto">
            <Film className="h-16 w-16 text-primary" />
          </div>
          
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground">
            The video enhancement page you're looking for doesn't exist. 
            Let's get you back to creating amazing content.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="cinematic" size="lg" asChild>
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
          <Button variant="glass" size="lg" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
