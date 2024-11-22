import { baseApi } from "../../api/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllContacts: builder.query({
      query: (query) => {
        return {
          url: `/contact/?${query}`,
          method: "GET",
        };
      },
      providesTags: ["Contact"],
    }),
    createContact: builder.mutation({
      query: (body) => {
        return {
          url: "/contact",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Contact"],
    }),
    deleteContact: builder.mutation({
      query: (id) => {
        return {
          url: `/contact/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [
        "Contact",
        { type: "SingleContact", id },
      ],
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
} = contactApi;
