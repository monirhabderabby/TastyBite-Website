import { baseApi } from "../../api/baseApi";

const foodApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFoods: builder.query({
      query: () => ({
        url: "/food",
        method: "GET",
      }),
      providesTags: ["food"],
    }),
    getSingleFood: builder.query({
      query: (id) => ({
        url: `/food/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "SingleFood", id }],
    }),
    createFood: builder.mutation({
      query: (body) => ({
        url: "/food",
        method: "POST",
        body,
      }),
      invalidatesTags: ["food"],
    }),
    updateFood: builder.mutation({
      query: ({ body, id }) => ({
        url: `/food/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "food",
        { type: "SingleFood", id },
      ],
    }),
    deleteFood: builder.mutation({
      query: (id: string) => ({
        url: `/food/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "food",
        { type: "SingleFood", id },
      ],
    }),
  }),
});

export const {
  useGetAllFoodsQuery,
  useGetSingleFoodQuery,
  useCreateFoodMutation,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
} = foodApi;
