import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"

export default function PollsLoading() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-10 md:py-14 space-y-8 antialiased">
      
      {/* Community Header System (Static render for immediate visibility) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b pb-6 border-border/60">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Explore Polls
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Discover active queries from the community, cast your vote, and track live public insights.
          </p>
        </div>
      </div>

      {/* Widescreen Responsive 4-Column Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card
            key={index}
            className="flex flex-col justify-between overflow-hidden bg-card border border-border/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-xl"
          >
            {/* Header Mirror: Status + Date + Line-Clamped Title */}
            <CardHeader className="space-y-3.5 pb-4">
              <div className="flex items-center justify-between gap-4">
                {/* Status Pill Skeleton */}
                <Skeleton className="h-5 w-14 rounded-full" />

                {/* Calendar Date Metadata Skeleton */}
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-3.5 w-3.5 rounded-full" />
                  <Skeleton className="h-3.5 w-24 rounded-md" />
                </div>
              </div>

              {/* Title Line Skeletons (Mimics min-h-11 2-line clamp) */}
              <div className="space-y-2 pt-1 min-h-11">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
              </div>
            </CardHeader>

            {/* Engagement Trackers Mirror: Votes Count & Created By Skeletons */}
            <CardContent className="pb-5 flex flex-col justify-center items-center gap-2">
              {/* Votes Cast Pill */}
              <Skeleton className="h-9 w-32 rounded-xl" />
              {/* Creator Pill */}
              <Skeleton className="h-9 w-36 rounded-xl" />
            </CardContent>

            {/* Action Footer Mirror */}
            <CardFooter className="border-t border-border/50 bg-muted/10 px-5 py-3.5 flex items-center justify-between gap-4">
              <Skeleton className="h-4 w-28 rounded-md" />
            </CardFooter>
          </Card>
        ))}
      </div>

    </div>
  )
}