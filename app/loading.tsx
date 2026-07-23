import { Loader2, Vote } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center gap-4 p-4 antialiased">
      {/* Brand Icon with Spinner Overlay */}
      <div className="relative flex items-center justify-center">
        <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
          <Vote className="h-7 w-7 animate-pulse" />
        </div>
        <Loader2 className="absolute -top-1 -right-1 h-5 w-5 animate-spin text-primary" />
      </div>

      {/* Loading Message */}
      <div className="text-center space-y-1">
        <p className="text-sm font-semibold text-foreground tracking-wide">
          Loading PollPulse...
        </p>
        <p className="text-xs text-muted-foreground">
          Fetching content, please wait
        </p>
      </div>
    </div>
  );
}