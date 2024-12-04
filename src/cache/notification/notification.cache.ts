// @ts-nocheck
import { baseApi } from "@/redux/api/baseApi";
import { Dispatch } from "@reduxjs/toolkit";

/**
 * Decrements the unread notification count for the given user in the cache.
 *
 * This function is used to optimistically update the unread notification count
 * displayed in the navbar or other UI components without waiting for a server response.
 * It directly modifies the cached value in the Redux state using RTK Query's
 * `updateQueryData` utility.
 *
 */
export const decreamentNotificationCount = (
  dispatch: Dispatch,
  userId: string
) => {
  return dispatch(
    baseApi.util.updateQueryData("unreadNotification", { userId }, (draft) => {
      if (draft?.data) {
        draft.data = parseInt(draft.data) - 1;
      }
    })
  );
};

/**
 * Updates the read status of a specific notification in the cache.
 *
 * This function performs an optimistic cache update for the `getNotification` query,
 * marking a specified notification as "read". It modifies the `isRead` field of the
 * target notification within the cached data without waiting for a server response,
 * improving UI responsiveness.
 *
 * @param {object} params - The parameters object.
 * @param {Dispatch} params.dispatch - Redux dispatch function to trigger the cache update.
 * @param {string} params.userId - The ID of the user whose notifications are being updated.
 * @param {string} params.notificationId - The ID of the notification to mark as read.
 * @param {boolean} params.isRead - Current read status of the notification (before update).
 * @param {boolean} params.isArchived - Whether the notification is archived or not.
 * @returns {ReturnType<Dispatch>} The result of the dispatched cache update.
 *
 * @remarks
 * - This function is intended for use with RTK Query's `updateQueryData` utility to ensure
 *   the cache stays consistent with UI actions.
 * - If the notification is not found in the cache, no updates are made.
 * - Ensure the server-side state is eventually synced to maintain data consistency.
 */
export const updateNotificationReadStatus = ({
  dispatch,
  userId,
  notificationId,
  isRead,
  isArchived,
}: UpdateNotificationReadStatusParams) => {
  return dispatch(
    baseApi.util.updateQueryData<{ data: Notification[] }>(
      "getNotification",
      { userId, isRead, isArchived },
      (draft: Draft<{ data: Notification[] }>) => {
        const notifications = draft?.data;
        const notification = notifications?.find(
          (item) => item._id === notificationId
        );
        if (notification) {
          notification.isRead = true;
        }
      }
    )
  );
};