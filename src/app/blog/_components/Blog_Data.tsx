"use client";

import React, { useState, useEffect } from "react";

import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import { TBlog } from "@/types";

import Blog_Skeleton from "./Blog_Skeleton";
import BlogCard from "@/components/common/cards/blog-card/blogCard";
import Blog_Pagination from "./Blog_Pagination";

export default function Blog_data() {
  const limit = 5;
  const [page, setPage] = useState(1);

  const query = `limit=${limit}&page=${page}`;
  const { data: blogData, isLoading } = useGetAllBlogsQuery(query);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (isLoading)
    return (
      <div className="flex flex-col gap-y-10">
        {[1, 2, 3, 4, 5].map((item) => (
          <Blog_Skeleton key={item} />
        ))}
      </div>
    );

  const blogPosts = blogData?.data;
  const totalPages = blogData?.meta?.totalPage || 1;

  return (
    <div className="flex flex-col px-5 md:px-20  lg:px-2 gap-y-10">
      {blogPosts?.map((blog: TBlog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
      <Blog_Pagination
        page={page}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
}
