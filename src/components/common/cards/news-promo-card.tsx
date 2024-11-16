import { Button } from "@/components/ui/button";
import { TBlog } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface NewsProps {
  blog: TBlog;
}

const NewsPromoCard = ({ blog }: NewsProps) => {
  return (
    <div className="group">
      <div className="overflow-hidden  h-[210px]">
        <Image
          src={blog?.image}
          alt={blog?.title}
          width={500}
          height={500}
          objectFit="cover"
          className="group-hover:scale-110 w-full  h-[210px] transition-all duration-500 ease-in-out"
        />
      </div>
      <p className="text-sm text-primary-black mt-[30px] mb-[10px]">
        By {blog?.user?.name} On
      </p>
      <h2 className="text-primary-black text-lg font-semibold uppercase hover:text-primary-orange duration-300 cursor-pointer line-clamp-1 tracking-widest">
        {blog?.title}
      </h2>
      <Link href={`/blog/${blog?._id}`}>
        {" "}
        <Button
          variant={"link"}
          className="text-base uppercase underline text-primary-orange hover:text-primary-black duration-300 p-0"
        >
          Read More
        </Button>{" "}
      </Link>
    </div>
  );
};

export default NewsPromoCard;
