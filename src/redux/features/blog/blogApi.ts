import { baseApi } from "../../api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: (query) => {
        console.log(query);
        return {
          url: `/blog/?${query}`,
          method: "GET",
        };
      },
      providesTags: ["Blog"],
    }),
    getSingleBlog: builder.query({
      query: (id) => {
        console.log(id);
        return {
          url: `/blog/${id}`,
          method: "GET",
        };
      },
      providesTags: (result, error, id) => [{ type: "SingleBlog", id }],
    }),
    getBlogComment: builder.query({
      query: ({id,query}) => {
        console.log(id);
        return {
          url: `/blog-comment/${id}/?${query}`,
          method: "GET",
        };
      },
      providesTags: (result, error, id) => [{ type: "SingleBlog", id }],
    }),
    createBlog: builder.mutation({
      query: (body) => {
        console.log(body);
        return {
          url: "/blog",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builder.mutation({
      query: ({ body, id }) => {
        console.log(body, id);
        return {
          url: `/blog/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        "Blog",
        { type: "SingleBlog", id },
      ],
    }),
    createBlogComment: builder.mutation({
      query: ({ body }) => {
        return {
          url: `/blog-comment`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        "Blog",
        { type: "SingleBlog", id },
      ],
    }),
    deleteBlog: builder.mutation({
      query: (id: string) => {
        console.log(id);
        return {
          url: `/blog/${id}`,
          method: "DELETE",
        };
      },
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
  useCreateBlogCommentMutation,
  useGetBlogCommentQuery
} = blogApi;
