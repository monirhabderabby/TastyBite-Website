import { baseApi } from "../../api/baseApi";

const menuApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMenus: builder.query({
            query: () => ({
                url: "/menu",
                method: "GET",
            }),
            providesTags: ["Menu"],
        }),
        getSingleMenu: builder.query({
            query: (id) => ({
                url: `/menu/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "SingleMenu", id }],
        }),
        createMenu: builder.mutation({
            query: (body) => ({
                url: "/menu/create-menu",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Menu"],
        }),
        updateMenu: builder.mutation({
            query: ({ body, id }) => ({
                url: `/menu/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, error, { id }) => [
                "Menu",
                { type: "SingleMenu", id },
            ],
        }),
        deleteMenu: builder.mutation({
            query: (id: string) => ({
                url: `/menu/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                "Menu",
                { type: "SingleMenu", id },
            ],
        }),
    }),
});

export const {
    useGetAllMenusQuery,
    useGetSingleMenuQuery,
    useCreateMenuMutation,
    useUpdateMenuMutation,
    useDeleteMenuMutation,
} = menuApi;
