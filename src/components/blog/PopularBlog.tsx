//packages
import Image from "next/image";
// components
import { TBlog } from "@/types";
import Link from "next/link";
import { MdOutlineDateRange } from "react-icons/md";
import SidebarTitle from "./SidebarTitle";

const PopularBlog = async ({ blogId = "" }: { blogId: string }) => {
    let blogs = [];
    try {
        const blogRes = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog?limit=5`,
            { cache: "no-cache" }
        );
        const data = await blogRes.json();
        blogs = data?.data;
    } catch (err) {
        console.log(err);
    }

    if (blogId !== "") {
        blogs = blogs.filter((blog: TBlog) => blog._id != blogId);
    }

    return (
        <div>
            {/* title */}
            <SidebarTitle title="POPULARS FEEDS" />
            {/* blog item */}
            <div className="mt-6 flex flex-col gap-y-12">
                {blogs.map((item: TBlog) => (
                    <div key={item._id}>
                        <div className="flex justify-start gap-x-4 items-center">
                            <Image
                                src={
                                    item?.image ||
                                    "https://utfs.io/f/oI7Ou0bdQ6rjmUlllajcqpbkXPjeJtfhu3ndFHU6y4YNQ1iI"
                                }
                                alt="Popular Blog Image"
                                width={100}
                                height={100}
                                className="object-cover rounded-lg"
                            />
                            <div className="space-y-2">
                                {/* title */}
                                <Link href={`/blog/${item._id}`}>
                                    {" "}
                                    <h2 className="text-[18px] leading-[22px] text-black font-[600] hover:text-primary-orange">
                                        {item?.title}
                                    </h2>
                                </Link>
                                {/* date of post */}
                                <p className="text-primary-gray flex items-center gap-x-2 text-base font-bold">
                                    <MdOutlineDateRange className="text-xl text-primary-gray" />
                                    {new Date(item.createdAt).toDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularBlog;
