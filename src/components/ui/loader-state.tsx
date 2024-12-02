import { Loader2 } from "lucide-react";

/**
 * LoaderState Component:
 * Displays a loader with a message while content is loading.
 */

const LoaderState = ({ message }: { message: string }) => (
  <div className="min-h-[200px] flex justify-center items-center">
    <div className="flex flex-col items-center gap-y-2">
      <Loader2 className="animate-spin text-primary-black/80 opacity-50" />
      <p className="text-primary-black/80">{message}</p>
    </div>
  </div>
);

export default LoaderState;
