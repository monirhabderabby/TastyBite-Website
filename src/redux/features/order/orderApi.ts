// @ts-nocheck
import { baseApi } from "@/redux/api/baseApi";
import { GetOrdersResponse, UserStatsResponse } from "@/types";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRunningOrder: builder.query({
      query: ({ userId }) => ({
        url: `/order/user/${userId}?isCompleted=false&isCancelled=false`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    getCompletedOrder: builder.query({
      query: ({ userId }) => ({
        url: `/order/user/${userId}?isCompleted=true`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ body, id }) => ({
        url: `/order/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [
        "Order",
        "Notification",
        "UnreadNotification",
        "OrderStats",
      ],
    }),
    getOrderForDeliveryman: builder.query<
      GetOrdersResponse,
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: `/order/deliveryman/${userId}`,
        method: "GET",
      }),
      providesTags: ["DeliveryOrders"],
    }),
    completeOrder: builder.mutation({
      query: (data) => ({
        url: `/order/complete-order`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["DeliveryOrders"],
    }),
    getOrderStats: builder.query<UserStatsResponse, string>({
      query: (userId) => ({
        url: `/stats/user-stats/${userId}`,
      }),
      providesTags: ["OrderStats"],
    }),
  }),
});

export const {
  useGetRunningOrderQuery,
  useGetCompletedOrderQuery,
  useUpdateOrderStatusMutation,
  useGetOrderForDeliverymanQuery,
  useCompleteOrderMutation,
  useGetOrderStatsQuery,
} = orderApi;
