"use client";
import Marquee from "react-fast-marquee";
import "./marquee.css";
import Image from "next/image";
const MarqueeSec = () => {
  return (
    <div className="text-black py-10 ">
      <Marquee speed={200}>
        <div className="h-[180px] flex gap-10 py-3">
          <span className="text-slider flex gap-4 text-color">
            delicious food
            <Image
              src={"https://foodking-react.vercel.app/assets/img/star.svg"}
              alt="star image"
              width={100}
              height={1000}
              className="w-14 mt-[30px] h-14"
            />
          </span>
          <span className="text-slider flex gap-4 text-color">
            populer dishes
            <Image
              src={"https://foodking-react.vercel.app/assets/img/star.svg"}
              alt="star image"
              width={100}
              height={1000}
              className="w-14 mt-[30px] h-14"
            />
          </span>
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeSec;
