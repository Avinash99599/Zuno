import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />

      <div className="relative z-10 text-center px-6 animate-scale-in">
        {/* Large 404 */}
        <h1 className="text-[120px] sm:text-[180px] font-black text-transparent bg-clip-text gradient-primary leading-none">
          404
        </h1>

        <h2 className="text-xl font-semibold mt-2">Page Not Found</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <Link
            to="/"
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white",
              "gradient-primary hover:opacity-90 transition-opacity",
              "shadow-lg shadow-violet-500/25"
            )}
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium",
              "bg-muted hover:bg-muted/80 transition-colors"
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
