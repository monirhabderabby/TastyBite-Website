// @ts-nocheck
import { baseApi } from "@/redux/api/baseApi";
import { UserStatsResponse } from "@/types";

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
    getOrderForDeliveryman: builder.query({
      query: ({ userId, isCompleted, isCancelled }) => ({
        url: `/order/deliveryman/${userId}?isCompleted=${isCompleted}&isCancelled=${isCancelled}`,
        method: "GET",
      }),
    }),
    completeOrder: builder.mutation({
      query: ({ body }) => ({
        url: `/order/complete-order`,
        method: "PATCH",
        body: body,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { userId, body } = arg;

        try {
          const res = await queryFulfilled;
          if (res.data.success) {
            dispatch(
              baseApi.util.updateQueryData(
                "getOrderForDeliveryman",
                { userId },
                (draft) => {
                  const arrayOfOrders = draft.data;
                  const target = arrayOfOrders.find(
                    (item) => item._id == body.orderId
                  );

                  target.isCompleted = true;
                  target.orderStatus = "Delivered";
                }
              )
            );
          }
        } catch {}
      },
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
