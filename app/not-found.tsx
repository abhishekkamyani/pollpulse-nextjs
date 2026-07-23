import Link from "next/link";
import { FileQuestion, Home, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] w-full flex items-center justify-center p-4 antialiased">
      <div className="max-w-md w-full bg-card/90 backdrop-blur-md border border-border/80 rounded-2xl p-6 sm:p-8 shadow-xl text-center space-y-6">
        
        {/* 404 Icon Badge */}
        <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto shadow-inner">
          <FileQuestion className="h-8 w-8 stroke-[1.75]" />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
            404 Error
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground pt-1">
            Page Not Found
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The page or poll you are looking for doesn't exist, has been deleted, or moved to another link.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button variant="default" className="w-full sm:w-auto gap-2 rounded-xl h-10 px-5">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" className="w-full sm:w-auto gap-2 rounded-xl h-10 px-5">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Vote className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}