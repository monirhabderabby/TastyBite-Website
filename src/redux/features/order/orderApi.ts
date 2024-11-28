import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRunningOrder: builder.query({
      query: ({ userId }) => ({
        url: `/order/user/${userId}?isCompleted=false`,
        method: "GET",
      }),
    }),
    getCompletedOrder: builder.query({
      query: ({ userId }) => ({
        url: `/order/user/${userId}?isCompleted=true`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetRunningOrderQuery, useGetCompletedOrderQuery } = orderApi;
