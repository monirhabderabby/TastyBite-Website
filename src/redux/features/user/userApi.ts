import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: "/user",
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        getSingleUser: builder.query({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET",
            }),
            providesTags: (id) => [{ type: "SingleUser", id }],
        }),
        createUser: builder.mutation({
            query: (body) => ({
                url: "/users",
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
        }),
        updateUser: builder.mutation({
            query: ({ body }) => ({
                url: `/users/update-profile`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: () => ["User"],
        }),
        deleteUser: builder.mutation({
            query: (id: string) => ({
                url: `/user/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                "User",
                { type: "SingleUser", id },
            ],
        }),
        // delivery location
        createLocation: builder.mutation({
            query: (body) => ({
                url: "/delivery-location",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Location"],
        }),
        updateLocation: builder.mutation({
            query: ({ id, body }) => ({
                url: `/delivery-location/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: () => ["Location"],
        }),
        deleteLocation: builder.mutation({
            query: (id: string) => ({
                url: `/delivery-location/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                "Location",
                { type: "SingleLocation", id },
            ],
        }),
        getLocationByUser: builder.query({
            query: (id) => ({
                url: `/delivery-location/user/${id}`,
                method: "GET",
            }),
            providesTags: (id) => [{ type: "Location", id }],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetSingleUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useCreateLocationMutation,
    useUpdateLocationMutation,
    useDeleteLocationMutation,
    useGetLocationByUserQuery,
} = userApi;

export default userApi;
