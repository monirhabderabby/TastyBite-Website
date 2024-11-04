import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import Pageheader from "@/components/common/PageHeaderBanner/Pageheader";
import { FaComments, FaUser } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import Blog_Search from "../_components/Blog_Search";
import PopularBlog from "@/components/blog/PopularBlog";
import Blog_category from "../_components/Blog_Category";
import SocialLink from "@/components/blog/SocialLink";

export default function BlogPost() {
  const breadcrumbLinks = {
    mode: "dark",
    preLinks: [
      { link: "/", name: "Home" },
      { link: "/blog", name: "Blog Page" },
    ],
    pageName: "Blog Details",
  };

  return (
    <div>
      <div>
        <Pageheader
          img="https://foodking-react.vercel.app/assets/img/banner/breadcrumb.jpg"
          title="BLOG PAGE"
          breadLink={breadcrumbLinks}
        />
      </div>

      <div className="container  mt-5 md:mt-12 lg:mt-24 mb-14 mx-auto px-4 py-8">
        <div className="grid grid-cols-5 gap-x-20 gap-y-14">
          {/* blog post part */}
          <div className="col-span-5  lg:col-span-3">
            <article className="space-y-6">
              <h1 className="text-[30px] md:text-[44px] leading-[1.4] text-black font-extrabold  ">
                QUICK CRAVINGS: UNRAVELING FAST FOOD DELIGHTS
              </h1>

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
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                <Image
                  src="https://foodking-react.vercel.app/assets/img/news/post-4.jpg"
                  alt="Delicious burger with chicken nuggets"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <h2 className="text-2xl font-bold text-[#333]">
                THE PEOPLE WHO GIVE YOU THEIR FOOD GIVE YOU THEIR HEART
              </h2>
              <p className="text-[18px] leading-[28px]  text-[#5c5c5b] primary-gray font-normal">
                There are many variations of passages of Lorem Ipsum available,
                but majority have suffered Lorem haca ullamcorper donec ante
                habi believable. If you are going to use a passage of Lorem
                Ipsum cibo mundi ea duo donec imperdiet eturpis varius per a
                augue magna hac. dolor sit amet, teration in some form, by
                injected humour, or randomised words which dont look ev There
                are many variations of passages of Lorem Ipsum available, but
                majority have suffered Lorem haca ullamcorper donec ante habi
                believable. If you are going to use a passage of Lorem Ipsum
                cibo mundi ea duo donec imperdiet eturpis varius per a augue
                magna hac. dolor sit amet, teration in some form, by injected
                humour, or randomised words which dont look ev There are many
                variations of passages of Lorem Ipsum available, but majority
                have suffered Lorem haca ullamcorper donec ante habi believable.
                If you are going to use a passage of Lorem Ipsum cibo mundi ea
                duo donec imperdiet eturpis varius per a augue magna hac. dolor
                sit amet, teration in some form, by injected humour, or
                randomised words which dont look ev There are many variations of
                passages of Lorem Ipsum available, but majority have suffered
                Lorem haca ullamcorper donec ante habi believable. If you are
                going to use a passage of Lorem Ipsum cibo mundi ea duo donec
                imperdiet eturpis varius per a augue magna hac. dolor sit amet,
                teration in some form, by injected humour, or randomised words
                which dont look ev
              </p>

              <p className="text-[#666]">
                This shortage is being seen in both the airline and the cargo
                industries. With such a small pool of applicants to choose from,
                these two sectors are battling to get the most qualified
                available candidates. Many pilots are increasingly being wooed
                to get behind the controls of passenger planes over cargo
                flights—frankly, it&apos;s tough to compete with jobs perks like
                fixed schedules and free flights for your family across the
                world.
              </p>
            </article>
          </div>

          {/* blog sidebar part */}
          <div className="col-span-5  lg:mt-4 lg:col-span-2">
            <Blog_Search />
            <PopularBlog />
            <Blog_category />
            <SocialLink />
          </div>
        </div>
      </div>
    </div>
  );
}
