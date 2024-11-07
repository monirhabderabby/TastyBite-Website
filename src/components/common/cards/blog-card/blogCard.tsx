import { TBlog } from "@/types";
import Image from "next/image";

import { GoArrowRight } from "react-icons/go";
//
import Link from "next/link";
import BlogHeaderInfo from "@/components/blog/BlogHeaderInfo";

const BlogCard = ({ blog }: { blog: TBlog }) => {
  return (
    <div>
      <div className="space-y-6 border p-3 rounded-lg">
        <div className="">
          <Image
            src={
              blog.image ||
              "https://foodking-react.vercel.app/assets/img/news/post-1.jpg"
            }
            alt={blog.title}
            width={500}
            height={250}
            className="object-cover h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full rounded-lg"
          />
        </div>
      {/* for author name , blog total comments and publish date */}
        <BlogHeaderInfo blog={blog} />

        <div className="space-y-6">
          <h2 className="text-[30px] md:text-[44px] leading-[1.4] text-black font-extrabold">
            {blog.title}
          </h2>
          <p className="text-[18px] leading-[28px] text-[#5c5c5b] primary-gray font-normal">
            {blog.description.substring(0, 300)}...
          </p>
          <div>
            <div className="text text-black w-fit hover:text-primary-orange font-semibold flex items-center gap-2">
              <Link
                className="w-fit flex gap-2 items-center"
                href={`/blog/${blog._id}`}
              >
                <GoArrowRight className="text-sky-2xl font-black" />
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
