"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import { TBlog } from "@/types";

import BlogCard from "@/components/common/cards/blog-card/blogCard";
import Blog_Pagination from "./Blog_Pagination";
import Blog_Skeleton from "./Blog_Skeleton";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4    lg:px-2 gap-y-10">
        {[1, 2, 3, 4, 5].map((item) => (
          <Blog_Skeleton key={item} />
        ))}
      </div>
    );

  const blogPosts = blogData?.data;
  const totalPages = blogData?.meta?.totalPage || 1;

  const stagger = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 1 },
    }),
  };

  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-1 gap-4   lg:px-2 gap-y-10 ">
        {blogPosts?.map((blog: TBlog, i: number) => (
          <motion.div
            key={blog?._id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            variants={stagger}
            viewport={{ once: false }}
          >
            <BlogCard key={blog._id} blog={blog} />
          </motion.div>
        ))}
      </div>
      <div className="mt-5">
        <Blog_Pagination
          page={page}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
