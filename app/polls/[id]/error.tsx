"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Home, MoveLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PollError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error("Poll Error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center space-y-6 antialiased">
      {/* Icon Badge */}
      <div className="h-14 w-14 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive flex items-center justify-center mx-auto shadow-xs">
        <AlertCircle className="h-7 w-7 stroke-[1.75]" />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Failed to load poll
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          {/* {error.message || "We couldn't retrieve this poll. It may have been deleted, or there was a temporary database issue."} */}
          {"We couldn't retrieve this poll. It may have been deleted, or there was a temporary database issue."}
        </p>
      </div>

      {/* Digest Tag */}
      {error.digest && (
        <p className="text-[11px] font-mono text-muted-foreground/60 bg-muted/50 py-1 px-2.5 rounded-md inline-block border border-border/40">
          Ref ID: {error.digest}
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Button onClick={() => reset()} size="sm" className="w-full sm:w-auto gap-2 rounded-xl h-10 px-5">
          <RotateCcw className="h-4 w-4" />
          Try Again
        </Button>
        <Button
          variant="outline"
          className="gap-2 w-full sm:w-auto border-border/80"
          onClick={() => router.back()}
        >
          <MoveLeft className="w-4 h-4" />
          Go Back
        </Button>
      </div>
    </div>
  );
}