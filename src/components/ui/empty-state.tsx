/**
 * EmptyState Component:
 * Displays a message when no notifications are available.
 */
const EmptyState = ({ message }: { message: string }) => (
  <div className="min-h-[200px] flex justify-center items-center max-w-[380px] text-center text-primary-black mx-auto">
    {message}
  </div>
);

export default EmptyState;
