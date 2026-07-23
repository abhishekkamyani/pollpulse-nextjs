"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const PollFormLoading = () => {
    return (
        <div className="mx-auto max-w-xl px-4 py-12 animate-pulse">
            <Card className="shadow-md border border-border/60">
                <CardHeader className="space-y-3">
                    {/* Title Skeleton */}
                    <Skeleton className="h-8 w-1/3 rounded-md" />
                    {/* Description Skeleton */}
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                </CardHeader>

                {/* Form Body Skeletons */}
                <div className="p-6 pt-0 space-y-6">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full rounded-md" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <Skeleton className="h-10 w-28 rounded-md pt-2" />
                </div>
            </Card>
        </div>
    )
}
