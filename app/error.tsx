"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] w-full flex items-center justify-center p-4 antialiased">
      <div className="max-w-md w-full bg-card/90 backdrop-blur-md border border-border/80 rounded-2xl p-6 sm:p-8 shadow-xl text-center space-y-6">
        
        {/* Warning Icon Badge */}
        <div className="h-14 w-14 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive flex items-center justify-center mx-auto shadow-xs">
          <AlertTriangle className="h-7 w-7 stroke-[1.75]" />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Something went wrong!
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            An unexpected error occurred while processing your request. Try refreshing the view or head back to home.
          </p>
        </div>

        {/* Optional Error Digest */}
        {error.digest && (
          <p className="text-[11px] font-mono text-muted-foreground/60 bg-muted/50 py-1 px-2.5 rounded-md inline-block border border-border/40">
            Digest ID: {error.digest}
          </p>
        )}

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => reset()}
            variant="default"
            className="w-full sm:w-auto gap-2 font-medium rounded-xl h-10 px-5"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto gap-2 font-medium rounded-xl h-10 px-5"
          >
            <Link href="/" className="flex gap-2 items-center">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}