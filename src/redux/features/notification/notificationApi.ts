// @ts-nocheck
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

        // update unread notification
        const unreadNotificationDispatchResult = dispatch(
          baseApi.util.updateQueryData(
            "unreadNotification",
            { userId },
            (draft) => {
              draft.data = parseInt(draft.data) - 1;
            }
          )
        );

        // optimistic cache update start
        const seenDispatchResult = dispatch(
          baseApi.util.updateQueryData(
            "getNotification",
            { userId, isRead, isArchived },
            (draft) => {
              const arrayOfNotification = draft?.data;
              const currentNotification = arrayOfNotification.find(
                (notification) => notification._id == notificationId
              );

              currentNotification.isRead = true;
            }
          )
        );

        // optimistic cache update end

        try {
          const res = await queryFulfilled;

          if (!res.data.success) {
            // undo dispatch
            seenDispatchResult.undo();
            unreadNotificationDispatchResult.undo();
          }
        } catch {
          // undo dispatch
          seenDispatchResult.undo();
          unreadNotificationDispatchResult.undo();
        }
      },
    }),

    deleteUnread: builder.mutation({
      query: ({ userId }) => ({
        url: `/notification/${userId}?isRead=false`,
        method: "DELETE",
      }),

      invalidatesTags: ["UnreadNotification", "Notification"],
    }),
    deleteArchived: builder.mutation({
      query: ({ userId }) => ({
        url: `/notification/${userId}?isArchived=true`,
        method: "DELETE",
      }),

      invalidatesTags: ["UnreadNotification", "Notification"],
    }),
    deleteAllNotification: builder.mutation({
      query: ({ userId }) => ({
        url: `/notification/${userId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["UnreadNotification", "Notification"],
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
