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
      invalidatesTags: ["Notification"],
    }),
    seen: builder.mutation<SeenResponse, SeenParams>({
      query: ({ notificationId }) => ({
        url: `/notification/${notificationId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification", "UnreadNotification"],
    }),
    unreadNotification: builder.query({
      query: ({ userId }) => ({
        url: `/notification/unread/${userId}`,
      }),
      providesTags: ["UnreadNotification"],
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
