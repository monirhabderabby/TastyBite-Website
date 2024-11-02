/* eslint-disable @typescript-eslint/no-explicit-any */
// Need to use the React-specific entry point to import createApi

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_BASE_BACKEND_URL}`,

    credentials: "include",
  }),
  tagTypes: [
    "Blog",
    "SingleBlog",
    "Comment",
    "User",
    "SingleUser",
    "food",
    "SingleFood",
    "Menu",
    "SingleMenu",
  ],

  endpoints: () => ({}),
});
