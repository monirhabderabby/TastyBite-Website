"use client";
import { useGetSingleBlogQuery } from "@/redux/features/blog/blogApi";
//icons
import { TBlog } from "@/types";
import { FaComments, FaUser } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
const BlogHeaderInfo = ({ blog }: { blog: TBlog }) => {
  const { data } = useGetSingleBlogQuery(blog._id);
  const UpdatedBlog = data?.data;

  return (
    <div className="flex items-center flex-wrap gap-y-2 justify-start font-medium gap-x-6">
      <p className="text-[13px] md:text-[15px] leading-[1px] lg:text-[18px] flex items-center gap-1 text-[#5C5C5B]">
        <FaUser className=" text-primary-gray" />
        {UpdatedBlog?.user?.name || "Admin"}
      </p>
      <p className="text-[13px] md:text-[15px] leading-[1px] lg:text-[18px] flex items-center gap-1 text-[#5C5C5B]">
        <FaComments className=" text-primary-gray" />
        {UpdatedBlog?.comments?.length || 0} Comments
      </p>
      <p className="text-[13px] md:text-[15px] leading-[1px] lg:text-[18px] flex items-center gap-1 text-[#5C5C5B]">
        <MdOutlineDateRange className=" text-primary-gray" />
        {new Date(blog?.createdAt).toDateString()}
      </p>
    </div>
  );
};

export default BlogHeaderInfo;
