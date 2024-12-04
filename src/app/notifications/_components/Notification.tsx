"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import NotificationCard from "@/components/common/cards/notification/notification-card";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/ui/empty-state";
import ErrorState from "@/components/ui/error-state";
import LoaderState from "@/components/ui/loader-state";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/shadcn-tabs";
import {
  useDeleteAllNotificationMutation,
  useDeleteArchivedMutation,
  useDeleteUnreadMutation,
  useGetNotificationQuery,
} from "@/redux/features/notification/notificationApi";
import { TNotification } from "@/types";
import { AnimatePresence } from "framer-motion";

interface Props {
  userId: string;
}

/**
 * Notification Component:
 * Renders notifications for the user based on the selected tab: All, Unread, or Archived.
 * Includes functionalities for fetching, displaying, and clearing notifications.
 */
const Notification = ({ userId }: Props) => {
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "archived">(
    "unread"
  );

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

  /**
   * Handles notification deletion based on the active tab.
   */
  const handleDelete = async () => {
    try {
      if (activeTab === "all") await deleteAllNotification({ userId });
      else if (activeTab === "unread") await deleteUnread({ userId });
      else if (activeTab === "archived") await deleteArchived({ userId });
    } catch {
      toast.warning("Something went wrong!");
    }
  };

  /**
   * Dynamically renders content based on the current state of notifications:
   * Loading, Error, Empty, or List of Notifications.
   */
  const renderContent = useMemo(() => {
    if (isLoading || isFetching)
      return <LoaderState message="Retrieving notifications..." />;
    if (isError || !data?.success) {
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
    }
    if (data?.data?.length === 0) {
      return (
        <EmptyState message="No notifications found. You’re all caught up!" />
      );
    }
    return (
      <motion.div layout className="flex flex-col gap-y-5 mt-5 ">
        <AnimatePresence mode="popLayout">
          {data.data.map((notification: TNotification) => (
            <NotificationCard
              key={notification._id}
              userId={userId}
              activeTab={activeTab}
              data={notification}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    );
  }, [isLoading, isFetching, isError, data, activeTab, userId]);

  /**
   * Returns the label for the clear button based on the active tab.
   */
  const clearButtonLabel = useMemo(() => {
    if (activeTab === "all") return "Clear All";
    if (activeTab === "unread") return "Clear All Unread";
    return "Clear Archived";
  }, [activeTab]);

  return (
    <div>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
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
    </div>
  );
};

export default Notification;

/**
 * Header Component:
 * Displays the title, description, and tab navigation for the Notification component.
 */
const Header = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: "all" | "unread" | "archived") => void;
}) => (
  <div className="flex justify-between items-center border-b pb-4">
    <div>
      <h1 className="text-[22px] font-narrow font-semibold text-primary-black">
        Notifications
      </h1>
      <p className="text-primary-black/50">
        Set your notification preferences to stay updated.
      </p>
    </div>
    <Tabs
      value={activeTab}
      onValueChange={(val) =>
        setActiveTab(val as "all" | "unread" | "archived")
      }
    >
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="unread">Unread</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
);
