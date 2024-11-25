import { Skeleton } from "@/components/ui/skeleton";

export default function Blog_Skeleton() {
    return (
      <article className="rounded-lg border bg-card text-card-foreground shadow">
        <div className="space-y-3">
          <Skeleton className="h-[300px] w-full rounded-t-lg" />
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
              <Skeleton className="h-4 w-[100px]" />
            </div>
            <Skeleton className="h-8 w-3/4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
            <Skeleton className="h-8 w-[100px]" />
          </div>
        </div>
      </article>
    )
  }