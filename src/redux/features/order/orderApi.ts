import { baseApi } from "@/redux/api/baseApi";
import { GetOrdersResponse } from "@/types";

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
      invalidatesTags: ["Order", "Notification", "UnreadNotification"],
    }),
    getOrderForDeliveryman: builder.query<
      GetOrdersResponse,
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: `/order/deliveryman/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetRunningOrderQuery,
  useGetCompletedOrderQuery,
  useUpdateOrderStatusMutation,
  useGetOrderForDeliverymanQuery,
} = orderApi;
