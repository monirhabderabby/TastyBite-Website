//icons
import { TBlog } from "@/types";
import { FaComments, FaUser } from "react-icons/fa"
import { MdOutlineDateRange } from "react-icons/md"
const BlogHeaderInfo = ({blog}:{blog:TBlog}) => {
  return (
    <div className="flex items-center flex-wrap gap-y-2 justify-start font-medium gap-x-6">
    <p className="text-[15px] leading-[1px] md:text-[18px] flex items-center gap-1 text-[#5C5C5B]">
      <FaUser className="text-xl text-primary-gray" />
      {blog?.user?.name}
    </p>
    <p className="text-[15px] leading-[1px] md:text-[18px] flex items-center gap-1 text-[#5C5C5B]">
      <FaComments className="text-xl text-primary-gray" />
      {blog?.comments?.length || 0} Comments
    </p>
    <p className="text-[15px] leading-[1px] md:text-[18px] flex items-center gap-1 text-[#5C5C5B]">
      <MdOutlineDateRange className="text-xl text-primary-gray" />
      {new Date(blog?.createdAt).toDateString()}
    </p>
  </div>
  );
};

export default BlogHeaderInfo;