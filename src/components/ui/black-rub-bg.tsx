import Image from "next/image";
import React from "react";

interface Props {
  children: React.ReactNode;
  placeholderImg?: boolean;
}
const BlackRubBG = ({ children, placeholderImg = true }: Props) => {
  return (
    <div
      style={
        placeholderImg
          ? {
              backgroundImage: `url(/images/banner-bg.webp)`,
            }
          : {}
      }
      className="bg-primary-black w-full relative overflow-hidden"
    >
      <div className="w-full absolute h-[102px] md:h-[186px] lg:h-[400px] -top-20 md:-top-36 lg:-top-72">
        <Image src="/images/chef-top-bg.png" fill alt="chef-top" />
      </div>
      <section className="container py-20 lg:py-40">{children}</section>

      <div className="w-full absolute h-[35px] md:h-[63px] lg:h-[136px] -bottom-3 md:-bottom-6 lg:-bottom-14">
        <Image src="/images/chef-bottom-bg.webp" fill alt="chef-bottom" />
      </div>
    </div>
  );
};

export default BlackRubBG;
