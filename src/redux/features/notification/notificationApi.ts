import { baseApi } from "@/redux/api/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: ({ userId }) => ({
        url: `/notification/${userId}`,
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
    seen: builder.mutation({
      query: (notificationId) => ({
        url: `/notification/${notificationId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const { useGetNotificationQuery, useSeenMutation } = notificationApi;
