"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button"; // Import your variant generator
import { cn } from "@/lib/utils";
import { FileQuestion, MoveLeft, Home } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Icon Graphic Container */}
      <div className="relative flex items-center justify-center w-24 h-24 mb-6 rounded-2xl bg-muted/50 border border-border/60 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <FileQuestion className="w-12 h-12 text-muted-foreground stroke-[1.5]" />
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-destructive animate-pulse" />
      </div>

      {/* Typography */}
      <div className="space-y-2 max-w-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <span className="text-xs font-semibold tracking-wider uppercase text-destructive bg-destructive/10 px-2.5 py-1 rounded-full">
          404 Error
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground pt-2">
          Poll not found
        </h1>
        <p className="text-sm text-muted-foreground">
          The poll you are looking for doesn&apos;t exist, has been deleted, or you might not have permission to view it.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full max-w-xs sm:max-w-none animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        
        {/* Regular click actions use your customized Button component seamlessly */}
        <Button 
          variant="outline" 
          className="gap-2 w-full sm:w-auto border-border/80"
          onClick={() => router.back()} 
        >
          <MoveLeft className="w-4 h-4" />
          Go Back
        </Button>

        {/* Navigations use standard Next.js Link elements dressed in Button classes */}
        <Link 
          href="/dashboard" 
          className={cn(
            buttonVariants({ variant: "default", size: "default" }), 
            "gap-2 w-full sm:w-auto"
          )}
        >
          <Home className="w-4 h-4" />
          Back to Dashboard
        </Link>

      </div>
    </div>
  );
}