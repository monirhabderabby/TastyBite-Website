import { baseApi } from "@/redux/api/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: ({ userId }) => ({
        url: `/notification/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNotificationQuery } = notificationApi;
