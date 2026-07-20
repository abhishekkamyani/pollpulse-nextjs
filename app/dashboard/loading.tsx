import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function DashboardLoading() {
  // Generate an array of 8 elements for the placeholder cards
  const skeletonCards = Array.from({ length: 8 })

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-10 md:py-14 space-y-8 antialiased select-none">
      
      {/* Top Header Control Area (Text visible, button skeletonized) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b pb-6 border-border/60">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            My Polls
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Manage your interactive queries, evaluate real-time responses, and review target analytics.
          </p>
        </div>

        {/* Skeleton for "Create new poll" button */}
        <Skeleton className="h-10 w-36 rounded-md shrink-0 self-start sm:self-auto" />
      </div>

      {/* Identical Responsive 4-Column Presentation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {skeletonCards.map((_, index) => (
          <Card
            key={index}
            className="flex flex-col justify-between overflow-hidden bg-card border border-border/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-xl h-57.5"
          >
            {/* Top Info Area */}
            <CardHeader className="space-y-3.5 pb-4">
              <div className="flex items-center justify-between gap-4">
                {/* Status Badge Skeleton */}
                <Skeleton className="h-5 w-14 rounded-full" />
                {/* Date Skeleton */}
                <Skeleton className="h-4 w-24 rounded" />
              </div>

              {/* Title / Question Skeletons (Mimicking line clamps) */}
              <div className="space-y-2 pt-1 min-h-11">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-[85%] rounded" />
              </div>
            </CardHeader>

            {/* Metrics Counter Area */}
            <CardContent className="pb-5">
              <Skeleton className="h-9 w-28 rounded-xl" />
            </CardContent>

            {/* Bottom Actions Area */}
            <CardFooter className="border-t border-border/50 bg-muted/10 px-5 py-3 flex items-center justify-between gap-4">
              {/* "View Full Results" Link Skeleton */}
              <Skeleton className="h-4 w-24 rounded" />

              {/* Action Buttons Skeletons */}
              <div className="flex items-center gap-2">
                {/* Edit Icon Button */}
                <Skeleton className="h-8 w-8 rounded-lg" />
                {/* Delete Icon Button */}
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}