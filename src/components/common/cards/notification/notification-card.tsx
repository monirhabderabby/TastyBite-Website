"use client";
// Packages
import { motion } from "framer-motion";
import { Archive } from "lucide-react";
import moment from "moment";
import { toast } from "sonner";

// Local import
import { Button } from "@/components/ui/button";
import CustomTooltip from "@/components/ui/custom-tooltip";
import { cn } from "@/lib/utils";
import {
  useArchiveNotificationMutation,
  useSeenMutation,
} from "@/redux/features/notification/notificationApi";
import { TNotification } from "@/types";

interface Props {
  userId: string;
  activeTab: string;
  data: TNotification;
}

const NotificationCard = ({ userId, activeTab, data }: Props) => {
  const {
    isArchived,
    isRead,
    _id: notificationId,
    color,
    name,
    description,
    icon,
    time,
  } = data;
  const [markAsRead, { isLoading }] = useSeenMutation();
  const [markAsArchive, { isLoading: isArchiving }] =
    useArchiveNotificationMutation();

  const isArchivedButtonShow =
    activeTab === "archived" ? false : isArchived ? false : true;

  // handler
  const handleMarkAsRead = async () => {
    if (isRead) return;

    const result = await markAsRead({
      notificationId,
      userId,
      isRead: activeTab === "unread" ? false : undefined,
      isArchived: activeTab === "archived" ? true : undefined,
    });

    if (result?.data?.success) {
    } else {
      toast.error("Failed to mark the notification as read.");
    }
  };

  const handleArchive = async () => {
    const result = await markAsArchive({
      notificationId,
      userId,
      isRead: activeTab === "unread" ? false : undefined,
      isArchived: activeTab === "archived" ? true : undefined,
    });

    if (result?.data?.success) {
    } else {
      toast.error("Failed to archive notification!");
    }
  };
  return (
    <motion.figure
      className={cn(
        "relative mx-auto min-h-fit w-full  cursor-pointer overflow-hidden rounded-lg p-4",
        // animation styles
        "transition-all duration-200 ease-in-out ",
        // light styles
        "bg-white border-[1px] ",
        // dark styles
        "transform-gpu flex md:flex-row flex-col justify-between items-end",
        isRead ? "border-gray-200" : "border-gray-300 bg-slate-100"
      )}
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: "auto",
        opacity: 1,
      }}
      exit={{ height: 0, opacity: 0, overflow: "hidden" }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
    >
      <section className="flex flex-row items-center gap-3">
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
            <span className="text-xs text-gray-500">
              {moment(time).fromNow()}
            </span>
          </figcaption>
          <p className="text-sm font-normal text-primary-black ">
            {description}
          </p>
        </div>
      </section>
      <div>
        <Button
          variant="link"
          className="text-primary-black/80"
          disabled={isLoading || isArchiving || isRead}
          onClick={handleMarkAsRead}
        >
          {isRead ? "Seen" : "Mark as read"}
        </Button>
        {isArchivedButtonShow && (
          <CustomTooltip
            side="top"
            trigger={
              <Button
                variant="outline"
                className="text-primary-black h-8 w-8"
                size="icon"
                onClick={handleArchive}
                disabled={isLoading || isArchiving}
              >
                <Archive />
              </Button>
            }
            message="Archive"
          />
        )}
      </div>
    </motion.figure>
  );
};

export default NotificationCard;
