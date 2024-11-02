import { baseApi } from "../../api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => ({
        url: "/blog",
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),
    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "SingleBlog", id }],
    }),
    createBlog: builder.mutation({
      query: (body) => ({
        url: "/blog",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builder.mutation({
      query: ({ body, id }) => ({
        url: `/blog/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Blog",
        { type: "SingleBlog", id },
      ],
    }),
    deleteBlog: builder.mutation({
      query: (id: string) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "Blog",
        { type: "SingleBlog", id },
      ],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
