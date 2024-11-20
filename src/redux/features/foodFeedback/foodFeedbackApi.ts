import { baseApi } from "../../api/baseApi";

const foodFeedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFoodFeedbacks: builder.query({
      query: () => ({
        url: "/foodFeedback",
        method: "GET",
      }),
      providesTags: ["FoodFeedback"],
    }),
    getSingleFoodFeedback: builder.query({
      query: (id) => ({
        url: `/foodFeedback/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "SingleFoodFeedback", id }],
    }),
    createFoodFeedback: builder.mutation({
      query: (body) => ({
        url: "/foodFeedback",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FoodFeedback"],
    }),
    updateFoodFeedback: builder.mutation({
      query: ({ body, id }) => ({
        url: `/foodFeedback/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "FoodFeedback",
        { type: "SingleFoodFeedback", id },
      ],
    }),
    deleteFoodFeedback: builder.mutation({
      query: (id: string) => ({
        url: `/foodFeedback/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "FoodFeedback",
        { type: "SingleFoodFeedback", id },
      ],
    }),
  }),
});

export const {
  useGetAllFoodFeedbacksQuery,
  useGetSingleFoodFeedbackQuery,
  useCreateFoodFeedbackMutation,
  useUpdateFoodFeedbackMutation,
  useDeleteFoodFeedbackMutation,
} = foodFeedbackApi;