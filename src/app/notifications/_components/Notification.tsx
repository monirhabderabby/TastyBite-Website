// @ts-nocheck
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { injectRealTimeNotification } from "@/cache/notification/notification.cache";
import NotificationCard from "@/components/common/cards/notification/notification-card";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/ui/empty-state";
import ErrorState from "@/components/ui/error-state";
import LoaderState from "@/components/ui/loader-state";
import { useAppDispatch } from "@/hooks/use-dispatch";
import { pusherClient } from "@/lib/pusher";
import {
  useDeleteAllNotificationMutation,
  useDeleteArchivedMutation,
  useDeleteUnreadMutation,
  useGetNotificationQuery,
} from "@/redux/features/notification/notificationApi";
import { TNotification } from "@/types";
import { getTabConfig } from "./getTabConfig";
import NotificationHeader from "./header";

interface Props {
  userId: string;
}

/**
 * Notification Component:
 * Renders notifications for the user based on the selected tab: All, Unread, or Archived.
 * Includes functionalities for fetching, displaying, and clearing notifications.
 */
const Notification = ({ userId }: Props) => {
  const [activeTab, setActiveTab] = useState("unread");
  const dispatch = useAppDispatch();
  const { isArchived, isRead, clearButtonLabel } = getTabConfig(activeTab);

  const { isLoading, data, isError, isFetching } = useGetNotificationQuery(
    {
      userId,
      isRead: activeTab === "unread" ? false : undefined,
      isArchived: activeTab === "archived" ? true : undefined,
    },
    { refetchOnMountOrArgChange: true }
  );

  // Fetch notifications based on the selected tab using RTK Query
  const [deleteUnread, { isLoading: isUnreadDeleting }] =
    useDeleteUnreadMutation();
  const [deleteArchived, { isLoading: isArchivedDeleting }] =
    useDeleteArchivedMutation();
  const [deleteAllNotification, { isLoading: isDeletingAll }] =
    useDeleteAllNotificationMutation();

  // Mutations for deleting notifications based on the active tab
  const isDeleting = isUnreadDeleting || isArchivedDeleting || isDeletingAll;

  // recieved real time notification from pusher
  const notificationHandler = useCallback(
    (data: TNotification) => {
      // inject new notification to the cache using @injectRealTimeNotification utility function
      injectRealTimeNotification({
        dispatch,
        data,
        isRead,
        isArchived,
        userId,
      });
    },
    [dispatch, userId, isRead, isArchived]
  );

  // listen real time notification from pusher
  useEffect(() => {
    if (userId) {
      pusherClient.subscribe(userId);
    }
    pusherClient.bind("notification:new", notificationHandler);

    return () => {
      pusherClient.unsubscribe(userId);
      pusherClient.unbind("notification:new", notificationHandler);
    };
  }, [userId, dispatch, notificationHandler]);

  /**
   * Handles notification deletion based on the active tab.
   */
  const handleDelete = async () => {
    try {
      if (activeTab === "all")
        await deleteAllNotification({
          userId,
          isRead,
          isArchived,
        });
      else if (activeTab === "unread") {
        await deleteUnread({
          userId,
          isRead,
          isArchived,
        });
      } else if (activeTab === "archived")
        await deleteArchived({
          userId,
          isRead,
          isArchived,
        });
    } catch {
      toast.warning("Something went wrong!");
    }
  };

  /**
   * Dynamically renders content based on the current state of notifications:
   * Loading, Error, Empty, or List of Notifications.
   */
  let renderContent;

  if (isLoading | isFetching) {
    renderContent = <LoaderState message={`Retrieving notifications...`} />;
  } else if (isError | !data?.success) {
    return (
      <ErrorState
        message={
          <>
            Something went wrong. Please try again later or{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              contact support
            </Link>
            .
          </>
        }
      />
    );
  } else if (data?.data?.length === 0) {
    renderContent = (
      <EmptyState message="No notifications found. You’re all caught up!" />
    );
  } else if (data?.data?.length > 0) {
    renderContent = (
      <motion.div layout className="flex flex-col gap-y-5 mt-5 ">
        <AnimatePresence initial={false}>
          {data.data.map((notification: TNotification) => (
            <NotificationCard
              key={notification?._id}
              userId={userId}
              activeTab={activeTab}
              data={notification}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <div>
      <NotificationHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <AnimatePresence>
        {renderContent}
        {data?.success && data?.data?.length > 0 && (
          <div className="flex mt-5 justify-end px-3">
            <Button
              variant="outline"
              size="sm"
              className="text-primary-black"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {clearButtonLabel}
              {isDeleting && (
                <Loader2 className="animate-spin opacity-60 h-4 w-4 ml-2" />
              )}
            </Button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
