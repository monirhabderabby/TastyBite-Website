/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetBlogCommentQuery } from "@/redux/features/blog/blogApi";
import { TBlog } from "@/types";
import Image from "next/image";
import { useState } from "react";
import Blog_Pagination from "../../_components/Blog_Pagination";

export default function BlogCommentDisplay({
  blogData,
}: {
  blogData: TBlog | null;
}) {
  const limit = 5; // Number of comments to display per page
  const [page, setPage] = useState(1);

  const query = `limit=${limit}&page=${page}`;
  const { data: blogCommentRes, isLoading } = useGetBlogCommentQuery({
    id: blogData?._id || 0,
    query,
  });
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const comments = blogCommentRes?.data || [];
  const totalPages = blogCommentRes?.meta?.totalPage || 1;
  const totalComments = blogCommentRes?.meta?.total || 0;
  return (
    <div id="blog-comment-display" className="max-w-2xl  mx-auto p-4">
      <h2 className="text-xl font-bold mb-6">
        {String(totalComments).padStart(2, "0")} COMMENTS
      </h2>
      <div className="space-y-6">
        {isLoading && (
          <p className="text-muted-foreground">Loading comments...</p>
        )}

        {comments.length === 0 && !isLoading && (
          <p className="text-muted-foreground">No comments yet</p>
        )}
        {comments.map((comment: any) => (
          <div
            key={comment.id}
            className="flex gap-4 pb-6 border-b border-gray-200 last:border-0"
          >
            <Image
              src={
                comment?.userId?.image ||
                "https://foodking-react.vercel.app/assets/img/news/author_img2.jpg"
              }
              alt={`${comment?.userId?.image}'s avatar`}
              width={48}
              height={48}
              className="rounded-full object-cover w-12 h-12"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">{comment?.userId?.name}</h3>
                  <p className="text-sm text-green-600">
                    {new Date(comment.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">{comment?.comment}</p>
            </div>
          </div>
        ))}
      </div>
      {totalComments > 5 && (
        <Blog_Pagination
          sectionId="blog-comment-display"
          page={page}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
