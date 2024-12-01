"use client";
// Packages
import { Archive } from "lucide-react";
import { toast } from "sonner";

// Local import
import { Button } from "@/components/ui/button";
import CustomTooltip from "@/components/ui/custom-tooltip";
import { cn } from "@/lib/utils";
import {
  useArchiveNotificationMutation,
  useSeenMutation,
} from "@/redux/features/notification/notificationApi";

interface Props {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
  isRead: boolean;
  notificationId: string;
  userId: string;
}

const NotificationCard = ({
  name,
  description,
  icon,
  color,
  time,
  isRead,
  notificationId,
  userId,
}: Props) => {
  const [markAsRead, { isLoading }] = useSeenMutation();
  const [markAsArchive, { isLoading: isArchiving }] =
    useArchiveNotificationMutation();

  // handler
  const handleMarkAsRead = async () => {
    const result = await markAsRead({ notificationId, userId });

    if (result?.data?.success) {
    } else {
      toast.error("Failed to mark the notification as read.");
    }
  };

  const handleArchive = async () => {
    const result = await markAsArchive({ notificationId });

    if (result?.data?.success) {
    } else {
      toast.error("Failed to archive notification!");
    }
  };
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full  cursor-pointer overflow-hidden rounded-lg p-4",
        // animation styles
        "transition-all duration-200 ease-in-out ",
        // light styles
        "bg-white border-[1px] ",
        // dark styles
        "transform-gpu flex justify-between items-end",
        isRead ? "border-gray-200" : "border-gray-300 bg-slate-100"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium text-primary-black">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal text-primary-black">
            {description}
          </p>
        </div>
      </div>
      <div>
        <Button
          variant="link"
          className="text-primary-black/80"
          disabled={isLoading || isArchiving}
          onClick={handleMarkAsRead}
        >
          Mark as read
        </Button>
        <CustomTooltip
          side="top"
          trigger={
            <Button
              variant="outline"
              className="text-primary-black"
              size="icon"
              onClick={handleArchive}
              disabled={isLoading || isArchiving}
            >
              <Archive />
            </Button>
          }
          message="Archive"
        />
      </div>
    </figure>
  );
};

export default NotificationCard;
