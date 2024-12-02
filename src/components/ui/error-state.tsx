import { AlertCircle } from "lucide-react";
import { ReactNode } from "react";

/**
 * ErrorState Component:
 * Displays an error message when fetching notifications fails.
 */
const ErrorState = ({ message }: { message: ReactNode }) => (
  <div className="min-h-[200px] flex justify-center items-center">
    <div className="flex flex-col items-center gap-y-2">
      <AlertCircle className="text-red-500/80 opacity-50" />
      <p className="text-primary-black/80 max-w-[370px] text-center">
        {message}
      </p>
    </div>
  </div>
);

export default ErrorState;
