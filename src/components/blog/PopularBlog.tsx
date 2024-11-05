//packages
import React from "react";
import Image from "next/image";
// components
import SidebarTitle from "./SidebarTitle";
import { MdOutlineDateRange } from "react-icons/md";

const PopularBlog = () => {
  const blog = [1, 2, 3];

  return (
    <div className="mt-24">
      {/* title */}
      <SidebarTitle title="POPULARS FEEDS" />
      {/* blog item */}
      <div className="mt-6 flex flex-col gap-y-12">
        {blog.map((item) => (
          <div key={item}>
            <div className="flex justify-start gap-x-4 items-center">
              <Image
                src={
                  "https://utfs.io/f/oI7Ou0bdQ6rjmUlllajcqpbkXPjeJtfhu3ndFHU6y4YNQ1iI"
                }
                alt="Popular Blog Image"
                width={100}
                height={100}
                className="object-cover rounded-lg"
              />
              <div className="space-y-2">
                {/* title */}
                <h2 className="text-[18px] leading-[22px] text-black font-[600] hover:text-primary-orange">
                  Budget Issues Force The Our To Become
                </h2>
                {/* date of post */}
                <p className="text-primary-gray flex items-center gap-x-2 text-base font-bold">
                  <MdOutlineDateRange className="text-xl text-primary-gray" />
                  26th March 2024
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
