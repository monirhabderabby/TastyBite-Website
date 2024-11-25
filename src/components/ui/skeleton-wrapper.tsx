import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Skeleton } from "./skeleton";

interface Props {
  children: ReactNode;
  isLoading: boolean;
  fullWidth: boolean;
  className?: string;
}

const SkeletonWrapper = ({
  children,
  isLoading,
  fullWidth = true,
  className,
}: Props) => {
  if (!isLoading) return children;
  return (
    <Skeleton className={cn(fullWidth && "w-full rounded-12px", className)}>
      <div className="opacity-0">{children}</div>
    </Skeleton>
  );
};

export default SkeletonWrapper;
