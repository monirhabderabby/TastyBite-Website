import { baseApi } from "@/redux/api/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: ({ userId, isRead, isArchived }) => ({
        url: `/notification/${userId}?isRead=${isRead}&isArchived=${isArchived}`,
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
    archiveNotification: builder.mutation({
      query: ({ notificationId }) => ({
        url: `/notification/archive/${notificationId}`,
      }),
      invalidatesTags: ["Notification"],
    }),
    seen: builder.mutation({
      query: ({ notificationId }) => ({
        url: `/notification/${notificationId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetNotificationQuery,
  useSeenMutation,
  useArchiveNotificationMutation,
} = notificationApi;
