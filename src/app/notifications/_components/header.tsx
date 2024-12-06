import { Tabs, TabsList, TabsTrigger } from "@/components/ui/shadcn-tabs";

/**
 * Header Component:
 * Displays the title, description, and tab navigation for the Notification component.
 */
const NotificationHeader = ({
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

export default NotificationHeader;
