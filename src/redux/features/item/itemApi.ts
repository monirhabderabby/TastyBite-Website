import { baseApi } from "../../api/baseApi";

const itemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllItems: builder.query({
      query: () => ({
        url: "/item",
        method: "GET",
      }),
      providesTags: ["Item"],
    }),
    getSingleItem: builder.query({
      query: (id) => ({
        url: `/item/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "SingleItem", id }],
    }),
    createItem: builder.mutation({
      query: (body) => ({
        url: "/item/create-item",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Item"],
    }),
    updateItem: builder.mutation({
      query: ({ body, id }) => ({
        url: `/item/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Item",
        { type: "SingleItem", id },
      ],
    }),
    deleteItem: builder.mutation({
      query: (id: string) => ({
        url: `/item/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "Item",
        { type: "SingleItem", id },
      ],
    }),
  }),
});

export const {
  useGetAllItemsQuery,
  useGetSingleItemQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemApi;
