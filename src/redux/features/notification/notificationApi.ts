// @ts-nocheck
import {
  clearNotificationCache,
  decreamentNotificationCount,
  resetUnreadNotificationCount,
  updateNotificationReadStatus,
} from "@/cache/notification/notification.cache";
import { baseApi } from "@/redux/api/baseApi";
import { GetNotificationResponse, TNotification } from "@/types";

type GetNotiParams = {
  userId: string;
  isRead?: boolean;
  isArchived?: boolean;
};

type SeenResponse = {
  success: boolean;
  message: string;
  data: TNotification;
};

type SeenParams = {
  notificationId: string;
} & GetNotiParams;
const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query<GetNotificationResponse, GetNotiParams>({
      query: ({ userId, isRead, isArchived }) => ({
        url: `/notification/${userId}?isRead=${isRead}&isArchived=${isArchived}`,
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
    archiveNotification: builder.mutation({
      query: ({ notificationId }) => ({
        url: `/notification/archive/${notificationId}`,
        method: "PATCH",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { isArchived, isRead, userId, notificationId } = arg;
        const result = dispatch(
          baseApi.util.updateQueryData(
            "getNotification",
            { isArchived, isRead, userId },
            (draft) => {
              const arrayOfNotification = draft.data;
              const filteredNotification = arrayOfNotification.filter(
                (item) => item._id !== notificationId
              );

              return {
                data: filteredNotification,
                success: draft.success,
                message: draft.message,
              };
            }
          )
        );

        try {
          const res = await queryFulfilled;
          if (!res.data?.success) {
            result.undo();
          }
        } catch {
          result.undo();
        }
      },
    }),
    unreadNotification: builder.query({
      query: ({ userId }) => ({
        url: `/notification/unread/${userId}`,
      }),
      providesTags: ["UnreadNotification"],
    }),
    seen: builder.mutation<SeenResponse, SeenParams>({
      query: ({ notificationId }) => ({
        url: `/notification/${notificationId}`,
        method: "PATCH",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { userId, isArchived, isRead, notificationId } = arg;

        // decreament notification count from unread notification count

        const decreamentNotificationCountResult = decreamentNotificationCount(
          dispatch,
          userId
        );

        // optimistic cache update start
        const seenDispatchResult = updateNotificationReadStatus({
          dispatch,
          userId,
          notificationId,
          isRead,
          isArchived,
        });

        // optimistic cache update end

        try {
          const res = await queryFulfilled;

          if (!res.data.success) {
            // undo dispatch
            seenDispatchResult.undo();
            decreamentNotificationCountResult.undo();
          }
        } catch {
          // undo dispatch
          seenDispatchResult.undo();
          decreamentNotificationCountResult.undo();
        }
      },
    }),

    deleteUnread: builder.mutation({
      query: ({ userId }) => ({
        url: `/notification/${userId}?isRead=false`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { userId, isRead, isArchived } = arg;
        // optimistic cache update start

        // update unread notification for navbar
        const unreadCacheDispatchResult = resetUnreadNotificationCount(
          dispatch,
          userId
        );

        const getNotificationCacheResult = clearNotificationCache(
          dispatch,
          userId,
          isRead,
          isArchived
        );

        // optimistic cache update end

        try {
          await queryFulfilled;
        } catch {
          unreadCacheDispatchResult.undo();
          getNotificationCacheResult.undo();
        }
      },
    }),
    deleteArchived: builder.mutation({
      query: ({ userId }) => ({
        url: `/notification/${userId}?isArchived=true`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { userId, isRead, isArchived } = arg;
        // optimistic cache update start

        let totalUnread = null;

        const getNotificationCacheResult = dispatch(
          baseApi.util.updateQueryData(
            "getNotification",
            { userId, isRead, isArchived },
            (draft) => {
              const totalUnreadNotifications = draft.data.filter(
                (item) => !item.isRead
              );

              if (totalUnreadNotifications.length > 0) {
                totalUnread = totalUnreadNotifications.length;
              }
              return {
                success: true,
                message: draft.message,
                meta: {
                  page: draft.meta.page,
                  limit: draft.meta.limit,
                  total: 0, // Reset total notifications
                  totalPage: 1, // Reset total pages
                },
                data: [], // Clear all notification data
              };
            }
          )
        );

        // update unread notification for navbar
        const unreadCacheDispatchResult = dispatch(
          baseApi.util.updateQueryData(
            "unreadNotification",
            { userId },
            (draft) => {
              const updatedData = totalUnread
                ? parseInt(draft.data) - totalUnread
                : draft.data;
              return {
                success: true,
                message: draft.message,
                data: updatedData,
              };
            }
          )
        );

        // optimistic cache update end

        try {
          await queryFulfilled;
        } catch {
          unreadCacheDispatchResult.undo();
          getNotificationCacheResult.undo();
        }
      },
    }),
    deleteAllNotification: builder.mutation({
      query: ({ userId }) => ({
        url: `/notification/${userId}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { userId, isRead, isArchived } = arg;
        // optimistic cache update start

        // update unread notification for navbar
        const unreadCacheDispatchResult = resetUnreadNotificationCount(
          dispatch,
          userId
        );

        const getNotificationCacheResult = clearNotificationCache(
          dispatch,
          userId,
          isRead,
          isArchived
        );

        // optimistic cache update end

        try {
          await queryFulfilled;
        } catch {
          unreadCacheDispatchResult.undo();
          getNotificationCacheResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetNotificationQuery,
  useSeenMutation,
  useArchiveNotificationMutation,
  useUnreadNotificationQuery,
  useDeleteUnreadMutation,
  useDeleteArchivedMutation,
  useDeleteAllNotificationMutation,
} = notificationApi;
