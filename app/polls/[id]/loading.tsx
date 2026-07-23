import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function PollLoading() {
  return (
    <div className="mx-auto max-w-xl px-4 py-8 space-y-6 antialiased">
      {/* Top Header Row Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-32 rounded-lg" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-16 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </div>

      {/* Main Card Skeleton */}
      <Card className="shadow-xl shadow-black/5 dark:shadow-black/20 border-border/80 bg-card">
        <CardHeader className="space-y-3 pb-4">
          <Skeleton className="h-5 w-36 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-4/5 rounded-md" />
            <Skeleton className="h-7 w-2/3 rounded-md" />
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Options Skeletons */}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-full p-4 rounded-xl border-2 border-border/40 bg-muted/20 flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5 w-full">
                <Skeleton className="h-5 w-5 rounded-full shrink-0" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
              </div>
            </div>
          ))}
        </CardContent>

        {/* Card Footer Skeleton */}
        <CardFooter className="border-t bg-muted/30 px-6 py-4 flex items-center justify-between">
          <Skeleton className="h-4 w-40 rounded-md" />
          <Skeleton className="h-9 w-28 rounded-xl" />
        </CardFooter>
      </Card>
    </div>
  );
}