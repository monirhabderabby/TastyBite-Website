export const getTabConfig = (activeTab: "all" | "unread" | "archived") => {
  const isRead = activeTab === "unread" ? false : undefined;
  const isArchived = activeTab === "archived" ? true : undefined;

  let clearButtonLabel;
  if (activeTab === "all") {
    clearButtonLabel = "Clear All";
  } else if (activeTab === "unread") {
    clearButtonLabel = "Clear All Unread";
  } else if (activeTab === "archived") {
    clearButtonLabel = "Clear Archived";
  }

  return { isRead, isArchived, clearButtonLabel };
};
