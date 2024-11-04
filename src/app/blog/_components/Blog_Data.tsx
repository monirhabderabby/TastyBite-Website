//packages
import Image from "next/image";
import Link from "next/link";
import React from "react";
// components
import { FaComments, FaUser } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";

const Blog_data = () => {
  const posts = [1, 2, 3];

  return (
    <div className="flex flex-col  gap-y-10">
      {posts.map((item) => (
        <div key={item}>
          <div className="space-y-6 border p-3 rounded-lg">
            {/* image */}
            <div className="">
              <Image
                src={
                  "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_744,ar_3:2/v1/img/recipes/44/76/07/BONG6hZSgW9mAw6fKAw2_smoked-salmon-horesradish-cream-pancakes-2705.jpg"
                }
                alt="Description of image"
                width={500}
                height={250}
                className="object-fill h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full rounded-lg" // Options: 'cover', 'contain', etc.
              />
            </div>

            {/*author name, date ,commonet */}
            <div className="flex items-center flex-wrap gap-y-2 justify-start font-medium gap-x-6">
              <p className="text-[15px] leading-[1px] md:text-[18px] flex items-center gap-1 text-[#5C5C5B]">
                <FaUser className="text-xl text-primary-orange" />
                Prosanta Roy
              </p>
              {/*comment  */}
              <p className="text-[15px] leading-[1px] md:text-[18px] flex items-center gap-1  text-[#5C5C5B]">
                <FaComments className="text-xl text-primary-orange" />
                35 Comments
              </p>
              {/* date */}
              <p className="text-[15px] leading-[1px] md:text-[18px] flex items-center gap-1  text-[#5C5C5B]">
                <MdOutlineDateRange className="text-xl text-primary-orange" />
                24th March 2024
              </p>
            </div>
            {/* title ,details */}
            <div className="space-y-6">
              {/* title */}
              <h1 className="text-[30px] md:text-[44px] leading-[1.4] text-black  font-extrabold">
                QUICK CRAVINGS: UNRAVELING FAST FOOD DELIGHTS
              </h1>
              <p className="text-[18px] leading-[28px]  text-[#5c5c5b] primary-gray font-normal">
                There are many variations of passages of Lorem Ipsum available,
                but majority have suffered Lorem haca ullamcorper donec ante
                habi believable. If you are going to use a passage of Lorem
                Ipsum cibo mundi ea duo donec imperdiet eturpis varius per a
                augue magna hac. dolor sit amet, teration in some form, by
                injected humour, or randomised words which dont look ev
              </p>
              {/* blog details link */}
              <div>
                <p className="text-xl text-black w-fit hover:text-primary-orange font-bold flex items-center gap-">
                  <Link
                    className="w-fit flex gap-2 items-center"
                    href="/blog/Id"
                  >
                    <GoArrowRight
                      scale={"1.2"}
                      className="text-2xl font-black"
                    />
                    Read More
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog_data;
