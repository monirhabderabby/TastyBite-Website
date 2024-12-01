"use client";
// Packages
import { AlertCircle, Loader2 } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { ReactNode, useState } from "react";

// Local imports
import NotificationCard from "@/components/common/cards/notification/notification-card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/shadcn-tabs";
import { useGetNotificationQuery } from "@/redux/features/notification/notificationApi";
import { TNotification } from "@/types";

interface Props {
  userId: string;
}

const Notification = ({ userId }: Props) => {
  const [activeTab, setActiveTab] = useState("unread");
  const { isLoading, data, isError, isFetching } = useGetNotificationQuery(
    {
      userId,
      isRead: activeTab == "unread" ? false : activeTab == "all" && undefined,
      isArchived: activeTab == "archived" ? true : false,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  let content;

  if (isLoading || isFetching) {
    content = <LoaderState />;
  } else if (isError) {
    content = (
      <ErrorState
        message={
          <>
            Something went wrong. Please try again later or{" "}
            <Link
              href="/contact"
              className="text-blue-600 hover:underline cursor-pointer"
            >
              contact
            </Link>{" "}
            support if the issue persists.
          </>
        }
      />
    );
  } else if (!data?.success) {
    content = (
      <ErrorState
        message={
          <>
            Something went wrong. Please try again later or{" "}
            <Link
              href="/contact"
              className="text-blue-600 hover:underline cursor-pointer"
            >
              contact
            </Link>
            support if the issue persists.
          </>
        }
      />
    );
  } else if (data?.success && data?.data?.length === 0) {
    content = (
      <div className="min-h-[200px] flex justify-center items-center max-w-[380px] text-center text-primary-black mx-auto">
        No notifications found. You&apos;re all caught up!
      </div>
    );
  } else if (data?.success && data?.data?.length > 0) {
    content = (
      <>
        <ScrollArea className="max-h-[600px] w-full">
          <div className="flex flex-col gap-y-5 mt-5 px-3">
            {data?.data?.map((notification: TNotification) => (
              <NotificationCard
                key={notification._id}
                color={notification.color}
                description={notification.description}
                icon={notification.icon}
                name={notification.name}
                time={moment(notification.createdAt).fromNow()}
                isRead={notification.isRead}
                notificationId={notification._id}
                userId={userId}
              />
            ))}
          </div>
        </ScrollArea>
        <div className="flex mt-5 justify-end px-3">
          <Button variant="outline" size="sm" className=" text-primary-black">
            Clear All
          </Button>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center border-b">
        <div>
          <h1 className="text-[22px] font-narrow font-semibold text-primary-black">
            Notifications
          </h1>
          <p className="text-primary-black/50">
            Set your notification preferences to stay updated.
          </p>
        </div>
        <Tabs
          defaultValue={activeTab}
          onValueChange={(val) => setActiveTab(val)}
          value={activeTab}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {content}
    </div>
  );
};

export default Notification;

const LoaderState = () => {
  return (
    <div className="min-h-[200px] flex justify-center items-center">
      <div className="flex flex-col items-center gap-y-2">
        <Loader2 className="animate-spin text-primary-black/80 opacity-50" />
        <p className="text-primary-black/80">Retrieving notification...</p>
      </div>
    </div>
  );
};

const ErrorState = ({ message }: { message: ReactNode }) => {
  return (
    <div className="min-h-[200px] flex justify-center items-center">
      <div className="flex flex-col items-center gap-y-2">
        <AlertCircle className="animate-spin  text-red-500/80 opacity-50" />
        <p className="text-primary-black/80 max-w-[370px] text-center">
          {message}
        </p>
      </div>
    </div>
  );
};
